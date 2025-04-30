const stylelint = require('stylelint');

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = '@gitlab/no-gl-deprecated-design-tokens';
const messages = ruleMessages(ruleName, {
  rejected: (match) => `Usage of "${match}" is deprecated.`,
});

const matchPatterns = [
  // Match SCSS variables like $white, $black
  '\\$(black|white)(?![\\w-])',

  // // Match SCSS variables like $blue-500, $gray-100, etc.
  '\\$(blue|gray|green|orange|purple|red|brand|data-viz|theme|t-white-a|t-gray-a)-[a-zA-Z0-9-_]*\\b',

  // Match Tailwind/utility classes like gl-bg-black, gl-text-white
  'gl-(bg|border|fill|text)-(black|white)\\b',

  // Match Tailwind/utility classes like gl-bg-blue-500, gl-text-red-100, etc.
  'gl-(bg|border|fill|text)-(blue|gray|green|orange|purple|red|brand|data-viz|theme|t-white-a|t-gray-a)-[a-zA-Z0-9-_]*\\b',
];

function compileMatchers(patterns) {
  return patterns.map((pattern) => new RegExp(pattern, 'g'));
}

const ruleFunction = () => {
  const matchers = compileMatchers(matchPatterns);

  return (root, result) => {
    const valid = validateOptions(result, ruleName, {
      actual: matchPatterns,
      possible: [Array],
    });

    if (!valid) return;

    // Check declarations (property: value)
    root.walkDecls((decl) => {
      const context = `${decl.prop}: ${decl.value}`;

      matchers.forEach((regex) => {
        let match;
        // eslint-disable-next-line no-cond-assign
        while ((match = regex.exec(context)) !== null) {
          report({
            ruleName,
            result,
            node: decl,
            message: messages.rejected(match[0]),
            word: match[0],
          });
        }
      });
    });

    // Check @apply directives
    root.walkAtRules('apply', (atRule) => {
      const context = atRule.params;

      matchers.forEach((regex) => {
        let match;
        // eslint-disable-next-line no-cond-assign
        while ((match = regex.exec(context)) !== null) {
          report({
            ruleName,
            result,
            node: atRule,
            message: messages.rejected(match[0]),
            word: match[0],
          });
        }
      });
    });
  };
};

module.exports = createPlugin(ruleName, ruleFunction);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
