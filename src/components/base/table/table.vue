<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BTable } from 'bootstrap-vue';
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
    activeSortingColumn({ field }) {
      return this.localSortBy === field?.key;
    },
    getSortingIcon({ field }) {
      if (this.activeSortingColumn({ field })) {
        if (this.localSortDesc) {
          return '↓';
        }
        return '↑';
      }

      if (this.$attrs['sort-direction'] === 'desc') {
        return '↓';
      }

      return '↑';
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
      <div :key="headSlotName" class="gl-display-flex">
        <slot :name="headSlotName" v-bind="scope"
          ><span>{{ scope.label }}</span></slot
        ><template v-if="isSortable(scope)">
          <div class="gl-ml-2 gl-w-5 gl-text-gray-900 gl-display-flex gl-justify-content-center">
            <span
              name="sort-icon"
              data-testid="sort-icon"
              :class="{ 'gl-display-none': !activeSortingColumn(scope) }"
            >
              {{ getSortingIcon(scope) }}
            </span>
          </div>
        </template>
      </div>
    </template>
  </b-table>
</template>
