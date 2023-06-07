const plugin = require('tailwindcss/plugin');
const { PREFIX } = require('./constants');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./base-tailwind.config')],
  safelist: [
    {
      pattern: /./,
      variants: ['gl-negative', 'gl-hover', 'gl-focus', 'gl-visited', 'gl-active', 'gl-important'],
    },
  ],
  plugins: [
    // Modify negative
    plugin(({ addVariant }) => {
      addVariant('gl-negative', ({ container }) => {
        container.walkRules((rule) => {
          if (rule.selector.startsWith('.-')) {
            rule.selector = rule.selector.replace(`.-${PREFIX}`, '.').replace(/-(\d)/, '-n$1');
          }
        });
      });
    }),
    // Add `gl-hover` variant
    plugin(({ addVariant }) => {
      addVariant('gl-hover', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `${rule.selector.replace(PREFIX, 'hover-')}:hover`;
        });
      });
    }),
    // Add `gl-focus` variant
    plugin(({ addVariant }) => {
      addVariant('gl-focus', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `${rule.selector.replace(PREFIX, 'focus-')}:focus`;
        });
      });
    }),
    // Add `gl-visited` variant
    plugin(({ addVariant }) => {
      addVariant('gl-visited', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `${rule.selector.replace(PREFIX, 'visited-')}:visited`;
        });
      });
    }),
    // Add `gl-active` variant
    plugin(({ addVariant }) => {
      addVariant('gl-active', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `${rule.selector.replace(PREFIX, 'active-')}:active`;
        });
      });
    }),
    // Add `important` variant
    plugin(({ addVariant }) => {
      addVariant('gl-important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `${rule.selector.replace(PREFIX, '')}\\!`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });
    }),
  ],
};
