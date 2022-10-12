import { formStateOptions } from '../../../../utils/constants';
import readme from './form_date.md';
import GlFormDate from './form_date.vue';

const defaultValue = new Date(2020, 0, 15);
const defaultMinDate = new Date(2020, 0, 1);
const defaultMaxDate = new Date(2020, 2, 31);

const template = `
  <gl-form-date
    v-model="value"
    ref="date"
    :autofocus="autofocus"
    :disabled="disabled"
    :min-date="minDate"
    :max-date="maxDate"
    :state="state"
    :value="value"
  />`;

const generateProps = ({
  autofocus = false,
  disabled = false,
  minDate = null,
  maxDate = null,
  state = null,
  value = null,
} = {}) => ({
  autofocus,
  disabled,
  minDate,
  maxDate,
  state,
  value,
});

const Template = (args) => ({
  components: { GlFormDate },
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const Disabled = Template.bind({});
Disabled.args = generateProps({ disabled: true });

export const DisabledValue = Template.bind({});
DisabledValue.args = generateProps({
  disabled: true,
  value: defaultValue,
});

export const MinDate = Template.bind({});
MinDate.args = generateProps({
  minDate: defaultMinDate,
});

export const MaxDate = Template.bind({});
MaxDate.args = generateProps({
  maxDate: defaultMaxDate,
});

export const MinMaxDates = Template.bind({});
MinMaxDates.args = generateProps({
  minDate: defaultMinDate,
  maxDate: defaultMaxDate,
});

export const Readonly = Template.bind({});
Readonly.args = generateProps({
  readonly: true,
  value: defaultValue,
});

export const Value = Template.bind({});
Value.args = generateProps({ value: defaultValue });

export const ValidState = Template.bind({});
ValidState.args = generateProps({ state: true });

export const InvalidState = Template.bind({});
InvalidState.args = generateProps({ state: false });

export default {
  title: 'base/form/form-date',
  component: GlFormDate,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    minDate: {
      control: 'date',
    },
    maxDate: {
      control: 'date',
    },
    state: {
      options: formStateOptions,
      control: 'select',
    },
  },
};
