<script>
import { BButtonGroup } from 'bootstrap-vue';

export default {
  name: 'GlButtonGroup',
  components: {
    BButtonGroup,
  },
};
</script>
<template>
  <b-button-group v-bind="$attrs" v-on="$listeners">
    <!-- @slot The buttons to group. -->
    <slot></slot>
  </b-button-group>
</template>
