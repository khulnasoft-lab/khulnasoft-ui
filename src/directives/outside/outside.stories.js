import GlButton from '../../components/base/button/button.vue';
import GlOutsideDirective from './outside';
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

Default.tags = ['skip-visual-test'];

export default {
  title: 'directives/outside-directive',
  component: GlOutsideDirective,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
