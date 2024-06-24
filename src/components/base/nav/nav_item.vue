<script>
import { BNavItem } from '../../../vendor/bootstrap-vue/src/components/nav/nav-item';

export default {
  name: 'GlNavItem',
  components: {
    BNavItem,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-nav-item v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-nav-item>
</template>
