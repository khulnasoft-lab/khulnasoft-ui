<script>
import { BProgress } from 'bootstrap-vue';

export default {
  name: 'GlProgressBar',
  components: {
    BProgress,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-progress v-bind="$attrs" />
</template>
