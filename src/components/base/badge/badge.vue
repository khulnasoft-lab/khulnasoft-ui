<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BBadge } from 'bootstrap-vue';
import { badgeVariantOptions, badgeIconSizeOptions } from '../../../utils/constants';
import GlIcon from '../icon/icon.vue';

export default {
  name: 'GlBadge',
  components: {
    BBadge,
    GlIcon,
  },
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
  <b-badge
    v-bind="$attrs"
    :variant="variant"
    class="gl-badge"
    :class="{ 'gl-px-2!': !$scopedSlots.default }"
    :role="role"
    :aria-label="ariaLabel"
    pill
  >
    <gl-icon
      v-if="icon"
      class="gl-badge-icon"
      :size="iconSizeComputed"
      :class="{ '-gl-ml-2 gl-ml-n2': isCircularIcon }"
      :name="icon"
    />
    <!-- @slot The badge content to display. -->
    <slot></slot>
  </b-badge>
</template>
