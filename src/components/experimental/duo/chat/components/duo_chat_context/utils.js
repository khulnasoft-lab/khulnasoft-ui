export function contextItemsValidator(items) {
  return (
    Array.isArray(items) &&
    items.every((item) => {
      return item.id && item.metadata.name && typeof item.isEnabled === 'boolean';
    })
  );
}
