#!/usr/bin/env node

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';
import { globSync } from 'glob';
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
const statusVariants = ['neutral', 'info', 'success', 'warning', 'danger', 'brand'];
const feedbackVariants = ['strong', 'neutral', 'info', 'success', 'warning', 'danger'];
const brandVariants = [
  'brand-white',
  'brand-charcoal',
  'brand-orange',
  'brand-purple',
  'brand-gray',
  'brand-pink',
];
const baseColorVariants = ['blue', 'gray', 'green', 'orange', 'purple', 'red'];

const ROOT = join(import.meta.dirname, '..');
const BUILD_PATH = join(ROOT, 'src', 'tokens', 'build');
const DIST_PATH = join(ROOT, 'dist', 'tokens');

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
  transforms: ['value/default', 'name/kebab', 'name/stripPrefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'js/default',
  transforms: ['value/default', 'name/constant', 'name/stripPrefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'css/dark',
  transforms: ['value/dark', 'name/kebab', 'name/stripPrefix'],
});

StyleDictionary.registerTransformGroup({
  name: 'js/dark',
  transforms: ['value/dark', 'name/constant', 'name/stripPrefix'],
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
  name: 'javascript/custom-no-description',
  async format({ dictionary, file }) {
    let output = [];
    dictionary.allTokens.forEach((token) => {
      output = output.concat(`export const ${token.name} = "${token.$value}";`);
    });
    return `${await fileHeader({ file })}${output.join('\n')}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'docs',
  async format({ dictionary }) {
    const f = new TailwindTokenFormatter(dictionary.tokens);
    const COMPILED_TOKENS = dictionary.tokens;

    const formatToken = (token) => {
      return {
        ...token,
        cssWithValue: f.cssCustomPropertyWithValue(token),
      };
    };

    const formatTokens = (tokens = {}) => {
      return Object.entries(tokens).reduce((acc, [key, value]) => {
        if (tokens[key].$value) {
          acc[key] = formatToken(value);
        } else {
          acc[key] = formatTokens(value);
        }
        return acc;
      }, {});
    };

    const generateTokenObject = (parent, variants = [], property) =>
      Object.fromEntries(
        variants.map((variant) => [
          `${variant}`,
          formatToken(COMPILED_TOKENS[parent][variant][property].color),
        ])
      );

    const baseColors = baseColorVariants.reduce((acc, color) => {
      acc[color] = COMPILED_TOKENS[color];
      return acc;
    }, {});

    const brandColors = {
      ...brandVariants.reduce((acc, brand) => {
        acc[brand] = COMPILED_TOKENS.color[brand];
        return acc;
      }, {}),
    };

    const colorTokens = {
      alpha: {
        light: formatTokens(COMPILED_TOKENS.color.alpha.light),
        dark: formatTokens(COMPILED_TOKENS.color.alpha.dark),
      },
      ...formatTokens(baseColors),
      ...formatTokens(brandColors),
      theme: formatTokens(COMPILED_TOKENS.theme),
      'data-viz': formatTokens(COMPILED_TOKENS['data-viz']),
      neutral: formatTokens(COMPILED_TOKENS.color.neutral),
      white: formatToken(COMPILED_TOKENS.white),
      black: formatToken(COMPILED_TOKENS.black),
    };

    const backgroundColors = {
      ...colorTokens,
      color: formatTokens(COMPILED_TOKENS.background.color),
      status: generateTokenObject('status', statusVariants, 'background'),
      feedback: generateTokenObject('feedback', feedbackVariants, 'background'),
      dropdown: formatToken(COMPILED_TOKENS.dropdown.background.color),
    };

    const borderColors = {
      ...colorTokens,
      color: formatTokens(COMPILED_TOKENS.border.color),
      dropdown: formatToken(COMPILED_TOKENS.dropdown.border.color),
      'dropdown-divider': formatToken(COMPILED_TOKENS.dropdown.divider.color),
    };
    const fillColors = {
      ...colorTokens,
      icon: formatTokens(COMPILED_TOKENS.icon.color, 'fill-icon'),
      status: generateTokenObject('status', statusVariants, 'icon'),
      feedback: generateTokenObject('feedback', feedbackVariants, 'icon'),
    };

    const textColors = {
      ...colorTokens,
      color: formatTokens(COMPILED_TOKENS.text.color),
      status: generateTokenObject('status', statusVariants, 'text'),
      feedback: generateTokenObject('feedback', feedbackVariants, 'text'),
      primary: formatToken(COMPILED_TOKENS.text.primary),
      secondary: formatToken(COMPILED_TOKENS.text.secondary),
      tertiary: formatToken(COMPILED_TOKENS.text.tertiary),
    };

    const outlineColor = {
      focus: formatToken(COMPILED_TOKENS['focus-ring'].outer.color),
    };

    const tokens = {
      background: backgroundColors,
      border: borderColors,
      fill: fillColors,
      text: textColors,
      outline: outlineColor,
      colors: colorTokens,
    };

    // Format as JSON
    return `${JSON.stringify(tokens, null, 2)}`;
  },
});

const tailwindFormat = async ({ dictionary, file }) => {
  const COMPILED_TOKENS = dictionary.tokens;
  const COLOR_TOKENS = COMPILED_TOKENS.colors;

  /**
   * Returns key/value pairs of token scales and CSS custom properties
   * @param {object} tokens
   * @returns {object} { example: 'var(--gl-token-example, #000)' }
   */
  const getScalesAndCSSCustomProperties = (tokens = {}) => {
    return Object.entries(tokens).reduce((acc, [scale, token]) => {
      acc[scale] = token.cssWithValue;
      return acc;
    }, {});
  };

  const generateBaseColors = (colorTokens) => {
    return Object.entries(colorTokens).reduce((acc, [, scales]) => {
      Object.entries(scales).forEach(([, token]) => {
        if (token.path) {
          acc[token.path.join('-')] = token.cssWithValue;
        }
      });
      return acc;
    }, {});
  };

  const baseColorsTokens = baseColorVariants.reduce((acc, color) => {
    acc[color] = COLOR_TOKENS[color];
    return acc;
  }, {});

  const baseColors = generateBaseColors(baseColorsTokens);
  const themeColors = generateBaseColors(COLOR_TOKENS.theme);
  const dataVizColors = generateBaseColors(COLOR_TOKENS['data-viz']);

  const neutralColors = Object.entries(COLOR_TOKENS.neutral).reduce((acc, [, token]) => {
    if (token.path) {
      const colorName = token.path.filter((segment) => segment !== 'color').join('-');
      acc[colorName] = token.cssWithValue;
    }
    return acc;
  }, {});

  const textColors = getScalesAndCSSCustomProperties(COMPILED_TOKENS.text.color);
  const backgroundColors = getScalesAndCSSCustomProperties(COMPILED_TOKENS.background.color);
  const iconColors = getScalesAndCSSCustomProperties(COMPILED_TOKENS.fill.icon);
  const alphaDarkColors = getScalesAndCSSCustomProperties(COLOR_TOKENS.alpha.dark);
  const alphaLightColors = getScalesAndCSSCustomProperties(COLOR_TOKENS.alpha.light);
  const borderColors = getScalesAndCSSCustomProperties(COMPILED_TOKENS.border.color);
  const brandColors = {
    'brand-white': COLOR_TOKENS['brand-white'].cssWithValue,
    'brand-charcoal': COLOR_TOKENS['brand-charcoal'].cssWithValue,
    'brand-orange': getScalesAndCSSCustomProperties(COLOR_TOKENS['brand-orange']),
    'brand-purple': getScalesAndCSSCustomProperties(COLOR_TOKENS['brand-purple']),
    'brand-gray': getScalesAndCSSCustomProperties(COLOR_TOKENS['brand-gray']),
    'brand-pink': getScalesAndCSSCustomProperties(COLOR_TOKENS['brand-pink']),
  };

  const generateColorObject = (parent, variants = [], property) =>
    Object.fromEntries(
      variants.map((variant) => [
        `${parent}-${variant}`,
        COMPILED_TOKENS[property][parent][variant].cssWithValue,
      ])
    );

  const statusBackgroundColors = generateColorObject('status', statusVariants, 'background');
  const statusTextColors = generateColorObject('status', statusVariants, 'text');
  const statusIconColors = generateColorObject('status', statusVariants, 'fill');

  const feedbackBackgroundColors = generateColorObject('feedback', feedbackVariants, 'background');
  const feedbackTextColors = generateColorObject('feedback', feedbackVariants, 'text');
  const feedbackIconColors = generateColorObject('feedback', feedbackVariants, 'fill');

  return `${await fileHeader({ file })}
  const baseColors = ${JSON.stringify(baseColors)};
  const themeColors = ${JSON.stringify(themeColors)};
  const dataVizColors = ${JSON.stringify(dataVizColors)};
  const neutralColors = ${JSON.stringify(neutralColors)};
  const textColors = ${JSON.stringify(textColors)};
  const backgroundColors = ${JSON.stringify(backgroundColors)};
  const borderColors = ${JSON.stringify(borderColors)};
  const iconColors = ${JSON.stringify(iconColors)};
  const alphaDarkColors = ${JSON.stringify(alphaDarkColors)};
  const alphaLightColors = ${JSON.stringify(alphaLightColors)};
  const brandColors = ${JSON.stringify(brandColors)};
  const statusBackgroundColors = ${JSON.stringify(statusBackgroundColors)};
  const statusTextColors = ${JSON.stringify(statusTextColors)};
  const statusIconColors = ${JSON.stringify(statusIconColors)};
  const feedbackBackgroundColors = ${JSON.stringify(feedbackBackgroundColors)};
  const feedbackTextColors = ${JSON.stringify(feedbackTextColors)};
  const feedbackIconColors = ${JSON.stringify(feedbackIconColors)};

  const colors = {
    inherit: 'inherit',
    current: 'currentColor',
    transparent: 'transparent',
    white: '${COLOR_TOKENS.white.cssWithValue}',
    black: '${COLOR_TOKENS.black.cssWithValue}',
    alpha: {
      dark: {...alphaDarkColors},
      light: {...alphaLightColors},
    },
    ...baseColors,
    ...themeColors,
    ...dataVizColors,
    ...neutralColors,
    ...brandColors,
  };

  const backgroundColor = {
    ...colors,
    ...backgroundColors,
    ...statusBackgroundColors,
    ...feedbackBackgroundColors,
    dropdown: '${COMPILED_TOKENS.background.dropdown.cssWithValue}',
  };

  const borderColor  = {
    ...colors,
    ...borderColors,
    dropdown: '${COMPILED_TOKENS.border.dropdown.cssWithValue}',
    'dropdown-divider': '${COMPILED_TOKENS.border['dropdown-divider'].cssWithValue}',
  };

  const outlineColor = {
    focus: '${COMPILED_TOKENS.outline.focus.cssWithValue}',
  };

  const fill = {
    ...colors,
    ...statusIconColors,
    ...feedbackIconColors,
    icon: {
      ...iconColors,
    },
  };

  const textColor = {
    ...colors,
    ...textColors,
    ...statusTextColors,
    ...feedbackTextColors,
    primary: '${COMPILED_TOKENS.text.primary.cssWithValue}',
    secondary: '${COMPILED_TOKENS.text.secondary.cssWithValue}',
    tertiary: '${COMPILED_TOKENS.text.tertiary.cssWithValue}',
  };

  module.exports = {
    colors,
    backgroundColor,
    borderColor,
    outlineColor,
    textColor,
    fill,
  }
  `;
};

// Prevents a warning about collision when building tokens
tailwindFormat.nested = true;

StyleDictionary.registerFormat({
  name: 'tailwind',
  format: tailwindFormat,
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
const getStyleDictionaryConfigDefault = (buildPath) => {
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
            format: 'javascript/custom-no-description',
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
      docs: {
        buildPath: `${buildPath}/docs/`,
        transformGroup: 'js/default',
        files: [
          {
            destination: 'tokens-tailwind-docs.json',
            format: 'docs',
          },
        ],
      },
    },
  };
};

const getStyleDictionaryConfigTailwind = (buildPath = 'dist/tokens') => {
  return {
    source: [`${buildPath}/docs/tokens-tailwind-docs.json`],
    platforms: {
      tailwind: {
        buildPath: `${buildPath}/tailwind/`,
        actions: ['prettier'],
        files: [
          {
            destination: 'tokens.cjs',
            format: 'tailwind',
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
const getStyleDictionaryConfigDarkMode = (buildPath) => {
  return merge(getStyleDictionaryConfigDefault(buildPath), {
    platforms: {
      css: {
        transformGroup: 'css/dark',
        files: [
          {
            destination: 'tokens.dark.css',
            options: {
              selector: ':root.gl-dark, .gl-dark-scope',
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
      docs: {
        transformGroup: 'js/dark',
        files: [
          {
            destination: 'tokens-tailwind-docs.dark.json',
          },
        ],
      },
    },
  });
};

/**
 * Add extension(s) to the tokens
 * See https://tr.designtokens.org/format/#extensions
 */
function addExtension(tokens, extension, extensionValue = true) {
  Object.values(tokens).forEach((value) => {
    value.$extensions ||= {};
    value.$extensions[extension] = extensionValue;
  });

  return tokens;
}

/**
 * Load and concatenate token files from the tokens directory,
 * categorized into four groups by subdirectory.
 *
 * @param {string} outputDir Directory where to write the output files (will be created if it does not exist)
 */
async function buildFigmaTokens(buildPath) {
  const combineTokenFiles = (category) => {
    const files = globSync(`./src/tokens/${category}/**/*.tokens.json`)
      // Naive attempt to keep JSON output stable across builds. A more robust
      // solution would be to use safe-stable-stringify or similar when writing
      // the files.
      .sort();

    return files.reduce((acc, file) => {
      const fileTokens = JSON.parse(fs.readFileSync(file, 'utf-8'));
      return merge(acc, fileTokens);
    }, {});
  };

  const tokenCategories = [
    {
      name: 'semantic.tokens.json',
      tokens: combineTokenFiles('semantic'),
    },
    {
      name: 'constants.tokens.json',
      tokens: combineTokenFiles('constant'),
    },
    {
      name: 'contextual.tokens.json',
      tokens: addExtension(combineTokenFiles('contextual'), 'com.gitlab.locked'),
    },
    {
      name: 'deprecated.tokens.json',
      tokens: addExtension(combineTokenFiles('deprecated'), 'com.gitlab.deprecated'),
    },
  ];

  const outputDir = join(buildPath, 'figma');
  fs.mkdirSync(outputDir, { recursive: true });

  for (const { name, tokens } of tokenCategories) {
    fs.writeFileSync(join(outputDir, name), JSON.stringify(tokens, null, 2));
  }

  console.log('✔︎ Figma tokens built successfully');
}

/**
 * Build tokens from config
 */
async function main() {
  try {
    // Clean build directories first to prevent loose files.
    await Promise.all(
      [BUILD_PATH, DIST_PATH].map((path) => fs.promises.rm(path, { recursive: true, force: true }))
    );

    // Build tokens using StyleDictionary
    const defaultMode = new StyleDictionary(getStyleDictionaryConfigDefault(BUILD_PATH));
    await defaultMode.buildAllPlatforms();

    const darkMode = new StyleDictionary(getStyleDictionaryConfigDarkMode(BUILD_PATH));
    await darkMode.buildAllPlatforms();

    const tailwindDictionary = new StyleDictionary(getStyleDictionaryConfigTailwind(BUILD_PATH));
    await tailwindDictionary.buildAllPlatforms();

    // Build tokens for Figma
    await buildFigmaTokens(BUILD_PATH);

    // Finally, copy to DIST_PATH.
    await fs.promises.cp(BUILD_PATH, DIST_PATH, { recursive: true });
    console.log(`✔︎ Copied built tokens to ${relative(ROOT, DIST_PATH)}`);
  } catch (error) {
    console.error('🚨 Error building tokens:', error);
    process.exit(1);
  }
}

main();
