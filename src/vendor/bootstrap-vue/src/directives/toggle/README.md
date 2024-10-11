# Toggle

> `v-b-toggle` is a light-weight directive for toggling the visibility of collapses, and includes
> automated [WAI-ARIA accessibility](?path=/docs/base-tooltip--docs#accessibility) attribute
> handling.

## Overview

The `v-b-toggle` directive can be used on interactive elements, such as buttons and to toggle the
visibility state of the [`<gl-collapse>`](?path=/docs/base-collapse--docs) component.

Besides toggling the visibility of the target component, the directive automatically updates ARIA
accessibility attributes on the element it is applied to so that they reflect the visibility state
of the target component. Refer to the [Accessibility section](#accessibility) below for additional
details and caveats.

## Directive syntax and usage

The directive is applied to the element or component that triggers the visibility of the target. The
target component can be specified (via its ID) as either a directive modifier(s), the directive
argument, or as a string/array passed to as the directive value:

- `v-b-toggle.my-collapse` - the directive modifier (multiple targets allowed, each modifier is a
  target ID)
- `v-b-toggle:my-collapse` - the directive argument
  ([Vue dynamic argument](https://vuejs.org/v2/guide/syntax.html#Dynamic-Arguments) is supported)
  <span class="badge badge-info small" aria-label="Available in BootstrapVue v2.14.0+">v2.14.0+</span>
- `v-b-toggle="'my-collapse'"` - the directive value as a string ID
- `v-b-toggle="'my-collapse1 my-collapse2'"` - the directive value as a space separated string of
  IDs
  <span class="badge badge-info small" aria-label="Available in BootstrapVue v2.14.0+">v2.14.0+</span>
- `v-b-toggle="['my-collapse1', 'my-collapse2']"` - the directive value as an array of string IDs
  <span class="badge badge-info small" aria-label="Available in BootstrapVue v2.14.0+">v2.14.0+</span>

Modifiers, argument, and the value can be used at the same time when targeting multiple components.

**Example usage:**

```html
<template>
  <div>
    <div class="mb-3">
      <b-button v-b-toggle.my-collapse>Toggle Collapse</b-button>
    </div>

    <b-collapse id="my-collapse">
      <b-card title="Collapsible card">
        Hello world!
      </b-card>
    </b-collapse>
  </div>
</template>

<!-- v-b-toggle-directive.vue -->
```

## Usage on links

<span class="badge badge-info small">2.15.0+</span>

If placing the directive on a link (or a component that renders a link), the target ID can
alternatively be specified via the `href` attribute.

Note that the browser URL will change and the page may scroll the target into view. To prevent the
URL from changing and the page from scrolling, add `@click.prevent` to the link.

**Example usage:**

```html
<template>
  <div>
    <div class="mb-3">
      <a v-b-toggle href="#example-collapse" @click.prevent>Toggle Collapse</a>
    </div>

    <b-collapse id="example-collapse">
      <b-card title="Collapsible card">
        Hello world!
      </b-card>
    </b-collapse>
  </div>
</template>

<!-- v-b-toggle-links.vue -->
```

## Hiding and showing content in the toggle trigger element

When using the `v-b-toggle` directive, the class `collapsed` will automatically be placed on the
trigger element when the target component is closed, and removed when open. As of BootstrapVue
`2.14.0`, the class `not-collapsed` will be applied when the target is _not_ closed.

**Example HTML markup:**

```html
<div>
  <b-button v-b-toggle:my-collapse>
    <span class="when-open">Close</span><span class="when-closed">Open</span> My Collapse
  </b-button>
  <b-collapse id="my-collapse">
    <!-- Content here -->
  </b-collapse>
</div>
```

**Example Custom CSS:**

```css
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
```

## Preventing the target from opening or closing

To prevent the trigger element from toggling the target, set the `disabled` prop on `<button>`,
`<b-button>`, or `<b-link>` (or components based on from `<b-link>`) and the toggle event will _not_
dispatched to the target(s).

## Accessibility

The directive, for accessibility reasons, should be placed on an clickable interactive element such
as a `<button>` or `<b-button>`, which can easily be accessed by keyboard-only users and screen
reader users. Elements that do not natively have an accessibility role of `button` (or `link`) will
have the attributes `role="button"` and `tabindex="0"` applied, and will have the appropriate click
handler instantiated. Therefore it is _highly recommended_ to _not_ place the directive on form
controls other than buttons.

The directive applies, and dynamically updates, the following ARIA attributes on the trigger
element:

- `aria-controls` - the ID(s) of the collapse component(s) being toggled
- `aria-expanded` - the visibility state of the collapse (see the
  [caveats section](#caveats-with-multiple-targets) below)

### Caveats with multiple targets

When multiple targets are specified, the value of the `aria-expanded` attribute may not be correct
if the individual target components can have their collapsed state controlled independently (either
via `v-model`, other controls with `v-b-toggle` directive, or CSS visibility).

## See also

- [collapse](?path=/docs/base-collapse--docs) Collapsible content with accordion support
