import readme from './form_date.md';
import GlFormDate from './form_date.vue';


const currentYear = 2020;
const defaultDateValue = new Date(currentYear, 0, 15);
const defaultMinDate = new Date(currentYear, 0, 1);
const defaultMaxDate = new Date(currentYear, 2, 31);

const template = `
  <gl-form-date
    v-model="value"
    ref="date"
    :autofocus="autofocus"
    :default-date="defaultDate"
    :disabled="disabled"
    :min-date="minDate"
    :max-date="maxDate"
    :value="value"
  />`;

const generateProps = ({
  autofocus = false,
  defaultDate = null,
  disabled = false,
  minDate = null,
  maxDate = null,
  value = '',
} = {}) => ({
  autofocus,
  defaultDate,
  disabled,
  minDate,
  maxDate,
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
  value: '2022-10-04',
});

export const DefaultDate = Template.bind({});
DefaultDate.args = generateProps({ defaultDate: defaultDateValue });

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
  value: '2022-10-04',
});

export const Value = Template.bind({});
Value.args = generateProps({ value: '2022-10-04' });

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
  },
};
