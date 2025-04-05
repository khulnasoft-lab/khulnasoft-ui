The `GlTruncate` component lets you truncate the long texts with ellipsis.

> **Tip:** Try resizing the side panel for truncation.

## Usage

```html
<gl-truncate :text="text" :position="position" />
```

By default, the ellipsis position is at the `end`.

Pro Tip: Truncating long filepaths from the `middle` / `start` can help preventing the important
information in the end, i.e. filenames.
