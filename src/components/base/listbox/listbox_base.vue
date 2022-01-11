<script>
import { BDropdown } from 'bootstrap-vue';
import { isVisible, selectAll } from 'bootstrap-vue/src/utils/dom';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownVariantOptions,
} from '../../../utils/constants';
import { ButtonMixin } from '../../mixins/button_mixin';
import GlIcon from '../icon/icon.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';

// Return an Array of visible items
function filterVisible(els) {
  return (els || []).filter(isVisible);
}

const Selector = {
  ITEM_SELECTOR:
    '.dropdown-item:not(.disabled):not([disabled]),.form-control:not(.disabled):not([disabled])',
};

// see https://gitlab.com/gitlab-org/gitlab-ui/merge_requests/130#note_126406721
const ExtendedBDropdown = {
  extends: BDropdown,
  methods: {
    getItems() {
      return filterVisible(selectAll(Selector.ITEM_SELECTOR, this.$refs.menu));
    },
  },
};

export default {
  components: {
    BDropdown: ExtendedBDropdown,
    GlIcon,
    GlLoadingIcon,
  },
  mixins: [ButtonMixin],
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
    textSrOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
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
    icon: {
      type: String,
      required: false,
      default: null,
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
    toggleClass: {
      type: [String, Array, Object],
      required: false,
      default: null,
    },
    right: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    renderCaret() {
      return !this.split;
    },
    isIconOnly() {
      return Boolean(this.icon && (!this.text?.length || this.textSrOnly));
    },
    isIconWithText() {
      return Boolean(this.icon && this.text?.length && !this.textSrOnly);
    },
    toggleButtonClasses() {
      return [
        this.toggleClass,
        {
          'gl-button': true,
          'gl-dropdown-toggle': true,
          [`btn-${this.variant}-secondary`]:
            this.category === buttonCategoryOptions.secondary ||
            (this.category === buttonCategoryOptions.tertiary && this.split),
          [`btn-${this.variant}-tertiary`]:
            this.category === buttonCategoryOptions.tertiary && !this.split,
          'dropdown-icon-only': this.isIconOnly,
          'dropdown-icon-text': this.isIconWithText,
        },
      ];
    },
    splitButtonClasses() {
      return [
        this.toggleClass,
        {
          'gl-button': true,
          'split-content-button': Boolean(this.text),
          'icon-split-content-button': Boolean(this.icon),
          [`btn-${this.variant}-secondary`]:
            this.category === buttonCategoryOptions.secondary ||
            this.category === buttonCategoryOptions.tertiary,
        },
      ];
    },
    buttonText() {
      return this.split && this.icon ? null : this.text;
    },
  },
  methods: {
    hasSlotContents(slotName) {
      return Boolean(this.$slots[slotName]);
    },
    show(...args) {
      this.$refs.dropdown.show(...args);
    },
    hide(...args) {
      this.$refs.dropdown.hide(...args);
    },
  },
};
</script>
<template>
  <b-dropdown
    class="gl-dropdown"
    :split="split"
    :variant="variant"
    :size="buttonSize"
    :toggle-class="[toggleButtonClasses]"
    :split-class="splitButtonClasses"
    :block="block"
    :disabled="disabled || loading"
    :right="right"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- pass through slots -->
    <slot></slot>
    <template #button-content>
      <slot name="button-content">
        <gl-loading-icon v-if="loading" class="gl-mr-2" />
        <gl-icon v-if="icon" class="dropdown-icon" :name="icon" />
        <span class="gl-new-dropdown-button-text" :class="{ 'gl-sr-only': textSrOnly }">
          <slot name="button-text">{{ buttonText }}</slot>
        </span>
        <gl-icon v-if="renderCaret" class="gl-button-icon dropdown-chevron" name="chevron-down" />
      </slot>
    </template>
  </b-dropdown>
</template>
