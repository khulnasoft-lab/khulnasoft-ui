const {
  colors,
  backgroundColor,
  fill,
  textColor,
} = require('./src/tokens/build/tailwind/tokens.cjs');

const gridSize = 0.5; // rem
const spacing = {
  0: '0',
  ...Object.fromEntries(
    Object.entries({
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
  ),
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'gl-',
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    colors,
    backgroundColor,
    fill,
    spacing,
    fontSize: {
      xs: '0.625rem',
      sm: '0.75rem',
      base: '0.875rem',
      lg: '1rem',
    },
    fontWeight: {
      100: 100,
      300: 300,
      normal: 400,
      semibold: 500,
      bold: 600,
    },
    textColor,
  },
};
