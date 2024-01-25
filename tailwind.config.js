const defaults = require('./tailwind.defaults');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [defaults],
  content: ['./src/**/*.{vue,js}'],
};
