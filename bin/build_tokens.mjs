#!/usr/bin/env node

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';
import StyleDictionary from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';
import merge from 'lodash/merge.js';
import { TailwindTokenFormatter } from './lib/tailwind_token_formatter.js';

/**
 * Design tokens
 * https://docs.gitlab.com/ee/development/fe_guide/design_tokens.html
 */
const PREFIX = 'gl';

/**
 * Utils
 */
const hasDefaultValue = (token) => token.original.$value.default;
const hasDarkValue = (token) => token.original.$value.dark;
const hasDefaultAndDarkValues = (token) =>
  token.original.$value && hasDefaultValue(token) && hasDarkValue(token);

/**
 * Transforms
 * https://styledictionary.com/reference/api/#registertransform
 */
StyleDictionary.registerTransform({
  name: 'name/stripPrefix',
  type: 'name',
  filter: (token) => {
    // Prefix is added by `name/*` transform.
    // If token has `prefix` explicitly set to `false` then we remove the prefix.
    return token.prefix === false;
  },
  transform: (token) => {
    return token.name.slice(PREFIX.length + 1);
  },
});

StyleDictionary.registerTransform({
  name: 'value/default',
  type: 'value',
  transitive: true,
  filter: (token) => {
    return hasDefaultAndDarkValues(token);
  },
  transform: (token) => {
    return token.$value.default;
  },
});

StyleDictionary.registerTransform({
  name: 'value/dark',
  type: 'value',
  transitive: true,
  filter: (token) => {
    return hasDefaultAndDarkValues(token);
  },
  transform: (token) => {
    return token.$value.dark;
  },
});

/**
 * Transform Groups
 * https://styledictionary.com/reference/api/#registertransformgroup
 */
StyleDictionary.registerTransformGroup({
  name: 'css/default',
  transforms: ['value/default', 'name/kebab', 'size/pxToRem', 'name/stripPrefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'js/default',
  transforms: ['value/default', 'name/constant', 'size/pxToRem', 'name/stripPrefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'css/dark',
  transforms: ['value/dark', 'name/kebab', 'size/pxToRem', 'name/stripPrefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'js/dark',
  transforms: ['value/dark', 'name/constant', 'size/pxToRem', 'name/stripPrefix'],
});

/**
 * Formats
 * https://styledictionary.com/reference/api/#registerformat
 */
StyleDictionary.registerFormat({
  name: 'scss/customProperties',
  async format({ dictionary, file }) {
    let output = [];
    dictionary.allTokens.forEach((token) => {
      output = output.concat(`$${token.name}: var(--${token.name});`);
    });
    return `${await fileHeader({ file })}${output.join('\n')}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'tailwind',
  async format({ dictionary, file }) {
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
    const brandColors = {
      'brand-white': f.cssCustomPropertyWithValue(COMPILED_TOKENS.color['brand-white']),
      'brand-charcoal': f.cssCustomPropertyWithValue(COMPILED_TOKENS.color['brand-charcoal']),
      'brand-orange': getScalesAndCSSCustomProperties(COMPILED_TOKENS.color['brand-orange']),
      'brand-purple': getScalesAndCSSCustomProperties(COMPILED_TOKENS.color['brand-purple']),
      'brand-gray': getScalesAndCSSCustomProperties(COMPILED_TOKENS.color['brand-gray']),
      'brand-pink': getScalesAndCSSCustomProperties(COMPILED_TOKENS.color['brand-pink']),
    };

    return `${await fileHeader({ file })}
    const baseColors = ${JSON.stringify(baseColors)};
    const themeColors = ${JSON.stringify(themeColors)};
    const dataVizColors = ${JSON.stringify(dataVizColors)};
    const textColors = ${JSON.stringify(textColors)};
    const backgroundColors = ${JSON.stringify(backgroundColors)};
    const borderColors = ${JSON.stringify(borderColors)};
    const iconColors = ${JSON.stringify(iconColors)};
    const alphaDarkColors = ${JSON.stringify(alphaDarkColors)};
    const alphaLightColors = ${JSON.stringify(alphaLightColors)};
    const brandColors = ${JSON.stringify(brandColors)};

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
      ...brandColors,
    };

    const backgroundColor = {
      ...colors,
      ...backgroundColors,
      dropdown: '${f.cssCustomPropertyWithValue(COMPILED_TOKENS.dropdown.background.color)}',
    };

    const borderColor  = {
      ...colors,
      ...borderColors,
      dropdown: '${f.cssCustomPropertyWithValue(COMPILED_TOKENS.dropdown.border.color)}',
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
 * Actions
 * https://styledictionary.com/reference/api/#registeraction
 */
StyleDictionary.registerAction({
  name: 'prettier',
  do(dictionary, config) {
    config.files.forEach(async (file) => {
      const filePath = `${config.buildPath}${file.destination}`;
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const options = await resolveConfig(
        fileURLToPath(new URL('../.prettierrc', import.meta.url))
      );
      const formattedOutput = await format(fileContent, { ...options, parser: 'babel' });
      fs.writeFileSync(filePath, formattedOutput);
    });
  },
  undo() {
    // ignore clean function
  },
});

/**
 * Creates style-dictionary config
 * https://styledictionary.com/reference/config/
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
 * https://styledictionary.com/reference/config/
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

const defaultMode = new StyleDictionary(getStyleDictionaryConfigDefault());
await defaultMode.buildAllPlatforms();

const darkMode = new StyleDictionary(getStyleDictionaryConfigDarkMode());
await darkMode.buildAllPlatforms();

const defaultModeSrcDirectory = new StyleDictionary(
  getStyleDictionaryConfigDefault('src/tokens/build')
);
await defaultModeSrcDirectory.buildAllPlatforms();

const darkModeSrcDirectory = new StyleDictionary(
  getStyleDictionaryConfigDarkMode('src/tokens/build')
);
await darkModeSrcDirectory.buildAllPlatforms();
