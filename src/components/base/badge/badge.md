Badges highlight metadata of objects, the kind of information that always needs
some context and isn’t useful on its own. For example, they can be used to
indicate an issue’s status, a member’s role, or if a branch is protected.

## Usage

```html
<gl-badge>Hello, world!</gl-badge>
```

> Note: Native support for icons in badges will be added in a future version.

### Using icon-only badges

When a badge only has an icon and no slot content, be sure to set the `aria-label` attribute of the
badge for best accessibility.

```html
<!-- bad -->
<gl-badge icon="eye" />

<!-- good -->
<gl-badge icon="eye" aria-label="Mark as confidential" />
```

## Link badges

Badges can be made actionable and turn into links by providing the `href` prop,
which can be used in combination with the props `rel`, `target`, `active`, and `disabled`.
The prop `tag` will be ignored and the `BLink` component will be used instead.
