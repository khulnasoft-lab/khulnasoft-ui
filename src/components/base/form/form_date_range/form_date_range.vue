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
      fromInputId: uniqueId('from-input-'),
      toInputId: uniqueId('to-input-'),
      startDate: this.defaultStartDate,
      endDate: this.defaultEndDate,
    };
  },
  computed: {
    fromCalendarMinDate() {
      if (this.endDate && this.maxDateRange) {
        const effectiveMaxDateRange = this.sameDaySelection ? this.maxDateRange + 1 : this.maxDateRange;
        const computedMinStartDate = getDateInPast(this.endDate, effectiveMaxDateRange);
        return this.defaultMinDate ? new Date(Math.max(computedMinStartDate, this.defaultMinDate)) : computedMinStartDate;
      }
      return this.defaultMinDate ? this.defaultMinDate : null;
    },
    fromCalendarMaxDate() {
      if (this.endDate) {
        return this.sameDaySelection ? this.endDate : getDateInPast(this.endDate, 1);
      }
      return this.defaultMaxDate ? getDateInPast(this.defaultMaxDate, 1) : null;
    },
    toCalendarMinDate() {
      if (this.startDate) {
        return this.sameDaySelection ? this.startDate : getDateInFuture(this.startDate, 1);
      }
      return this.defaultMinDate ? this.defaultMinDate : null;
    },
    toCalendarMaxDate() {
      if (this.startDate && this.maxDateRange) {
        const effectiveMaxDateRange = this.sameDaySelection ? this.maxDateRange - 1 : this.maxDateRange;
        const computedMaxEndDate = getDateInFuture(this.startDate, effectiveMaxDateRange);
        return this.defaultMaxDate ? new Date(Math.min(computedMaxEndDate, this.defaultMaxDate)) : computedMaxEndDate;
      }
      return this.defaultMaxDate ? this.defaultMaxDate : null;
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
      this.startDate = new Date(startDate);

      if (this.dateRangeViolation) {
        this.endDate = null;
      } else {
        this.$emit('input', { startDate, endDate: this.endDate });
      }
    },
    onEndDateSelected(endDate) {
      this.endDate = new Date(endDate);
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
        :min-date="fromCalendarMinDate"
        :max-date="fromCalendarMaxDate"
        @change="onStartDateSelected"
      />
    </div>
    <div :class="endPickerClass">
      <label :class="labelClass" :for="toInputId">{{ toLabel }}</label>
      <gl-form-date
        :id="toInputId"
        v-model="endDate"
        :min-date="toCalendarMinDate"
        :max-date="toCalendarMaxDate"
        @change="onEndDateSelected"
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
