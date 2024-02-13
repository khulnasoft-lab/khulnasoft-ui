<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BTable } from 'bootstrap-vue';
import GlIcon from '../icon/icon.vue';
import { logWarning, isDev } from '../../../utils/utils';
import { tableFullSlots, tableFullProps, glTableLiteWarning } from './constants';

const shouldUseFullTable = ({ $attrs, $scopedSlots }) => {
  return (
    tableFullProps.some((prop) => $attrs[prop] !== undefined) ||
    tableFullSlots.some((slot) => $scopedSlots[slot] !== undefined)
  );
};

const { tableClass } = BTable.options.props;

export default {
  name: 'GlTable',
  components: {
    BTable,
    GlIcon,
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
    sortBy: {
      type: String,
      required: false,
      default: undefined,
    },
    sortDesc: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      localSortBy: this.sortBy,
      localSortDesc: this.sortDesc,
    };
  },
  computed: {
    stickyHeaderClass() {
      return this.stickyHeader ? 'gl-table--sticky-header' : null;
    },
    localTableClass() {
      return ['gl-table', this.tableClass, this.stickyHeaderClass];
    },
    headSlots() {
      return [
        'head()',
        ...Object.keys(this.$scopedSlots).filter((slotName) => slotName.startsWith('head(')),
      ];
    },
  },
  mounted() {
    // logWarning will call isDev before logging any message
    // this additional call to isDev is being made to exit the condition early when run in production
    if (isDev() && !shouldUseFullTable(this)) {
      logWarning(glTableLiteWarning, this.$el);
    }
  },
  methods: {
    isSortable({ field }) {
      return field?.sortable;
    },
    getSortingIcon({ field }) {
      if (this.localSortBy !== field?.key) {
        return null;
      }
      return this.localSortDesc ? 'arrow-down' : 'arrow-up';
    },
  },
};
</script>

<template>
  <b-table
    :table-class="localTableClass"
    :fields="fields"
    :sort-by.sync="localSortBy"
    :sort-desc.sync="localSortDesc"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="slotName in Object.keys($scopedSlots)" #[slotName]="scope">
      <slot :name="slotName" v-bind="scope"></slot>
    </template>
    <template v-for="headSlotName in headSlots" #[headSlotName]="scope">
      <div :key="headSlotName" class="gl-display-flex gl-align-items-center">
        <slot :name="headSlotName" v-bind="scope">{{ scope.label }}</slot
        ><gl-icon
          v-if="isSortable(scope) && getSortingIcon(scope)"
          :name="getSortingIcon(scope)"
          class="gl-ml-3 gl-min-w-5 gl-text-gray-500"
        />
        <div
          v-if="isSortable(scope) && !getSortingIcon(scope)"
          class="gl-display-inline-block gl-w-5 gl-h-5 gl-ml-3 gl-min-w-5"
        ></div>
      </div>
    </template>
  </b-table>
</template>
