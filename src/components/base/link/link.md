## Variants

- **Inline**: Link that appears within body text, like a paragraph or sentence. In order to
  distinguish a linked reference from surrounding content, a link within body copy must be
  underlined. Inline text links can be user-generated, for example, referencing an issue with
  "#3126" in the markdown editor of a merge request description where the link's primary function
  is linking to the referred issue. They can also be in text generated from a source file, for
  example, a "learn more about pipelines" link in the paragraph of an empty state template.
- **User interface (UI)**: Standalone link in the UI. User interface links are not user-generated.
  For example, a link in the system notes that compares the changes in a new commit to a previous
  one. The placement, color, and actionable text all provide link affordance. A link button has a
  similar style, but is used for an action and not a link.
- **Meta**: Standalone text or text within a short string of system-generated content may contain
  multiple meta links. Meta links share a meaningful datapoint or reference, and are only links
  secondarily. For example, the primary function of including "%15.8" in a string is to
  communicate the milestone, though it can also link to more information about it. Meta links represent
  a wide variety of content and should be styled specifically for the contexts in which they appear.
- **Mention**: Indicates when a user is "@" mentioned in the content. The username links to the
  user's profile. A mention link can be within body or meta content.

Use `<gl-link>` to render links. It can render standard `<a>` elements,
and also Vue Router and Nuxt links.

```html
<gl-link href="#foo">Link</gl-link>
```

## Link type

By specifying a value in the `href` prop, a standard link (`<a>`) element will be rendered. To
generate a `<router-link>` instead, specify the route location via the `to` prop.

### Router links

Router links support various additional props.

If your app is running under [Nuxt.js](https://nuxtjs.org), the
[`<nuxt-link>`](https://nuxtjs.org/api/components-nuxt-link) component will be used instead of
`<router-link>`. The `<nuxt-link>` component supports all the same features as `<router-link>` (as
it is a wrapper component for `<router-link>`) and more.

#### `to`

- type: `string | Location`
- required to generate a `<router-link>`

Denotes the target route of the link. When clicked, the value of the `to` prop will be passed to
`router.push()` internally, so the value can be either a string or a location descriptor object.

```html
<!-- Literal string -->
<gl-link to="home">Home</gl-link>
<!-- Renders to -->
<a href="home">Home</a>

<!-- Omitting `v-bind` is fine, just as binding any other prop -->
<gl-link :to="'home'">Home</gl-link>

<!-- Same as above -->
<gl-link :to="{ path: 'home' }">Home</gl-link>

<!-- Named route -->
<gl-link :to="{ name: 'user', params: { userId: 123 } }">User</gl-link>

<!-- With query, resulting in `/register?plan=private` -->
<gl-link :to="{ path: 'register', query: { plan: 'private' } }">Register</gl-link>

<!-- Render a non-router link by omitting `to` and specifying an `href` -->
<gl-link href="/home">Home</gl-link>
```

#### `replace`

- type: `boolean`
- default: `false`

Setting `replace` prop will call `router.replace()` instead of `router.push()` when clicked, so the
navigation will not leave a history record.

```html
<gl-link :to="{ path: '/abc'}" replace></gl-link>
```

#### `active-class`

- type: `string`
- default: `'router-link-active'` (`'nuxt-link-active'` when using Nuxt.js)

Configure the active CSS class applied when the link is active. Note the default value can also be
configured globally via the `linkActiveClass`
[router constructor option](https://router.vuejs.org/api/#linkactiveclass).

With components that support router links (have a `to` prop), you will want to set this to the class
`'active'` (or a space separated string that includes `'active'`) to apply Bootstrap's active
styling on the component when the current route matches the `to` prop.

#### `exact-active-class`

- type: `string`
- default: `'router-link-exact-active'` (`'nuxt-link-exact-active'` when using Nuxt.js)
- availability: Vue Router 2.5.0+

Configure the active CSS class applied when the link is active with exact match. Note the default
value can also be configured globally via the `linkExactActiveClass`
[router constructor option](https://router.vuejs.org/api/#linkexactactiveclass).

With components that support router links (have a `to` prop), you will want to set this to the class
`'active'` (or a space separated string that includes `'active'`) to apply Bootstrap's active
styling on the component when the current route matches the `to` prop.

## Links with `href="#"`

Typically `<a href="#">` will cause the document to scroll to the top of page when clicked.
`<gl-link>` addresses this by preventing the default action (scroll to top) when `href` is set to
`#`.

If you need scroll to top behaviour, use a standard `<a href="#">...</a>` tag.

## Link disabled state

Disable link functionality by setting the `disabled` prop to true.

```html
<gl-link href="#foo" disabled>Disabled Link</gl-link>
```

Disabling a link handles stopping event propagation, preventing the default action from occurring,
and removing the link from the document tab sequence (`tabindex="-1"`).

## Security

This component implements a few security measures to make it as safe as possible by default.
See [SafeLinkDirective docs] for more details.

### Linking to an unsafe URL

If you're trying to link to a location considered unsafe by the `SafeLink` directive (when rendering
a download link with a [Data URL] for example), you'll need to bypass the `href` attribute's
sanitization. This component exposes the `is-unsafe-link` prop for that purpose.

> **Warning:** Only disable URL sanitization when absolutely necessary.

```html
<gl-link
  is-unsafe-link
  download="file.txt"
  href="data:text/plain;charset=utf-8,GitLab%20is%20awesome"
>
  Download
</gl-link>
```

[SafeLinkDirective docs]: https://gitlab-org.gitlab.io/gitlab-ui/?path=/docs/directives-safe-link-directive--default
[Data URL]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
