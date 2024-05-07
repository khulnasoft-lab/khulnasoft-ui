#!/usr/bin/env node

const fs = require('fs');
const prettier = require('prettier');
const StyleDictionary = require('style-dictionary');
const merge = require('lodash/merge');

/**
 * Design tokens
 * https://docs.gitlab.com/ee/development/fe_guide/design_tokens.html
 */
const PREFIX = 'gl';

/**
 * Utils
 */
const hasDefaultValue = (token) => token.original.value.default;
const hasDarkValue = (token) => token.original.value.dark;
const hasDefaultAndDarkValues = (token) =>
  token.original.value && hasDefaultValue(token) && hasDarkValue(token);

/**
 * Transforms
 * https://amzn.github.io/style-dictionary/#/api?id=registertransform
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
    return token.name.slice(PREFIX.length + 1);
  },
});

StyleDictionary.registerTransform({
  name: 'value/default',
  type: 'value',
  matcher: (token) => {
    return hasDefaultAndDarkValues(token);
  },
  transformer: ({ value }) => {
    return value.default;
  },
});

StyleDictionary.registerTransform({
  name: 'value/dark',
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
 * https://amzn.github.io/style-dictionary/#/api?id=registertransformgroup
 */
StyleDictionary.registerTransformGroup({
  name: 'css/default',
  transforms: ['value/default', 'name/cti/kebab', 'size/pxToRem', 'name/prefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'js/default',
  transforms: ['value/default', 'name/cti/constant', 'size/pxToRem', 'name/prefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'css/dark',
  transforms: ['value/dark', 'name/cti/kebab', 'size/pxToRem', 'name/prefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'js/dark',
  transforms: ['value/dark', 'name/cti/constant', 'size/pxToRem', 'name/prefix'],
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
 * Creates style-dictionary config
 * https://amzn.github.io/style-dictionary/#/config
 *
 * @param {String} buildPath for destination directory
 * @returns {Object} style-dictionary config
 */
const getStyleDictionaryConfigDefault = (buildPath = 'dist/tokens') => {
  return {
    include: ['src/tokens/**/*.tokens.json'],
    source: ['src/tokens/**/*.tokens.json'],
    platforms: {
      css: {
        prefix: PREFIX,
        buildPath: `${buildPath}/css/`,
        transformGroup: 'css/default',
        options: {
          outputReferences: true,
          fileHeader: 'withoutTimestamp',
        },
        files: [
          {
            destination: 'tokens.css',
            format: 'css/variables',
          },
        ],
      },
      js: {
        prefix: PREFIX,
        buildPath: `${buildPath}/js/`,
        transformGroup: 'js/default',
        actions: ['prettier'],
        options: {
          fileHeader: 'withoutTimestamp',
        },
        files: [
          {
            destination: 'tokens.js',
            format: 'javascript/es6',
          },
        ],
      },
      json: {
        buildPath: `${buildPath}/json/`,
        transformGroup: 'js/default',
        options: {
          fileHeader: 'withoutTimestamp',
        },
        files: [
          {
            destination: 'tokens.json',
            format: 'json',
          },
        ],
      },
      scss: {
        prefix: PREFIX,
        buildPath: `${buildPath}/scss/`,
        transformGroup: 'css/default',
        options: {
          outputReferences: true,
          fileHeader: 'withoutTimestamp',
        },
        files: [
          {
            destination: '_tokens.scss',
            format: 'scss/variables',
          },
        ],
      },
    },
  };
};

/**
 * Creates style-dictionary config
 * https://amzn.github.io/style-dictionary/#/config
 *
 * @returns {Object} style-dictionary config
 */
const getStyleDictionaryConfigDarkMode = (buildPath = 'dist/tokens') => {
  const filter = (token) => hasDefaultAndDarkValues(token);
  return merge(getStyleDictionaryConfigDefault(buildPath), {
    platforms: {
      css: {
        transformGroup: 'css/dark',
        files: [
          {
            destination: 'tokens.dark.css',
            filter,
            options: {
              selector: ':root.gl-dark',
            },
          },
        ],
      },
      js: {
        transformGroup: 'js/dark',
        files: [
          {
            destination: 'tokens.dark.js',
            filter,
          },
        ],
      },
      json: {
        transformGroup: 'js/dark',
        files: [
          {
            destination: 'tokens.dark.json',
            filter,
          },
        ],
      },
      scss: {
        transformGroup: 'css/dark',
        files: [
          {
            destination: '_tokens.dark.scss',
            filter,
          },
        ],
      },
    },
  });
};

/**
 * Build tokens from config
 */
StyleDictionary.extend(getStyleDictionaryConfigDefault()).buildAllPlatforms();
StyleDictionary.extend(getStyleDictionaryConfigDefault('src/tokens/build')).buildAllPlatforms();
StyleDictionary.extend(getStyleDictionaryConfigDarkMode()).buildAllPlatforms();
StyleDictionary.extend(getStyleDictionaryConfigDarkMode('src/tokens/build')).buildAllPlatforms();
