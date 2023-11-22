import { formInputWidths } from '../../../../utils/constants';
import GlFormInput from './form_input.vue';
import readme from './form_input.md';

const template = `
  <gl-form-input
    type="text"
    :readonly="readonly"
    :disabled="disabled"
    :value="value"
    :width="width"
  />`;

const generateProps = ({
  width = GlFormInput.props.width.default,
  value = '',
  disabled = false,
  readonly = false,
} = {}) => ({
  width,
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

export const Widths = (args, { argTypes }) => ({
  components: { GlFormInput },
  props: Object.keys(argTypes),
  data: () => ({
    formInputWidths,
  }),
  template: `
      <div>
        <gl-form-input
          v-for="(width, name) in formInputWidths"
          :key="width"
          :width="width"
          :value="name"
          class="gl-mb-4"
        />
      </div>
    `,
});
Widths.args = {};

export const ResponsiveWidths = (args, { argTypes }) => ({
  components: { GlFormInput },
  props: Object.keys(argTypes),
  template: `
      <div>
        <gl-form-input
          :width="{ default: 'md', md: 'lg', lg: 'xl' }"
          value="With \`default\` key"
          class="gl-mb-4"
        />
        <gl-form-input
          :width="{ md: 'lg', lg: 'xl' }"
          value="Without \`default\` key"
        />
      </div>
    `,
});
ResponsiveWidths.args = {};

export default {
  title: 'base/form/form-input',
  component: GlFormInput,
  parameters: {
    bootstrapComponent: 'b-form-input',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    width: {
      options: formInputWidths,
      control: 'select',
    },
  },
};
