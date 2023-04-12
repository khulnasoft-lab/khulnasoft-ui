<script>
import { BDropdownText } from 'bootstrap-vue';

export default {
  name: 'GlDropdownText',
  components: {
    BDropdownText,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-dropdown-text class="gl-dropdown-text" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-dropdown-text>
</template>
