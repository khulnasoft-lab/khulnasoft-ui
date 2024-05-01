## Usage

The `GlTableLite` component wraps BootstrapVue `BTableLite` component.
`BTableLite` provides a variety of slots for custom data rendering. You can learn
more about them in the
[component documentation](https://bootstrap-vue.org/docs/components/table#light-weight-tables).

## `GlTable` vs. `GlTableLite`

`GlTableLite` adds less payload to the pagebundle than `GlTable`.
When possible `GlTableLite` should be preferred over `GlTable`.

The `GlTableLite` component provides all of the styling and formatting features of
`GlTable` (including row details and stacked support), while excluding the following features:

- Filtering
- Sorting
- Pagination
- Items provider support
- Selectable rows
- Busy table state and styling
- Fixed top and bottom rows
- Empty row support

## Internationalization

To ensure we internationalize field labels, always pass an array of objects for the `fields` prop,
like mentioned in the implementation example.

_Full documentation for the `field` prop [here.](https://bootstrap-vue.org/docs/components/table#fields-column-definitions)_

## Implementation example

```html
<script>
export default {
  fields: [
    {
      key: 'column_one',
      label: __('First column'),
      thClass: 'w-60p',
      tdClass: 'table-col d-flex'
    },
    {
      key: 'col_2',
      label: __('Second column'),
      thClass: 'w-15p',
      tdClass: 'table-col d-flex'
    },
  ];
}
</script>
<template>
  <gl-table-lite
    :items="items"
    :fields="$options.fields"
  >
    <template #head(column_one)>
      <div>First column</div><!-- This is the column head for the first object in `fields` -->
    </template>

    <template #cell(column_one)>
      This is the template for column data belonging to the first object
    </template>

  </gl-table-lite>
</template>
```
