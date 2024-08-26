<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BLink } from '../../../vendor/bootstrap-vue/src/components/link/link';
import { SafeLinkMixin } from '../../mixins/safe_link_mixin';
import { isExternalURL } from '../../../directives/safe_link/safe_link';
import { linkVariantOptions } from '../../../utils/constants';

export default {
  name: 'GlLink',
  components: {
    BLink,
  },
  mixins: [SafeLinkMixin],
  props: {
    href: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * If inline variant, controls ↗ character visibility
     */
    showExternalIcon: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * If mention variant, controls unique background treatment for current user
     */
    isCurrentUser: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Link variant
     */
    variant: {
      type: String,
      required: false,
      default: linkVariantOptions.inline,
      validator: (value) => Object.keys(linkVariantOptions).includes(value),
    },
  },
  computed: {
    isMentioningCurrentUser() {
      return this.variant === linkVariantOptions.mention && this.isCurrentUser;
    },
    renderExternalIcon() {
      return (
        this.showExternalIcon &&
        isExternalURL(this.target, this.href) &&
        this.variant === linkVariantOptions.inline
      );
    },
    linkClasses() {
      // eslint-disable-next-line @gitlab/tailwind -- Not a CSS utility
      const classes = [`gl-link gl-link-${this.variant}`];

      if (this.isMentioningCurrentUser) {
        classes.push('gl-link-mention-current');
      }

      return classes;
    },
  },
};
</script>
<template>
  <b-link
    v-safe-link:[safeLinkConfig]
    v-bind="$attrs"
    :href="href"
    :target="target"
    :class="linkClasses"
    v-on="$listeners"
  >
    <!-- @slot The link to display. -->
    <slot></slot><span v-if="renderExternalIcon">↗</span>
  </b-link>
</template>
