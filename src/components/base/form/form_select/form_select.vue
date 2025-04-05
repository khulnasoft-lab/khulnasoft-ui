<script>
import isObject from 'lodash/isObject';
import { BFormSelect } from '../../../../vendor/bootstrap-vue/src/components/form-select/form-select';
import { formInputWidths } from '../../../../utils/constants';

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

        return widths.every((width) => Object.values(formInputWidths).includes(width));
      },
    },
    selectClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
  },
  computed: {
    cssClasses() {
      if (this.width === null) {
        return [];
      }

      if (isObject(this.width)) {
        const { default: defaultWidth, ...nonDefaultWidths } = this.width;

        return [
          // eslint-disable-next-line @gitlab/tailwind-no-interpolation -- Not a CSS utility
          ...(defaultWidth ? [`gl-form-select-${defaultWidth}`] : []),
          ...Object.entries(nonDefaultWidths).map(
            // eslint-disable-next-line @gitlab/tailwind-no-interpolation -- Not a CSS utility
            ([breakpoint, width]) => `gl-${breakpoint}-form-select-${width}`
          ),
        ];
      }

      // eslint-disable-next-line @gitlab/tailwind-no-interpolation -- Not a CSS utility
      return [`gl-form-select-${this.width}`];
    },
  },
};
</script>
<template>
  <span class="gl-form-select-wrapper" :class="cssClasses">
    <b-form-select class="gl-form-select" v-bind="$attrs" :class="selectClass" v-on="$listeners">
      <!-- eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots -->
      <template v-for="slot in Object.keys($slots)" #[slot]>
        <slot :name="slot"></slot>
      </template>
    </b-form-select>
  </span>
</template>
