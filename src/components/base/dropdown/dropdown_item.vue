<script>
import { BDropdownItem, BDropdownItemButton } from 'bootstrap-vue';
import { variantCssColorMap } from '../../../utils/constants';
import GlAvatar from '../avatar/avatar.vue';
import GlButton from '../button/button.vue';
import GlIcon from '../icon/icon.vue';

export default {
  name: 'GlDropdownItem',
  components: {
    GlIcon,
    GlAvatar,
    GlButton,
  },
  inheritAttrs: false,
  props: {
    avatarUrl: {
      type: String,
      required: false,
      default: '',
    },
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
    iconRightAriaLabel: {
      type: String,
      required: false,
      default: '',
    },
    iconRightName: {
      type: String,
      required: false,
      default: '',
    },
    isChecked: {
      type: Boolean,
      required: false,
      default: false,
    },
    isCheckItem: {
      type: Boolean,
      required: false,
      default: false,
    },
    isCheckCentered: {
      type: Boolean,
      required: false,
      default: false,
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
      return href || to ? BDropdownItem : BDropdownItemButton;
    },
    iconColorCss() {
      return variantCssColorMap[this.iconColor] || 'gl-text-gray-700';
    },
    shouldShowCheckIcon() {
      return this.isChecked || this.isCheckItem;
    },
    checkedClasses() {
      if (this.isCheckCentered) {
        return '';
      }

      return 'gl-mt-3 gl-align-self-start';
    },
  },
  methods: {
    handleClickIconRight() {
      this.$emit('click-icon-right');
    },
  },
};
</script>

<template>
  <component :is="bootstrapComponent" class="gl-dropdown-item" v-bind="$attrs" v-on="$listeners">
    <gl-icon
      v-if="shouldShowCheckIcon"
      name="mobile-issue-close"
      data-testid="dropdown-item-checkbox"
      :class="[
        'gl-dropdown-item-check-icon',
        { 'gl-visibility-hidden': !isChecked },
        checkedClasses,
      ]"
    />
    <gl-icon v-if="iconName" :name="iconName" :class="['gl-dropdown-item-icon', iconColorCss]" />
    <gl-avatar v-if="avatarUrl" :size="32" :src="avatarUrl" />
    <div class="gl-dropdown-item-text-wrapper">
      <p class="gl-dropdown-item-text-primary"><slot></slot></p>
      <p v-if="secondaryText" class="gl-dropdown-item-text-secondary">{{ secondaryText }}</p>
    </div>
    <gl-button
      v-if="iconRightName"
      size="small"
      :icon="iconRightName"
      :aria-label="iconRightAriaLabel || iconRightName"
      @click.stop.prevent="handleClickIconRight"
    />
  </component>
</template>
