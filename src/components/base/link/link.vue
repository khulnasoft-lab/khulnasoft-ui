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
    /**
     * If inline variant, controls ↗ character visibility
     */
    showExternalIcon: {
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
      default: null,
      validator: (value) => value && Object.hasOwn(linkVariantOptions, value),
    },
  },
  computed: {
    isInlineAndHasExternalIcon() {
      return (
        this.showExternalIcon &&
        this.variant === 'inline' &&
        this.$attrs.href &&
        isExternalURL(this.target, this.$attrs.href)
      );
    },
    linkClasses() {
      return [
        'gl-link',
        linkVariantOptions[this.variant],
        { 'gl-link-inline-external': this.isInlineAndHasExternalIcon },
      ];
    },
  },
};
</script>
<template>
  <b-link
    v-safe-link:[safeLinkConfig]
    v-bind="$attrs"
    :target="target"
    :class="linkClasses"
    v-on="$listeners"
  >
    <!-- @slot The link to display. -->
    <slot></slot>
  </b-link>
</template>
