Button groups are an easy way to group a series of buttons together.

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

## vue-bootstrap component

This component uses [`BButtonGroup`](https://bootstrap-vue.org/docs/components/button-group) from vue-bootstrap
internally. So please take a look also there at their extensive documentation.
