# Link

> Use BootstrapVue's custom `b-link` component for generating a standard `<a>` link or
> `<router-link>`. `<b-link>` supports the `disabled` state and `click` event propagation.

`<b-link>` is the building block for most BootstrapVue components that offer link functionality.

```html
<div>
  <b-link href="#foo">Link</b-link>
</div>

<!-- b-link.vue -->
```

## Link type

By specifying a value in the `href` prop, a standard link (`<a>`) element will be rendered. To
generate a `<router-link>` instead, specify the route location via the `to` prop.

Router links support various additional props. Refer to the
[Router support](?path=/docs/base-link--docs#router-link-support) reference section for details.

If your app is running under [Nuxt.js](https://nuxtjs.org), the
[`<nuxt-link>`](https://nuxtjs.org/api/components-nuxt-link) component will be used instead of
`<router-link>`. The `<nuxt-link>` component supports all the same features as `<router-link>` (as
it is a wrapper component for `<router-link>`) and more.

### Third party router links

BootstrapVue auto detects using `<router-link>` and `<nuxt-link>` link components. Some 3rd party
frameworks also provide customized versions of `<router-link>`, such as
[Gridsome's `<g-link>` component](https://gridsome.org/docs/linking/). `<b-link>` can support these
third party `<router-link>` compatible components via the use of the `router-component-name` prop.
All `vue-router` props (excluding `<nuxt-link>` specific props) will be passed to the specified
router link component.

Note that the 3rd party component will only be used when the `to` prop is set.

## Links with `href="#"`

Typically `<a href="#">` will cause the document to scroll to the top of page when clicked.
`<b-link>` addresses this by preventing the default action (scroll to top) when `href` is set to
`#`.

If you need scroll to top behaviour, use a standard `<a href="#">...</a>` tag.

## Link disabled state

Disable link functionality by setting the `disabled` prop to true.

```html
<div>
  <b-link href="#foo" disabled>Disabled Link</b-link>
</div>

<!-- b-link-disabled.vue -->
```

Disabling a link will set the Bootstrap v4 `.disabled` class on the link as well as handles stopping
event propagation, preventing the default action from occurring, and removing the link from the
document tab sequence (`tabindex="-1"`).

**Note:** Bootstrap v4 CSS currently does not style disabled links differently than non-disabled
links. You can use the following custom CSS to style disabled links (by preventing hover style
changes):

```css
a.disabled {
  pointer-events: none;
}
```

Not all browsers support `pointer-events: none;`.

<!-- Component reference added automatically from component package.json -->
