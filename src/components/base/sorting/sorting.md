## Usage

The sorting component allows the user to select the field on which they would like to sort a list
and whether to sort in ascending or descending order.

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
