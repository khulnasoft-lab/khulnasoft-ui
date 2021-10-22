<script>
import { tableLiteSlotSelectors, tableLitePropSelectors } from './constants';

const shouldUseFullTable = ({ $attrs, $scopedSlots }) => {
  return (
    tableLitePropSelectors.some((prop) => $attrs[prop] !== undefined) ||
    tableLiteSlotSelectors.some((slot) => $scopedSlots[slot] !== undefined)
  );
};

export default {
  components: {
    FullTable: () => import('./full_table'),
    TableLite: () => import('./table_lite'),
  },
  inheritAttrs: false,

  render(createElement) {
    const component = shouldUseFullTable(this) ? 'FullTable' : 'TableLite';

    return createElement(component, {
      attrs: {
        ...this.$attrs,
      },
      class: 'gl-table',
      on: this.$listeners,
      scopedSlots: this.$scopedSlots,
    });
  },
};
</script>
