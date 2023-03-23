import GlFormTextarea from './form_textarea.vue';
import readme from './form_textarea.md';

const template = `
  <gl-form-textarea
    v-model="model"
    :placeholder="placeholder"
    :rows="5"
    :no-resize="noResize"
  />
`;

const generateProps = ({
  model = 'We take inspiration from other companies, and we always go for the boring solutions. Just like the rest of our work, we continually adjust our values and strive always to make them better. We used to have more values, but it was difficult to remember them all, so we condensed them and gave sub-values and created an acronym. Everyone is welcome to suggest improvements.',
  placeholder = 'hello',
  noResize = GlFormTextarea.props.noResize.default,
} = {}) => ({
  model,
  placeholder,
  noResize,
});

const Template = (args) => ({
  components: { GlFormTextarea },
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/form/form-textarea',
  component: GlFormTextarea,
  parameters: {
    bootstrapComponent: 'b-form-textarea',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
