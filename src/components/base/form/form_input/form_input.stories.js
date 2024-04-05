import { formInputWidths } from '../../../../utils/constants';
import readme from './form_input.md';
import GlFormInput from './form_input.vue';

const template = `
<div>
  <label :for="inputId">{{ labelText }}</label>
  <gl-form-input
    :id="inputId"
    type="text"
    :readonly="readonly"
    :disabled="disabled"
    :value="value"
    :width="width"
  />
</div>`;

const generateProps = ({
  inputId = 'input-id',
  width = GlFormInput.props.width.default,
  value = '',
  disabled = false,
  readonly = false,
  labelText = 'Label',
  type = 'text',
} = {}) => ({
  labelText,
  inputId,
  width,
  value,
  disabled,
  readonly,
  type,
});

const Template = (args) => ({
  components: { GlFormInput },
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps({
  value: 'some text',
  labelText: 'Default',
});

export const Disabled = Template.bind({});
Disabled.args = generateProps({
  value: 'some text',
  disabled: true,
  labelText: 'Disabled',
});

export const Readonly = Template.bind({});
Readonly.args = generateProps({ value: 'readonly text', readonly: true, labelText: 'Readonly' });

export const NumberInput = Template.bind({});
NumberInput.args = generateProps({
  value: '42',
  labelText: 'Number input',
  type: 'number',
});
NumberInput.tags = ['skip-visual-test'];

export const Widths = (args, { argTypes }) => ({
  components: { GlFormInput },
  props: Object.keys(argTypes),
  data: () => ({
    formInputWidths,
  }),
  template: `
  <div>
      <div v-for="(width, name) in formInputWidths">
      <label :for="'width-' + width">{{ name }}</label>
        <gl-form-input
            :id="'width-' + width"
            :key="width"
            :value="name"
            :width="width"
            class="gl-mb-4"
        />
      </div>
  </div>`,
});
Widths.args = {};

export const ResponsiveWidths = (args, { argTypes }) => ({
  components: { GlFormInput },
  props: Object.keys(argTypes),
  template: `
      <div>
        <label for="responsive-widths-1">Default</label>
        <gl-form-input
          id="responsive-widths-1"
          :width="{ default: 'md', md: 'lg', lg: 'xl' }"
          value="With \`default\` key"
          class="gl-mb-4"
        />
        <label for="responsive-widths-2">Without default</label>
        <gl-form-input
          id="responsive-widths-2"
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
