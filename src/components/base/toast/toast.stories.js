import { userEvent, within, waitFor, expect } from '@storybook/test';
import Vue from 'vue';
import GlButton from '../button/button.vue';
import GlToast from './toast';
import readme from './toast.md';

Vue.use(GlToast);

const components = { GlToast, GlButton };

const play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');
  await userEvent.click(button);
  await waitFor(() => expect(within(document).getByRole('status')).toBeVisible());
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
  <gl-button @click="showToast()">
    Show default toast
  </gl-button>`,
  methods: {
    showToast() {
      this.$toast.show('This is the default toast.');
    },
  },
});

export const Default = Template.bind({});
Default.play = play;

export const WithActions = () => ({
  components,
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
});
WithActions.play = play;

export const WithLongContent = () => ({
  components,
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
});
WithLongContent.play = play;

export default {
  title: 'base/toast',
  component: GlToast,
  parameters: {
    bootstrapComponent: 'toast',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
