<script>
import { BProgress } from '../../../vendor/bootstrap-vue/src/components/progress/progress';

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
