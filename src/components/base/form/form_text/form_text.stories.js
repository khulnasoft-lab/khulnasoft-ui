import readme from './form_text.md';
import GlFormText from './form_text.vue';

const Template = (args) => ({
  components: { GlFormText },
  props: Object.keys(args),
  template: `
      <div class="gl-form-group">
        <gl-form-text>Some form text</gl-form-text>
      </div>
    `,
});

export const Default = Template.bind({});
Default.args = {};

export default {
  title: 'base/form/form-text',
  component: GlFormText,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
