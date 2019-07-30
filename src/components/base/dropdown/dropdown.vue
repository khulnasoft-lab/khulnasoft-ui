<script>
import { BDropdown } from 'bootstrap-vue';
import { isVisible, selectAll } from 'bootstrap-vue/src/utils/dom';
import {
  newButtonCategoryOptions,
  newDropdownVariantOptions,
  newButtonSizeOptions,
} from '../../../utils/constants';
import ButtonMixin from '../../mixins/button_mixin';
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
    headerText: {
      type: String,
      required: false,
      default: '',
    },
    hideHeaderBorder: {
      type: Boolean,
      required: false,
      default: true,
    },
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
      default: newButtonCategoryOptions.primary,
      validator: (value) => Object.keys(newButtonCategoryOptions).includes(value),
    },
    variant: {
      type: String,
      required: false,
      default: newDropdownVariantOptions.default,
      validator: (value) => Object.keys(newDropdownVariantOptions).includes(value),
    },
    size: {
      type: String,
      required: false,
      default: newButtonSizeOptions.medium,
      validator: (value) => Object.keys(newButtonSizeOptions).includes(value),
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
            this.category === newButtonCategoryOptions.secondary ||
            (this.category === newButtonCategoryOptions.tertiary && this.split),
          [`btn-${this.variant}-tertiary`]:
            this.category === newButtonCategoryOptions.tertiary && !this.split,
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
            this.category === newButtonCategoryOptions.secondary ||
            this.category === newButtonCategoryOptions.tertiary,
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
    ref="dropdown"
    class="gl-new-dropdown"
    v-bind="$attrs"
    :split="split"
    :variant="variant"
    :size="buttonSize"
    :toggle-class="[toggleButtonClasses]"
    :split-class="splitButtonClasses"
    :block="block"
    :disabled="disabled || loading"
    :right="right"
    v-on="$listeners"
  >
    <div class="gl-new-dropdown-inner">
      <div
        v-if="hasSlotContents('header') || headerText"
        class="gl-new-dropdown-header"
        :class="{ 'gl-border-b-0!': hideHeaderBorder }"
      >
        <p v-if="headerText" class="gl-new-dropdown-header-top">{{ headerText }}</p>
        <slot name="header"></slot>
      </div>
      <div class="gl-new-dropdown-contents">
        <slot></slot>
      </div>
      <div v-if="hasSlotContents('footer')" class="gl-new-dropdown-footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <template #button-content>
      <slot name="button-content">
        <gl-loading-icon v-if="loading" size="sm" class="gl-mr-2" />
        <gl-icon v-if="icon" class="dropdown-icon" :name="icon" />
        <span class="gl-new-dropdown-button-text" :class="{ 'gl-sr-only': textSrOnly }">
          <slot name="button-text">{{ buttonText }}</slot>
        </span>
        <gl-icon v-if="renderCaret" class="gl-button-icon dropdown-chevron" name="chevron-down" />
      </slot>
    </template>
  </b-dropdown>
</template>
