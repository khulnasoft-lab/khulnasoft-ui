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

const vueErrorHandler = jest.fn();
expect.extend({
  toHaveLoggedVueErrors() {
    const { calls } = vueErrorHandler.mock;
    vueErrorHandler.mockClear();
    return {
      pass: calls.length > 0,
      message: () =>
        calls.length > 0
          ? `Vue errors were logged to the console: ${calls.map((c) => c[0]).join('\n')}`
          : 'No Vue errors were logged to the console',
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
    Vue.config.warnHandler = vueErrorHandler;
  });

  afterEach(() => {
    // eslint-disable-next-line jest/no-standalone-expect
    expect(global.console).not.toHaveLoggedVueErrors();
  });
}
