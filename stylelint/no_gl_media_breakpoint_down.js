const stylelint = require('stylelint');

const { report, ruleMessages } = stylelint.utils;

const MIXIN_NAME = 'gl-media-breakpoint-down';
const ruleName = `@gitlab/no-${MIXIN_NAME}`;
const messages = ruleMessages(ruleName, {
  expected: (unfixed, fixed) =>
    `Usage of "${unfixed}" should be avoided, consider using "${fixed}" instead`,
});

module.exports = stylelint.createPlugin(ruleName, function getPlugin() {
  return function lint(postcssRoot, postcssResult) {
    postcssRoot.walkAtRules('include', (decl) => {
      const usesGlMediaBreakpointDown = decl.params.startsWith(MIXIN_NAME);
      if (!usesGlMediaBreakpointDown) {
        return;
      }
      report({
        ruleName,
        result: postcssResult,
        message: messages.expected(MIXIN_NAME, 'gl-media-breakpoint-up'),
        node: decl,
        word: MIXIN_NAME,
      });
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
