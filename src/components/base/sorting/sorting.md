The sorting component allows the user to select the field on which they would like to sort a list
and whether to sort in ascending or descending order.

Provide a list of sort options via the `sortOptions` prop with this structure:

```typescript
type sortOptionsProp = Array<{
  value: string
  text: string
}>
```

The `value` should be a unique primitive value, and `text` is the user-facing
string for that option.

Set the currently selected sort option by passing a value to the `sortBy` prop.
This should equal one of the `sortOptions` values. The selected sort option is
rendered with a check mark next to it in the dropdown menu.

When the user changes the selected sort option, a `sortByChange` event is
emitted, with the `value` of the option as the only payload.

The text of the dropdown trigger button is the `text` of the selected sort
option. Pass a string to the `text` prop to override this behavior.

When the user clicks on the sort direction button, a `sortDirectionChange`
event is emitted, with a boolean value as its only payload. If the payload is
`true`, the new order is ascending; otherwise it's descending.

A complete implementation example might look like:

```html
<template>
  <gl-sorting
    :sort-options="sortOptions"
    :sort-by="sortBy"
    :is-ascending="isAscending"
    @sortByChange="onSortByChange"
    @sortDirectionChange="onDirectionChange"
  />
</template>

<script>
import { GlSorting } from '@gitlab/ui';

export default {
  components: {
    GlSorting,
  },
  data() {
    const sortOptions = [{
      value: 'name',
      text: 'Name',
    }, {
      value: 'date',
      text: 'Date',
    }];

    return {
      isAscending: false,
      sortBy: sortOptions[0].value,
      sortOptions,
    }
  },
  methods: {
    onSortByChange(value) {
      this.sortBy = value;
      this.sortMyData(this.sortBy, this.isAscending);
    },
    onDirectionChange(isAscending) {
      this.isAscending = isAscending;
      this.sortMyData(this.sortBy, this.isAscending);
    },
    sortMyData(sortBy, isAscending) {
      // Use sortBy and direction to sort your data
    },
  }
}
</script>
```
