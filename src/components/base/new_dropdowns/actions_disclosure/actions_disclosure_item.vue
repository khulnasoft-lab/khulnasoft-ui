<script>
/* eslint-disable  import/no-unresolved */
import { BDropdownItem, BDropdownItemButton } from '@sharlatta/bootstrap-vue';
import { variantCssColorMap } from '../../../../utils/constants';
import GlIcon from '../../icon/icon.vue';

export const ExtendedBDropdownItem = {
  extends: BDropdownItem,
  computed: {
    computedAttrs() {
      return {
        ...this.bvAttrs,
      };
    },
  },
};

export const ExtendedBDropdownItemButton = {
  extends: BDropdownItemButton,
  computed: {
    computedAttrs() {
      return {
        ...this.bvAttrs,
        type: 'button',
        disabled: this.disabled,
      };
    },
  },
};

export default {
  components: {
    GlIcon,
  },
  inheritAttrs: false,
  props: {
    iconColor: {
      type: String,
      required: false,
      default: '',
    },
    iconName: {
      type: String,
      required: false,
      default: '',
    },
    secondaryText: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    bootstrapComponent() {
      const { href, to } = this.$attrs;
      // Support 'href' and Vue Router's 'to'
      return href || to ? ExtendedBDropdownItem : ExtendedBDropdownItemButton;
    },
    iconColorCss() {
      return variantCssColorMap[this.iconColor] || 'gl-text-gray-700';
    },
  },
};
</script>

<template>
  <component
    :is="bootstrapComponent"
    class="gl-new-dropdown-item"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <gl-icon
      v-if="iconName"
      :name="iconName"
      :class="['gl-new-dropdown-item-icon', iconColorCss]"
    />
    <div class="gl-new-dropdown-item-text-wrapper">
      <p class="gl-new-dropdown-item-text-primary"><slot></slot></p>
      <p v-if="secondaryText" class="gl-new-dropdown-item-text-secondary">{{ secondaryText }}</p>
    </div>
  </component>
</template>
