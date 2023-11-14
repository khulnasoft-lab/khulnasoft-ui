<script>
import { BFormSelect } from 'bootstrap-vue';
import isObject from 'lodash/isObject';
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
  },
  computed: {
    cssClasses() {
      if (this.width === null) {
        return [];
      }

      if (isObject(this.width)) {
        const { default: defaultWidth, ...nonDefaultWidths } = this.width;

        return [
          ...(defaultWidth ? [`gl-form-select-${defaultWidth}`] : []),
          ...Object.entries(nonDefaultWidths).map(
            ([breakpoint, width]) => `gl-${breakpoint}-form-select-${width}`
          ),
        ];
      }

      return [`gl-form-select-${this.width}`];
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
