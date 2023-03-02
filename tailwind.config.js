/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    fontFamily: {
      sans: ['GitLab Sans'],
      monospace: ['JetBrains Mono'],
    },
    extend: {
      colors: {
        theme: {
          'indigo-50': '#f1f1ff',
          'indigo-100': '#dbdbf8',
          'indigo-200': '#c7c7f2',
          'indigo-300': '#a2a2e6',
          'indigo-400': '#8181d7',
          'indigo-500': '#6666c4',
          'indigo-600': '#5252b5',
          'indigo-700': '#41419f',
          'indigo-800': '#303083',
          'indigo-900': '#222261',
          'indigo-950': '#14143d',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
