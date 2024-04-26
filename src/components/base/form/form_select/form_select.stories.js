import uniqueId from 'lodash/uniqueId';
import { formInputWidths, formStateOptions } from '../../../../utils/constants';
import GlFormGroup from '../form_group/form_group.vue';
import { formSelectOptions } from './constants';
import readme from './form_select.md';
import GlFormSelect from './form_select.vue';

const data = () => ({
  selected: 'Pizza',
});

const template = `
<gl-form-group :label="labelText" :label-for="inputId">
  <gl-form-select
    :id="inputId"
    v-model="selected"
    :width="width"
    :disabled="disabled"
    :state="state"
    :multiple="multiple"
    :selectSize="selectSize"
    :options="options">
  </gl-form-select>
</gl-form-group>
`;

const generateProps = ({
  inputId = uniqueId('input-'),
  labelText = 'Label',
  width = null,
  state = null,
  disabled = false,
  multiple = false,
  selectSize = 1,
  options = formSelectOptions,
} = {}) => ({
  inputId,
  labelText,
  width,
  disabled,
  state,
  multiple,
  selectSize,
  options,
});

const Template = (args) => ({
  components: { GlFormSelect, GlFormGroup },
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
  components: { GlFormSelect, GlFormGroup },
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

export const Widths = (args, { argTypes }) => ({
  components: { GlFormSelect, GlFormGroup },
  props: Object.keys(argTypes),
  data() {
    return {
      formInputWidths,
    };
  },
  template: `
      <div>
        <gl-form-group v-for="(width, name) in formInputWidths" :key="width" :label="name" :label-for="'width-' + width">
          <gl-form-select
            :id="'width-' + width"
            v-model="name"
            :width="width"
            :options="[{ value: name, text: name }]">
          </gl-form-select>
        </gl-form-group>
      </div>`,
});
Widths.args = generateProps();

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
    width: {
      options: formInputWidths,
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
