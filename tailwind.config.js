const defaults = require('./tailwind.defaults');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [defaults],
  content: ['./src/**/*.{vue,js}'],
  corePlugins: [
    'appearance',
    'content',
    'float',
    'fill',
    'inset',
    'isolation',
    'mixBlendMode',
    'position',
    'tableLayout',
    'textColor',
    'userSelect',
  ],
};
