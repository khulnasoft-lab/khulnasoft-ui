<script>
import { uniqueId } from 'lodash';
import GlFormGroup from '../form_group/form_group.vue';
import GlFormInput from '../form_input/form_input.vue';

export default {
  name: 'GlFormDate',
  components: {
    GlFormGroup,
    GlFormInput,
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: 'Enter date',
    },
    labelClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
    labelSrOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
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
    value: {
      type: Date,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      currentDate: this.value,
      currentValue: this.dateToRFC3339String(this.value),
      inputId: this.id || uniqueId('form-date-'),
    };
  },
  computed: {
    invalidFeedback() {
      if (!this.currentDate) return null;
      if (this.minDate && this.currentDate < this.minDate) {
        return `Min ${this.dateToRFC3339String(this.minDate)}`;
      }
      if (this.maxDate && this.currentDate > this.maxDate) {
        return `Max ${this.dateToRFC3339String(this.maxDate)}`;
      }
      return null;
    },
    min() {
      return this.dateToRFC3339String(this.minDate);
    },
    max() {
      return this.dateToRFC3339String(this.maxDate);
    },
    outputValue() {
      if (this.currentDate) {
        /**
         * Get user's locale string e.g. 'en-US' and format date
         * to local full string e.g 'Thursday, 6 October 2022'
         */
        const lang = new Intl.NumberFormat().resolvedOptions().locale;
        return new Intl.DateTimeFormat(lang, { dateStyle: 'full' }).format(this.currentDate);
      }
      return null;
    },
    state() {
      return this.currentDate
        && (this.minDate && this.currentDate >= this.minDate)
        && (this.maxDate && this.currentDate <= this.maxDate);
    },
  },
  methods: {
    dateToRFC3339String(date) {
      /**
       * convert Date instance to RFC3339 local YYYY-MM-DD string
       * @property {Date} date The provided date
       */
      if (!date) return null;
      const pad = (n) => n < 10 ? `0${n}` : n;
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    },
    change(currentValue) {
      this.currentDate = new Date(currentValue);
      this.$emit('change', currentValue);
    },
  },
};
</script>
<template>
  <gl-form-group
    class="gl-form-date"
    :label="label"
    :label-class="labelClass"
    :label-for="inputId"
    :label-sr-only="labelSrOnly"
    :invalid-feedback="invalidFeedback"
  >
    <gl-form-input
      :id="inputId"
      v-model="currentValue"
      v-bind="$attrs"
      :min="min"
      :max="max"
      :state="state"
      type="date"
      @change="change"
    />
    <output
      :for="inputId"
      class="gl-sr-only"
    >
      {{ outputValue }}
    </output>
  </gl-form-group>
</template>
