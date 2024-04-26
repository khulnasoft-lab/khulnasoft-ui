const path = require('path');
const StyleDictionary = require('style-dictionary');

const srcDir = path.join(__dirname, '..', 'src', 'tokens');
const distDir = path.join(__dirname, '..', 'dist', 'tokens');

const prefix = 'gl';

/**
 * Utils
 */
const hasDefaultValue = (token) => token.original.value.default;
const hasDarkValue = (token) => token.original.value.dark;
const hasDefaultAndDarkValues = (token) =>
  typeof token.original.value === 'object' && hasDefaultValue(token) && hasDarkValue(token);

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

StyleDictionary.registerTransform({
  name: 'value/defaultValue',
  type: 'value',
  matcher: (token) => {
    return hasDefaultAndDarkValues(token);
  },
  transformer: ({ value }) => {
    return value.default;
  },
});

StyleDictionary.registerTransform({
  name: 'value/darkValue',
  type: 'value',
  matcher: (token) => {
    return hasDefaultAndDarkValues(token);
  },
  transformer: ({ value }) => {
    return value.dark;
  },
});

/**
 * Transform Groups
 */
StyleDictionary.registerTransformGroup({
  name: 'css/default',
  transforms: ['value/defaultValue', 'name/cti/kebab', 'size/pxToRem', 'name/prefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'css/dark',
  transforms: ['value/darkValue', 'name/cti/kebab', 'size/pxToRem', 'name/prefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'js/default',
  transforms: ['value/defaultValue', 'name/cti/constant', 'size/pxToRem', 'name/prefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'js/dark',
  transforms: ['value/darkValue', 'name/cti/constant', 'size/pxToRem', 'name/prefix'],
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
 * Creates style-dictionary config by mode by matching token files in
 * tokens directory by filename e.g. `color.tokens.json` will
 * only generate tokens for dark mode.
 *
 * @param {String} mode for source and destination filenames
 * @param {Function} filter get only matching token files
 * @returns {Object} style-dictionary config
 */
const getStyleDictionaryConfig = () => {
  return {
    include: [`${srcDir}/**/*.tokens.json`],
    source: [`${srcDir}/**/*.tokens.json`],
    platforms: {
      css: {
        prefix,
        buildPath: `${distDir}/css/`,
        transformGroup: 'css/default',
        files: [
          {
            destination: 'tokens.css',
            format: 'css/variables',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      js: {
        prefix,
        buildPath: `${distDir}/js/`,
        transformGroup: 'js/default',
        files: [
          {
            destination: 'tokens.js',
            format: 'javascript/es6',
          },
        ],
      },
      json: {
        buildPath: `${distDir}/json/`,
        transformGroup: 'js/default',
        files: [
          {
            destination: 'tokens.json',
            format: 'json',
          },
        ],
      },
      scss: {
        prefix,
        buildPath: `${distDir}/scss/`,
        transformGroup: 'css/default',
        files: [
          {
            destination: '_tokens.scss',
            format: 'scss/variables',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  };
};

const getStyleDictionaryDarkConfig = () => {
  const darkModeFilter = (token) => hasDarkValue(token);
  return {
    include: [`${srcDir}/**/*.tokens.json`],
    source: [`${srcDir}/**/*.tokens.json`],
    platforms: {
      css: {
        prefix,
        buildPath: `${distDir}/css/`,
        transformGroup: 'css/dark',
        files: [
          {
            destination: 'tokens.dark.css',
            format: 'css/variables',
            filter: darkModeFilter,
            options: {
              outputReferences: true,
              selector: ':root.gl-dark',
            },
          },
        ],
      },
      js: {
        prefix,
        buildPath: `${distDir}/js/`,
        transformGroup: 'js/dark',
        files: [
          {
            destination: 'tokens.dark.js',
            format: 'javascript/es6',
            filter: darkModeFilter,
          },
        ],
      },
      json: {
        buildPath: `${distDir}/json/`,
        transformGroup: 'js/dark',
        files: [
          {
            destination: 'tokens.dark.json',
            format: 'json',
            filter: darkModeFilter,
          },
        ],
      },
      scss: {
        prefix,
        buildPath: `${distDir}/scss/`,
        transformGroup: 'css/dark',
        files: [
          {
            destination: '_tokens.dark.scss',
            format: 'scss/variables',
            filter: darkModeFilter,
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
StyleDictionary.extend(getStyleDictionaryConfig()).buildAllPlatforms();
StyleDictionary.extend(getStyleDictionaryDarkConfig()).buildAllPlatforms();
