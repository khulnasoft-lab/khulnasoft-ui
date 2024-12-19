const Vue = require('vue');
const VTU = require('@vue/test-utils');
const { matcherHint, printReceived, printExpected } = require('jest-matcher-utils');
const setConfigs = require('../src/config').default;
const { useMockResizeObserver } = require('./__helpers__/mock_dom_observer');
const { createMockDirective: mockDirectiveCreator } = require('./__helpers__/vue_mock_directive');

setConfigs();
VTU.enableAutoDestroy?.(afterEach);

// Tooltips require complex DOM setup
// Since we're just reusing bootstrap-vue functionality
// We can safely mock it
jest.mock('../src/directives/tooltip.js', () => ({
  GlTooltipDirective: mockDirectiveCreator('gl-tooltip'),
}));

VTU.config.deprecationWarningHandler = (method, message) => {
  throw new Error(`[vue-test-utils] ${method}: ${message}`);
};

// bootstrap-vue uses transitions and relies on some actual functionality from them
// Vue Test Utils stubs them by default. Let's unstub them to be able to rely on the
// functionality
if (VTU.config.stubs) {
  VTU.config.stubs.transition = false;
  VTU.config.stubs['transition-group'] = false;
}

const vueWarnHandler = jest.fn();

const vueWarnIgnoreList = [
  /**
   * In Vue Test Utils 2, function prop values of stubbed or shallow mounted components are rendered as attributes with the string value `[Function]`.
   *
   * https://github.com/vuejs/test-utils/blob/v2.2.0/src/vnodeTransformers/stubComponentsTransformer.ts#L83-L85
   * https://github.com/vuejs/test-utils/blob/v2.2.0/src/vnodeTransformers/stubComponentsTransformer.ts#L50-L52.
   *
   * Since Vue v3.4.22, doing this results in this warning, which we can safely ignore.
   *
   * See: https://github.com/vuejs/core/commit/7ccd453dd004076cad49ec9f56cd5fe97b7b6ed8
   */
  /Wrong type passed as event handler to .* - did you forget @ or : in front of your prop\?\nExpected function or array of functions, received type string./,
];

expect.extend({
  toHaveLoggedVueErrors() {
    const calls = vueWarnHandler.mock.calls.filter(
      (call) => !vueWarnIgnoreList.some((ignore) => call[0].match(ignore))
    );
    vueWarnHandler.mockClear();

    return {
      pass: calls.length > 0,
      message: () =>
        calls.length > 0
          ? `Vue warnings were logged to the console: ${calls.map((c) => c[0]).join('\n')}`
          : 'No Vue warnings were logged to the console',
    };
  },
});

// Adopted from https://github.com/testing-library/jest-dom/blob/main/src/to-have-focus.js
expect.extend({
  toHaveFocus(element) {
    return {
      pass: element.ownerDocument.activeElement === element,
      message: () => {
        return [
          matcherHint(`${this.isNot ? '.not' : ''}.toHaveFocus`, 'element', ''),
          '',
          'Expected',
          `  ${printExpected(element)}`,
          'Received:',
          `  ${printReceived(element.ownerDocument.activeElement)}`,
        ].join('\n');
      },
    };
  },
});

if (!process.env.IS_VISUAL_TEST) {
  useMockResizeObserver();

  beforeAll(() => {
    Vue.config.warnHandler = vueWarnHandler;
  });

  afterEach(() => {
    // eslint-disable-next-line jest/no-standalone-expect
    expect(global.console).not.toHaveLoggedVueErrors();
  });
}
