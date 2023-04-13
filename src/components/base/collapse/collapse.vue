<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BCollapse } from 'bootstrap-vue';

export default {
  name: 'GlCollapse',
  components: {
    BCollapse,
  },
  model: {
    prop: 'visible',
    event: 'input',
  },
};
</script>

<template>
  <b-collapse v-bind="$attrs" v-on="$listeners">
    <!-- @slot The content to show/hide. -->
    <slot></slot>
  </b-collapse>
</template>
