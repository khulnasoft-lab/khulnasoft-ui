import readme from './form_date_range.md';
import GlFormDateRange from './form_date_range.vue';

const defaultValue = (prop) => GlFormDateRange.props[prop].default;
const controlToDate = (val) => val ? new Date(val) : null;

const defaultTemplate = `
  <gl-form-date-range
    :min-date="minDate"
    :max-date="maxDate"
    :start-date="startDate"
    :start-label="startLabel"
    :start-class="startClass"
    :end-date="endDate"
    :end-label="endLabel"
    :end-class="endClass"
    :label-class="labelClass"
    :max-date-range="maxDateRange"
    :same-day-selection="sameDaySelection"
    :tooltip="tooltip"
    :indicator-class="indicatorClass"
  />
`;

const templateWithSlot = `
  <gl-form-date-range
    :min-date="minDate"
    :max-date="maxDate"
    :start-date="startDate"
    :start-label="startLabel"
    :start-class="startClass"
    :end-date="endDate"
    :end-label="endLabel"
    :end-class="endClass"
    :label-class="labelClass"
    :max-date-range="maxDateRange"
    :same-day-selection="sameDaySelection"
    :tooltip="tooltip"
    :indicator-class="indicatorClass"
  >
    <template #default="{ daysSelected }">
      <span v-if="daysSelected === 1">{{ daysSelected }} day selected</span>
      <span v-else-if="daysSelected > -1">{{ daysSelected }} days selected</span>
      <span v-else>No days selected</span>
    </template>
  </gl-form-date-range>
`;

const Template = (template, args) => ({
  components: { GlFormDateRange },
  props: Object.keys(args),
  template,
});

const generateProps = ({
  minDate = null,
  maxDate = null,
  startDate = null,
  startLabel = defaultValue('startLabel'),
  startClass = '',
  endDate = null,
  endLabel = defaultValue('endLabel'),
  endClass = '',
  labelClass = '',
  maxDateRange = 0,
  sameDaySelection = false,
  tooltip = '',
  indicatorClass = '',
} = {}) => ({
  minDate: controlToDate(minDate),
  maxDate: controlToDate(maxDate),
  startDate: controlToDate(startDate),
  startLabel,
  startClass,
  endDate: controlToDate(endDate),
  endLabel,
  endClass,
  labelClass,
  maxDateRange,
  sameDaySelection,
  tooltip,
  indicatorClass,
});

export const Default = Template.bind({}, defaultTemplate);
Default.args = generateProps();

export const Custom = Template.bind({}, templateWithSlot);
Custom.args = generateProps({
  startLabel: 'Start',
  startClass: 'gl-text-blue-500',
  endLabel: 'End',
  endClass: 'gl-text-red-500',
  labelClass: 'gl-font-style-italic',
  indicatorClass: 'gl-text-green-500',
});

export const MinMaxDates = Template.bind({}, defaultTemplate);
MinMaxDates.args = generateProps({
  minDate: new Date(2020, 0, 1),
  maxDate: new Date(2020, 2, 31),
});

export const MaxDateRange = Template.bind({}, defaultTemplate);
MaxDateRange.args = generateProps({
  maxDateRange: 31,
});

export const WithDates = Template.bind({}, defaultTemplate);
WithDates.args = generateProps({
  minDate: new Date(2020, 0, 1),
  maxDate: new Date(2020, 2, 31),
  startDate: new Date(2020, 0, 14),
  endDate: new Date(2020, 2, 3),
});

export const SameDaySelection = Template.bind({}, defaultTemplate);
SameDaySelection.args = generateProps({
  startDate: new Date(2020, 0, 14),
  endDate: new Date(2020, 0, 14),
  sameDaySelection: true,
});

export const Tooltip = Template.bind({}, defaultTemplate);
Tooltip.args = generateProps({
  minDate: new Date(2020, 0, 1),
  maxDate: new Date(2020, 0, 31),
  startDate: new Date(2020, 0, 4),
  endDate: new Date(2020, 0, 18),
  maxDateRange: 31,
  tooltip: 'Date range limited to 31 days',
});

export const WithDatesAndTooltip = Template.bind({}, templateWithSlot);
WithDatesAndTooltip.args = generateProps({
  minDate: new Date(2020, 0, 1),
  maxDate: new Date(2020, 0, 31),
  startDate: new Date(2020, 0, 4),
  endDate: new Date(2020, 0, 18),
  maxDateRange: 31,
  tooltip: 'Date range limited to 31 days',
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
    minDate: {
      control: 'date',
    },
    maxDate: {
      control: 'date',
    },
    startDate: {
      control: 'date',
    },
    endDate: {
      control: 'date',
    },
  },
};
