<script>
export default {
  name: 'GlButtonGroup',
  props: {
    /**
     * When set, rendered the button group in vertical mode.
     */
    vertical: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<template>
  <div :class="!vertical ? 'btn-group' : 'btn-group-vertical'" role="group" v-on="$listeners">
    <!-- @slot The buttons to group. -->
    <slot></slot>
  </div>
</template>
