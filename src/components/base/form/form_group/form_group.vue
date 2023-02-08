<script>
import { BFormGroup } from 'bootstrap-vue';
import { isString, isArray, isPlainObject } from 'lodash';

export default {
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
    helpText: {
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
    <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
    <template #default>
      <slot></slot>
      <div v-if="$scopedSlots['help-text'] || helpText" class="gl-form-group-help-text">
        <!-- @slot Help text, provides contextual examples, formatting information, details about the input field state. -->
        <slot name="help-text">{{ helpText }}</slot>
      </div>
    </template>
  </b-form-group>
</template>
