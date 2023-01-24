const itemValidator = (item) => item?.text?.length > 0 && !Array.isArray(item?.items);

const isItem = (item) => Boolean(item) && itemValidator(item);

const isGroup = (group) =>
  Boolean(group) &&
  Array.isArray(group.items) &&
  Boolean(group.items.length) &&
  group.items.every(isItem);

const itemsValidator = (items) => items.every(isItem) || items.every(isGroup);

const isAllItems = (items) => items.every(isItem);

const isAllGroups = (items) => items.every(isGroup);

export { itemsValidator, isItem, isGroup, isAllItems, isAllGroups };
