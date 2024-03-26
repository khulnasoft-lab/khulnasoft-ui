<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { GlBaseLink } from '../base_link/base_link.vue';

export default {
  name: 'GlMention',
  components: {
    GlBaseLink,
  },
  props: {
    isCurrentUser: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<template>
  <gl-base-link
    :class="[
      'gl-mention',
      { 'gl-mention-is-current-user': isCurrentUser },
    ]"
  >
    <!-- @slot The mention to display. -->
    <slot></slot>
  </gl-base-link>
</template>
