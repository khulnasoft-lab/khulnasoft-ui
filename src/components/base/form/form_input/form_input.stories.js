import { formInputSizes } from '../../../../utils/constants';
import GlFormInput from './form_input.vue';
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

export const ResponsiveSizes = (args, { argTypes }) => ({
  components: { GlFormInput },
  props: Object.keys(argTypes),
  template: `
      <div>
        <gl-form-input
          :size="{ default: 'md', md: 'lg', lg: 'xl' }"
          value="With \`default\` key"
        />
        <gl-form-input
          class="gl-mt-4"
          :size="{ md: 'lg', lg: 'xl' }"
          value="Without \`default\` key"
        />
      </div>
    `,
});
ResponsiveSizes.args = {};

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
    size: {
      options: formInputSizes,
      control: 'select',
    },
  },
};
