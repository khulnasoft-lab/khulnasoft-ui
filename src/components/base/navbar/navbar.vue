<script>
import { BNavbar } from '../../../vendor/bootstrap-vue/src/components/navbar/navbar';

export default {
  name: 'GlNavbar',
  components: {
    BNavbar,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-navbar class="gl-navbar" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-navbar>
</template>
