<script>
import { uniqueId } from 'lodash';
import { GlTooltipDirective } from '../../../../directives/tooltip';
import { getDayDifference, getDateInPast, getDateInFuture } from '../../../../utils/datetime_utility';
import GlFormDate from '../form_date/form_date.vue';
import GlIcon from '../../icon/icon.vue';

export default {
  name: 'GlFormDateRange',
  components: {
    GlFormDate,
    GlIcon,
  },
  directives: {
    GlTooltip: GlTooltipDirective,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    fromLabel: {
      type: String,
      required: false,
      default: 'From',
    },
    toLabel: {
      type: String,
      required: false,
      default: 'To',
    },
    labelClass: {
      type: String,
      required: false,
      default: '',
    },
    defaultMinDate: {
      type: Date,
      required: false,
      default: null,
    },
    defaultMaxDate: {
      type: Date,
      required: false,
      default: null,
    },
    defaultStartDate: {
      type: Date,
      required: false,
      default: null,
    },
    defaultEndDate: {
      type: Date,
      required: false,
      default: null,
    },
    maxDateRange: {
      type: Number,
      required: false,
      default: 0,
    },
    startPickerClass: {
      type: String,
      required: false,
      default: '',
    },
    endPickerClass: {
      type: String,
      required: false,
      default: '',
    },
    sameDaySelection: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * If provided, renders an info icon with a tooltip.
     */
    tooltip: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Additional class(es) to apply to the date range indicator section.
     */
    dateRangeIndicatorClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
  },
  data() {
    return {
      fromCalendarMaxDate: this.defaultMaxDate ? getDateInPast(this.defaultMaxDate, 1) : null,
      fromInputId: uniqueId('from-input-'),
      toInputId: uniqueId('to-input-'),
      startDate: this.defaultStartDate,
      endDate: this.defaultEndDate,
    };
  },
  computed: {
    effectiveMaxDateRange() {
      return this.sameDaySelection ? this.maxDateRange - 1 : this.maxDateRange;
    },
    toCalendarMinDate() {
      if (!this.startDate) return this.defaultMinDate;
      return this.sameDaySelection ? this.startDate : getDateInFuture(this.startDate, 1);
    },
    toCalendarMaxDate() {
      if (!this.startDate || !this.maxDateRange) return this.defaultMaxDate;
      const computedMaxEndDate = getDateInFuture(this.startDate, this.effectiveMaxDateRange);
      return new Date(Math.min(computedMaxEndDate, this.defaultMaxDate));
    },
    dateRangeViolation() {
      return this.startDate >= this.endDate || this.exceedsDateRange;
    },
    exceedsDateRange() {
      if (this.numberOfDays < 0) {
        return false;
      }
      return this.maxDateRange && this.numberOfDays > this.maxDateRange;
    },
    toCalendarDefaultDate() {
      return this.endDate || this.toCalendarMinDate;
    },
    numericStartTime() {
      return this.startDate ? this.startDate.getTime() : null;
    },
    numberOfDays() {
      if (!this.startDate || !this.endDate) {
        return -1;
      }
      const numberOfDays = getDayDifference(this.startDate, this.endDate);
      return this.sameDaySelection ? numberOfDays + 1 : numberOfDays;
    },
  },
  watch: {
    value(val) {
      const { startDate, endDate } = val;
      this.startDate = startDate;
      this.endDate = endDate;
    },
  },
  methods: {
    onStartDateSelected(startDate) {
      this.startDate = startDate;

      if (this.dateRangeViolation) {
        this.endDate = null;
      } else {
        this.$emit('input', { startDate, endDate: this.endDate });
      }
    },
    onEndDateSelected(endDate) {
      this.endDate = endDate;
      /**
       * Emitted when start or end date selected with {startDate, endDate} value
       *
       * @event input
       * */
      this.$emit('input', { startDate: this.startDate, endDate });
    },
  },
};
</script>
<template>
  <div
    class="gl-form-date-range"
  >
    <div :class="startPickerClass">
      <label :class="labelClass" :for="fromInputId">{{ fromLabel }}</label>
      <gl-form-date
        :id="fromInputId"
        v-model="startDate"
        :min-date="defaultMinDate"
        :max-date="fromCalendarMaxDate"
        @input="onStartDateSelected"
      />
    </div>
    <div :class="endPickerClass">
      <label :class="labelClass" :for="toInputId">{{ toLabel }}</label>
      <gl-form-date
        :id="toInputId"
        v-model="endDate"
        :min-date="toCalendarMinDate"
        :max-date="toCalendarMaxDate"
        @input="onEndDateSelected"
      />
    </div>
    <div
      :class="dateRangeIndicatorClass"
      data-testid="daterange-picker-indicator"
      class="gl-display-flex gl-flex-direction-row gl-align-items-center gl-text-gray-500"
    >
      <!-- @slot Content to display for days selected. The value is -1 when no date range is selected.-->
      <slot v-bind="{ daysSelected: numberOfDays }"></slot>
      <gl-icon
        v-if="tooltip"
        v-gl-tooltip
        name="information-o"
        :title="tooltip"
        :size="16"
        class="gl-ml-2"
      />
    </div>
  </div>
</template>
