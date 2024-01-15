<!-- eslint-disable vue/multi-word-component-names vue/one-component-per-file -->
<script>
import Vue from 'vue';
import { BDropdown } from 'bootstrap-vue';
import { selectAll } from 'bootstrap-vue/src/utils/dom';
import merge from 'lodash/merge';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownVariantOptions,
} from '../../../utils/constants';
import { filterVisible } from '../../../utils/utils';
import { ButtonMixin } from '../../mixins/button_mixin';
import GlButton from '../button/button.vue';
import GlIcon from '../icon/icon.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';
import GlDropdownDivider from './dropdown_divider.vue';

const Selector = {
  ITEM_SELECTOR:
    '.dropdown-item:not(.disabled):not([disabled]),.form-control:not(.disabled):not([disabled])',
};

// see https://gitlab.com/gitlab-org/gitlab-ui/merge_requests/130#note_126406721
const ExtendedBDropdown = Vue.extend(BDropdown, {
  name: 'ExtendedBDropdown',
  methods: {
    getItems() {
      return filterVisible(selectAll(Selector.ITEM_SELECTOR, this.$refs.menu));
    },
  },
});

export const DefaultPopperOptions = {
  modifiers: {
    flip: {
      flipVariationsByContent: true,
      padding: 28,
    },
  },
};

export default {
  name: 'GlDropdown',
  components: {
    BDropdown: ExtendedBDropdown,
    GlButton,
    GlDropdownDivider,
    GlIcon,
    GlLoadingIcon,
  },
  mixins: [ButtonMixin],
  inheritAttrs: false,
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
    clearAllTextClass: {
      type: String,
      required: false,
      default: 'gl-px-5',
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
    showHighlightedItemsTitle: {
      type: Boolean,
      required: false,
      default: false,
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
      default: 'medium',
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
    popperOpts: {
      type: Object,
      required: false,
      default: null,
    },
    noFlip: {
      type: Boolean,
      required: false,
      default: false,
    },
    splitHref: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    renderCaret() {
      return !this.split;
    },
    isIconOnly() {
      return Boolean(
        this.icon && (!this.text?.length || this.textSrOnly) && !this.hasSlotContents('button-text')
      );
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
    hasHighlightedItemsContent() {
      return this.hasSlotContents('highlighted-items');
    },
    hasHighlightedItemsOrClearAll() {
      return (
        (this.hasHighlightedItemsContent && this.showHighlightedItemsTitle) || this.showClearAll
      );
    },
    popperOptions() {
      return merge({}, DefaultPopperOptions, this.popperOpts);
    },
  },
  methods: {
    hasSlotContents(slotName) {
      return Boolean(this.$scopedSlots[slotName]?.());
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
    class="gl-dropdown"
    v-bind="$attrs"
    :split="split"
    :variant="variant"
    :size="buttonSize"
    :toggle-class="[toggleButtonClasses]"
    :split-class="splitButtonClasses"
    :block="block"
    :disabled="disabled || loading"
    :right="right"
    :popper-opts="popperOptions"
    :no-flip="noFlip"
    :split-href="splitHref"
    v-on="$listeners"
  >
    <div class="gl-dropdown-inner">
      <div
        v-if="hasSlotContents('header') || headerText"
        class="gl-dropdown-header"
        :class="{ 'gl-border-b-0!': hideHeaderBorder }"
      >
        <p v-if="headerText" class="gl-dropdown-header-top">
          {{ headerText }}
        </p>
        <slot name="header"></slot>
      </div>

      <div
        v-if="hasHighlightedItemsOrClearAll"
        class="gl-display-flex gl-flex-direction-row gl-justify-content-space-between gl-align-items-center"
      >
        <div
          v-if="hasHighlightedItemsContent && showHighlightedItemsTitle"
          class="gl-display-flex gl-flex-grow-1 gl-justify-content-flex-start"
          :class="highlightedItemsTitleClass"
        >
          <span class="gl-font-weight-bold" data-testid="highlighted-items-title">{{
            highlightedItemsTitle
          }}</span>
        </div>
        <div
          v-if="showClearAll"
          class="gl-display-flex gl-flex-grow-1 gl-justify-content-end"
          :class="clearAllTextClass"
        >
          <gl-button
            size="small"
            category="tertiary"
            variant="link"
            data-testid="clear-all-button"
            @click="$emit('clear-all', $event)"
            >{{ clearAllText }}</gl-button
          >
        </div>
      </div>
      <div class="gl-dropdown-contents">
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
      <div v-if="hasSlotContents('footer')" class="gl-dropdown-footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <template #button-content>
      <slot name="button-content">
        <gl-loading-icon v-if="loading" :class="{ 'gl-mr-2': !isIconOnly }" />
        <gl-icon v-if="icon && !(isIconOnly && loading)" class="dropdown-icon" :name="icon" />
        <span class="gl-dropdown-button-text" :class="{ 'gl-sr-only': textSrOnly }">
          <slot name="button-text">{{ buttonText }}</slot>
        </span>
        <gl-icon v-if="renderCaret" class="gl-button-icon dropdown-chevron" name="chevron-down" />
      </slot>
    </template>
  </b-dropdown>
</template>
