<script>
export default {
  name: 'GlFormText',
  props: {
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
    tag: {
      type: String,
      required: false,
      default: 'small',
    },
  },
};
</script>

<template>
  <component :is="tag" :class="{ 'gl-form-text-block': !inline }" class="gl-form-text">
    <slot></slot>
  </component>
</template>
