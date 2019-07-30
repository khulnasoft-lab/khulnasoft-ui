<script>
import { BButton } from 'bootstrap-vue';
import {
  newButtonCategoryOptions,
  newButtonVariantOptions,
  newButtonSizeOptions,
  newButtonSizeOptionsMap,
} from '../../../utils/constants';
import { logWarning } from '../../../utils/utils';
import { SafeLinkMixin } from '../../mixins/safe_link_mixin';
import GlIcon from '../icon/icon.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';

export default {
  components: {
    BButton,
    GlIcon,
    GlLoadingIcon,
  },
  mixins: [SafeLinkMixin],
  props: {
    category: {
      type: String,
      required: false,
      default: newButtonCategoryOptions.primary,
      validator: (value) => Object.keys(newButtonCategoryOptions).includes(value),
    },
    variant: {
      type: String,
      required: false,
      default: newButtonVariantOptions.default,
      validator: (value) => Object.keys(newButtonVariantOptions).includes(value),
    },
    size: {
      type: String,
      required: false,
      default: newButtonSizeOptions.medium,
      validator: (value) => Object.keys(newButtonSizeOptions).includes(value),
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    buttonTextClasses: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    hasIcon() {
      return this.icon !== '';
    },
    hasIconOnly() {
      return Object.keys(this.$slots).length === 0 && this.hasIcon;
    },
    isButtonDisabled() {
      return this.disabled || this.loading;
    },
    buttonClasses() {
      const classes = ['gl-button'];
      const nonCategoryVariants = [
        newButtonVariantOptions.dashed,
        newButtonVariantOptions.link,
        newButtonVariantOptions.reset,
      ];

      if (
        !nonCategoryVariants.includes(this.variant) &&
        this.category !== newButtonCategoryOptions.primary
      ) {
        classes.push(`btn-${this.variant}-${this.category}`);
      }

      classes.push({
        'btn-icon': this.hasIconOnly,
        'button-ellipsis-horizontal': this.hasIconOnly && this.icon === 'ellipsis_h',
        selected: this.selected,
      });

      if (this.label) {
        classes.push('btn', 'btn-label', `btn-${this.buttonSize}`);
      }

      return classes;
    },
    buttonSize() {
      return newButtonSizeOptionsMap[this.size];
    },
  },
  mounted() {
    if (!this.$slots.default && !this.$attrs['aria-label'] && !this.$props.label) {
      logWarning('[gl-button]: Accessible name missing. Please add inner text or aria-label.');
    }
  },
};
</script>
<template>
  <component
    :is="label ? 'span' : 'b-button'"
    v-bind="$attrs"
    v-safe-link:[safeLinkConfig]
    :target="target"
    :variant="variant"
    :size="buttonSize"
    :disabled="isButtonDisabled"
    :class="buttonClasses"
    v-on="$listeners"
  >
    <gl-loading-icon
      v-if="loading"
      size="sm"
      inline
      class="gl-button-icon gl-button-loading-indicator"
    />
    <gl-icon v-if="hasIcon && !(hasIconOnly && loading)" class="gl-button-icon" :name="icon" />
    <slot name="emoji"></slot>
    <span v-if="!hasIconOnly" :class="buttonTextClasses" class="gl-button-text"><slot></slot></span>
  </component>
</template>
