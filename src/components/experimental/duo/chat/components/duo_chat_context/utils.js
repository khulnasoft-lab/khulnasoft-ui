export function categoryValidator(category) {
  return Boolean(category && category.value && category.label && category.icon);
}

export function categoriesValidator(categories) {
  return Array.isArray(categories) && categories.every((category) => categoryValidator(category));
}

function disabledReasonsValidator(disabledReasons) {
  return (
    disabledReasons === undefined ||
    (Array.isArray(disabledReasons) &&
      disabledReasons.every((reason) => typeof reason === 'string'))
  );
}

export function contextItemValidator(item) {
  return Boolean(
    item &&
      item.id &&
      item.category &&
      item.metadata &&
      typeof item.metadata === 'object' &&
      typeof item.metadata.enabled === 'boolean' &&
      disabledReasonsValidator(item.metadata.disabledReasons)
  );
}

export function contextItemsValidator(items) {
  return Array.isArray(items) && items.every((item) => contextItemValidator(item));
}

export function formatIssueId(iid) {
  if (!iid) return '';

  return `#${iid}`;
}

export function formatMergeRequestId(iid) {
  if (!iid) return '';

  return `!${iid}`;
}

/**
 * Calculates a new index within a range. If the new index would fall out of bounds, wraps to the start/end of the range.
 * @param {number} currentIndex - The starting index.
 * @param {number} step - The number of steps to move (positive or negative).
 * @param {number} totalLength - The total number of items in the range.
 * @returns {number} The new index.
 */
export function wrapIndex(currentIndex, step, totalLength) {
  return (currentIndex + step + totalLength) % totalLength;
}
