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
  href="data:text/plain;charset=utf-8,GitLab%20is%20awesome">Download</gl-link>
```

[SafeLinkDirective docs]: https://gitlab-org.gitlab.io/gitlab-ui/?path=/docs/directives-safe-link-directive--default
[Data URL]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
