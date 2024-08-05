<script>
import { BInputGroupText } from '../../../../vendor/bootstrap-vue/src/components/input-group/input-group-text';

export default {
  name: 'GlInputGroupText',
  components: {
    BInputGroupText,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-input-group-text v-bind="$attrs" class="gl-form-input-group-text" v-on="$listeners">
    <slot></slot>
  </b-input-group-text>
</template>
