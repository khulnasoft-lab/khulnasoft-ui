import { text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../documentation/documented_stories';
import { GlHoverLoadDirective } from '../../index';
import readme from './hover_load.md';

const directives = {
  GlHoverLoadDirective,
};

// eslint-disable-next-line no-script-url
function generateProps({ endpoint = 'some/endpoint' } = {}) {
  return {
    endpoint: {
      type: String,
      default: text('endpoint', endpoint),
    },
  };
}

documentedStoriesOf('directives/hover-load-directive', readme)
  .addParameters({ storyshots: false })
  .add('default', () => ({
    props: generateProps(),
    directives,
    data: () => ({
      isPreloaded: false,
    }),
    methods: {
      handlePreload() {
        fetch(this.endpoint);
        this.isPreloaded = true;
      },
    },
    template: `
    <div>
      <a
        :href="endpoint"
        v-gl-hover-load="handlePreload"
      >
          Hover me to preload
      </a>
      
      <span>(Preloaded: {{isPreloaded}})</span>
      </div>
      `,
  }));
