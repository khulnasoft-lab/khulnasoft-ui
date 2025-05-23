<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BTable } from '../../../vendor/bootstrap-vue/src/components/table/table';
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
    computedFields() {
      return this.fields?.map((field) => {
        if (typeof field === 'string') {
          return field;
        }
        const { thAlignRight, thClass = '', ...rest } = field;
        const computedThClass = Array.isArray(thClass) ? thClass : thClass.split(' ');
        if (thAlignRight) {
          computedThClass.push('gl-table-th-align-right');
        }
        return {
          ...rest,
          thClass: computedThClass,
        };
      });
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
    :fields="computedFields"
    :sort-by.sync="localSortBy"
    :sort-desc.sync="localSortDesc"
    no-sort-reset
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="slotName in Object.keys($scopedSlots)" #[slotName]="scope">
      <slot :name="slotName" v-bind="scope"></slot>
    </template>
    <template v-for="headSlotName in headSlots" #[headSlotName]="scope">
      <div :key="headSlotName" class="gl-flex">
        <slot :name="headSlotName" v-bind="scope"
          ><span>{{ scope.label }}</span></slot
        ><template v-if="isSortable(scope)">
          <div class="gl-table-th-sort-icon-wrapper gl-flex gl-w-5 gl-justify-center">
            <span
              name="sort-icon"
              data-testid="sort-icon"
              :class="{ 'gl-hidden': !activeSortingColumn(scope) }"
            >
              {{ getSortingIcon(scope) }}
            </span>
          </div>
        </template>
      </div>
    </template>
    <template #empty="scope">
      <slot name="empty" v-bind="scope">
        <p class="gl-mb-0 gl-py-2 gl-text-subtle">{{ scope.emptyText }}</p>
      </slot>
    </template>
  </b-table>
</template>
