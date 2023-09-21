<script>
import { BFormSelect } from 'bootstrap-vue';
import isObject from 'lodash/isObject';
import { formInputSizes } from '../../../../utils/constants';

export default {
  name: 'GlFormSelect',
  components: {
    BFormSelect,
  },
  inheritAttrs: false,
  props: {
    /**
     * Maximum width of the Select
     */
    width: {
      type: [String, Object],
      required: false,
      default: null,
      validator: (value) => {
        const widths = isObject(value) ? Object.values(value) : [value];

        return widths.every((width) => Object.values(formInputSizes).includes(width));
      },
    },
    /**
     * ⚠️ DEPRECATED:
     *
     * Will be replaced by the
     * property width
     *
     * Maximum width of the Select
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
    computedWidth() {
      return this.width ? this.width : this.size;
    },
    cssClasses() {
      if (this.computedWidth === null) {
        return [];
      }

      if (isObject(this.computedWidth)) {
        const { default: defaultSize, ...nonDefaultSizes } = this.computedWidth;

        return [
          ...(defaultSize ? [`gl-form-select-${defaultSize}`] : []),
          ...Object.entries(nonDefaultSizes).map(
            ([breakpoint, size]) => `gl-${breakpoint}-form-select-${size}`
          ),
        ];
      }

      return [`gl-form-select-${this.computedWidth}`];
    },
  },
};
</script>
<template>
  <b-form-select class="gl-form-select" v-bind="$attrs" :class="cssClasses" v-on="$listeners">
    <!-- eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots -->
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-form-select>
</template>
