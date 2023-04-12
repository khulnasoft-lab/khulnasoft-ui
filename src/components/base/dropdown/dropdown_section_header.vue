<script>
import { BDropdownHeader } from 'bootstrap-vue';

export default {
  name: 'GlDropdownHeader',
  components: {
    BDropdownHeader,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-dropdown-header class="gl-dropdown-section-header" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-dropdown-header>
</template>
