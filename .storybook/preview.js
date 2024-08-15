import Vue from 'vue';
import { h } from '@vue/compat';
import { useArgs } from '@storybook/preview-api';
import 'iframe-resizer/js/iframeResizer.contentWindow.min.js';
import setConfigs from '../src/config';

import '../src/scss/bootstrap.scss';
import '../src/scss/storybook.scss';

let decorators = [
  (story, context) => {
    const [_, updateArgs] = useArgs();
    // Determine the background and apply corresponding class
    const colorModeClass = context.globals.backgrounds?.value;
    document.documentElement.classList.remove('gl-light', 'gl-dark', 'gl-nacht');
    document.documentElement.classList.toggle(colorModeClass);
    return story({ ...context, updateArgs });
  },
  () => ({
    template: '<story />',
    mounted() {
      this.$nextTick().then(() => {
        this.$el.parentElement.classList.add('vue-component-mounted');
      });
    },
  }),
];

if (Vue.version.startsWith('3')) {
  decorators.unshift(function passArgsCorrectlyForVueCompat(storyFn, storyContext) {
    return h(storyContext.undecoratedStoryFn(storyContext), storyContext.args);
  });
}

setConfigs();

const theme = {
  brandTitle: 'GitLab UI',
  brandUrl: 'https://gitlab.com/gitlab-org/gitlab-ui',
};

const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: 'gl-light' },
      { name: 'dark', value: 'gl-dark' },
      { name: 'nacht', value: 'gl-nacht' },
    ],
  },
  a11y: {},
  viewport: {
    viewports: {
      breakpointSmall: {
        name: 'Breakpoint small (width: 320px)',
        styles: {
          height: '568px',
          width: '320px',
        },
      },
      breakpointMedium: {
        name: 'Breakpoint medium (width: 768px)',
        styles: {
          height: '1024px',
          width: '768px',
        },
      },
      breakpointLarge: {
        name: 'Breakpoint large (width: 1024px)',
        styles: {
          height: '768px',
          width: '1024px',
        },
      },
      breakpointExtraLarge: {
        name: 'Breakpoint extra large (width: 1280px)',
        styles: {
          height: '800px',
          width: '1280px',
        },
      },
    },
  },
};

/**
 * When running in test mode, we do small adjustments to help with visual regression testing:
 * - Skip DocsPage settings to prevent JSX errors.
 * - Set the layout to fullscreen to ensure stories are full-width.
 */
if (process.env.IS_VISUAL_TEST) {
  parameters.layout = 'fullscreen';
} else {
  const { page } = require('./docs/page');
  parameters.docs = { page };
}

export default { decorators, parameters };
