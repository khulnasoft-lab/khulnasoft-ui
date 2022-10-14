<script>
import { uniqueId } from 'lodash';
import GlFormInput from '../form_input/form_input.vue';

export default {
  name: 'GlFormDate',
  components: {
    GlFormInput,
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: false,
      default: null,
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
      currentValue: this.dateToRFC3339String(this.value),
      inputId: this.id || uniqueId('form-date-'),
    };
  },
  computed: {
    min() {
      return this.dateToRFC3339String(this.minDate);
    },
    max() {
      return this.dateToRFC3339String(this.maxDate);
    },
    outputValue() {
      if (this.currentValue) {
        // YYYY-MM-DD string to Date() instance
        const date = new Date(this.currentValue);
        // Get user's locale string e.g. 'en-US'
        const lang = new Intl.NumberFormat().resolvedOptions().locale;
        // Format date to full string e.g 'Thursday, 6 October 2022'
        return new Intl.DateTimeFormat(lang, { dateStyle: 'full' }).format(date);
      }
      return null;
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
      this.$emit('change', currentValue);
    },
  },
};
</script>
<template>
  <div
    class="gl-form-date d-inline-block"
  >
    <gl-form-input
      :id="inputId"
      v-model="currentValue"
      v-bind="$attrs"
      :min="min"
      :max="max"
      type="date"
      @change="change"
    />
    <output
      :for="inputId"
      class="gl-sr-only"
    >
      {{ outputValue }}
    </output>
  </div>
</template>
