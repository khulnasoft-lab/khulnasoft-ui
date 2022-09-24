export const GROUPED_ITEMS = [
  {
    group: 'Issues',
    items: [
      { text: 'Lorem ipsum', iid: 1, type: 'issue' },
      { text: 'Dolar sit', iid: 2, type: 'issue' },
      { text: 'Amit', iid: 3, type: 'issue' },
      { text: 'Consectetur adipiscing', iid: 4, type: 'issue' },
      { text: 'Elit sed', iid: 5, type: 'issue' },
    ],
  },
  {
    group: 'Merge Requests',
    items: [
      { text: 'Do eiusmod', iid: 1, type: 'mr' },
      { text: 'Tempor incididunt', iid: 2, type: 'mr' },
      { text: 'Ut labore', iid: 3, type: 'mr' },
      { text: 'Et dolore', iid: 4, type: 'mr' },
      { text: 'Magna aliqua', iid: 5, type: 'mr' },
    ],
  },
  {
    group: 'Projects',
    items: [
      { text: 'Ut enim', iid: 1, type: 'project' },
      { text: 'Ad minim', iid: 2, type: 'project' },
      { text: 'Veniam quis', iid: 3, type: 'project' },
      { text: 'Nostrud exercitation', iid: 4, type: 'project' },
      { text: 'Ullamco laboris', iid: 5, type: 'project' },
    ],
  },
];

export const filterGroups = (text) => {
  if (!text) {
    return GROUPED_ITEMS;
  }

  return (
    GROUPED_ITEMS
      // Filter all items of groups
      .map(({ items, ...rest }) => ({
        items: items.filter((x) => x.text.toLowerCase().includes(text.toLowerCase())),
        ...rest,
      }))
      // Filter out groups with no matching items
      .filter((x) => x.items.length)
  );
};
