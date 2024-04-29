/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { colorApproximatelyEqual, parseColor } = require('./color_utils');

const areSetsEqual = (a, b) => {
  return a.size === b.size && [...a].every((item) => b.has(item));
};

const variableResolvedTypeFromToken = (type) => {
  switch (type) {
    case 'color':
      return 'COLOR';
    case 'dimension':
    case 'number':
      return 'FLOAT';
    case 'string':
      return 'STRING';
    case 'boolean':
      return 'BOOLEAN';
    default:
      throw new Error(`Invalid token $type: ${type}`);
  }
};

const isAlias = (value) => {
  return value.toString().trim().charAt(0) === '{';
};

const variableValueFromToken = (token, localVariablesByCollectionAndName) => {
  if (typeof token.$value === 'string' && isAlias(token.$value)) {
    // Assume aliases are in the format {group.subgroup.token} with any number of optional groups/subgroups
    // The Figma syntax for variable names is: group/subgroup/token
    const value = token.$value.trim().replace(/\./g, '/').replace(/[{}]/g, '');

    // When mapping aliases to existing local variables, we assume that variable names
    // are unique *across all collections* in the Figma file
    for (const localVariablesByName of Object.values(localVariablesByCollectionAndName)) {
      if (localVariablesByName[value]) {
        return {
          type: 'VARIABLE_ALIAS',
          id: localVariablesByName[value].id,
        };
      }
    }

    // If we don't find a local variable matching the alias, we assume it's a variable
    // that we're going to create elsewhere in the payload.
    // If the file has an invalid alias, we rely on the Figma API to return a 400 error
    return {
      type: 'VARIABLE_ALIAS',
      id: value,
    };
  }
  if (typeof token.$value === 'string' && token.$type === 'color') {
    return parseColor(token.$value);
  }
  return token.$value;
};

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

const isCodeSyntaxEqual = (a, b) => {
  return (
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every((key) => a[key] === b[key])
  );
};

const traverseCollection = ({ key, object, tokens }) => {
  // if key is a meta field, move on
  if (key.charAt(0) === '$') {
    return;
  }

  if (object.$value !== undefined) {
    tokens[key] = { name: key, ...object };
  } else {
    Object.entries(object).forEach(([key2, object2]) => {
      if (key2.charAt(0) !== '$' && typeof object2 === 'object') {
        traverseCollection({
          key: `${key}/${key2}`,
          object: { name: `${key}/${key2}`, ...object2 },
          tokens,
        });
      }
    });
  }
};

const flattenTokensFile = (tokensFile) => {
  const flattenedTokens = [];

  Object.entries(tokensFile).forEach(([tokenGroup, groupValues]) => {
    traverseCollection({ key: tokenGroup, object: groupValues, tokens: flattenedTokens });
  });

  return Object.values(flattenedTokens);
};

/**
 * Get writable token properties that are different from the variable.
 * If the variable does not exist, all writable properties are returned.
 *
 * This function is being used to decide what properties to include in the
 * POST variables call to update variables in Figma. If a token does not have
 * a particular property, we do not include it in the differences object to avoid
 * touching that property in Figma.
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

function getModeFromFileName(fileName) {
  const fileNameParts = fileName.split('.');
  if (fileNameParts.length < 3) {
    throw new Error(
      `Invalid tokens file name: ${fileName}. File names must be in the format: ...{modeName}.tokens.json`
    );
  }
  return fileNameParts.includes('dark') ? 'dark' : 'default';
}

const readJsonFiles = (files) => {
  const tokensJsonByFile = {};

  files.forEach((file) => {
    const baseFileName = path.basename(file);
    const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });

    if (!fileContent) throw new Error(`Invalid tokens file: ${file}. File is empty.`);

    const tokensFile = JSON.parse(fileContent);
    tokensJsonByFile[baseFileName] = flattenTokensFile(tokensFile);
  });

  return tokensJsonByFile;
};

const generatePostVariablesPayload = (tokensJsonByFile, localVariables) => {
  const localVariableCollectionsByName = {};
  const localVariablesByCollectionAndName = {};

  Object.values(localVariables.meta.variableCollections).forEach((collection) => {
    if (localVariableCollectionsByName[collection.name]) {
      throw new Error(`Duplicate variable collection in file: ${collection.name}`);
    }

    localVariableCollectionsByName[collection.name] = collection;
  });

  Object.values(localVariables.meta.variables).forEach((variable) => {
    if (!localVariablesByCollectionAndName[variable.variableCollectionId]) {
      localVariablesByCollectionAndName[variable.variableCollectionId] = {};
    }

    localVariablesByCollectionAndName[variable.variableCollectionId][variable.name] = variable;
  });

  console.log(
    'Local variable collections in Figma file:',
    Object.keys(localVariableCollectionsByName)
  );

  const postVariablesPayload = {
    variableCollections: [],
    variableModes: [],
    variables: [],
    variableModeValues: [],
  };

  const seenModes = new Set();

  Object.entries(tokensJsonByFile).forEach(([fileName, tokens]) => {
    const collectionName = 'BLAH';
    const modeName = getModeFromFileName(fileName);

    const variableCollection = localVariableCollectionsByName[collectionName];
    const variableCollectionId = variableCollection ? variableCollection.id : collectionName;

    const variableMode = variableCollection?.modes.find((mode) => mode.name === modeName);
    // Use the actual mode id or use the name as the temporary id
    const modeId = variableMode ? variableMode.modeId : modeName;

    if (
      !variableCollection &&
      !postVariablesPayload.variableCollections.find((c) => c.id === variableCollectionId)
    ) {
      postVariablesPayload.variableCollections.push({
        action: 'CREATE',
        id: variableCollectionId,
        name: variableCollectionId,
        initialModeId: modeId, // Use the initial mode as the first mode
      });

      // Rename the initial mode, since we're using it as our first mode in the collection
      postVariablesPayload.variableModes.push({
        action: 'UPDATE',
        id: modeId,
        name: modeId,
        variableCollectionId,
      });
    }

    // Add a new mode if it doesn't exist in the Figma file
    // and it's not the initial mode in the collection
    if (
      !seenModes.has(modeName) &&
      !variableMode &&
      !postVariablesPayload.variableCollections.find(
        (c) => c.id === variableCollectionId && 'initialModeId' in c && c.initialModeId === modeId
      )
    ) {
      postVariablesPayload.variableModes.push({
        action: 'CREATE',
        id: modeId,
        name: modeId,
        variableCollectionId,
      });
    }

    seenModes.add(modeName);

    const localVariablesByName = localVariablesByCollectionAndName[variableCollection?.id] || {};

    tokens.forEach((token) => {
      const variable = localVariablesByName[token.name];
      const variableId = variable ? variable.id : token.name;
      const variableInPayload = postVariablesPayload.variables.find(
        (v) => v.id === variableId && v.variableCollectionId === variableCollectionId
      );
      const differences = tokenAndVariableDifferences(token, variable);

      // Add a new variable if it doesn't exist in the Figma file,
      // and we haven't added it already in another mode
      if (!variable && !variableInPayload) {
        postVariablesPayload.variables.push({
          action: 'CREATE',
          id: variableId,
          name: token.name,
          variableCollectionId,
          resolvedType: variableResolvedTypeFromToken(token.$type),
          ...differences,
        });
      } else if (variable && Object.keys(differences).length > 0) {
        if (variable.remote) {
          throw new Error(`Cannot update remote variable "${variable.name}" in collection`);
        }

        postVariablesPayload.variables.push({
          action: 'UPDATE',
          id: variableId,
          ...differences,
        });
      }

      const existingVariableValue = variable && variableMode ? variable.valuesByMode[modeId] : null;
      const newVariableValue = variableValueFromToken(token, localVariablesByCollectionAndName);

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

  return postVariablesPayload;
};

module.exports = {
  readJsonFiles,
  generatePostVariablesPayload,
};
