/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    /**
     * Turn off Tailwind Preflight.
     * See more here: https://tailwindcss.com/docs/preflight
     */
    preflight: false,
  },
};
