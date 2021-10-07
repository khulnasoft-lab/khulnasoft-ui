import { withKnobs, date } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { useFakeDate } from '../../../utils/use_fake_date';
import readme from './datepicker.md';
import GlDatepicker from './datepicker.vue';

const currentYear = 2020;

const defaultDate = new Date(currentYear, 0, 15);
const defaultMinDate = new Date(currentYear, 0, 1);
const defaultMaxDate = new Date(currentYear, 2, 31);

function dateTypeKnob(name, defaultValue) {
  return new Date(date(name, defaultValue));
}

function generateProps() {
  return {
    minDate: {
      type: Date,
      default: dateTypeKnob('minDate', defaultMinDate),
    },
    maxDate: {
      type: Date,
      default: dateTypeKnob('maxDate', defaultMaxDate),
    },
  };
}

documentedStoriesOf('base/datepicker', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components: {
      GlDatepicker,
    },
    mixins: [useFakeDate()],
    data() {
      return {
        value: defaultDate,
      };
    },
    template: `
      <gl-datepicker :max-date="maxDate" :min-date="minDate" :start-opened="true" v-model="value">
      </gl-datepicker>
    `,
  }))
  .add('custom trigger', () => ({
    props: generateProps(),
    components: {
      GlDatepicker,
    },
    data() {
      return {
        value: null,
      };
    },
    template: `
      <div>
        <div class="dropdown">
          <button type="button" class="dropdown-menu-toggle">
            <span class="dropdown-toggle-text"> Start date: {{value}} </span>
          </button>
        </div>
        <gl-datepicker v-model="value" target=".dropdown-menu-toggle" :container="null" />
      </div>
    `,
  }))
  .add('with clear button', () => ({
    props: generateProps(),
    components: {
      GlDatepicker,
    },
    mixins: [useFakeDate()],
    data() {
      return {
        value: defaultDate,
      };
    },
    template: `
      <gl-datepicker showClearButton :max-date="maxDate" :min-date="minDate" v-model="value">
      </gl-datepicker>
    `,
  }));
