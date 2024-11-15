const { range, round } = require('lodash');
const plugin = require('tailwindcss/plugin');
const {
  colors,
  backgroundColor,
  borderColor,
  fill,
  textColor,
} = require('./src/tokens/build/tailwind/tokens.cjs');

const gridSize = 0.5; // rem
const spacing = {
  0: '0',
  px: '1px',
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

function addCustomDefinitions({ addComponents, addUtilities }) {
  addComponents({
    '.animate-skeleton-loader': {
      overflow: 'hidden',
      'max-width': '32rem',
      'background-size': '32rem 100%',
      'background-position': '-32rem 0',
      'background-color': 'var(--gl-skeleton-loader-background-color)',
      'background-image':
        'linear-gradient(to right, var(--gl-skeleton-loader-background-color) 0, var(--gl-skeleton-loader-shimmer-color) 23%, var(--gl-skeleton-loader-shimmer-color) 27%, var(--gl-skeleton-loader-background-color) 50%)',
      'background-repeat': 'no-repeat',
      '@media (prefers-reduced-motion: no-preference)': {
        animation: 'gl-keyframes-skeleton-loader 2.5s linear',
        'animation-delay': 'inherit',
        'animation-iteration-count': '3',
      },
      '@keyframes gl-keyframes-skeleton-loader': {
        '0%': {
          // absolute numbers are required to make the animation width-independent
          'background-position-x': '-32rem',
        },
        '100%': {
          'background-position-x': '32rem',
        },
      },
    },
    '.border': {
      'border-style': 'solid',
      'border-color': 'var(--gl-border-color-default)',
    },
    '.border-t': {
      'border-top-style': 'solid',
      'border-top-color': 'var(--gl-border-color-default)',
    },
    '.border-r': {
      'border-right-style': 'solid',
      'border-right-color': 'var(--gl-border-color-default)',
    },
    '.border-b': {
      'border-bottom-style': 'solid',
      'border-bottom-color': 'var(--gl-border-color-default)',
    },
    '.border-l': {
      'border-left-style': 'solid',
      'border-left-color': 'var(--gl-border-color-default)',
    },
    '.str-truncated': {
      display: 'inline-block',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'vertical-align': 'top',
      'white-space': 'nowrap',
      'max-width': '82%',
    },
    '.no-spin[type="number"]': {
      '&::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: '0',
      },
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: '0',
      },
      '-moz-appearance': 'textfield',
    },
    '.heading-6': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '0.8125rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-6-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '0.8125rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-5': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '0.875rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-5-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '0.875rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-4': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '1rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-4-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '1rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-3': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': 'clamp(1.125rem, 0.9027777778rem + 0.462962963vw, 1.25rem)',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-3-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '1.125rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-2': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': 'clamp(1.3125rem, 0.8680555556rem + 0.9259259259vw, 1.5625rem)',
      'letter-spacing': '-0.01em',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-2-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '1.3125rem',
      'letter-spacing': '-0.01em',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-1': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': 'clamp(1.5rem, 0.8333333333rem + 1.3888888889vw, 1.875rem)',
      'letter-spacing': '-0.01em',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-1-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '1.5rem',
      'letter-spacing': '-0.01em',
      'line-height': '1.25',
      'margin-bottom': '1rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-display': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': 'clamp(1.75rem, 0.8611111111rem + 1.8518518519vw, 2.25rem)',
      'letter-spacing': '-0.01em',
      'line-height': '1.125',
      'margin-bottom': '1.5rem',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-100': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '0.75rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-100-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '0.75rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-200': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '0.8125rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-200-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '0.8125rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-300': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '0.875rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-300-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '0.875rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-400': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '1rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-400-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '1rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-500': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': 'clamp(1.125rem, 0.9027777778rem + 0.462962963vw, 1.25rem)',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-500-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '1.125rem',
      'letter-spacing': 'inherit',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-600': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': 'clamp(1.3125rem, 0.8680555556rem + 0.9259259259vw, 1.5625rem)',
      'letter-spacing': '-0.01em',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-600-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '1.3125rem',
      'letter-spacing': '-0.01em',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-700': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': 'clamp(1.5rem, 0.8333333333rem + 1.3888888889vw, 1.875rem)',
      'letter-spacing': '-0.01em',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-700-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '1.5rem',
      'letter-spacing': '-0.01em',
      'line-height': '1.25',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-800': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': 'clamp(1.75rem, 0.8611111111rem + 1.8518518519vw, 2.25rem)',
      'letter-spacing': '-0.01em',
      'line-height': '1.125',
      color: 'var(--gl-text-color-heading)',
    },
    '.heading-scale-800-fixed': {
      'font-weight': '600',
      'margin-top': '0',
      'font-size': '1.75rem',
      'letter-spacing': '-0.01em',
      'line-height': '1.125',
      color: 'var(--gl-text-color-heading)',
    },
  });

  addUtilities({
    '.font-monospace': {
      'font-family':
        'var(--default-mono-font, "GitLab Mono"), "JetBrains Mono", "Menlo", "DejaVu Sans Mono", "Liberation Mono", "Consolas", "Ubuntu Mono", "Courier New", "andale mono", "lucida console", monospace',
      'font-variant-ligatures': 'none',
    },
    '.break-anywhere': {
      'overflow-wrap': 'anywhere',
      'word-break': 'normal',
    },
    '.wrap-anywhere': {
      'overflow-wrap': 'anywhere',
    },
    '.border-b-solid': {
      'border-bottom-style': 'solid',
    },
    '.border-b-initial': {
      'border-bottom-style': 'initial',
    },
    '.border-l-solid': {
      'border-left-style': 'solid',
    },
    '.border-r-solid': {
      'border-right-style': 'solid',
    },
    '.border-t-solid': {
      'border-top-style': 'solid',
    },
    '.clearfix': {
      '&::after': {
        display: 'block',
        clear: 'both',
        content: '""',
      },
    },
    '.focus': {
      'box-shadow':
        '0 0 0 1px var(--gl-focus-ring-inner-color), 0 0 0 3px var(--gl-focus-ring-outer-color)',
      outline: 'none',
    },
    '.text-align-inherit': {
      'text-align': 'inherit',
    },
  });
}

const widthPercentageScales = [8, 10, 20].reduce((accumulator1, denominator) => {
  return {
    ...accumulator1,
    ...range(1, denominator).reduce((accumulator2, numerator) => {
      const width = (numerator / denominator) * 100;

      return {
        ...accumulator2,
        [`${numerator}/${denominator}`]: `${round(width, 6)}%`,
      };
    }, {}),
  };
}, {});

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'gl-',
  corePlugins: {
    /*
     * Disable preflight styles so that `@tailwind base` compiles to CSS vars declarations without
     * any of the resets which we don't need.
     * More on this at https://tailwindcss.com/docs/preflight.
     */
    preflight: false,
  },
  plugins: [plugin(addCustomDefinitions)],
  theme: {
    animation: {
      spin: 'spin 0.6s infinite linear',
    },
    backgroundColor,
    borderColor,
    borderRadius: {
      none: '0',
      6: '1.5rem',
      base: '.25rem',
      full: '50%', // Tailwind gl-rounded-full is 9999px
      small: '.125rem',
      lg: '.5rem',
      pill: '.75rem',
    },
    boxShadow: {
      DEFAULT: '0 1px 4px 0 #0000004d',
      none: 'none',
      sm: '0 0 2px var(--gl-shadow-color-default, #05050629), 0 1px 4px var(--gl-shadow-color-default, #05050629)',
      md: '0 0 1px var(--gl-shadow-color-default, #05050629), 0 0 2px var(--gl-shadow-color-default, #05050629), 0 2px 8px var(--gl-shadow-color-default, #05050629)',
      lg: '0 0 2px var(--gl-shadow-color-default, #05050629), 0 0 2px var(--gl-shadow-color-default, #05050629), 0 4px 12px var(--gl-shadow-color-default, #05050629)',
      'inner-1-blue-500': 'inset 0 0 0 1px var(--blue-500, #1f75cb)',
      'inner-1-gray-100': 'inset 0 0 0 1px var(--gray-100, #dcdcde)',
      'inner-1-gray-200': 'inset 0 0 0 1px var(--gray-200, #bfbfc3)',
      'inner-1-gray-400': 'inset 0 0 0 1px var(--gray-400, #89888d)',
      'inner-1-red-300': 'inset 0 0 0 1px var(--red-300, #f57f6c)',
      'inner-1-red-400': 'inset 0 0 0 1px var(--red-400, #ec5941)',
      'inner-1-red-500': 'inset 0 0 0 1px var(--red-500, #dd2b0e)',
      'inner-2-blue-400': 'inset 0 0 0 2px var(--blue-400, #428fdc)',
      'inner-b-1-gray-100': 'inset 0 -1px 0 0 var(--gray-100, #dcdcde)',
      'inner-b-2-blue-500': 'inset 0 -2px 0 0 var(--blue-500, #1f75cb)',
      'inner-b-2-theme-accent':
        'inset 0 -2px 0 0 var(--gl-theme-accent, var(--theme-indigo-500, #6666c4))',
      'inner-l-3-red-600': 'inset 3px 0 0 0 var(--red-600, #c91c00)',
      'inner-l-4-gray-100': 'inset 4px 0 0 0 var(--gray-100, #dcdcde)',
      'x0-y0-b3-s1-blue-500': 'inset 0 0 3px 1px var(--blue-500, #1f75cb)',
      'x0-y2-b4-s0': '0 2px 4px 0 #0000001a',
    },
    colors,
    fill,
    fontFamily: {
      regular:
        'var(--default-regular-font, "GitLab Sans"), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    fontSize: {
      xs: '0.625rem',
      sm: '0.75rem',
      base: '0.875rem',
      lg: '1rem',
      'size-h-display': '1.75rem',
      'size-h1': '1.4375rem',
      'size-h2': '1.1875rem',
      'size-h1-xl': '2rem',
      'size-h2-xl': '1.4375rem',
      'size-reset': 'inherit',
    },
    fontWeight: {
      100: 100,
      300: 300,
      normal: 400,
      semibold: 500,
      bold: 600,
    },
    lineHeight: {
      reset: 'inherit',
      0: '0',
      1: '1',
      normal: '1rem',
      20: '1.25rem',
      24: '1.5rem',
      28: '1.75rem',
      32: '2rem',
      36: '2.25rem',
      42: '2.625rem',
    },
    opacity: {
      0: '0',
      1: '.1',
      2: '.2',
      3: '.3',
      4: '.4',
      5: '.5',
      6: '.6',
      7: '.7',
      8: '.8',
      9: '.9',
      10: '1',
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    spacing,
    textColor,
    transitionDuration: {
      DEFAULT: '200ms',
      slow: '400ms',
      medium: '200ms',
      fast: '100ms',
    },
    transitionTimingFunction: {
      DEFAULT: 'ease',
      ease: 'ease',
      linear: 'linear',
    },
    zIndex: {
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      200: '200',
      9999: '9999',
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
      flexGrow: {
        2: '2',
      },
      gridTemplateRows: {
        auto: 'auto',
      },
      maxWidth: {
        ...widthPercentageScales,
        screen: '100vw',
        limited: '1006px',
        '1/2': '50%',
      },
      transitionProperty: {
        'box-shadow': 'box-shadow',
        'border-color': 'border-color',
        'stroke-opacity': 'stroke-opacity',
        background: 'background',
        left: 'left',
        opacity: 'opacity',
        padding: 'padding',
        right: 'right',
        stroke: 'stroke',
        transform: 'transform',
        width: 'width',
      },
      width: widthPercentageScales,
    },
  },
};
