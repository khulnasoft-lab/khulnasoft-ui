<script>
import { BFormGroup } from 'bootstrap-vue';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';

export default {
  name: 'GlFormGroup',
  components: {
    BFormGroup,
  },
  inheritAttrs: false,
  props: {
    labelClass: {
      type: [String, Array, Object],
      required: false,
      default: null,
    },
    labelDescription: {
      type: String,
      required: false,
      default: '',
    },
    optional: {
      type: Boolean,
      required: false,
      default: false,
    },
    optionalText: {
      type: String,
      required: false,
      default: '(optional)',
    },
  },
  computed: {
    actualLabelClass() {
      const { labelClass } = this;
      const defaultClass = 'col-form-label';

      if (isString(labelClass)) {
        return `${labelClass} ${defaultClass}`;
      }
      if (Array.isArray(labelClass)) {
        return [...labelClass, defaultClass];
      }
      if (isPlainObject(labelClass)) {
        return { ...labelClass, [defaultClass]: true };
      }
      return defaultClass;
    },
    hasLabelDescription() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.labelDescription || this.$slots['label-description']);
    },
  },
};
</script>
<template>
  <b-form-group v-bind="$attrs" class="gl-form-group" :label-class="actualLabelClass">
    <template #label>
      <slot name="label">
        {{ $attrs.label }}
        <span v-if="optional" class="optional-label" data-testid="optional-label">{{
          optionalText
        }}</span>
      </slot>
      <div v-if="hasLabelDescription" data-testid="label-description" class="label-description">
        <slot name="label-description">{{ labelDescription }}</slot>
      </div>
    </template>

    <!-- eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots -->
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-form-group>
</template>
