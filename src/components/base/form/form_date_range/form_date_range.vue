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
  props: {
    minDate: {
      type: Date,
      required: false,
      default: null,
    },
    maxDate: {
      type: Date,
      required: false,
      default: null,
    },
    startDate: {
      type: Date,
      required: false,
      default: null,
    },
    startLabel: {
      type: String,
      required: false,
      default: 'From',
    },
    startClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
    endDate: {
      type: Date,
      required: false,
      default: null,
    },
    endLabel: {
      type: String,
      required: false,
      default: 'To',
    },
    endClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
    labelClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
    maxDateRange: {
      type: Number,
      required: false,
      default: 0,
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
    indicatorClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
  },
  data() {
    return {
      currentStartDate: this.startDate,
      currentEndDate: this.endDate,
      startInputId: uniqueId('start-input-'),
      endInputId: uniqueId('end-input-'),
    };
  },
  computed: {
    startMinDate() {
      if (this.currentEndDate && this.maxDateRange) {
        const effectiveMaxDateRange = this.sameDaySelection ? this.maxDateRange + 1 : this.maxDateRange;
        const computedMinStartDate = getDateInPast(this.currentEndDate, effectiveMaxDateRange);
        return this.minDate ? new Date(Math.max(computedMinStartDate, this.minDate)) : computedMinStartDate;
      }
      return this.minDate ? this.minDate : null;
    },
    startMaxDate() {
      if (this.currentEndDate) {
        return this.sameDaySelection ? this.currentEndDate : getDateInPast(this.currentEndDate, 1);
      }
      return this.maxDate ? getDateInPast(this.maxDate, 1) : null;
    },
    endMinDate() {
      if (this.currentStartDate) {
        return this.sameDaySelection ? this.currentStartDate : getDateInFuture(this.currentStartDate, 1);
      }
      return this.minDate ? this.minDate : null;
    },
    endMaxDate() {
      if (this.currentStartDate && this.maxDateRange) {
        const effectiveMaxDateRange = this.sameDaySelection ? this.maxDateRange - 1 : this.maxDateRange;
        const computedMaxEndDate = getDateInFuture(this.currentStartDate, effectiveMaxDateRange);
        return this.maxDate ? new Date(Math.min(computedMaxEndDate, this.maxDate)) : computedMaxEndDate;
      }
      return this.maxDate ? this.maxDate : null;
    },
    dateRangeViolation() {
      return this.currentStartDate >= this.currentEndDate || this.exceedsDateRange;
    },
    exceedsDateRange() {
      if (this.numberOfDays < 0) {
        return false;
      }
      return this.maxDateRange && this.numberOfDays > this.maxDateRange;
    },
    numberOfDays() {
      if (!this.currentStartDate || !this.currentEndDate) {
        return -1;
      }
      const numberOfDays = getDayDifference(this.currentStartDate, this.currentEndDate);
      return this.sameDaySelection ? numberOfDays + 1 : numberOfDays;
    },
  },
  methods: {
    onChangeStartDate(currentStartDate) {
      this.currentStartDate = currentStartDate ? new Date(currentStartDate) : null;

      if (this.dateRangeViolation) {
        this.currentEndDate = null;
      } else {
        this.$emit('input', { startDate: currentStartDate, endDate: this.currentEndDate });
      }
    },
    onChangeEndDate(currentEndDate) {
      this.currentEndDate = currentEndDate ? new Date(currentEndDate) : null;
      this.$emit('input', { startDate: this.currentStartDate, endDate: currentEndDate });
    },
  },
};
</script>
<template>
  <div
    class="gl-form-date-range"
  >
    <div :class="startClass">
      <label :class="labelClass" :for="startInputId">{{ startLabel }}</label>
      <gl-form-date
        :id="startInputId"
        v-model="currentStartDate"
        :min-date="startMinDate"
        :max-date="startMaxDate"
        @change="onChangeStartDate"
      />
    </div>
    <div :class="endClass">
      <label :class="labelClass" :for="endInputId">{{ endLabel }}</label>
      <gl-form-date
        :id="endInputId"
        v-model="currentEndDate"
        :min-date="endMinDate"
        :max-date="endMaxDate"
        @change="onChangeEndDate"
      />
    </div>
    <div
      :class="indicatorClass"
      data-testid="gl-form-date-range-indicator"
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
