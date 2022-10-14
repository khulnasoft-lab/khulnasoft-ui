import readme from './form_date.md';
import GlFormDate from './form_date.vue';

const defaultValue = (prop) => GlFormDate.props[prop].default;

const template = `
  <gl-form-date
    v-model="value"
    :disabled="disabled"
    :label="label"
    :label-class="labelClass"
    :label-sr-only="labelSrOnly"
    :min-date="minDate"
    :max-date="maxDate"
    :readonly="readonly"
    :value="value"
  />`;

const generateProps = ({
  disabled = false,
  label = defaultValue('label'),
  labelClass = '',
  labelSrOnly = false,
  minDate = null,
  maxDate = null,
  readonly = false,
  value = null,
} = {}) => ({
  disabled,
  label,
  labelClass,
  labelSrOnly,
  minDate,
  maxDate,
  readonly,
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
  value: new Date(2020, 0, 15),
});

export const MinMaxDates = Template.bind({});
MinMaxDates.args = generateProps({
  minDate: new Date(2020, 0, 1),
  maxDate: new Date(2020, 2, 31),
});

export const Readonly = Template.bind({});
Readonly.args = generateProps({
  readonly: true,
  value: new Date(2020, 0, 15),
});

export const Value = Template.bind({});
Value.args = generateProps({ value: new Date(2020, 0, 15) });

export const InvalidDate = Template.bind({});
InvalidDate.args = generateProps({
  minDate: new Date(2020, 0, 1),
  maxDate: new Date(2020, 0, 31),
  value: new Date(2020, 1, 2),
});

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
