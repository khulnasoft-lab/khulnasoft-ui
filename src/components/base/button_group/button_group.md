Button groups are an easy way to group a series of buttons together.

```html
<gl-button-group>
  <gl-button>Download</b-button>
  <gl-button>Browse</b-button>
  <gl-button variant="danger">Delete</b-button>
</gl-button-group>
```

## Split dropdowns

Both `GlCollapsibleListbox` and `GlDisclosureDropdown` can be added as the last
child of a button group to produce a "split" dropdown.

For the correct styling, the dropdown component must render a caret _only_.
This means no icon, and no visible text. For accessbility, ensure the
dropdown's `toggle-text` _and_ `text-sr-only` props are set.

```html
<gl-button-group>
  <gl-button>Split listbox</gl-button>

  <gl-collapsible-listbox
    v-model="foo"
    :items="items"
    toggle-text="Choose button action"
    text-sr-only
  />
</gl-button-group>
```

## Vertical variation

Make a set of buttons appear vertically stacked rather than horizontally by setting the `vertical` prop.
Split button dropdowns are not supported here.

```html
<gl-button-group vertical>
  <gl-button>Top</b-button>
  <gl-button>Middle</b-button>
  <gl-button>Bottom</b-button>
</gl-button-group>
```
