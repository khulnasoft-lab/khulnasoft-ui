import { disableControls } from '../../../utils/stories_utils';
import { makeContainer } from '../../../utils/story_decorators/container';
import readme from './daterange_picker.md';
import GlDaterangePicker from './daterange_picker.vue';

const currentYear = 2021;
const defaultStartDateVal = new Date(currentYear, 9, 4);
const defaultEndDateVal = new Date(currentYear, 9, 24);
const defaultMinDateVal = new Date(currentYear, 9, 1);
const defaultMaxDateVal = new Date(currentYear, 11, 30);

const defaultValue = (prop) => GlDaterangePicker.props[prop].default;

const generateProps = ({
  fromLabel = defaultValue('fromLabel'),
  toLabel = defaultValue('toLabel'),
  defaultMinDate = defaultMinDateVal,
  defaultMaxDate = defaultMaxDateVal,
  defaultStartDate = defaultStartDateVal,
  defaultEndDate = defaultEndDateVal,
  maxDateRange = 0,
  sameDaySelection = false,
  tooltip = '',
  startPickerClass,
  endPickerClass,
  labelClass,
  theme = defaultValue('theme'),
  startOpened = false,
} = {}) => ({
  defaultMinDate: new Date(defaultMinDate),
  defaultMaxDate: new Date(defaultMaxDate),
  defaultStartDate: new Date(defaultStartDate),
  defaultEndDate: new Date(defaultEndDate),
  maxDateRange,
  sameDaySelection,
  tooltip,
  fromLabel,
  toLabel,
  startPickerClass,
  endPickerClass,
  labelClass,
  theme,
  startOpened,
});

const Template = (template, props) => ({
  components: { GlDaterangePicker },
  props: Object.keys(props),
  data() {
    return {
      defaultMinDateVal: this.defaultMinDate,
      defaultMaxDateVal: this.defaultMaxDate,
      defaultStartDateVal: this.defaultStartDate,
      defaultEndDateVal: this.defaultEndDate,
    };
  },
  watch: {
    defaultMinDate(val) {
      this.defaultMinDateVal = new Date(val);
    },
    defaultMaxDate(val) {
      this.defaultMaxDateVal = new Date(val);
    },
  },
  template,
});

const defaultTemplate = `
        <gl-daterange-picker
          class="gl-display-flex"
          :default-min-date="defaultMinDateVal"
          :default-max-date="defaultMaxDateVal"
          :default-start-date="defaultStartDate"
          :default-end-date="defaultEndDate"
          :max-date-range="maxDateRange"
          :same-day-selection="sameDaySelection"
          :tooltip="tooltip"
          :from-label="fromLabel"
          :to-label="toLabel"
          :start-picker-class="startPickerClass"
          :end-picker-class="endPickerClass"
          :label-class="labelClass"
          :theme="theme"
          :start-opened="startOpened"
        /> `;
export const Default = Template.bind({}, defaultTemplate);
Default.args = generateProps();

const withDatesSelectedAndTooltipTemplate = `<gl-daterange-picker
                                                class="gl-display-flex"
                                                :default-min-date="defaultMinDateVal"
                                                :default-max-date="defaultMaxDateVal"
                                                :default-start-date="defaultStartDate"
                                                :default-end-date="defaultEndDate"
                                                :max-date-range="maxDateRange"
                                                :same-day-selection="sameDaySelection"
                                                :tooltip="tooltip"
                                                :from-label="fromLabel"
                                                :to-label="toLabel"
                                                :start-picker-class="startPickerClass"
                                                :end-picker-class="endPickerClass"
                                                :label-class="labelClass"
                                                :start-opened="startOpened"
                                                :theme="theme">
                                                    <template #default="{ daysSelected }">
                                                      <span v-if="daysSelected === 1">{{ daysSelected }} day selected</span>
                                                      <span v-else-if="daysSelected > -1">{{ daysSelected }} days selected</span>
                                                      <span v-else>No days selected</span>
                                                    </template>
                                              </gl-daterange-picker>`;
export const WithDatesSelectedAndTooltip = Template.bind({}, withDatesSelectedAndTooltipTemplate);
WithDatesSelectedAndTooltip.args = generateProps({
  tooltip: 'Date range limited to 31 days',
  maxDateRange: 31,
});

export default {
  title: 'base/daterange-picker',
  component: GlDaterangePicker,
  decorators: [makeContainer({ height: '300px' })],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    ...disableControls([
      'i18n',
      'startPickerTarget',
      'startPickerContainer',
      'endPickerTarget',
      'endPickerContainer',
      'defaultStartDate',
      'defaultEndDate',
    ]),
    defaultMinDate: {
      control: 'date',
    },
    defaultMaxDate: {
      control: 'date',
    },
  },
};
