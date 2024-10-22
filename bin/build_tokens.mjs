#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import StyleDictionary from 'style-dictionary';
import lodash from 'lodash';
const { merge } = lodash;
import { TailwindTokenFormatter } from './lib/tailwind_token_formatter.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import { fileHeader, formattedVariables } from 'style-dictionary/utils';

/**
 * Design tokens
 * https://docs.gitlab.com/ee/development/fe_guide/design_tokens.html
 */
const PREFIX = 'gl';

/**
 * Utils
 */
const hasDefaultValue = (token) => {
  if (token.original.$value) {
    return token.original.$value.default;
  }
  if (token.original.value) {
    return token.original.value.default;
  }
  return false;
};

const hasDarkValue = (token) => {
  if (token.original.$value) {
    return token.original.$value.dark;
  }
  if (token.original.value) {
    return token.original.value.dark;
  }
  return false;
};

const hasDefaultAndDarkValues = (token) =>
  token.original && (token.original.$value || token.original.value) && 
  hasDefaultValue(token) && hasDarkValue(token);

/**
 * Transforms
 * https://amzn.github.io/style-dictionary/#/api?id=registertransform
 */
StyleDictionary.registerTransform({
  name: 'name/stripPrefix',
  type: 'name',
  filter: (token) => token.prefix === false, // Changed from matcher to filter
  transform: (token) => token.name.slice(PREFIX.length + 1),
});

StyleDictionary.registerTransform({
  name: 'value/default',
  type: 'value',
  transitive: true,
  filter: (token) => hasDefaultAndDarkValues(token),
  transform: (token) => {
    // Handle both old and new format
    if (token.original.$value) {
      return token.original.$value.default;
    }
    return token.original.value.default;
  },
});

StyleDictionary.registerTransform({
  name: 'value/dark',
  type: 'value',
  transitive: true,
  filter: (token) => hasDefaultAndDarkValues(token),
  transform: (token) => {
    // Handle both old and new format
    if (token.original.$value) {
      return token.original.$value.dark;
    }
    return token.original.value.dark;
  },
});

/**
 * Transform Groups
 * https://amzn.github.io/style-dictionary/#/api?id=registertransformgroup
 * - Now under hooks.transformGroups
 */
StyleDictionary.registerTransformGroup({
  name: 'css/default',
  transforms: [
    'value/default',
    'name/kebab', // Changed from name/cti/kebab
    'size/rem',   // Changed from size/pxToRem
    'name/stripPrefix'
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'js/default',
  transforms: [
    'value/default',
    'name/constant', // Changed from name/cti/constant
    'size/rem',      // Changed from size/pxToRem
    'name/stripPrefix'
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'css/dark',
  transforms: [
    'value/dark',
    'name/kebab', // Changed from name/cti/kebab
    'size/rem',   // Changed from size/pxToRem
    'name/stripPrefix'
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'js/dark',
  transforms: [
    'value/dark',
    'name/constant', // Changed from name/cti/constant
    'size/rem',      // Changed from size/pxToRem
    'name/stripPrefix'
  ],
});

/**
 * File header
 * https://amzn.github.io/style-dictionary/#/api?id=registerfileheader
 */
StyleDictionary.registerFileHeader({
  name: 'withoutTimestamp',
  fileHeader: async () => {
    return ['Automatically generated', 'Do not edit directly'];
  }
});

/**
 * Formats
 * https://amzn.github.io/style-dictionary/#/api?id=registerformat
 * Now using async format function
 */
StyleDictionary.registerFormat({
  name: 'scss/customProperties',
  format: async ({ dictionary, file, options }) => {
    const output = dictionary.allTokens.map(token => 
      `$${token.name}: var(--${token.name});`
    ).join('\n');
    return `${await fileHeader({ file, options })}${output}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'tailwind',
  format: async ({ dictionary, file, options }) => {
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

    const header = await fileHeader({ file, options });

    return `${header}
    const baseColors = ${JSON.stringify(baseColors, null, 2)};
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
    }`;
  },
});

/**
 * Replaces `$value` with `value` and `$description` with `comment` to make a
 * W3C community group Design Tokens Format Module standard file compatible
 * with style dictionary
 * @pattern supported file extensions `.json`
 */
StyleDictionary.registerParser({
  name: 'custom/json',
  pattern: /\.json$|\.tokens\.json$|\.tokens$/,
  parser: ({ contents, filePath }) => {
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
  do: async (dictionary, config) => {
    for (const file of config.files) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const filePath = `${config.buildPath}${file.destination}`;
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const options = await prettier.resolveConfig(path.join(__dirname, '../.prettierrc'));
      const formattedOutput = await prettier.format(fileContent, { 
        ...options, 
        parser: 'babel' 
      });
      fs.writeFileSync(filePath, formattedOutput);
    }
  },
  undo: () => {
    // Clean-up function if needed
  },
});

/**
 * Creates style-dictionary config
 * https://amzn.github.io/style-dictionary/#/config
 *
 * @param {String} buildPath for destination directory
 * @returns {Object} style-dictionary config
 */
const getStyleDictionaryConfigDefault = (buildPath = 'dist/tokens') => ({
  source: ['src/tokens/**/*.tokens.json'],
  platforms: {
    css: {
      prefix: PREFIX,
      buildPath: `${buildPath}/css/`,
      transformGroup: 'css/default',
      options: {
        outputReferences: true,
        formatting: {
          fileHeaderTimestamp: false
        }
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
        formatting: {
          fileHeaderTimestamp: false
        }
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
        formatting: {
          fileHeaderTimestamp: false
        }
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
        formatting: {
          fileHeaderTimestamp: false
        }
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
        formatting: {
          fileHeaderTimestamp: false
        }
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
});

/**
 * Creates style-dictionary config
 * https://amzn.github.io/style-dictionary/#/config
 *
 * @returns {Object} style-dictionary config
 */
const getStyleDictionaryConfigDarkMode = (buildPath = 'dist/tokens') => 
  merge(getStyleDictionaryConfigDefault(buildPath), {
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

/**
 * Build tokens from config
 */
const buildConfigs = async () => {
  // Default configs
  const sd = new StyleDictionary(getStyleDictionaryConfigDefault());
  await sd.hasInitialized;
  await sd.buildAllPlatforms();

  const sdSource = new StyleDictionary(getStyleDictionaryConfigDefault('src/tokens/build'));
  await sdSource.hasInitialized;
  await sdSource.buildAllPlatforms();

  // Dark mode configs
  const darkConfig = new StyleDictionary(getStyleDictionaryConfigDarkMode());
  await darkConfig.hasInitialized;
  await darkConfig.buildAllPlatforms();

  const darkConfigSource = new StyleDictionary(getStyleDictionaryConfigDarkMode('src/tokens/build'));
  await darkConfigSource.hasInitialized;
  await darkConfigSource.buildAllPlatforms();
};

buildConfigs().catch(console.error);