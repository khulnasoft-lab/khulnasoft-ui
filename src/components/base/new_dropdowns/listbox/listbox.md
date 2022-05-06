A listbox dropdown is a button that toggles a panel containing a list of options.
Listbox supports single and multi-selection.

**Single-select:** By default, selecting an option will update the toggle label with the choice.
But the custom toggle text can be provided.
When option is selected, the dropdown will be closed and focus set on the toggle button.

**Multi-select:** Selecting an option will not update the toggle, but it can be customized
providing `toggleText` property. Also, selecting or deselecting an item won't close the dropdown.

### Icon-only listbox

Icon-only listboxes must have an accessible name.
You can provide this with the combination of `toggleText` and `textSrOnly` props.
For single-select listboxes `toggleText` will be set to the selected item's `text` property value
by default.

Optionally, you can use `no-caret` to remove the caret and `category="tertiary"` to remove the border.

```html
<gl-listbox
  icon="ellipsis_v"
  toggle-text="More options"
  text-sr-only
  category="tertiary"
  no-caret
>
```

### Opening the listbox

Listbox will open on toggle button click (if it was previously closed).
On open, `GlListbox` will emit the `shown` event.

### Closing the listbox

The listbox is closed by any of the following:

- pressing <kbd>Esc</kbd>
- clicking anywhere outside the component
- selecting an option in single-select mode

After closing, `GlListbox` emits a `hidden` event.

### Selecting items

Set the `v-model` on the listbox to have 2-way data binding for the selected items in the listbox.
Alternatively, you can set `selected` property to the array of selected items
`value` properties (for multi-select) or to the selected item `value` property for a single-select.
On selection the listbox will emit the `select` event with the selected values.

### Setting listbox options

Provide the list of options for the listbox - each item in the array should have `value` property.
It is used as a primary key.
To render the default listbox item template, the item should also have `text` property.
If you want to use custom template for rendering the listbox item, use the `list-item` template.

```html
<gl-listbox :items="items">
    <template #list-item="{ item }">
        <span class="gl-display-flex gl-align-items-center">
            <gl-avatar :size="32" class-="gl-mr-3"/>
            <span class="gl-display-flex gl-flex-direction-column">
              <span class="gl-font-weight-bold gl-white-space-nowrap">{{ item.text }}</span>
              <span class="gl-text-gray-400"> {{ item.secondaryText }}</span>
            </span>
          </span>
      </template>
</gl-listbox>
```
