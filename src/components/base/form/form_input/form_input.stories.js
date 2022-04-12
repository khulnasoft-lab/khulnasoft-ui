import { GlFormInput } from '../../../../index';
import { formInputSizes } from '../../../../utils/constants';
import readme from './form_input.md';

const template = `
  <gl-form-input
    type="text"
    :readonly="readonly"
    :disabled="disabled"
    :value="value"
    :size="size"
  />`;

const generateProps = ({
  size = GlFormInput.props.size.default,
  value = '',
  disabled = false,
  readonly = false,
} = {}) => ({
  size,
  value,
  disabled,
  readonly,
});

const Template = (args) => ({
  components: { GlFormInput },
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const Disabled = Template.bind({});
Disabled.args = generateProps({ value: 'some text', disabled: true });

export const Readonly = Template.bind({});
Readonly.args = generateProps({ value: 'readonly text', readonly: true });

export const Sizes = (args, { argTypes }) => ({
  components: { GlFormInput },
  props: Object.keys(argTypes),
  data: () => ({
    formInputSizes,
  }),
  template: `
      <div>
        <gl-form-input
          v-for="(size, name) in formInputSizes"
          :key="size"
          :size="size"
          :value="name"
        />
      </div>
    `,
});
Sizes.args = {};

export default {
  title: 'base/form/form-input',
  component: GlFormInput,
  parameters: {
    bootstrapComponent: 'b-form-input',
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    size: {
      options: formInputSizes,
      control: 'select',
    },
  },
};
