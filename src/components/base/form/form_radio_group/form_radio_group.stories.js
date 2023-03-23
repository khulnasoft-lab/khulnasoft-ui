import GlFormRadio from '../form_radio/form_radio.vue';
import GlFormRadioGroup from './form_radio_group.vue';
import readme from './form_radio_group.md';

const defaultOptions = [
  { value: 'pizza', text: 'Pizza' },
  { value: 'tacos', text: 'Tacos' },
  { value: 'burger', text: 'Burger', disabled: true },
];
const data = () => ({ selected: 'slot-option' });
const generateProps = ({ name = 'radio-group-name', options = defaultOptions } = {}) => ({
  name,
  options,
});

const template = `
  <div>
    <gl-form-radio-group
      v-model="selected"
      :options="options"
      :name="name"
    >
      <template #first>
        <gl-form-radio value="slot-option">
          Slot option with help text
          <template #help>
            Help text
          </template>
        </gl-form-radio>
      </template>
      <gl-form-radio value="Last option">Last option</gl-form-radio>
    </gl-form-radio-group>
  </div>`;

const Template = (args, { argTypes }) => ({
  components: {
    GlFormRadioGroup,
    GlFormRadio,
  },
  props: Object.keys(argTypes),
  template,
  data,
});
export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/form/form-radio-group',
  component: GlFormRadioGroup,
  parameters: {
    bootstrapComponent: 'b-form-radio-group',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    options: {
      description: 'Array of objects representing the radios to render',
    },
    valueField: {
      description: 'Field name in the options prop that should be used for the value',
    },
    textField: {
      description: 'Field name in the options prop that should be used for the text label',
    },
    htmlField: {
      description:
        'Field name in the options prop that should be used for the html label instead of text field. Use with caution.',
    },
    disabledField: {
      description: 'Field name in the options prop that should be used for the disabled state',
    },
    checked: {
      description: 'The current value of the checked radio in the group',
    },
  },
};
