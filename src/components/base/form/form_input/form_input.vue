<script>
import { BFormInput } from 'bootstrap-vue';
import { formInputSizes } from '../../../../utils/constants';

const MODEL_PROP = 'value';
const MODEL_EVENT = 'input';

export default {
  components: {
    BFormInput,
  },
  inheritAttrs: false,
  model: {
    prop: MODEL_PROP,
    event: MODEL_EVENT,
  },
  props: {
    /**
     * Maximum width of the input
     */
    size: {
      type: String,
      required: false,
      default: null,
      validator: (value) => Object.values(formInputSizes).includes(value),
    },
  },
  computed: {
    cssClasses() {
      return {
        [`gl-form-input-${this.size}`]: this.size !== null,
      };
    },
    listeners() {
      return {
        ...this.$listeners,
        // Swap purpose of input and update events from underlying BFormInput.
        // See https://gitlab.com/gitlab-org/gitlab-ui/-/issues/631.
        input: (...args) => {
          /**
           * Emitted to update the v-model
           *
           * @event update
           * @property {string} value new value
           */
          this.$emit('update', ...args);
        },
        update: (...args) => {
          /**
           * Triggered by user interaction. Emitted after any formatting (not including 'trim' or 'number' props).
           * Useful for getting the currently entered value when the 'debounce' or 'lazy' props are set.
           *
           * @event input
           * @property {string} value new value
           */
          this.$emit(MODEL_EVENT, ...args);
        },
      };
    },
  },
};
</script>

<template>
  <b-form-input class="gl-form-input" :class="cssClasses" v-bind="$attrs" v-on="listeners" />
</template>
