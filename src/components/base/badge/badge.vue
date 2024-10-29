<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BLink } from '../../../vendor/bootstrap-vue/src/components/link/link';
import { badgeVariantOptions, badgeIconSizeOptions } from '../../../utils/constants';
import GlIcon from '../icon/icon.vue';

const variantClass = {
  [badgeVariantOptions.muted]: 'badge-muted',
  [badgeVariantOptions.neutral]: 'badge-neutral',
  [badgeVariantOptions.info]: 'badge-info',
  [badgeVariantOptions.success]: 'badge-success',
  [badgeVariantOptions.warning]: 'badge-warning',
  [badgeVariantOptions.danger]: 'badge-danger',
  [badgeVariantOptions.tier]: 'badge-tier',
};

export default {
  name: 'GlBadge',
  components: {
    BLink,
    GlIcon,
  },
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
    /**
     * Optically aligns circular icons with the badge.
     */
    iconOpticallyAligned: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * Custom tag to use (unless `href` is defined)
     */
    tag: {
      type: String,
      required: false,
      default: 'span',
    },
    /**
     * Creates the badge as link (ignores `tag` property)
     */
    href: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * Sets the `rel` attributes, when `href` is defined
     */
    rel: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Sets the `target`, when `href` is defined
     */
    target: {
      type: String,
      required: false,
      default: '_self',
    },
    /**
     * Adds the `active` class, when `href` is defined
     */
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Disables the link, when `href` is defined
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    hasIconOnly() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.icon && Object.keys(this.$slots).length === 0);
    },
    isCircularIcon() {
      return this.iconOpticallyAligned || ['issue-open-m', 'issue-close'].includes(this.icon);
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
    isLink() {
      return Boolean(this.href);
    },
    computedTag() {
      return this.isLink ? BLink : this.tag;
    },
    computedProps() {
      if (!this.isLink) return {};

      const { href, rel, target, active, disabled } = this;
      return { href, rel, target, active, disabled };
    },
    classes() {
      return [
        'gl-badge',
        'badge',
        'badge-pill',
        variantClass[this.variant],
        { '!gl-px-2': !this.$scopedSlots.default },
      ];
    },
  },
};
</script>

<template>
  <component
    :is="computedTag"
    v-bind="computedProps"
    :class="classes"
    :role="role"
    :aria-label="ariaLabel"
  >
    <gl-icon
      v-if="icon"
      class="gl-badge-icon"
      :size="iconSizeComputed"
      :class="{ '-gl-ml-2': isCircularIcon }"
      :name="icon"
    />
    <!-- eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots -->
    <span v-if="$slots.default" class="gl-badge-content">
      <slot></slot>
    </span>
  </component>
</template>
