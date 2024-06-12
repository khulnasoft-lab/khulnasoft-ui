<script>
import { BButtonGroup } from '../../../vendor/bootstrap-vue/src/components/button-group/button-group';

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
