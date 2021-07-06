import { addParameters, addDecorator } from '@storybook/vue';
import { addReadme } from 'storybook-readme/vue';
import { setupStorybookReadme } from '../documentation/documented_stories';

const searchParams = new URL(document.location).searchParams;
const isEmbeddedStory = Boolean(searchParams.get('isEmbeddedStory'));

const stylesheetsRequireCtx = require.context('../src/scss', true, /(storybook|bootstrap)\.scss$/);

stylesheetsRequireCtx('./bootstrap.scss');

stylesheetsRequireCtx('./storybook.scss');

function addSbClass(c, a) {
  return {
    template: `<div id="${a.id}" class="sb-story"><story/></div>`,
  };
}

addDecorator(addSbClass);
addDecorator(addReadme);

export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
  actions: { disable: true },
};

/**
 * When running in test mode, we do small adjustments to help with visual regression testing:
 * - Skip storybook-readme's setup to avoid rendering the READMEs.
 * - Skip DocsPage settings to prevent JSX errors.
 * - Set the layout to fullscreen to ensure stories are full-width.
 * The layout is also set to fullscreen whenever the isEmbeddedStory search param is passed.
 * This lets us remove unnecessary spacing when embedding stories in design.gitlab.com.
 */
if (process.env.NODE_ENV !== 'test') {
  setupStorybookReadme();
  const { page } = require('./docs/page');
  parameters.docs = { page };
}
if (process.env.NODE_ENV === 'test' || isEmbeddedStory) {
  parameters.layout = 'fullscreen';
}

addParameters({
  a11y: {
    element: '.story-container',
  },
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
});
