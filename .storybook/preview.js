import Vue from 'vue';
import { h } from '@vue/compat';
import { useArgs } from '@storybook/preview-api';

import 'iframe-resizer/js/iframeResizer.contentWindow.min.js';
import setConfigs from '../src/config';
import logoWithBlackText from '../static/img/_logo_with_black_text.svg';
import logoWithWhiteText from '../static/img/_logo_with_white_text.svg';

import '../src/scss/bootstrap.scss';
import '../src/scss/storybook.scss';
import '../src/scss/tailwind.css';

let decorators = [
  (story, context) => {
    const [_, updateArgs] = useArgs();
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
  darkMode: {
    current: 'light',
    stylePreview: true,
    classTarget: 'html',
    darkClass: 'gl-dark',
    dark: {
      ...theme,
      brandImage: logoWithWhiteText,
    },
    light: {
      ...theme,
      brandImage: logoWithBlackText,
    },
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
