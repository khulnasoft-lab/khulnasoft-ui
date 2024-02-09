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
  computed: {
    mentionClasses() {
      const classes = ['gl-mention'];

      if (this.isCurrentUser) classes.push('gl-mention-is-current-user');

      if (this.$attrs.class) classes.push(this.$attrs.class);

      return classes;
    },
  },
};
</script>
<template>
  <b-link
    v-bind="$attrs"
    :class="mentionClasses"
    v-on="$listeners"
  >
    <!-- @slot The mention to display. -->
    <slot></slot>
  </b-link>
</template>
