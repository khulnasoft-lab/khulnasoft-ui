import { withKnobs, date, number, boolean, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './daterange_picker.md';
import GlDaterangePicker from './daterange_picker.vue';

const currentYear = 2020;

const defaultStartDate = new Date(currentYear, 7, 27);
const defaultEndDate = new Date(currentYear, 7, 28);
const defaultMinDate = new Date(currentYear, 0, 1);
const defaultMaxDate = new Date(currentYear, 11, 31);

const template = (slot = '') => `
  <gl-daterange-picker
    class="d-flex"
    :default-min-date="defaultMinDate"
    :default-max-date="defaultMaxDate"
    :default-start-date="defaultStartDate"
    :default-end-date="defaultEndDate"
    :max-date-range="maxDateRange"
    :same-day-selection="sameDaySelection"
    :tooltip="tooltip"
    v-model="value"
  >${slot}</gl-daterange-picker>`;

function dateTypeKnob(name, defaultValue) {
  return new Date(date(name, defaultValue));
}

function generateProps(props = {}) {
  return {
    defaultMinDate: {
      type: Date,
      default: dateTypeKnob('defaultMinDate', defaultMinDate),
    },
    defaultMaxDate: {
      type: Date,
      default: dateTypeKnob('defaultMaxDate', defaultMaxDate),
    },
    defaultStartDate: {
      type: Date,
      default: dateTypeKnob('startDate', defaultStartDate),
    },
    defaultEndDate: {
      type: Date,
      default: dateTypeKnob('endDate', defaultEndDate),
    },
    maxDateRange: {
      type: Number,
      default: number('maxDateRange', 0),
    },
    sameDaySelection: {
      type: Boolean,
      default: boolean('sameDaySelection', false),
    },
    tooltip: {
      default: text('tooltip', ''),
    },
    ...props,
  };
}

documentedStoriesOf('base/daterange-picker', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components: {
      GlDaterangePicker,
    },
    data() {
      return {
        value: {
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        },
      };
    },
    template: template(),
  }))
  .add('with days selected and tooltip', () => ({
    props: generateProps({
      maxDateRange: {
        default: number('maxDateRange', 31),
      },
      tooltip: {
        default: text('tooltip', 'Date range limited to 31 days'),
      },
    }),
    components: {
      GlDaterangePicker,
    },
    data() {
      return {
        value: {
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        },
      };
    },
    template: template(`
      <template #default="{ daysSelected }">
        <span v-if="daysSelected === 1">{{ daysSelected }} day selected</span>
        <span v-else-if="daysSelected > -1">{{ daysSelected }} days selected</span>
        <span v-else>No days selected</span>
      </template>
    `),
  }));
