<script>
import { BDropdown } from 'bootstrap-vue';
import { isVisible, selectAll } from 'bootstrap-vue/src/utils/dom';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownVariantOptions,
} from '../../../utils/constants';
import { ButtonMixin } from '../../mixins/button_mixin';

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
  },
  mixins: [ButtonMixin],
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
  <b-dropdown
    :split="split"
    :variant="variant"
    :size="buttonSize"
    :block="block"
    :disabled="disabled || loading"
    :right="right"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- pass through slots -->
    <slot></slot>
    <template #button-content><slot name="button-content"></slot></template>
  </b-dropdown>
</template>
