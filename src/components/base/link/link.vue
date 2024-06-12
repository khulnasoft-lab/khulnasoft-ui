<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BLink } from '../../../vendor/bootstrap-vue/src/components/link/link';
import { SafeLinkMixin } from '../../mixins/safe_link_mixin';

export default {
  name: 'GlLink',
  components: {
    BLink,
  },
  mixins: [SafeLinkMixin],
};
</script>
<template>
  <b-link
    v-safe-link:[safeLinkConfig]
    v-bind="$attrs"
    :target="target"
    class="gl-link"
    v-on="$listeners"
  >
    <!-- @slot The link to display. -->
    <slot></slot>
  </b-link>
</template>
