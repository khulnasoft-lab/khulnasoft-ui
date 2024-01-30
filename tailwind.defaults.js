const baseColorTokens = require('./src/tokens/color.tokens.json');
const themeColorTokens = require('./src/tokens/color.theme.tokens.json');

const baseColors = ['blue', 'gray', 'green', 'orange', 'purple', 'red'].reduce((acc, color) => {
  acc[color] = {};
  Object.entries(baseColorTokens[color]).forEach(([shade, { $value }]) => {
    acc[color][shade] = $value;
  });
  return acc;
}, {});

const themeColors = Object.entries(themeColorTokens.theme).reduce((acc, [color, shades]) => {
  const colorKey = `theme-${color}`;
  acc[colorKey] = {};
  Object.entries(shades).forEach(([shade, { $value }]) => {
    acc[colorKey][shade] = $value;
  });
  return acc;
}, {});

const gridSize = 0.5; // rem
const spacing = Object.fromEntries(
  Object.entries({
    0: 0,
    1: 0.25,
    2: 0.5,
    3: 1,
    4: 1.5,
    5: 2,
    6: 3,
    7: 4,
    8: 5,
    9: 6,
    10: 7,
    11: 8,
    '11-5': 9,
    12: 10,
    13: 12,
    15: 15,
    20: 20,
    26: 26,
    28: 28,
    30: 30,
    31: 31,
    34: 34,
    48: 48,
    62: 62,
    75: 75,
    80: 80,
    88: 88,
  }).map(([scale, factor]) => {
    return [scale, `${factor * gridSize}rem`];
  })
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'gl-',
  theme: {
    colors: {
      white: baseColorTokens.white.$value,
      black: baseColorTokens.black.$value,
      ...baseColors,
      ...themeColors,
    },
    spacing,
  },
};
