#!/usr/bin/env node

const fs = require('fs');
const prettier = require('prettier');
const StyleDictionary = require('style-dictionary');

const prefix = 'gl';
const modes = ['dark'];
const cssSelector = {
  dark: ':root.gl-dark',
};

/**
 * Transforms
 */
StyleDictionary.registerTransform({
  name: 'name/prefix',
  type: 'name',
  matcher: (token) => {
    // Prefix is added by `name/cti/*` transform.
    // If token has `prefix` explicitly set to `false` then we remove the prefix.
    return token.prefix === false;
  },
  transformer: (token) => {
    return token.name.slice(prefix.length + 1);
  },
});

/**
 * Transform Groups
 */
StyleDictionary.registerTransformGroup({
  name: 'css',
  transforms: ['name/cti/kebab', 'size/pxToRem', 'name/prefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'js',
  transforms: ['name/cti/constant', 'size/pxToRem', 'name/prefix'],
});

/**
 * File header
 */
StyleDictionary.registerFileHeader({
  name: 'withoutTimestamp',
  fileHeader() {
    return ['Automatically generated', 'Do not edit directly'];
  },
});

/**
 * Replaces `$value` with `value` and `$description` with `comment` to make a
 * W3C community group Design Tokens Format Module standard file compatible
 * with style dictionary
 * @pattern supported file extensions `.json`
 */
StyleDictionary.registerParser({
  pattern: /\.json$|\.tokens\.json$|\.tokens$/,
  parse: ({ contents }) => {
    const output = contents
      .replace(/["|']?\$value["|']?:/g, '"value":')
      .replace(/["|']?\$?description["|']?:/g, '"comment":');
    return JSON.parse(output);
  },
});

/**
 * Formats tokens by type and returns "name": "value" pairs
 * @param arguments [FormatterArguments](https://github.com/amzn/style-dictionary/blob/main/types/Format.d.ts)
 * @returns formatted json `string`
 */
StyleDictionary.registerFormat({
  name: 'json/grouped',
  formatter({ dictionary }) {
    const output = {};

    function traverseObject(token, parentKey = '') {
      const type = token.$type ? token.$type : parentKey;

      if (token.value) {
        const name = token.path.join('-');
        output[type] = {
          ...output[type],
          [name]: token.value,
        };
      } else {
        for (const key in token) {
          if (Object.hasOwn(token, key)) {
            traverseObject(token[key], key);
          }
        }
      }
    }

    for (const key in dictionary) {
      if (Object.hasOwn(dictionary, key)) {
        traverseObject(dictionary[key]);
      }
    }

    return JSON.stringify(output, null, '  ');
  },
});

/**
 * Actions
 * https://amzn.github.io/style-dictionary/#/actions
 */
StyleDictionary.registerAction({
  name: 'prettier',
  do(dictionary, config) {
    config.files.forEach((file) => {
      const filePath = `${config.buildPath}${file.destination}`;
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const formattedContent = prettier.format(fileContent, { singleQuote: true, parser: 'babel' });
      fs.writeFileSync(filePath, formattedContent);
    });
  },
  undo() {
    // ignore clean function
  },
});

/**
 * Creates destination filename from options
 *
 * @param {Object} [options]
 * @param {String} [options.name] name e.g. tokens
 * @param {String} [options.mode] mode e.g. dark
 * @param {String} [options.extension] file extension e.g. .scss
 * @returns {String} destination filename e.g. tokens.dark.scss
 */
const getDestination = ({ name = 'tokens', mode, extension = 'json' }) => {
  return [name, mode, extension].filter(Boolean).join('.');
};

/**
 * Creates style-dictionary config by mode by matching token files in
 * tokens directory by filename e.g. `color.tokens.json` will
 * only generate tokens for dark mode.
 *
 * @param {String} buildPath for destination directory
 * @param {String} mode for source and destination filenames
 * @param {Function} filter get only matching token files
 * @returns {Object} style-dictionary config
 */
const getStyleDictionaryConfig = (buildPath = 'dist/tokens', mode = '', filter) => {
  return {
    include: [`src/tokens/**/!(*.${modes.join(`|*.`)}).tokens.json`],
    source: [`src/tokens/**/*.${mode}.tokens.json`],
    platforms: {
      css: {
        prefix,
        buildPath: `${buildPath}/css/`,
        transformGroup: 'css',
        options: {
          outputReferences: true,
          selector: cssSelector[mode],
          fileHeader: 'withoutTimestamp',
        },
        files: [
          {
            destination: getDestination({ mode, extension: 'css' }),
            format: 'css/variables',
            filter,
          },
        ],
      },
      js: {
        prefix,
        buildPath: `${buildPath}/js/`,
        transformGroup: 'js',
        actions: ['prettier'],
        options: {
          fileHeader: 'withoutTimestamp',
        },
        files: [
          {
            destination: getDestination({ mode, extension: 'js' }),
            format: 'javascript/es6',
            filter,
          },
        ],
      },
      json: {
        buildPath: `${buildPath}/json/`,
        transformGroup: 'js',
        options: {
          fileHeader: 'withoutTimestamp',
        },
        files: [
          {
            destination: getDestination({ mode }),
            format: 'json',
          },
        ],
      },
      scss: {
        prefix,
        buildPath: `${buildPath}/scss/`,
        transformGroup: 'css',
        options: {
          outputReferences: true,
          fileHeader: 'withoutTimestamp',
        },
        files: [
          {
            destination: getDestination({ name: '_tokens', mode, extension: 'scss' }),
            format: 'scss/variables',
            filter,
          },
        ],
      },
    },
  };
};

// Build default tokens from config
StyleDictionary.extend(getStyleDictionaryConfig()).buildAllPlatforms();
StyleDictionary.extend(getStyleDictionaryConfig('src/tokens/build')).buildAllPlatforms();

// Build tokens for each mode
modes.forEach((mode) => {
  const filter = (token) => token.filePath.indexOf(mode) > -1;
  StyleDictionary.extend(getStyleDictionaryConfig('dist/tokens', mode, filter)).buildAllPlatforms();
  StyleDictionary.extend(
    getStyleDictionaryConfig('src/tokens/build', mode, filter)
  ).buildAllPlatforms();
});
