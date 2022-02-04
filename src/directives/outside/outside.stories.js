import { GlOutsideDirective } from '../../index';
import GlButton from '../../components/base/button/button.vue';
import readme from './outside.md';

export const Default = () => ({
  components: {
    GlButton,
  },
  directives: {
    outside: GlOutsideDirective,
  },
  data: () => ({
    clicks: 0,
  }),
  methods: {
    onClick() {
      this.clicks += 1;
    },
  },
  template: `<gl-button v-outside="onClick">Clicks outside me: {{ clicks }}</gl-button>`,
});

Default.parameters = {
  storyshots: { disable: true },
};

export default {
  title: 'directives/outside-directive',
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
