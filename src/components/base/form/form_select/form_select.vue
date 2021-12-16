<script>
import { BFormSelect } from 'bootstrap-vue';

export default {
  components: {
    BFormSelect,
  },
  inheritAttrs: false,
};
</script>
<template>
  <b-form-select class="gl-form-select" v-bind="$attrs" v-on="$listeners">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-form-select>
</template>
