import readme from './form_date_range.md';
import GlFormDateRange from './form_date_range.vue';

const defaultValue = (prop) => GlFormDateRange.props[prop].default;
const controlToDate = (val) => val ? new Date(val) : null;

const template = `
  <gl-form-date-range
    :from-label="fromLabel"
    :to-label="toLabel"
    :label-class="labelClass"
    :default-min-date="defaultMinDate"
    :default-max-date="defaultMaxDate"
    :default-start-date="defaultStartDate"
    :default-end-date="defaultEndDate"
    :start-picker-class="startPickerClass"
    :end-picker-class="endPickerClass"
    :same-day-selection="sameDaySelection"
    :max-date-range="maxDateRange"
  />`;

const Template = (args) => ({
  components: { GlFormDateRange },
  props: Object.keys(args),
  template,
});

const generateProps = ({
  fromLabel = defaultValue('fromLabel'),
  toLabel = defaultValue('toLabel'),
  labelClass = '',
  defaultMinDate = null,
  defaultMaxDate = null,
  defaultStartDate = null,
  defaultEndDate = null,
  maxDateRange = 0,
  startPickerClass = '',
  endPickerClass = '',
  sameDaySelection = false,
} = {}) => ({
  fromLabel,
  toLabel,
  labelClass,
  defaultMinDate: controlToDate(defaultMinDate),
  defaultMaxDate: controlToDate(defaultMaxDate),
  defaultStartDate: controlToDate(defaultStartDate),
  defaultEndDate: controlToDate(defaultEndDate),
  maxDateRange,
  startPickerClass,
  endPickerClass,
  sameDaySelection,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const Custom = Template.bind({});
Custom.args = generateProps({
  fromLabel: 'Start',
  toLabel: 'End',
  labelClass: 'gl-font-style-italic',
  startPickerClass: 'gl-text-blue-500',
  endPickerClass: 'gl-text-red-500',
});

export const MinMaxDates = Template.bind({});
MinMaxDates.args = generateProps({
  defaultMinDate: new Date(2020, 0, 1),
  defaultMaxDate: new Date(2020, 2, 31),
});

export const MaxDateRange = Template.bind({});
MaxDateRange.args = generateProps({
  maxDateRange: 31,
});

export const WithDates = Template.bind({});
WithDates.args = generateProps({
  defaultMinDate: new Date(2020, 0, 1),
  defaultMaxDate: new Date(2020, 2, 31),
  defaultStartDate: new Date(2020, 0, 14),
  defaultEndDate: new Date(2020, 2, 3),
});

export const SameDaySelection = Template.bind({});
SameDaySelection.args = generateProps({
  defaultStartDate: new Date(2020, 0, 14),
  defaultEndDate: new Date(2020, 0, 14),
  sameDaySelection: true,
});

export default {
  title: 'base/form/form-date-range',
  component: GlFormDateRange,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    defaultMinDate: {
      control: 'date',
    },
    defaultMaxDate: {
      control: 'date',
    },
    defaultStartDate: {
      control: 'date',
    },
    defaultEndDate: {
      control: 'date',
    },
  },
};
