A Vue directive to make the hyperlinks secure by default.

## Security measures

### rel

When setting target to `_blank`, the rel attribute gets set automatically to `noopener noreferrer`,
this is done to avoid the `window.opener` [API exploit]. If you set the `rel` attribute manually,
this will overwrite the aforementioned logic.

### href

This directive enforces "safe" URLs. What this means is that, if the provided `href`
doesn't point to a safe protocol (one of `http:`, `https:`, `mailto:` or `ftp:`), then it is
replaced with `about:blank` to prevent [URL injections].

```html
<script>
import { GlSafeLinkDirective as SafeLink } from '@gitlab/ui';

export default {
  data() {
    return {
      url: 'javascript:alert(1)',
    };
  },
  directives: { SafeLink },
};
</script>
<template>
  <a v-safe-link href="url" target="_blank">Click</a>
  <!-- Renders to: <a href="about:blank" target="_blank">Click</a> -->
</template>
```

[API exploit]: https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
[URL injections]: https://vuejs.org/v2/guide/security.html#Injecting-URLs
