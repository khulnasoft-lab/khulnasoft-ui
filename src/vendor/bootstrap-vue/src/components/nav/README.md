# Nav

> Navigation available in Bootstrap share general markup and styles, from the base `<b-nav>` class
> to the `active` and `disabled` states. Swap modifier props to switch between each style.

```html
<div>
  <b-nav>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav.vue -->
```

## Overview

The base `<b-nav>` component is built with flexbox and provides a strong foundation for building all
types of navigation components. It includes some style overrides (for working with lists), some link
padding for larger hit areas, and basic disabled styling. No active states are included in the base
nav.

`<b-nav>` supports the following child components:

- `<b-nav-item>` for actionable links (or router-links)
- `<b-nav-text>` for plain text content
- `<b-nav-form>` for inline forms

## Link appearance

Two style variations are supported: `tabs` and `pills`, which support `active` state styling. These
variants are mutually exclusive - use only one style or the other.

### Tab style

Make the nav look like tabs by setting the `tabs` prop.

```html
<div>
  <b-nav tabs>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-tabs.vue -->
```

### Pill style

Use the pill style by setting the `pills` prop.

```html
<div>
  <b-nav pills>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-pills.vue -->
```

### Small

Make the nav smaller by setting the `small` prop.

```html
<div>
  <b-nav small>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-small.vue -->
```

## Fill and justify

Force your `<b-nav>` content to extend the full available width.

### Fill

To proportionately fill all available space with your `<b-nav-item>` components, set the `fill`
prop. Notice that all horizontal space is occupied, but not every nav item has the same width.

```html
<div>
  <b-nav tabs fill>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Link with a long name </b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-fill.vue -->
```

### Justified

For equal-width elements, set the `justified` prop instead. All horizontal space will be occupied by
nav links, but unlike `fill` above, every `<b-nav-item>` will be the same width.

```html
<div>
  <b-nav tabs justified>
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Link with a long name </b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-justified.vue -->
```

## Alignment

To align your `<b-nav-item>` components, use the `align` prop. Available values are `left`, `center`
and `right`.

```html
<div>
  <b-nav tabs align="center">
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Link with a long name </b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>

<!-- b-nav-alignment.vue -->
```

## Nav text content

Use the `<b-nav-text>` child component to place plain text content into the nav:

```html
<div>
  <b-nav >
    <b-nav-item href="#1">Link 1</b-nav-item>
    <b-nav-item href="#2">Link 2</b-nav-item>
    <b-nav-text>Plain text</b-nav-text>
  </b-nav>
</div>

<!-- b-nav-text.vue -->
```

## Nav inline forms

Use the `<b-nav-form>` child component to place an _inline_ form into the nav:

```html
<div>
  <b-nav pills>
    <b-nav-item href="#1" active>Link 1</b-nav-item>
    <b-nav-item href="#2">Link 2</b-nav-item>
    <b-nav-form @submit.stop.prevent="alert('Form Submitted')">
      <b-form-input aria-label="Input" class="mr-1"></b-form-input>
      <b-button type="submit">Ok</b-button>
    </b-nav-form>
  </b-nav>
</div>

<!-- b-nav-form.vue -->
```

Refer to the [`<gl-form>` inline](?path=/docs/base-form-form--docs#inline-formm) documentation for
additional details on placing form controls.

## Tabbed local content support

See the [`<gl-tabs>`](?path=/docs/base-tabs--docs) component for creating tabbable panes of local
content (not suited for navigation).

## Card integration

Use a `<b-nav>` in a [`<gl-card>`](?path=/docs/base-card--docs) header, by enabling the
`card-header` prop on `<b-nav>` and setting either the `pills` or `tabs` props:

**Tabs style:**

```html
<div>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Inactive</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body class="text-center">
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>

      <b-button variant="primary">Go somewhere</b-button>
    </b-card-body>
  </b-card>
</div>

<!-- nav-card-tabs.vue -->
```

**Pill style:**

```html
<div>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header pills>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Inactive</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body class="text-center">
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>

      <b-button variant="primary">Go somewhere</b-button>
    </b-card-body>
  </b-card>
</div>

<!-- nav-card-pills.vue -->
```

**Plain style:**

The `card-header` prop is only needed when you are applying `tabs` or `pills` style. Note that
Bootstrap v4 SCSS does not have special styling for `active` state plain style nav items.

```html
<div>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Inactive</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body class="text-center">
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>

      <b-button variant="primary">Go somewhere</b-button>
    </b-card-body>
  </b-card>
</div>

<!-- nav-card-plain.vue -->
```

### Using with Vue Router

Have your card `<b-nav>` control vue router nested routes via `<router-view>` or `<nuxt-child>`
components, to created tabbed content that changes with route URL:

```html
// On page with route `/some/route`
<div>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
        <b-nav-item to="/some/route/" exact exact-active-class="active">Active</b-nav-item>
        <b-nav-item to="/some/route/foo" exact exact-active-class="active">Foo</b-nav-item>
        <b-nav-item to="/some/route/bar" exact exact-active-class="active">Bar</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body>
      <!-- Child route gets rendered in <router-view> or <nuxt-child> -->
      <router-view></router-view>
      <!-- Or if using Nuxt.js
      <nuxt-child></nuxt-child>
      -->
    </b-card-body>
  </b-card>
</div>
```

Note: Vue Router does not support defining active routes with hashes (`#`), which is why you must
define the "tab" content as child routes.

**Example router config for above:**

<!-- eslint-disable no-unused-vars, no-undef -->

```js
const routes = [
  {
    path: '/some/route',
    // We don't provide a name on this parent route, but rather
    // set the name on the default child route instead
    // name: 'some-route',
    component: SomeRouteComponent,
    // Child route "tabs"
    children: [
      // Note we provide the above parent route name on the default child tab
      // route to ensure this tab is rendered by default when using named routes
      { path: '', component: DefaultTabComponent, name: 'some-route' },
      { path: 'foo', component: FooTabComponent },
      { path: 'bar', component: BarTabComponent }
    ]
  }
]
```

One can also use Vue Router
[named routes](https://router.vuejs.org/guide/essentials/named-routes.html#named-routes) and/or
route params instead of path based routes.

For more details see:

- [Vue Router `<router-view>`](https://router.vuejs.org/api/#router-view)
- [Nuxt.JS `<nuxt-child>`](https://nuxtjs.org/api/components-nuxt-child)

## Accessibility

If you're using `<b-nav>` to provide a navigation bar, be sure to add a `role="navigation"` to the
most logical parent container of `<b-nav>`, or wrap a `<nav>` element around `<b-nav>`. Do **not**
add the role to the `<b-nav>` itself, as this would prevent it from being announced as an actual
list by assistive technologies.

### Tabbed interface accessibility

Note that navigation bars, even if visually styled as tabs, should **not** be given
`role="tablist"`, `role="tab"` or `role="tabpanel"` attributes. These are only appropriate for
[tabbed interfaces](?path=/docs/base-tabs--docs) that do not change the URL or `$route`, as
described in the [WAI ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel).
See [`<gl-tabs>`](?path=/docs/base-tabs--docs) for dynamic tabbed interfaces that are compliant with
WAI ARIA.

## See also

- [tabs](?path=/docs/base-tabs--docs) to create tabbable panes of local content.
- [Router Link Support reference](?path=/docs/base-link--docs#router-link-support) for information
  about router-link specific props available on `<b-nav-item>`

<!-- Component reference added automatically from component package.json -->
