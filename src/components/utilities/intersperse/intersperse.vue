<!-- eslint-disable vue/multi-word-component-names -->
<script>
import compose from 'lodash/fp/compose';
import fill from 'lodash/fp/fill';
import filter from 'lodash/fp/filter';

import { intersperse, insert } from '../../../utils/data_utils';

const containsWhitespaceOnly = (vNode) => vNode.text.trim() === '';
const isTag = (vNode) => typeof vNode.tag === 'string';
const filterWhitespaceNodes = filter((vNode) => isTag(vNode) || !containsWhitespaceOnly(vNode));

const insertAfterSecondLastItem = insert(-1);
const replaceSecondLastItem = fill(-2, -1);

// handles the addition of the lastSeparator in these two cases:
// item1, item2, item3 => item1, item2, and item3
// item1, item2 => item1 and item2
const addLastSeparator = (lastSeparator) => (items) => {
  if (!lastSeparator) {
    return items;
  }

  return items.length > 3
    ? insertAfterSecondLastItem(lastSeparator, items)
    : replaceSecondLastItem(lastSeparator, items);
};

export default {
  name: 'GlIntersperse',
  functional: true,
  props: {
    separator: {
      type: String,
      default: ', ',
      required: false,
    },
    lastSeparator: {
      type: String,
      default: '',
      required: false,
    },
  },
  render(createElement, context) {
    const {
      props: { separator, lastSeparator },
      slots,
      data,
    } = context;

    const filterAndSeparate = compose(
      addLastSeparator(lastSeparator),
      intersperse(separator),
      filterWhitespaceNodes
    );

    return createElement('span', data, filterAndSeparate(slots().default));
  },
};
</script>
