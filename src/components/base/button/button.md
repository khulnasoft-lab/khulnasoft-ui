Buttons execute an action, either in the background or foreground of an experience. Different button
categories help guide users through certain actions. Buttons express what action will occur when the
user clicks or touches it either by text, icon, or both. Additional meaning can be derived from the
button variant.

## Button link

A button link is a link that is styled to look like a button, semantically speaking it's a `<a>` tag
with the necessary classes added to make it look like a button, it shares the same functionality as
[`<gl-link>`]

> Note: Setting a `target` attribute without a `href` attribute, will not create any side effects.
> Without the presence of a `href` attribute, this component will render a `<button>`.

[`<gl-link>`]: ./?path=/story/base-link--default-link

## Icon-only button

Icon-only buttons must have an accessible name.
You can provide one with the `aria-label` attribute, which is read out by screen readers.

```html
<gl-button icon="close" aria-label="Close" />
```

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

[SafeLinkDirective docs]: https://gitlab-org.gitlab.io/gitlab-ui/?path=/docs/directives-safe-link-directive--default
[Data URL]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs

## vue-bootstrap component

This component uses [`BButton`](https://bootstrap-vue.org/docs/components/button) from vue-bootstrap
internally. So please take a look also there at their extensive documentation.
