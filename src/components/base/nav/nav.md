## Overview

The base `<gl-nav>` component is built with flexbox and provides a strong foundation for building all
types of navigation components. It includes some style overrides (for working with lists), some link
padding for larger hit areas, and basic disabled styling. No active states are included in the base
nav.

`<gl-nav>` supports the `<gl-nav-item>` child component for actionable links (or router-links).

## Link appearance

Two style variations are supported: `tabs` and `pills`, which support `active` state styling. These
variants are mutually exclusive - use only one style or the other.

### Tab style

Make the nav look like tabs by setting the `tabs` prop.

```html
<div>
  <gl-nav tabs>
    <gl-nav-item active>Active</gl-nav-item>
    <gl-nav-item>Link</gl-nav-item>
    <gl-nav-item>Another Link</gl-nav-item>
    <gl-nav-item disabled>Disabled</gl-nav-item>
  </gl-nav>
</div>
```

### Pill style

Use the pill style by setting the `pills` prop.

```html
<div>
  <gl-nav pills>
    <gl-nav-item active>Active</gl-nav-item>
    <gl-nav-item>Link</gl-nav-item>
    <gl-nav-item>Another Link</gl-nav-item>
    <gl-nav-item disabled>Disabled</gl-nav-item>
  </gl-nav>
</div>
```

### Small

Make the nav smaller by setting the `small` prop.

```html
<div>
  <gl-nav small>
    <gl-nav-item active>Active</gl-nav-item>
    <gl-nav-item>Link</gl-nav-item>
    <gl-nav-item>Another Link</gl-nav-item>
    <gl-nav-item disabled>Disabled</gl-nav-item>
  </gl-nav>
</div>
```

## Fill and justify

Force your `<gl-nav>` content to extend the full available width.

### Fill

To proportionately fill all available space with your `<gl-nav-item>` components, set the `fill`
prop. Notice that all horizontal space is occupied, but not every nav item has the same width.

```html
<div>
  <gl-nav tabs fill>
    <gl-nav-item active>Active</gl-nav-item>
    <gl-nav-item>Link</gl-nav-item>
    <gl-nav-item>Link with a long name </gl-nav-item>
    <gl-nav-item disabled>Disabled</gl-nav-item>
  </gl-nav>
</div>
```

### Justified

For equal-width elements, set the `justified` prop instead. All horizontal space will be occupied by
nav links, but unlike `fill` above, every `<gl-nav-item>` will be the same width.

```html
<div>
  <gl-nav tabs justified>
    <gl-nav-item active>Active</gl-nav-item>
    <gl-nav-item>Link</gl-nav-item>
    <gl-nav-item>Link with a long name </gl-nav-item>
    <gl-nav-item disabled>Disabled</gl-nav-item>
  </gl-nav>
</div>
```

## Alignment

To align your `<gl-nav-item>` components, use the `align` prop. Available values are `left`, `center`
and `right`.

```html
<div>
  <gl-nav tabs align="center">
    <gl-nav-item active>Active</gl-nav-item>
    <gl-nav-item>Link</gl-nav-item>
    <gl-nav-item>Link with a long name </gl-nav-item>
    <gl-nav-item disabled>Disabled</gl-nav-item>
  </gl-nav>
</div>
```

## Tabbed local content support

See the [`<gl-tabs>`](?path=/docs/base-tabs--docs) component for creating tabbable panes of local
content (not suited for navigation).

## Card integration

Use a `<gl-nav>` in a [`<gl-card>`](?path=/docs/base-card--docs) header, by enabling the
`card-header` prop on `<gl-nav>` and setting either the `pills` or `tabs` props:

```html
<div>
  <gl-card title="Card Title">
    <template #header>
      <gl-nav card-header tabs>
        <gl-nav-item active>Active</gl-nav-item>
        <gl-nav-item>Inactive</gl-nav-item>
      </gl-nav>
    </template>

    <template #default>
      <p>With supporting text below as a natural lead-in to additional content.</p>
      <gl-button variant="primary">Go somewhere</gl-button>
    </template>
  </gl-card>
</div>
```

**Plain style:**

The `card-header` prop is only needed when you are applying `tabs` or `pills` style. Note that
we do not have special styling for `active` state plain style nav items.

```html
<div>
  <gl-card title="Card Title">
    <template #header>
      <gl-nav>
        <gl-nav-item active>Active</gl-nav-item>
        <gl-nav-item>Inactive</gl-nav-item>
      </gl-nav>
    </template>

    <template #default>
      <p>pWith supporting text below as a natural lead-in to additional content.</p>
      <gl-button variant="primary">Go somewhere</gl-button>
    </template>
  </gl-card>
</div>
```

## Accessibility

If you're using `<gl-nav>` to provide a navigation bar, be sure to add a `role="navigation"` to the
most logical parent container of `<gl-nav>`, or wrap a `<nav>` element around `<gl-nav>`. Do **not**
add the role to the `<gl-nav>` itself, as this would prevent it from being announced as an actual
list by assistive technologies.

### Tabbed interface accessibility

Note that navigation bars, even if visually styled as tabs, should **not** be given
`role="tablist"`, `role="tab"` or `role="tabpanel"` attributes. These are only appropriate for
[tabbed interfaces](?path=/docs/base-tabs--docs) that do not change the URL or `$route`, as
described in the [WAI ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel).
See [`<gl-tabs>`](?path=/docs/base-tabs--docs) for dynamic tabbed interfaces that are compliant with
WAI ARIA.

## See also

- [tabs](?path=/docs/base-tabs--docs) to create tabbable panes of local content, even via dropdown
  menus.
- [Router Link Support reference](?path=/docs/base-link--docs#router-link-support) for information
  about router-link specific props available on `<gl-nav-item>`
