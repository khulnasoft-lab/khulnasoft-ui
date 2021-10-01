<script>
import { BTableLite } from 'bootstrap-vue';

export default {
  components: {
    BTableLite,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-table-lite class="gl-table" v-bind="$attrs" v-on="$listeners">
    <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
      <!-- @slot See https://bootstrap-vue.org/docs/components/table#comp-ref-b-table-lite-slots for available slots. -->
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </b-table-lite>
</template>
