<script>
import GlLink from '../link/link.vue';

export default {
  name: 'GlNavItem',
  components: {
    GlLink,
  },
  props: {
    /**
     * When set to `true`, places the component in the active state with active styling
     */
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * When set to `true`, disables the component's functionality and places it in a disabled state.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Denotes the target URL of the link for standard links.
     */
    href: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * <router-link> prop: Denotes the target route of the link.
     * When clicked, the value of the to prop will be passed to `router.push()` internally,
     * so the value can be either a string or a Location descriptor object.
     */
    to: {
      type: [Object, String],
      required: false,
      default: undefined,
    },
    /**
     * <router-link> prop: Configure the active CSS class applied when the link is active.
     */
    activeClass: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * <router-link> prop: Configure the active CSS class applied when the link is active with exact match.
     */
    exactActiveClass: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * Attributes for the link element
     */
    linkAttrs: {
      type: Object,
      required: false,
      default: null,
    },
    /**
     * Classes for the link element
     */
    linkClasses: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  computed: {
    computedLinkClasses() {
      const classes = this.linkClasses;

      // the `unstyled` link variant does not do this by itself
      if (this.disabled) classes.push('disabled');
      if (this.active) classes.push('active');

      return classes;
    },
  },
};
</script>

<template>
  <li class="nav-item">
    <gl-link
      class="nav-link"
      variant="unstyled"
      :active="active"
      :class="computedLinkClasses"
      :disabled="disabled"
      :href="href"
      :to="to"
      :active-class="activeClass"
      :exact-active-class="exactActiveClass"
      v-bind="linkAttrs"
      v-on="$listeners"
    >
      <slot></slot>
    </gl-link>
  </li>
</template>
