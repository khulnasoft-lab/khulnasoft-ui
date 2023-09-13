/* eslint-disable no-console */
const path = require('path');
const StyleDictionary = require('style-dictionary');

const srcDir = path.join(__dirname, '..', 'src', 'tokens');
const distDir = path.join(__dirname, '..', 'dist', 'tokens');

const prefix = 'gl';
const modes = ['dark'];

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
 * @param {String} mode for source and destination filenames
 * @param {Function} filter get only matching token files
 * @returns {Object} style-dictionary config
 */
const getStyleDictionaryConfig = (mode, filter) => {
  return {
    include: [`${srcDir}/**/!(*.${modes.join(`|*.`)}).tokens.json`],
    source: [`${srcDir}/**/*.${mode}.tokens.json`],
    platforms: {
      css: {
        prefix,
        buildPath: `${distDir}/css/`,
        transformGroup: 'css',
        files: [
          {
            destination: getDestination({ mode, extension: 'css' }),
            format: 'css/variables',
            filter,
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      js: {
        prefix,
        buildPath: `${distDir}/js/`,
        transformGroup: 'js',
        files: [
          {
            destination: getDestination({ mode, extension: 'js' }),
            format: 'javascript/es6',
            filter,
          },
        ],
      },
      json: {
        buildPath: `${distDir}/json/`,
        transformGroup: 'js',
        files: [
          {
            destination: getDestination({ mode }),
            format: 'json',
          },
          {
            destination: getDestination({ mode, extension: 'grouped.json' }),
            format: 'json/grouped',
          },
        ],
      },
      scss: {
        prefix,
        buildPath: `${distDir}/scss/`,
        transformGroup: 'css',
        files: [
          {
            destination: getDestination({ name: '_tokens', mode, extension: 'scss' }),
            format: 'scss/variables',
            filter,
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  };
};

// Build default tokens from config
console.log('👷 Building default tokens');
StyleDictionary.extend(getStyleDictionaryConfig()).buildAllPlatforms();

// Build tokens for each mode
modes.forEach((mode) => {
  console.log(`\n👷 Building ${mode} tokens`);
  const modeFilter = (token) => token.filePath.indexOf(mode) > -1;
  StyleDictionary.extend(getStyleDictionaryConfig(mode, modeFilter)).buildAllPlatforms();
});
