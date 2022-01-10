<script>
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownVariantOptions,
} from '../../../utils/constants';
import GlListboxBase from './listbox_base.vue';

export default {
  components: {
    GlListboxBase,
  },
  props: {
    split: {
      type: Boolean,
      required: false,
      default: false,
    },
    category: {
      type: String,
      required: false,
      default: buttonCategoryOptions.primary,
      validator: (value) => Object.keys(buttonCategoryOptions).includes(value),
    },
    variant: {
      type: String,
      required: false,
      default: dropdownVariantOptions.default,
      validator: (value) => Object.keys(dropdownVariantOptions).includes(value),
    },
    size: {
      type: String,
      required: false,
      default: buttonSizeOptions.medium,
      validator: (value) => Object.keys(buttonSizeOptions).includes(value),
    },
    block: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    right: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<template>
  <gl-listbox-base
    :split="split"
    :variant="variant"
    :size="size"
    :block="block"
    :disabled="disabled || loading"
    :right="right"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- pass through slots -->
    <slot></slot>
    <template #button-content><slot name="button-content"></slot></template>
  </gl-listbox-base>
</template>
