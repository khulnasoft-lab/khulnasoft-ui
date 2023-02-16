import { isFunction } from 'lodash';
import { DISCLOSURE_DROPDOWN_ITEM_NAME, DISCLOSURE_DROPDOWN_GROUP_NAME } from './constants';

const itemValidator = (item) => item?.text?.length > 0 && !Array.isArray(item?.items);

const isItem = (item) => Boolean(item) && itemValidator(item);

const isGroup = (group) =>
  Boolean(group) &&
  Array.isArray(group.items) &&
  Boolean(group.items.length) &&
  group.items.every(isItem);

const itemsValidator = (items) => items.every(isItem) || items.every(isGroup);

const isListItem = (tag) =>
  ['gl-disclosure-dropdown-group', 'gl-disclosure-dropdown-item', 'li'].includes(tag);

const isValidSlotTagVue2 = (vNode) =>
  Boolean(vNode) && isListItem(vNode.componentOptions?.tag || vNode.tag);

const isValidSlotTag = (vNode) => {
  return (
    [DISCLOSURE_DROPDOWN_ITEM_NAME, DISCLOSURE_DROPDOWN_GROUP_NAME].includes(vNode.type?.name) ||
    vNode.type === 'li'
  );
};

const hasOnlyListItems = ({ default: defaultSlot }) => {
  if (!isFunction(defaultSlot)) {
    return false;
  }
  const nodes = defaultSlot();
  return (
    Array.isArray(nodes) &&
    nodes.filter((vNode) => vNode.tag).length &&
    (nodes.filter((vNode) => vNode.tag).every(isValidSlotTagVue2) ||
      nodes.filter((vNode) => vNode.tag).every(isValidSlotTag))
  );
};

export { itemsValidator, isItem, isGroup, hasOnlyListItems };
