<script>
import { BFormGroup } from 'bootstrap-vue';
import { isString, isArray, isPlainObject } from 'lodash';
import GlFormText from '../form_text/form_text.vue';

export default {
  components: {
    BFormGroup,
    GlFormText,
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
  },
  computed: {
    actualLabelClass() {
      const { labelClass } = this;
      const defaultClass = 'col-form-label';

      if (isString(labelClass)) {
        return `${labelClass} ${defaultClass}`;
      }
      if (isArray(labelClass)) {
        return [...labelClass, defaultClass];
      }
      if (isPlainObject(labelClass)) {
        return { ...labelClass, [defaultClass]: true };
      }
      return defaultClass;
    },
    hasLabelDescription() {
      return Boolean(this.labelDescription || this.$slots['label-description']);
    },
  },
};
</script>
<template>
  <b-form-group v-bind="$attrs" class="gl-form-group" :label-class="actualLabelClass">
    <template v-if="hasLabelDescription" #label>
      <slot name="label">
        {{ $attrs.label }}
      </slot>
      <gl-form-text data-testid="label-description">
        <slot name="label-description">{{ labelDescription }}</slot>
      </gl-form-text>
    </template>

    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-form-group>
</template>
