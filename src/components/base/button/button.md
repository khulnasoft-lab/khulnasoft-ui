Buttons execute an action, either in the background or foreground of an experience. Different button
categories help guide users through certain actions. Buttons express what action will occur when the
user clicks or touches it either by text, icon, or both. Additional meaning can be derived from the
button variant.

## Button link

A button link is a link that is styled to look like a button, semantically speaking it's a `<a>` tag
with the necessary classes added to make it look like a button, it shares the same functionality as
[<gl-link>](?path=/docs/base-link--docs)

> Note: Setting a `target` attribute without a `href` attribute, will not create any side effects.
> Without the presence of a `href` attribute, this component will render a `<button>`.

## Icon-only button

Icon-only buttons must have an accessible name.
You can provide one with the `aria-label` attribute, which is read out by screen readers.

```html
<gl-button icon="close" aria-label="Close" />
```

## Type

You can specify the button's type by setting the prop `type` to `button`, `submit` or `reset`.
The default type is `button`.

Note the `type` prop has no effect when either `href` or `to` props are set.

## Sizing

Specify `small` or `medium` via the `size` prop. Defaults to `medium`.

```html
<gl-button size="small">Small Button</gl-button>
<gl-button>Default Button (medium)</gl-button>
<gl-button size="medium">Medium Button</gl-button>
```

## Categories

Use the `category` prop to set the button category to `primary`, `secondary`, or `tertiary`.
Defaults to `primary`.

## Variants

Use the `variant` prop to set the button variant to `default`, `confirm`, `danger`, `dashed`, or `link`.
Defaults to `default`.

## Block level buttons

Create block level buttons, those that span the full width of a parent, by setting the `block`
prop.

```html
<gl-button block>Block Level Button</gl-button>
```

## Disabled state

Set the `disabled` prop to disable button default functionality. `disabled` also works with buttons
rendered as `<a>` elements and `<router-link>` (i.e. with the `href` or `to` prop set).

```html
<gl-button disabled>Disabled</gl-button>
```

## Router link support

Refer to the [Router support](?path=/docs/base-link--docs#router-links) reference docs for
the various supported `<router-link>` related props.

## Accessibility

When the `href` prop is set to `'#'`, `<gl-button>` will render a link (`<a>`) element with attribute
`role="button"` set and appropriate keydown listeners (<kbd>Enter</kbd> and <kbd>Space</kbd>) so
that the link acts like a native HTML `<button>` for screen reader and keyboard-only users. When
disabled, the `aria-disabled="true"` attribute will be set on the `<a>` element.

When the `href` is set to any other value (or the `to` prop is used), `role="button"` will not be
added, nor will the keyboard event listeners be enabled.

## Label button

A label button renders a non-interactive `span` styled as a button. This can be especially useful
when used in a button group to render text-only labels along with actionable buttons. To improve
accessibility, and when applicable, consider using [`aria-describedby`] to establish a
relationship between the label button and the associated button.

[`aria-describedby`]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute

## Security

This component implements a few security measures to make it as safe as possible by default.
See [SafeLinkDirective docs] for more details.

### Linking to an unsafe URL

If you're trying to link to a location considered unsafe by the `SafeLink` directive (when rendering
a download link with a [Data URL] for example), you'll need to bypass the `href` attribute's
sanitization. This component exposes the `is-unsafe-link` prop for that purpose.

> **Warning:** Only disable URL sanitization when absolutely necessary.

```html
<gl-button
  is-unsafe-link
  download="file.txt"
  href="data:text/plain;charset=utf-8,GitLab%20is%20awesome">Download</gl-button>
```

[SafeLinkDirective docs]: https://gitlab-org.gitlab.io/khulnasoft-ui/?path=/docs/directives-safe-link-directive--default
[Data URL]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs

## vue-bootstrap component

This component uses [`BButton`](https://bootstrap-vue.org/docs/components/button) from vue-bootstrap
internally. So please take a look also there at their extensive documentation.
