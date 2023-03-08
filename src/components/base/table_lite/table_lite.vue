<script>
import { BTableLite } from 'bootstrap-vue';

const { tableClass } = BTableLite.options.props;

export default {
  components: {
    BTableLite,
  },
  inheritAttrs: false,
  props: { tableClass },
  computed: {
    localTableClass() {
      return ['gl-table', this.tableClass];
    },
  },
};
</script>

<template>
  <b-table-lite :table-class="localTableClass" v-bind="$attrs" v-on="$listeners">
    <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
      <!-- @slot See https://bootstrap-vue.org/docs/components/table#comp-ref-b-table-lite-slots for available slots. -->
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </b-table-lite>
</template>
