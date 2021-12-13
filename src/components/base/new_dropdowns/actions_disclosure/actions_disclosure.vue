<script>
/* eslint-disable  import/no-unresolved */
import { BDropdown } from '@gitlab/bootstrap-vue';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownVariantOptions,
} from '../../../../utils/constants';
import { ButtonMixin } from '../../../mixins/button_mixin';
import GlIcon from '../../icon/icon.vue';
import GlLoadingIcon from '../../loading_icon/loading_icon.vue';
import GlActionsDisclosureItem from './actions_disclosure_item.vue';

export default {
  components: {
    BDropdown,
    GlIcon,
    GlLoadingIcon,
    GlActionsDisclosureItem,
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
      this.$refs.actionsDisclosure.show(...args);
    },
    hide(...args) {
      this.$refs.actionsDisclosure.hide(...args);
    },
  },
};
</script>
<template>
  <b-dropdown
    ref="actionsDisclosure"
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
    <template v-if="isSimpleLinksList">
      <gl-actions-disclosure-item
        v-for="(item, index) of items"
        :key="`actions-disclosure-item-${index}`"
        :href="item.href"
        :to="item.to"
        :target="item.target"
      >
        {{ item.text }}
      </gl-actions-disclosure-item>
    </template>
    <slot v-else></slot>

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
