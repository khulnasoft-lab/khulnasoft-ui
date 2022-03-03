A Vue Directive to help with preloading resources when hovering over an element.

## Usage

```html
<script>
import { GlHoverLoadDirective } from '@gitlab/ui';

export default {
  directives: { GlHoverLoadDirective },
  methods: {
    handlePreload() {
      fetch('some/endpoint');
    },
  },
};
</script>

<template>
  <div v-gl-hover-load="handlePreload">Hover me to preload</div>
</template>
```
