const defaults = require('./tailwind.defaults');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [defaults],
  content: [
    './src/**/*.{vue,js}',
    '!./src/**/*.spec.js',
    '!./src/vendor/bootstrap-vue/**',
    '!./src/vendor/bootstrap/**',
    './src/vendor/bootstrap-vue/src/**/*.{js,vue}',
  ],
};
