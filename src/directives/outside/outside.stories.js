import GlButton from '../../components/base/button/button.vue';
import { OutsideDirective } from './outside';
import readme from './outside.md';

export const Default = () => ({
  components: {
    GlButton,
  },
  directives: {
    outside: OutsideDirective,
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

export const ConditionalVisibility = () => ({
  components: {
    GlButton,
  },
  directives: {
    outside: OutsideDirective,
  },
  data: () => ({
    clicks: 0,
    show: false,
  }),
  methods: {
    onClick() {
      this.clicks += 1;
    },
    showCounter() {
      this.show = true;
    },
  },
  template: `
    <div>
      <gl-button @click="showCounter">Show Button</gl-button>
      <gl-button v-if="show" v-outside="onClick">Clicks outside me: {{ clicks }}</gl-button>
    </div>
  `,
});

ConditionalVisibility.tags = ['skip-visual-test'];

export default {
  title: 'directives/outside-directive',
  component: OutsideDirective,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
