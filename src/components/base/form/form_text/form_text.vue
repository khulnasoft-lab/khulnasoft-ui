<script>
export default {
  name: 'GlFormText',
  props: {
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<template>
  <span :class="{ 'gl-form-text-block': !inline }" class="gl-form-text">
    <slot></slot>
  </span>
</template>
