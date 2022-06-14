import { GlFormRadio } from '../../../../index';
import readme from './form_radio.md';

const defaultOptions = [
  { value: 'Pizza', text: 'Pizza' },
  { value: 'Tacos', text: 'Tacos' },
  { value: 'Burger', text: 'Burger', disabled: true },
];

const generateProps = ({ name = 'radio-group-name', checked = defaultOptions[0].value } = {}) => ({
  name,
  checked,
});

const Template = (args) => ({
  components: { GlFormRadio },
  props: Object.keys(args),
  template: `
      <div>
        <gl-form-radio
          v-for="option in options"
          :key="option.value"
          :checked="checked"
          :value="option.value"
          :disabled="option.disabled"
          :name="name"
        >{{ option.text }}</gl-form-radio>
      </div>
    `,
  data() {
    return {
      options: defaultOptions,
    };
  },
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/form/form-radio',
  component: GlFormRadio,
  parameters: {
    bootstrapComponent: 'b-form-radio',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    checked: {
      options: defaultOptions.map(({ value }) => value),
      control: 'select',
    },
  },
};
