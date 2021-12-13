import { GlFormSelect } from '../../../../../index';
import { sizeOptions, formStateOptions } from '../../../../utils/constants';
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
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: sizeOptions,
      },
    },
    state: {
      control: {
        type: 'select',
        options: formStateOptions,
      },
    },
  },
};
