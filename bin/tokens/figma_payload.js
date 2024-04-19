/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {
  areSetsEqual,
  colorApproximatelyEqual,
  getParentPath,
  isAlias,
  parseColor,
  variableResolvedTypeFromToken,
} = require('./utils');

/**
 * Flatten design tokens for Figma
 * @param {object} rawTokenGroup
 * @returns {object} flattenedTokenGroup
 */
function flattenDesignTokensForFigma(rawTokenGroup) {
  const flattenedTokenGroup = {};

  const tokenize = (rawToken, tokenPath = [], metadata = {}) => {
    const {
      $type = metadata.$type,
      $extensions = metadata.$extensions,
      $description = '',
    } = rawToken;
    const tokenID = getParentPath(tokenPath.join('/'));

    // Prepare the token entry in the flattened group, initializing default structure
    if (!flattenedTokenGroup[tokenID] && rawToken.$value !== undefined) {
      flattenedTokenGroup[tokenID] = {
        id: tokenID,
        $type,
        name: tokenID,
        description: $description,
        valuesByMode: {},
        $extensions,
      };
    }

    // If there's a $value at this level, store it under the last key part as mode in valuesByMode
    if (rawToken.$value !== undefined) {
      const modeName = tokenPath[tokenPath.length - 1] || 'default'; // Use the last part of the path or 'default'
      flattenedTokenGroup[tokenID].valuesByMode[modeName] = rawToken.$value;
    }

    // recursion into nested objects that are not metadata
    Object.keys(rawToken).forEach((key) => {
      if (key[0] !== '$') {
        tokenize(rawToken[key], [...tokenPath, key], { $type, $extensions });
      }
    });
  };

  // Begin tokenization from each top-level key in the raw token group
  Object.keys(rawTokenGroup).forEach((groupName) => {
    tokenize(rawTokenGroup[groupName], [groupName]);
  });

  return flattenedTokenGroup;
}

/**
 * Read all token files from a directory and its subdirectories
 * @param {string} directory
 * @returns {object} tokensFiles
 */
function readTokenFiles(directory) {
  let tokens = {};

  const items = fs.readdirSync(directory, { withFileTypes: true });

  for (const item of items) {
    const filepath = path.join(directory, item.name);

    if (item.isDirectory()) {
      // recursively read tokens files from subdirectories
      tokens = { ...tokens, ...readTokenFiles(filepath) };
    } else if (item.name.endsWith('.tokens.json')) {
      // TODO: handle collection name
      const data = JSON.parse(fs.readFileSync(filepath));
      tokens[item.name] = flattenDesignTokensForFigma(data);
    }
  }

  return tokens;
}

/**
 * @param {object} token
 * @param {string} modeName
 * @param {object} localVariablesByCollectionAndName
 * @returns {object}
 */
const variableValueFromToken = (token, modeName, localVariablesByCollectionAndName) => {
  const value = token.valuesByMode[modeName];
  if (typeof value === 'string' && isAlias(value)) {
    // Assume aliases are in the format {group.subgroup.token} with any number of optional groups/subgroups
    // The Figma syntax for variable names is: group/subgroup/token
    const figmaValue = value.trim().replace(/\./g, '/').replace(/[{}]/g, '');

    // When mapping aliases to existing local variables, we assume that variable names
    // are unique *across all collections* in the Figma file
    for (const localVariablesByName of Object.values(localVariablesByCollectionAndName)) {
      if (localVariablesByName[figmaValue]) {
        return {
          type: 'VARIABLE_ALIAS',
          id: localVariablesByName[figmaValue].id,
        };
      }
    }

    // If we don't find a local variable matching the alias, we assume it's a variable
    // that we're going to create elsewhere in the payload.
    // If the file has an invalid alias, we rely on the Figma API to return a 400 error
    return {
      type: 'VARIABLE_ALIAS',
      id: figmaValue,
    };
  }
  if (typeof value === 'string' && token.$type === 'color') {
    return parseColor(value);
  }
  return value;
};

/**
 * Compares the values of two variables.
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
const compareVariableValues = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    if ('type' in a && 'type' in b && a.type === 'VARIABLE_ALIAS' && b.type === 'VARIABLE_ALIAS') {
      return a.id === b.id;
    }
    if ('r' in a && 'r' in b) {
      return colorApproximatelyEqual(a, b);
    }
  } else {
    return a === b;
  }

  return false;
};

/**
 * Check if two code syntax objects are equal.
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
const isCodeSyntaxEqual = (a, b) => {
  return (
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every((key) => a[key] === b[key])
  );
};

/**
 * Get writable token properties that are different from the variable.
 * If the variable does not exist, all writable properties are returned.
 *
 * This function is being used to decide what properties to include in the
 * POST variables call to update variables in Figma. If a token does not have
 * a particular property, we do not include it in the differences object to avoid
 * touching that property in Figma.
 * @param {object} token
 * @param {object} variable
 * @returns {object}
 */
const tokenAndVariableDifferences = (token, variable) => {
  const differences = {};

  if (
    token.$description !== undefined &&
    (!variable || token.$description !== variable.description)
  ) {
    differences.description = token.$description;
  }

  if (token.$extensions && token.$extensions['com.figma']) {
    const figmaExtensions = token.$extensions['com.figma'];

    if (
      figmaExtensions.hiddenFromPublishing !== undefined &&
      (!variable || figmaExtensions.hiddenFromPublishing !== variable.hiddenFromPublishing)
    ) {
      differences.hiddenFromPublishing = figmaExtensions.hiddenFromPublishing;
    }

    if (
      figmaExtensions.scopes &&
      (!variable || !areSetsEqual(new Set(figmaExtensions.scopes), new Set(variable.scopes)))
    ) {
      differences.scopes = figmaExtensions.scopes;
    }

    if (
      figmaExtensions.codeSyntax &&
      (!variable || !isCodeSyntaxEqual(figmaExtensions.codeSyntax, variable.codeSyntax))
    ) {
      differences.codeSyntax = figmaExtensions.codeSyntax;
    }
  }

  return differences;
};

/**
 * Generates a payload for posting local variables to Figma.
 *
 * @param {Object} tokensByFile - Object containing tokens grouped by file.
 * @param {Object} localVariables - Object containing local variables data.
 * @param {string} collectionName - Name of the collection to post variables to.
 * @returns {Object} - Payload for posting local variables to Figma.
 */
const generatePostVariablesPayload = (tokensByFile, localVariables, collectionName) => {
  const localVariableCollectionsByName = {};
  const localVariablesByCollectionAndName = {};

  // Iterate through each variable collection
  Object.values(localVariables.meta.variableCollections).forEach((collection) => {
    if (collection.remote) {
      // Skip over remote collections because we can't modify them
      console.log(`Skipping remote variable collection: ${collection.name}`);
      return;
    }

    // Check for duplicate variable collections
    if (localVariableCollectionsByName[collection.name]) {
      console.error(`🚨 Duplicate variable collection found: ${collection.name}`);
      throw new Error(`Duplicate variable collection found: ${collection.name}`);
    }

    // Store the variable collection by name
    localVariableCollectionsByName[collection.name] = collection;
  });

  // Iterate through each variable
  Object.values(localVariables.meta.variables).forEach((variable) => {
    if (variable.remote) {
      // Skip over remote variables because we can't modify them
      console.log(`Skipping remote variable collection: ${variable.name}`);
      return;
    }

    // Initialize variables object by collection id if not already present
    if (!localVariablesByCollectionAndName[variable.variableCollectionId]) {
      localVariablesByCollectionAndName[variable.variableCollectionId] = {};
    }

    // Store the variable by collection id and variable name
    localVariablesByCollectionAndName[variable.variableCollectionId][variable.name] = variable;
  });

  // Initialize payload object for posting local variables to Figma
  const postVariablesPayload = {
    variableCollections: [],
    variableModes: [],
    variables: [],
    variableModeValues: [],
  };

  // iterate through each file's tokens
  Object.entries(tokensByFile).forEach(([fileName, tokens]) => {
    // extract collection name from file name & validate file name format
    const fileNameParts = fileName.split('.');
    if (fileNameParts.length !== 3 || fileNameParts[1] !== 'tokens') {
      console.error(`Invalid tokens file name: ${fileName}`);
      throw new Error(
        `Invalid tokens file name: ${fileName}. Expected format: {collectionName}.tokens.json`
      );
    }

    // gather all modes in the file
    const modesInFile = [];
    Object.entries(tokens).forEach((token) => {
      Object.keys(token[1].valuesByMode).forEach((mode) => {
        if (!modesInFile.includes(mode)) {
          modesInFile.push(mode);
        }
      });
    });

    const variableCollection = localVariableCollectionsByName[collectionName];
    const variableCollectionId = variableCollection ? variableCollection.id : collectionName;

    // iterate through each mode in the file
    modesInFile.forEach((modeName) => {
      // Retrieve the variable mode from local variable collections
      const variableMode = variableCollection
        ? variableCollection.modes.find((mode) => mode.name === modeName)
        : undefined;
      const modeId = variableMode ? variableMode.modeId : modeName;

      // Add variable collection and mode if not already present in the payload
      if (
        !variableCollection &&
        !postVariablesPayload.variableCollections.find((c) => c.id === variableCollectionId)
      ) {
        postVariablesPayload.variableCollections.push({
          action: 'CREATE',
          id: variableCollectionId,
          name: variableCollectionId,
          initialModeId: modeId, // TODO: this currently goes off the first mode, which results in "dark"
        });

        postVariablesPayload.variableModes.push({
          action: 'UPDATE',
          id: modeId,
          name: modeId,
          variableCollectionId,
        });
      }

      // Add a new mode if it doesn't exist in the Figma file and it's not the initial mode in the collection
      if (
        !variableMode &&
        !postVariablesPayload.variableCollections.find(
          (c) => c.id === variableCollectionId && c.initialModeId === modeId
        )
      ) {
        postVariablesPayload.variableModes.push({
          action: 'CREATE',
          id: modeId,
          name: modeId,
          variableCollectionId,
        });
      }

      // Retrieve local variables by collection id
      const localVariablesByName = localVariablesByCollectionAndName[variableCollection?.id] || {};

      // Iterate through tokens
      Object.entries(tokens).forEach(([tokenName, token]) => {
        // Retrieve variable by name
        const variable = localVariablesByName[tokenName];
        const variableId = variable ? variable.id : tokenName;
        const variableInPayload = postVariablesPayload.variables.find(
          (v) => v.id === variableId && v.variableCollectionId === variableCollectionId
        );
        const differences = tokenAndVariableDifferences(token, variable);

        // Add a new variable if it doesn't exist in the Figma file and hasn't been added already in another mode
        if (!variable && !variableInPayload) {
          postVariablesPayload.variables.push({
            action: 'CREATE',
            id: variableId,
            name: tokenName,
            variableCollectionId,
            resolvedType: variableResolvedTypeFromToken(token),
            ...differences,
          });
        } else if (variable && Object.keys(differences).length > 0) {
          postVariablesPayload.variables.push({
            action: 'UPDATE',
            id: variableId,
            ...differences,
          });
        }

        // Retrieve existing and new variable values
        const existingVariableValue =
          variable && variableMode ? variable.valuesByMode[modeId] : null;
        const newVariableValue = variableValueFromToken(
          token,
          modeName,
          localVariablesByCollectionAndName
        );

        // Only include the variable mode value in the payload if it's different from the existing value
        if (
          existingVariableValue === null ||
          !compareVariableValues(existingVariableValue, newVariableValue)
        ) {
          postVariablesPayload.variableModeValues.push({
            variableId,
            modeId,
            value: newVariableValue,
          });
        }
      });
    });
  });

  return postVariablesPayload;
};

module.exports = {
  readTokenFiles,
  generatePostVariablesPayload,
};
