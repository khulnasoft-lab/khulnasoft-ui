const postcss = require('postcss');
const fs = require('fs').promises;
const path = require('path');
const partition = require('lodash/partition');

const run = async () => {
  const gitLabUiCss = await fs.readFile(
    path.resolve(__dirname, '../dist/utility_classes.css'),
    'utf8'
  );
  const tailwindCss = await fs.readFile(path.resolve(__dirname, '../dist/tailwind.css'), 'utf8');

  const gitLabUiCssParsed = await postcss().process(gitLabUiCss);
  const tailwindCssParsed = await postcss().process(tailwindCss);

  const gitLabUiRules = gitLabUiCssParsed.root.nodes;

  const tailwindRules = tailwindCssParsed.root.nodes;
  const tailwindSelectors = tailwindRules.map((rule) => rule.selector);

  const [rulesSupportedByTailwind, rulesNotSupportedByTailwind] = partition(
    gitLabUiRules,
    (rule) => {
      return tailwindSelectors.includes(rule.selector);
    }
  );

  const safelist = rulesSupportedByTailwind.flatMap((rule) => {
    if (rule.selectors === undefined) {
      return [];
    }

    return rule.selectors.map((selector) => selector.replace('.', ''));
  });

  const customUtilities = rulesNotSupportedByTailwind.reduce((accumulator, rule) => {
    return {
      ...accumulator,
      [rule.selector]: rule.nodes.reduce((declarationAccumulator, declaration) => {
        return {
          ...declarationAccumulator,
          [declaration.prop]: declaration.important
            ? `${declaration.value} !important`
            : declaration.value,
        };
      }, {}),
    };
  }, {});

  const tailwindConfig = `
    const plugin = require('tailwindcss/plugin');

    module.exports = {
      presets: [require('./tailwind/base-tailwind.config')],
      safelist: ${JSON.stringify(safelist)},
      plugins: [
        plugin(function({ addUtilities }) {
          addUtilities(${JSON.stringify(customUtilities)})
        })
      ]
    };
  `;

  await fs.writeFile(path.resolve(__dirname, '../tailwind.config.js'), tailwindConfig);
};

run();
