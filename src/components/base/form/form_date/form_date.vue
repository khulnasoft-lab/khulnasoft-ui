<script>
import { uniqueId } from 'lodash';
import GlFormInput from '../form_input/form_input.vue';

export default {
  name: 'GlFormDate',
  components: {
    GlFormInput,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
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
      currentValue: this.value ? this.dateToRFC3339String(this.value) : null,
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
       * convert Date instance to RFC3339 YYYY-MM-DD string
       * @property {Date} date The provided date
       */
      return date ? new Date(date).toISOString().split('T')[0] : null;
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
      :autofocus="autofocus"
      :disabled="disabled"
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
