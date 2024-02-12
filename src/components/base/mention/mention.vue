<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BLink } from 'bootstrap-vue';

export default {
  name: 'GlMention',
  components: {
    BLink,
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
  <b-link
    :class="[
      'gl-mention',
      { 'gl-mention-is-current-user': isCurrentUser },
    ]"
    v-on="$listeners"
  >
    <!-- @slot The mention to display. -->
    <slot></slot>
  </b-link>
</template>
