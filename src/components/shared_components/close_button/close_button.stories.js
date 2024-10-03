import CloseButton from './close_button.vue';

const Template = (args, { argTypes }) => ({
  components: { CloseButton },
  props: Object.keys(argTypes),
  template: `
    <div class="gl-flex gl-flex-col gl-gap-3">
      <div class="gl-flex gl-justify-end gl-p-5 gl-rounded-base gl-bg-strong">
        <close-button />
      </div>
      <div class="gl-flex gl-justify-end gl-p-5 gl-rounded-base" style="background-color: #ececef">
        <close-button variant="positive" />
      </div>
      <div class="gl-flex gl-justify-end gl-p-5 gl-rounded-base" style="background-color: #28272d">
        <close-button variant="negative" />
      </div>
    </div>
  `,
});

export const Default = Template.bind({});

export default {
  title: 'internal/close_button',
  component: CloseButton,
};
