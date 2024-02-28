A collapsible listbox is a button that toggles a panel containing a list of options.
It supports single and multi-selection.

**Single-select:** By default, selecting an option will update the toggle label with the choice.
But the custom toggle text can be provided.
When option is selected, the dropdown will be closed and focus set on the toggle button.

**Multi-select:** Selecting an option will not update the toggle, but it can be customized
providing `toggleText` property. Also, selecting or deselecting an item won't close the dropdown.

## Icon-only listbox

Icon-only listboxes must have an accessible name.
You can provide this with the combination of `toggleText` and `textSrOnly` props.
For single-select listboxes `toggleText` will be set to the selected item's `text` property value
by default.

Optionally, you can use `no-caret` to remove the caret and `category="tertiary"` to remove the border.

```html
<gl-collapsible-listbox
  icon="ellipsis_v"
  toggle-text="More options"
  text-sr-only
  category="tertiary"
  no-caret
>
```

## Opening the listbox

Listbox will open on toggle button click (if it was previously closed).
On open, `GlCollapsibleListbox` will emit the `shown` event.

## Closing the listbox

The listbox is closed by any of the following:

- pressing <kbd>Esc</kbd>
- clicking anywhere outside the component
- selecting an option in single-select mode

After closing, `GlCollapsibleListbox` emits a `hidden` event.

## Selecting items

Set the `v-model` on the listbox to have 2-way data binding for the selected items in the listbox.
Alternatively, you can set `selected` property to the array of selected items
`value` properties (for multi-select) or to the selected item `value` property for a single-select.
On selection the listbox will emit the `select` event with the selected values.

## Resetting the selection

`GlCollapsibleListbox` can render a reset button if the `headerText` and
`resetButtonLabel` props are provided.
When clicking on the reset button, a `reset` event is emitted. It is the consumer's responsibility
to listen to that event and to update the model as needed.

## Setting listbox options

Use the `items` prop to provide options to the listbox. Each item can be
either an option or a group. Below are the expected shapes of these
objects:

```typescript
type Option = {
  value: string
  text?: string
}

type Group = {
  text: string
  options: Array<Option>
  textSrOnly?: boolean
}

type ItemsProp = Array<Option> | Array<Group>
```

### Options

The `value` property of options must be unique across all options
provided to the listbox, as it's used as a primary key.

The optional `text` property is used to render the default listbox item
template. If you want to render a custom template for items, use the
`list-item` scoped slot:

```html
<gl-collapsible-listbox :items="items">
  <template #list-item="{ item }">
    <span class="gl-display-flex gl-align-items-center">
      <gl-avatar :size="32" class-="gl-mr-3"/>
      <span class="gl-display-flex gl-flex-direction-column">
        <span class="gl-font-weight-bold gl-white-space-nowrap">{{ item.text }}</span>
        <span class="gl-text-gray-400"> {{ item.secondaryText }}</span>
      </span>
    </span>
  </template>
</gl-collapsible-listbox>
```

### Groups

Options can be contained within groups. A group has a required `text`
property, which must be unique across all groups within the listbox, as
it's used as a primary key. It also has a required property `items` that
must be an array of options. Optionally, you can hide the group heading
by setting `textSrOnly` to `true`. In this case the `text` is only used
for accessibility purposes.

Groups can be at most one level deep: a group can only contain options.
Options and groups _cannot_ be siblings. Either all items are options,
or they are all groups.

To render custom group labels, use the `group-label` scoped slot:

```html
<gl-collapsible-listbox :items="groups">
  <template #group-label="{ group }">
    {{ group.text }} <gl-badge size="sm">{{ group.options.length }}</gl-badge>
  </template>
</gl-collapsible-listbox>
```

### Dealing with long option texts

- Some options might have long non-wrapping text that would overflow the dropdown maximum width. In
such cases, it's recommended to override the `#list-item` slot and to truncate the option text using
`GlTruncate`.
- If the toggle text reflects the selected option text, it might be necessary to truncate
it too by overriding the `#toggle` slot.

## Search

To filter out items by  search query set `searchable` property to `true`.
Listbox will render the search field and will emit `search` event with the `searchQuery` value.
Performing the search is the responsibility of the listbox's consumer component.
When performing search set `searching` prop to `true` - this will render the loader
while search is in progress instead of the list of items.
To update content of the listbox, toggle the `searching` property
and update the `items` property with a new array. Be sure to debounce (or
similar) the `search` event handler to avoid rendering stale results.
To improve the accessibility, provide the `search-summary-sr-only` scoped slot
with a number of found search results text, alternately, you can pass a plural translate function.
An example of the plural translate function can be found [the GitLab Docs internationalization section](https://docs.gitlab.com/ee/development/i18n/externalization.html#plurals)
Screen reader will announce this text when the list is updated.

```html
<gl-collapsible-listbox :items="items" searchable>
  <template #search-summary-sr-only>
    5 users found
  </template>
</gl-collapsible-listbox>
```

## Split dropdown

See [button group documentation](/docs/base-button-group--docs#split-dropdowns).
