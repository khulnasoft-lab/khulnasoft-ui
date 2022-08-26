const defaults = require('./tailwind.defaults');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...defaults,
  // content: ['./src/**/*.{vue,js}', 'src/components/base/alert/alert.vue'],
  content: ['src/components/base/alert/alert.vue'],
};
