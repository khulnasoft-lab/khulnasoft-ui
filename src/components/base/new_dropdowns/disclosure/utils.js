import isFunction from 'lodash/isFunction';
import { DISCLOSURE_DROPDOWN_ITEM_NAME, DISCLOSURE_DROPDOWN_GROUP_NAME } from './constants';

const itemValidator = (item) => item?.text?.length > 0 && !Array.isArray(item?.items);

const isItem = (item) => Boolean(item) && itemValidator(item);

const isGroup = (group) =>
  Boolean(group) &&
  Array.isArray(group.items) &&
  Boolean(group.items.length) &&
  // eslint-disable-next-line unicorn/no-array-callback-reference
  group.items.every(isItem);

// eslint-disable-next-line unicorn/no-array-callback-reference
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

  if (!Array.isArray(nodes)) {
    return false;
  }

  const tags = nodes.filter((vNode) => vNode.tag);

  return tags.length && tags.every((tag) => isValidSlotTag(tag) || isValidSlotTagVue2(tag));
};

export { itemsValidator, isItem, isGroup, hasOnlyListItems };
