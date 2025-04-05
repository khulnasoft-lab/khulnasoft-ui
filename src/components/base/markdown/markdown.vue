<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  name: 'GlMarkdown',
  props: {
    compact: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<template>
  <div :class="['gl-markdown', { 'gl-compact-markdown': compact }]">
    <slot></slot>
  </div>
</template>
