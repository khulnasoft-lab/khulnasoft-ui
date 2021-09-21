<script>
import { BDropdown } from 'bootstrap-vue';
import { isVisible, selectAll } from 'bootstrap-vue/src/utils/dom';
import {
  newButtonCategoryOptions,
  newDropdownVariantOptions,
  newButtonSizeOptions,
} from '../../../utils/constants';
import ButtonMixin from '../../mixins/button_mixin';
import GlButton from '../button/button.vue';
import GlIcon from '../icon/icon.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';
import GlDropdownDivider from './dropdown_divider.vue';

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
    GlButton,
    GlDropdownDivider,
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
    showClearAll: {
      type: Boolean,
      required: false,
      default: false,
    },
    clearAllText: {
      type: String,
      required: false,
      default: 'Clear all',
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
    showHighlightedItemsTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
    highlightedItemsTitle: {
      type: String,
      required: false,
      default: 'Selected',
    },
    highlightedItemsTitleClass: {
      type: String,
      required: false,
      default: 'gl-px-5',
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
    hasHighlightedItemsContent() {
      return this.hasSlotContents('highlighted-items');
    },
    hasHighlightedItemsOrClearAll() {
      return (
        (this.hasHighlightedItemsContent && this.showHighlightedItemsTitle) || this.showClearAll
      );
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
        <p v-if="headerText" class="gl-new-dropdown-header-top">
          {{ headerText }}
        </p>
        <slot name="header"></slot>
      </div>

      <div
        v-if="hasHighlightedItemsOrClearAll"
        class="gl-display-flex gl-flex-direction-row gl-justify-content-space-between gl-align-items-center"
        :class="highlightedItemsTitleClass"
      >
        <div class="gl-display-flex">
          <span
            v-if="hasHighlightedItemsContent && showHighlightedItemsTitle"
            class="gl-font-weight-bold"
            data-testid="highlighted-items-title"
            >{{ highlightedItemsTitle }}</span
          >
        </div>
        <div class="gl-display-flex">
          <gl-button
            v-if="showClearAll"
            size="small"
            category="tertiary"
            variant="link"
            data-testid="clear-all-button"
            @click="$emit('clear-all', $event)"
            >{{ clearAllText }}</gl-button
          >
        </div>
      </div>
      <div class="gl-new-dropdown-contents">
        <div
          v-if="hasHighlightedItemsContent"
          class="gl-overflow-visible"
          data-testid="highlighted-items"
        >
          <slot name="highlighted-items"></slot>
          <gl-dropdown-divider />
        </div>
        <slot></slot>
      </div>
      <div v-if="hasSlotContents('footer')" class="gl-new-dropdown-footer">
        <slot name="footer"></slot>
      </div>
    </div>
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
