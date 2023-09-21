<script>
import { BTableLite } from 'bootstrap-vue';

const { tableClass } = BTableLite.options.props;

export default {
  name: 'GlTableLite',
  components: {
    BTableLite,
  },
  inheritAttrs: false,
  props: {
    tableClass,
    fields: {
      type: Array,
      required: false,
      default: null,
    },
    stickyHeader: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    stickyHeaderClass() {
      return this.stickyHeader ? 'gl-table--sticky-header' : null;
    },
    localTableClass() {
      return ['gl-table', this.tableClass, this.stickyHeaderClass];
    },
  },
};
</script>

<template>
  <b-table-lite :table-class="localTableClass" :fields="fields" v-bind="$attrs" v-on="$listeners">
    <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
      <!-- @slot See https://bootstrap-vue.org/docs/components/table#comp-ref-b-table-lite-slots for available slots. -->
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </b-table-lite>
</template>
