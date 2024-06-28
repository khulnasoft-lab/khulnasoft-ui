#!/usr/bin/env node

const fs = require('fs');
const prettier = require('prettier');
const StyleDictionary = require('style-dictionary');
const merge = require('lodash/merge');
const { TailwindTokenFormatter } = require('./lib/tailwind_token_formatter');

const { fileHeader } = StyleDictionary.formatHelpers;

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
  name: 'name/stripPrefix',
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
  transitive: true,
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
  transitive: true,
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
  transforms: ['value/default', 'name/cti/kebab', 'size/pxToRem', 'name/stripPrefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'js/default',
  transforms: ['value/default', 'name/cti/constant', 'size/pxToRem', 'name/stripPrefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'css/dark',
  transforms: ['value/dark', 'name/cti/kebab', 'size/pxToRem', 'name/stripPrefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'js/dark',
  transforms: ['value/dark', 'name/cti/constant', 'size/pxToRem', 'name/stripPrefix'],
});

/**
 * File header
 * https://amzn.github.io/style-dictionary/#/api?id=registerfileheader
 */
StyleDictionary.registerFileHeader({
  name: 'withoutTimestamp',
  fileHeader() {
    return ['Automatically generated', 'Do not edit directly'];
  },
});

/**
 * Formats
 * https://amzn.github.io/style-dictionary/#/api?id=registerformat
 */
StyleDictionary.registerFormat({
  name: 'scss/customProperties',
  formatter({ dictionary, file }) {
    let output = [];
    dictionary.allTokens.forEach((token) => {
      output = output.concat(`$${token.name}: var(--${token.name});`);
    });
    return `${fileHeader({ file })}${output.join('\n')}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'tailwind',
  formatter: ({ dictionary, file }) => {
    const f = new TailwindTokenFormatter(dictionary.tokens);
    const COMPILED_TOKENS = dictionary.tokens;

    /**
     * Returns key/value pairs of token scales and CSS custom properties
     * @param {object} tokens
     * @returns {object} { example: 'var(--gl-token-example, #000)' }
     */
    const getScalesAndCSSCustomProperties = (tokens = {}) => {
      return Object.entries(tokens).reduce((acc, [scale, token]) => {
        acc[scale] = f.cssCustomPropertyWithValue(token);
        return acc;
      }, {});
    };

    const baseColors = ['blue', 'gray', 'green', 'orange', 'purple', 'red'].reduce((acc, color) => {
      Object.entries(COMPILED_TOKENS[color]).forEach(([, token]) => {
        acc[token.path.join('-')] = f.cssCustomPropertyWithValue(token);
      });
      return acc;
    }, {});

    const themeColors = Object.entries(COMPILED_TOKENS.theme).reduce((acc, [, scales]) => {
      Object.entries(scales).forEach(([, token]) => {
        acc[token.path.join('-')] = f.cssCustomPropertyWithValue(token);
      });
      return acc;
    }, {});

    const dataVizColors = Object.entries(COMPILED_TOKENS['data-viz']).reduce((acc, [, scales]) => {
      Object.entries(scales).forEach(([, token]) => {
        acc[token.path.join('-')] = f.cssCustomPropertyWithValue(token);
      });
      return acc;
    }, {});

    const textColors = getScalesAndCSSCustomProperties(COMPILED_TOKENS.text.color);
    const backgroundColors = getScalesAndCSSCustomProperties(COMPILED_TOKENS.background.color);
    const iconColors = getScalesAndCSSCustomProperties(COMPILED_TOKENS.icon.color);
    const alphaDarkColors = getScalesAndCSSCustomProperties(COMPILED_TOKENS.color.alpha.dark);
    const alphaLightColors = getScalesAndCSSCustomProperties(COMPILED_TOKENS.color.alpha.light);
    const borderColors = getScalesAndCSSCustomProperties(COMPILED_TOKENS.border.color);

    return `${fileHeader({ file })}
    const baseColors = ${JSON.stringify(baseColors)};
    const themeColors = ${JSON.stringify(themeColors)};
    const dataVizColors = ${JSON.stringify(dataVizColors)};
    const textColors = ${JSON.stringify(textColors)};
    const backgroundColors = ${JSON.stringify(backgroundColors)};
    const borderColors = ${JSON.stringify(borderColors)};
    const iconColors = ${JSON.stringify(iconColors)};
    const alphaDarkColors = ${JSON.stringify(alphaDarkColors)};
    const alphaLightColors = ${JSON.stringify(alphaLightColors)};

    const colors = {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      white: '${f.cssCustomPropertyWithValue(COMPILED_TOKENS.white)}',
      black: '${f.cssCustomPropertyWithValue(COMPILED_TOKENS.black)}',
      alpha: {
        dark: {...alphaDarkColors},
        light: {...alphaLightColors},
      },
      ...baseColors,
      ...themeColors,
      ...dataVizColors,
      };

    const backgroundColor = {
      ...colors,
      ...backgroundColors,
    };

    const borderColor  = {
      ...colors,
      ...borderColors,
    };

    const fill = {
      ...colors,
      icon: {
        ...iconColors,
      },
    };

    const textColor = {
      ...colors,
      ...textColors,
      primary: '${f.cssCustomPropertyWithValue(COMPILED_TOKENS.text.primary)}',
      secondary: '${f.cssCustomPropertyWithValue(COMPILED_TOKENS.text.secondary)}',
      tertiary: '${f.cssCustomPropertyWithValue(COMPILED_TOKENS.text.tertiary)}',
    };

    module.exports = {
      colors,
      backgroundColor,
      borderColor,
      textColor,
      fill,
    }
    `;
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
    config.files.forEach(async (file) => {
      const filePath = `${config.buildPath}${file.destination}`;
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const formattedContent = await prettier.format(fileContent, {
        singleQuote: true,
        parser: 'babel',
      });
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
      tailwind: {
        buildPath: `${buildPath}/tailwind/`,
        transformGroup: 'js/default',
        actions: ['prettier'],
        options: {
          fileHeader: 'withoutTimestamp',
        },
        files: [
          {
            destination: 'tokens.cjs',
            format: 'tailwind',
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
          {
            destination: '_tokens_custom_properties.scss',
            format: 'scss/customProperties',
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
  return merge(getStyleDictionaryConfigDefault(buildPath), {
    platforms: {
      css: {
        transformGroup: 'css/dark',
        files: [
          {
            destination: 'tokens.dark.css',
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
          },
        ],
      },
      json: {
        transformGroup: 'js/dark',
        files: [
          {
            destination: 'tokens.dark.json',
          },
        ],
      },
      scss: {
        transformGroup: 'css/dark',
        files: [
          {
            destination: '_tokens.dark.scss',
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
