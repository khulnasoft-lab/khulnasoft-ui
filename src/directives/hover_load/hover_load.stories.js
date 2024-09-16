import { HoverLoadDirective } from './hover_load';
import readme from './hover_load.md';

// eslint-disable-next-line no-script-url
const generateProps = ({ endpoint = 'some/endpoint' } = {}) => ({
  endpoint,
});

export const Default = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  directives: {
    hoverLoad: HoverLoadDirective,
  },
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
      v-hover-load="handlePreload"
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
  component: HoverLoadDirective,
  tags: ['skip-visual-test'],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
