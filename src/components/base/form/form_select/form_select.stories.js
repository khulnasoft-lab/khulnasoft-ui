import { formStateOptions, formInputSizes } from '../../../../utils/constants';
import GlFormSelect from './form_select.vue';
import { formSelectOptions } from './constants';
import readme from './form_select.md';

const data = () => ({
  selected: 'Pizza',
});

const template = `
<gl-form-select
  v-model="selected"
  :size="size"
  :disabled="disabled"
  :state="state"
  :multiple="multiple"
  :selectSize="selectSize"
  :options="options">
</gl-form-select>
`;

const generateProps = ({
  size = null,
  state = null,
  disabled = false,
  multiple = false,
  selectSize = 1,
  options = formSelectOptions,
} = {}) => ({
  size,
  disabled,
  state,
  multiple,
  selectSize,
  options,
});

const Template = (args) => ({
  components: { GlFormSelect },
  props: Object.keys(args),
  data,
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const Disabled = Template.bind({});
Disabled.args = generateProps({ disabled: true });

export const ValidState = Template.bind({});
ValidState.args = generateProps({ state: true });

export const InvalidState = Template.bind({});
InvalidState.args = generateProps({ state: false });

export const WithTruncation = (args, { argTypes }) => ({
  components: { GlFormSelect },
  props: Object.keys(argTypes),
  data() {
    return {
      selected: 1,
    };
  },
  template: `
    <div style="max-width: 300px;">
      ${template}
    </div>
    `,
});
WithTruncation.args = generateProps({
  options: [
    {
      value: 1,
      text: 'A form select option with a very looooooooong label',
    },
  ],
});

export default {
  title: 'base/form/form-select',
  component: GlFormSelect,
  parameters: {
    bootstrapComponent: 'b-form-select',
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
    state: {
      options: formStateOptions,
      control: 'select',
    },
    input: {
      description: 'Emitted with the select value changes.',
      table: {
        category: 'events',
      },
    },
    change: {
      description: 'Emitted with the select value changes via user interaction.',
      table: {
        category: 'events',
      },
    },
    first: {
      description: 'Slot to place option tags above options provided via options prop.',
      table: {
        category: 'slots',
      },
    },
    default: {
      description: 'Slot to place explicit option tags.',
      table: {
        category: 'slots',
      },
    },
  },
};
