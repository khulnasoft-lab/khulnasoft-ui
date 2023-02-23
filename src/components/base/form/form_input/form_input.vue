<script>
import isObject from 'lodash/isObject';
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
      type: [String, Object],
      required: false,
      default: null,
      validator: (value) => {
        const sizes = isObject(value) ? Object.values(value) : [value];

        return sizes.every((size) => Object.values(formInputSizes).includes(size));
      },
    },
  },
  computed: {
    cssClasses() {
      if (this.size === null) {
        return [];
      }

      if (isObject(this.size)) {
        const { default: defaultSize, ...nonDefaultSizes } = this.size;

        return [
          ...(defaultSize ? [`gl-form-input-${defaultSize}`] : []),
          ...Object.entries(nonDefaultSizes).map(
            ([breakpoint, size]) => `gl-${breakpoint}-form-input-${size}`
          ),
        ];
      }

      return [`gl-form-input-${this.size}`];
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
