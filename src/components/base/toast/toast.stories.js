import Vue from 'vue';
import { GlToast } from '../../../../index';
import readme from './toast.md';

Vue.use(GlToast);

const Template = () => ({
  components: { GlToast },
  template: `
  <gl-button @click="showToast()">
    Show default toast
  </gl-button>`,
  methods: {
    showToast() {
      this.$toast.show('This is the default toast.');
    },
  },
  mounted() {
    this.showToast();
  },
});

export const Default = Template.bind({});

export const WithActions = () => ({
  components: { GlToast },
  template: `
  <gl-button @click="showToast()">
    Show toast with actions
  </gl-button>`,
  methods: {
    showToast() {
      this.$toast.show('This is a toast with an action.', {
        action: {
          text: 'Undo',
          onClick: () => {},
        },
      });
    },
  },
  mounted() {
    this.showToast();
  },
});

export const WithLongContent = () => ({
  components: { GlToast },
  template: `
  <gl-button @click="showToast()">
    Show toast with a long content
  </gl-button>`,
  methods: {
    showToast() {
      this.$toast.show(
        'This is a toast with a long content and an action. Notice how the text wraps to multiple lines when the max-width is reached.',
        {
          action: {
            text: 'Undo action',
            onClick: () => {},
          },
        }
      );
    },
  },
  mounted() {
    this.showToast();
  },
});

export default {
  title: 'base/toast',
  component: GlToast,
  parameters: {
    bootstrapComponent: 'toast',
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
