<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BForm } from 'bootstrap-vue/src/components/form';

export default {
  name: 'GlForm',
  components: {
    BForm,
  },
  inheritAttrs: false,
};
</script>
<template>
  <b-form v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-form>
</template>
