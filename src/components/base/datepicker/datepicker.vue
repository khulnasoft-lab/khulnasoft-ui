<!-- eslint-disable vue/multi-word-component-names -->
<script>
import isString from 'lodash/isString';
import Pikaday from 'pikaday';
import { defaultDateFormat, datepickerWidthOptionsMap } from '../../../utils/constants';
import { areDatesEqual } from '../../../utils/datetime_utility';
import GlButton from '../button/button.vue';
import GlFormInput from '../form/form_input/form_input.vue';
import GlIcon from '../icon/icon.vue';

export const pad = (val, len = 2) => `0${val}`.slice(-len);

/**
 * Used `onSelect` method in pickaday
 * @param {Date} date UTC format
 * @return {String} Date formated in yyyy-mm-dd
 */
export const defaultDateFormatter = (date) => {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const isBefore = (compareTo, date) => compareTo && date && date.getTime() < compareTo.getTime();

const highlightPastDates = (pikaday) => {
  const pikaButtons = pikaday.el.querySelectorAll('.pika-button');
  const today = new Date();

  pikaButtons.forEach((pikaButton) => {
    const { pikaYear, pikaMonth, pikaDay } = pikaButton.dataset;
    const pikaButtonDate = new Date(pikaYear, pikaMonth, pikaDay);

    if (isBefore(today, pikaButtonDate)) {
      pikaButton.classList.add('is-past-date');
    }
  });
};

export default {
  name: 'GlDatepicker',
  components: {
    GlFormInput,
    GlIcon,
    GlButton,
  },
  props: {
    /**
     * Selector of element that triggers the datepicker. Defaults to the calendar icon. Pass `null` to trigger on input focus.
     */
    target: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * DOM node to render calendar into. Defaults to the datepicker container. Pass `null` to use Pikaday default.
     */
    container: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: Date,
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
    startRange: {
      type: Date,
      required: false,
      default: null,
    },
    endRange: {
      type: Date,
      required: false,
      default: null,
    },
    /**
     * Accepts a function that accepts a date as argument and returns true if the date is disabled.
     */
    disableDayFn: {
      type: Function,
      required: false,
      default: null,
    },
    firstDay: {
      type: Number,
      required: false,
      default: 0,
    },
    ariaLabel: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: defaultDateFormat,
    },
    /**
     * Defaults to `off` when datepicker opens on focus, otherwise defaults to `null`.
     */
    autocomplete: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    displayField: {
      type: Boolean,
      required: false,
      default: true,
    },
    startOpened: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Use this prop to set the initial date for the datepicker.
     */
    defaultDate: {
      type: Date,
      required: false,
      default: null,
    },
    i18n: {
      type: Object,
      required: false,
      default: null,
    },
    theme: {
      type: String,
      required: false,
      default: '',
    },
    showClearButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    inputId: {
      type: String,
      required: false,
      default: null,
    },
    inputLabel: {
      type: String,
      required: false,
      default: 'Enter date',
    },
    inputName: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Maximum width of the Datepicker
     */
    width: {
      type: String,
      required: false,
      default: null,
      validator: (value) => Object.keys(datepickerWidthOptionsMap).includes(value),
    },
  },
  data() {
    return {
      textInput: '',
    };
  },
  computed: {
    formattedDate() {
      return 'calendar' in this ? this.calendar.toString() : '';
    },
    customTrigger() {
      return isString(this.target) && this.target !== '';
    },
    triggerOnFocus() {
      return this.target === null;
    },
    showDefaultField() {
      return !this.customTrigger || this.triggerOnFocus;
    },
    renderClearButton() {
      return this.showClearButton && this.textInput !== '' && !this.disabled;
    },
    inputAutocomplete() {
      if (this.autocomplete !== '') {
        return this.autocomplete;
      }

      if (this.triggerOnFocus) {
        return 'off';
      }

      return null;
    },
    datepickerClasses() {
      return [
        'gl-datepicker',
        'd-inline-block',
        'gl-w-full',
        `gl-form-input-${this.computedWidth}`,
      ];
    },
    computedWidth() {
      if (this.width) {
        return this.width;
      }

      return 'md';
    },
  },
  watch: {
    value(val) {
      if (!areDatesEqual(val, this.calendar.getDate())) {
        this.calendar.setDate(val, true);
      }
    },
    minDate(minDate) {
      this.calendar.setMinDate(minDate);
    },
    maxDate(maxDate) {
      this.calendar.setMaxDate(maxDate);
    },
    startRange(startRange) {
      this.calendar.setStartRange(startRange);
    },
    endRange(endRange) {
      this.calendar.setEndRange(endRange);
    },
  },
  mounted() {
    const $parentEl = this.$parent.$el;
    const drawEvent = this.draw.bind(this);

    const pikadayConfig = {
      field: this.$el.querySelector('input[type="text"]'),
      // `position-absolute` is needed because of this bug: https://github.com/Pikaday/Pikaday/issues/840
      theme: `gl-datepicker-theme position-absolute ${this.theme}`,
      defaultDate: this.defaultDate || this.value,
      setDefaultDate: Boolean(this.value) || Boolean(this.defaultDate),
      minDate: this.minDate,
      maxDate: this.maxDate,
      // Only supports default gitlab format YYYY-MM-DD. We have to decide if we want to support other formats.
      format: defaultDateFormat,
      parse: (dateString) => {
        const parsedDate = Date.parse(dateString.replace(/-/g, '/'));

        return Number.isNaN(parsedDate) ? new Date() : new Date(parsedDate);
      },
      disableDayFn: this.disableDayFn,
      firstDay: this.firstDay,
      ariaLabel: this.ariaLabel,
      toString: (date) => defaultDateFormatter(date),
      onSelect: this.selected.bind(this),
      onClose: this.closed.bind(this),
      onOpen: this.opened.bind(this),
      onDraw: (pikaday) => {
        highlightPastDates(pikaday);
        drawEvent();
      },
    };

    // Pass `null` as `target` prop to use the `field` as the trigger (open on focus)
    if (!this.triggerOnFocus && !this.disabled) {
      const trigger = this.customTrigger
        ? $parentEl.querySelector(this.target)
        : this.$refs.calendarTriggerBtn.$el;
      pikadayConfig.trigger = trigger;

      // Set `trigger` as the `field` if `field` element doesn't exist (not passed via the slot)
      if (!pikadayConfig.field && this.customTrigger) {
        pikadayConfig.field = trigger;
      }
    }

    // Pass `null` as `container` prop to prevent passing the `container` option to Pikaday
    if (this.container !== null) {
      const container = this.container ? $parentEl.querySelector(this.container) : this.$el;
      pikadayConfig.container = container;
    }

    if (this.i18n) {
      pikadayConfig.i18n = this.i18n;
    }

    this.calendar = new Pikaday(pikadayConfig);

    if (this.startOpened) {
      this.calendar.show();
    }
  },
  beforeDestroy() {
    this.calendar.destroy();
  },
  methods: {
    // is used to open datepicker programmatically
    show() {
      this.calendar.show();
    },

    selected(date) {
      /**
       * Emitted when a new date has been selected.
       * @property {Date} date The selected date
       */
      this.$emit('input', date);
    },
    closed() {
      /**
       * Emitted when the datepicker is hidden.
       */
      this.$emit('close');
    },
    opened() {
      /**
       * Emitted when the datepicker becomes visible.
       */
      this.$emit('open');
    },
    cleared() {
      this.textInput = '';
      /**
       * Emitted when the clear button is clicked.
       */
      this.$emit('clear');
    },
    draw() {
      /**
       * Emitted when the datepicker draws a new month.
       */
      this.$emit('monthChange');
    },
    onKeydown() {
      if (this.textInput === '') {
        const resetDate = this.minDate || null;
        this.calendar.setDate(resetDate);
        this.selected(resetDate);
      }
    },
  },
};
</script>

<template>
  <div :class="datepickerClasses">
    <div v-if="showDefaultField" class="gl-relative">
      <!--
      @slot (optional) Input to display and bind the datepicker to. Defaults to `<gl-form-input />`
      @binding {string} formattedDate
      -->
      <slot :formatted-date="formattedDate">
        <gl-form-input
          :id="inputId"
          v-model="textInput"
          :name="inputName"
          data-testid="gl-datepicker-input"
          class="gl-w-full"
          :class="renderClearButton ? 'gl-pr-9!' : 'gl-pr-7!'"
          :value="formattedDate"
          :placeholder="placeholder"
          :autocomplete="inputAutocomplete"
          :disabled="disabled"
          :aria-label="inputLabel"
          @keydown.enter="onKeydown"
        />
      </slot>
      <div class="gl-datepicker-actions">
        <gl-button
          v-if="renderClearButton"
          data-testid="clear-button"
          class="gl-pointer-events-auto"
          aria-label="Clear date"
          category="tertiary"
          size="small"
          icon="clear"
          @click="cleared"
        />
        <span
          v-if="triggerOnFocus || disabled"
          data-testid="datepicker-calendar-icon"
          class="gl-px-2"
          :class="disabled ? 'gl-text-gray-400' : 'gl-text-gray-500'"
        >
          <gl-icon class="gl-display-block" name="calendar" :size="16" />
        </span>
        <gl-button
          v-else
          ref="calendarTriggerBtn"
          class="gl-pointer-events-auto"
          aria-label="Open datepicker"
          category="tertiary"
          size="small"
          icon="calendar"
        />
      </div>
    </div>
    <slot v-else :formatted-date="formattedDate"> </slot>
  </div>
</template>
