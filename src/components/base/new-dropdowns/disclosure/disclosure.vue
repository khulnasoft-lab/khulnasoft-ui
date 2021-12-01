<script>
import { BDropdown } from 'bootstrap-vue';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownVariantOptions,
} from '../../../../utils/constants';
import { ButtonMixin } from '../../../mixins/button_mixin';
import GlIcon from '../../icon/icon.vue';
import GlLoadingIcon from '../../loading_icon/loading_icon.vue';
import GlDisclosureItem from './disclosure_item.vue';

export default {
  components: {
    BDropdown,
    GlIcon,
    GlLoadingIcon,
    GlDisclosureItem,
  },
  mixins: [ButtonMixin],
  props: {
    items: {
      type: Array,
      required: false,
      default: null,
      validator: (items) => {
        return items.every(
          ({ text, href, to, target = '_self' }) =>
            typeof text === 'string' &&
            (typeof href === 'string' || typeof to === 'string') &&
            typeof target === 'string'
        );
      },
    },
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
          [`btn-${this.variant}-secondary`]: this.category === buttonCategoryOptions.secondary,
          [`btn-${this.variant}-tertiary`]: this.category === buttonCategoryOptions.tertiary,
          'dropdown-icon-only': this.isIconOnly,
          'dropdown-icon-text': this.isIconWithText,
        },
      ];
    },
    isSimpleLinksList() {
      return this.items && !this.hasSlotContents('default');
    },
  },
  methods: {
    hasSlotContents(slotName) {
      return Boolean(this.$slots[slotName]);
    },
    show(...args) {
      this.$refs.disclosure.show(...args);
    },
    hide(...args) {
      this.$refs.disclosure.hide(...args);
    },
  },
};
</script>
<template>
  <b-dropdown
    ref="disclosure"
    :role="null"
    class="gl-new-dropdown"
    v-bind="$attrs"
    :variant="variant"
    :size="buttonSize"
    :toggle-class="[toggleButtonClasses]"
    :block="block"
    :disabled="disabled || loading"
    :right="right"
    v-on="$listeners"
  >
    <li
      v-if="hasSlotContents('header') || headerText"
      class="gl-new-dropdown-header"
      :class="{ 'gl-border-b-0!': hideHeaderBorder }"
    >
      <p v-if="headerText" class="gl-new-dropdown-header-top">
        {{ headerText }}
      </p>
      <slot name="header"></slot>
    </li>

    <template v-if="isSimpleLinksList">
      <gl-disclosure-item
        v-for="(item, index) of items"
        :key="`disclosure-item-${index}`"
        :href="item.href"
        :to="item.to"
        :target="item.target"
      >
        {{ item.text }}
      </gl-disclosure-item>
    </template>
    <slot v-else></slot>

    <li v-if="hasSlotContents('footer')" class="gl-new-dropdown-footer">
      <slot name="footer"></slot>
    </li>

    <template #button-content>
      <slot name="button-content">
        <gl-loading-icon v-if="loading" class="gl-mr-2" />
        <gl-icon v-if="icon" class="dropdown-icon" :name="icon" />
        <span class="gl-new-dropdown-button-text" :class="{ 'gl-sr-only': textSrOnly }">
          <slot name="button-text">{{ text }}</slot>
        </span>
        <gl-icon class="gl-button-icon dropdown-chevron" name="chevron-down" />
      </slot>
    </template>
  </b-dropdown>
</template>
