<script>
import { badgeVariantOptions, badgeIconSizeOptions } from '../../../utils/constants';

export default {
  name: 'GlBadge',
  inheritAttrs: false,
  props: {
    /**
     * The variant of the badge.
     */
    variant: {
      type: String,
      default: badgeVariantOptions.muted,
      validator(value) {
        return badgeVariantOptions[value] !== undefined;
      },
      required: false,
    },
    /**
     * The icon to show next to the text
     */
    icon: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The size of the icon 16 or 12
     */
    iconSize: {
      type: String,
      default: 'md',
      validator: (value) => Object.keys(badgeIconSizeOptions).includes(value),
      required: false,
    },
  },
  computed: {
    hasIconOnly() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.icon && Object.keys(this.$slots).length === 0);
    },
    isCircularIcon() {
      return ['issue-open-m', 'issue-close'].includes(this.icon);
    },
    role() {
      return this.hasIconOnly ? 'img' : undefined;
    },
    ariaLabel() {
      if (this.$attrs['aria-label']) {
        return this.$attrs['aria-label'];
      }

      return this.role === 'img' ? this.icon : undefined;
    },
    iconSizeComputed() {
      return badgeIconSizeOptions[this.iconSize];
    },
  },
};
</script>

<template>
  <p>I will be a badge! ☀️</p>
</template>
