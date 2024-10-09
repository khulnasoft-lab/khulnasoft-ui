## Variants

- Inline: Link that appears within body text, like a paragraph or sentence. In order to
  distinguish a linked reference from surrounding content, a link within body copy must be
  underlined. Inline text links can be user-generated, for example, referencing an issue with
  "#3126" in the markdown editor of a merge request description where the link's primary function
  is linking to the referred issue. They can also be in text generated from a source file, for
  example, a "learn more about pipelines" link in the paragraph of an empty state template.
- User interface (UI): Standalone link in the UI. User interface links are not user-generated.
  For example, a link in the system notes that compares the changes in a new commit to a previous
  one. The placement, color, and actionable text all provide link affordance. A link button has a
  similar style, but is used for an action and not a link.
- Meta: Standalone text or text within a short string of system-generated content may contain
  multiple meta links. Meta links share a meaningful datapoint or reference, and are only links
  secondarily. For example, the primary function of including "%15.8" in a string is to
  communicate the milestone, though it can also link to more information about it. Meta links
  represent a wide variety of content and should be styled specifically for the contexts in which they appear.
- Mention: Indicates when a user is "@" mentioned in the content. The username links to the
  user's profile. A mention link can be within body or meta content.

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
