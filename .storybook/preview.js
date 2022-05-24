import 'iframe-resizer/js/iframeResizer.contentWindow.min.js';
import setConfigs from '../src/config';

setConfigs();

const stylesheetsRequireCtx = require.context('../src/scss', true, /(storybook|bootstrap)\.scss$/);

stylesheetsRequireCtx('./bootstrap.scss');

stylesheetsRequireCtx('./storybook.scss');

export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
  actions: { disable: true },
  darkMode: {
    current: 'light',
    stylePreview: true,
    darkClass: 'gl-dark',
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
if (process.env.NODE_ENV !== 'test') {
  const { page } = require('./docs/page');
  parameters.docs = { page };
}
if (process.env.NODE_ENV === 'test') {
  parameters.layout = 'fullscreen';
}
