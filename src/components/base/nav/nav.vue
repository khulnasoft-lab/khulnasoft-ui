<script>
import { BNav } from '../../../vendor/bootstrap-vue/src/components/nav/nav';

export default {
  name: 'GlNav',
  components: {
    BNav,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-nav v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-nav>
</template>
