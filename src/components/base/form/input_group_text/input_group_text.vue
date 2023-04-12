<script>
import { BInputGroupText } from 'bootstrap-vue';

export default {
  name: 'GlInputGroupText',
  components: {
    BInputGroupText,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-input-group-text v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-input-group-text>
</template>
