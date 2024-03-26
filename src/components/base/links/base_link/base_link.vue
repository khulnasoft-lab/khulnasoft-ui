<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { SafeLinkMixin } from '../../../mixins/safe_link_mixin';

export default {
  name: 'GlBaseLink',
  mixins: [SafeLinkMixin],
};
</script>
<template>
  <a
    v-safe-link:[safeLinkConfig]
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- @slot The link to display. -->
    <slot></slot>
  </a>
</template>
