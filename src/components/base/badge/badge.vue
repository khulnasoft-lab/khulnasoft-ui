<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BBadge } from 'bootstrap-vue';
import { badgeSizeOptions, badgeVariantOptions } from '../../../utils/constants';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    BBadge,
    GlIcon,
  },
  inheritAttrs: false,
  props: {
    /**
     * The size of the badge.
     */
    size: {
      type: String,
      default: badgeSizeOptions.md,
      validator(value) {
        return badgeSizeOptions[value] !== undefined;
      },
      required: false,
    },
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
  },
  computed: {
    hasIconOnly() {
      return Boolean(this.icon && Object.keys(this.$slots).length === 0);
    },
    role() {
      return this.hasIconOnly ? 'img' : undefined;
    },
  },
};
</script>

<template>
  <b-badge v-bind="$attrs" :variant="variant" :class="['gl-badge', size]" :role="role" pill>
    <gl-icon v-if="icon" class="gl-badge-icon" :class="{ 'gl-mr-2': !hasIconOnly }" :name="icon" />
    <!-- @slot The badge content to display. -->
    <slot></slot>
  </b-badge>
</template>
