<script>
import { BDropdownForm } from 'bootstrap-vue';

export default {
  name: 'GlDropdownForm',
  components: {
    BDropdownForm,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-dropdown-form v-bind="$attrs" form-class="gl-p-0" v-on="$listeners">
    <slot></slot>
  </b-dropdown-form>
</template>
