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

## Deprecated usage

> **NOTE:** This documents the deprecated API, which will be removed in a future major release.

The dropdown part of the sorting component is a standard `gl-dropdown` component, with the items
exposed as a slot. Inside the `gl-sorting` component, you should add a list of `gl-sorting-item`
components to construct your sorting options. The check icon will be displayed when a
`gl-sorting-item` has its `active` prop set to `true`.

The `gl-sorting` component expects its parent component to manage the `text` and `is-ascending`
props. It does not track these using internal state.

A sort update should be triggered by clicking a `gl-sorting-item` component (and therefore should
have a `@click` event bound or a `href` prop in the case of navigation) or by clicking the direction
button. You should bind a function to the `sortDirectionChange` event to receive the new
`is-ascending` value and re-order your data appropriately.

A complete implementation example might look like:

```html
<template>
  <gl-sorting
    :text="dropdownText"
    :is-ascending="isAscending"
    @sortDirectionChange="onDirectionChange"
  >
    <gl-sorting-item @click="onSortItemClick('Item 1')">Item 1</gl-sorting-item>
    <gl-sorting-item @click="onSortItemClick('Item 2')">Item 2</gl-sorting-item>
    <gl-sorting-item @click="onSortItemClick('Item 3')">Item 3</gl-sorting-item>
  </gl-sorting>
</template>

<script>
import { GlSorting, GlSortingItem } from '@gitlab/ui';

export default {
  components: {
    GlSorting,
    GlSortingItem,
  },
  data() {
    return {
      isAscending: false,
      dropdownText: 'Sort...'
    }
  },
  methods: {
    onSortItemClick(sortByItem) {
      this.dropdownText = sortByItem;
      this.sortMyData(sortByItem, this.isAscending);
    },
    onDirectionChange(isAscending) {
      this.isAscending = isAscending;
      this.sortMyData(this.dropdownText, this.isAscending);
    },
    sortMyData(sortBy, isAscending) {
      // Use sortBy and direction to sort your data
    },
  }
}
</script>
```
