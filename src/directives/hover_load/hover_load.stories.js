import GlHoverLoadDirective from './hover_load';
import readme from './hover_load.md';

const directives = {
  GlHoverLoadDirective,
};

// eslint-disable-next-line no-script-url
const generateProps = ({ endpoint = 'some/endpoint' } = {}) => ({
  endpoint,
});

export const Default = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
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
});
Default.args = generateProps();

export default {
  title: 'directives/hover-load-directive',
  component: GlHoverLoadDirective,
  tags: ['skip-visual-test'],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
