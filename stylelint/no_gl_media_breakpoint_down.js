const stylelint = require('stylelint');

const {
  createPlugin,
  utils: { report, ruleMessages }
} = stylelint;

const MIXIN_NAME = 'gl-media-breakpoint-down';
const ruleName = `@gitlab/no-${MIXIN_NAME}`;
const messages = ruleMessages(ruleName, {
  expected: (unfixed, fixed) =>
    `Usage of "${unfixed}" should be avoided, consider using "${fixed}" instead`,
});
const ruleFunction = () => {
  return (postcssRoot, postcssResult) => {
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
}

module.exports = createPlugin(ruleName, ruleFunction);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
