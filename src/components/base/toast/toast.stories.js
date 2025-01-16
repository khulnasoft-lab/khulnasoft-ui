import { userEvent, within, waitFor, expect } from '@storybook/test';
import Vue from 'vue';
import GlButton from '../button/button.vue';
import BVueReadme from '../../../vendor/bootstrap-vue/src/components/toast/README.md';
import GlToast from './toast';
import readme from './toast.md';

Vue.use(GlToast);

const play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');
  await userEvent.click(button);
  await waitFor(() => expect(within(canvasElement).getByRole('button')).toHaveFocus());
  await waitFor(() => expect(within(document).getByRole('status')).toBeVisible());
};

function makeStory({ buttonText, toastShowArgs }) {
  const story = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { GlToast, GlButton },
    template: `
      <gl-button @click="showToast()">
        ${buttonText}
      </gl-button>`,
    beforeDestroy() {
      // It seems that in Vue 2, toasts are automatically removed when the
      // parent component is destroyed. In Vue 3, that appears not to happen,
      // for some reason
      //
      // Ideally that underlying problem would be fixed, but in practice, it
      // shouldn't be much of a problem, since toasts auto-hide eventually
      // anyway.
      //
      // This matters in the visual tests because we switch stories between
      // taking screenshots, which means that toast(s) from the previous story
      // might still be present. This meant that the `getByRole('status')`
      // query of the `play` function was failing, since more than one toast
      // was present sometimes.
      //
      // So, we explicitly hide toasts when the stories are destroyed.
      while (this.toasts.length > 0) {
        this.toasts.pop().hide();
      }
    },
    created() {
      this.toasts = [];
    },
    methods: {
      showToast() {
        this.toasts.push(this.$toast.show(...toastShowArgs));
      },
    },
  });

  return Object.assign(story, { play });
}

export const Default = makeStory({
  buttonText: 'Show default toast',
  toastShowArgs: ['This is the default toast.'],
});

export const WithActions = makeStory({
  buttonText: 'Show toast with actions',
  toastShowArgs: [
    'This is a toast with an action.',
    {
      action: {
        text: 'Undo',
        onClick: () => {},
      },
    },
  ],
});

export const WithLongContent = makeStory({
  buttonText: 'Show toast with a long content',
  toastShowArgs: [
    'This is a toast with a long content and an action. Notice how the text wraps to multiple lines when the max-width is reached.',
    {
      action: {
        text: 'Undo action',
        onClick: () => {},
      },
    },
  ],
});

export default {
  title: 'base/toast',
  component: GlToast,
  parameters: {
    bootstrapDocs: BVueReadme,
    bootstrapComponent: 'toast',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
