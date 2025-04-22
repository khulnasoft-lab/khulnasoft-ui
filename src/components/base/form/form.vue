<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  name: 'GlForm',
};
</script>
<template>
  <form v-on="$listeners">
    <slot></slot>
  </form>
</template>
