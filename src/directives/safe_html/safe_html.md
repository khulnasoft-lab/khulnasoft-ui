A Vue Directive to sanitize HTML to avoid any XSS vulnerabilities.

## Usage

This directive can be used to sanitize HTML code which may contain user input, to prevent cross-site
scripting (XSS) vulnerabilities.

Under the hood, it uses [DOMPurify](https://github.com/cure53/DOMPurify) to sanitize the provided HTML.

DOMPurify will strip out dangerous HTML and will keep the safe HTML. You can refer complete list of
[tags][1] and [attributes][2] allowed by DOMPurify.

[1]: https://github.com/cure53/DOMPurify/blob/main/src/tags.js
[2]: https://github.com/cure53/DOMPurify/blob/main/src/attrs.js

## Example

```html
<script>
import { GlSafeHtmlDirective as SafeHtml } from '@gitlab/ui';

export default {
  directives: {
    SafeHtml,
  },
  data() {
    return {
      rawHtml: "Hello! <script>alert('XSS')</script>",
    };
  },
};
</script>

<template>
  <div v-safe-html="rawHtml"></div>
</template>
```

## Advanced configuration

```js
// It allows only <b> tags
const config = { ALLOWED_TAGS: ['b'] };

// It doesn't allow any html tags
const config = { ALLOWED_TAGS: [] };
```

```html
<div v-safe-html:[config]="rawHtml"></div>
```

For advanced configuration options, please refer to [DOMPurify's documentation](https://github.com/cure53/DOMPurify#can-i-configure-dompurify).

### Notes

1. `target` attribute is not allowed by default - See <https://gitlab.com/gitlab-org/gitlab-ui/-/issues/1427>.
1. To know more about other tips & caveats - See <https://gitlab.com/groups/gitlab-org/-/epics/4273#caveats>.
