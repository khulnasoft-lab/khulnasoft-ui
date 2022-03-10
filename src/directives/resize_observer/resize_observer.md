This directive can be used to get notified whenever a given element's size (width or height) changes
and to retrieve the updated dimensions.

Under the hood, it leverages the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
If you use GitLab UI in an older browser which doesn't support the Resize Observer API,
you can use a [polyfill](https://github.com/que-etc/resize-observer-polyfill).

The directive accepts a callback as a value and passes on the received
[contentRect](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentRect)
and the target element whenever a resize event gets triggered.

```html
<script>
export default {
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  methods: {
    handleResize({ contentRect: { width, height } }) {
      this.width = width;
      this.height = height;
    },
  },
};
</script>
<template>
  <div v-gl-resize-observer-directive="handleResize">
    <p>{{ width }} x {{ height }}</p>
  </div>
</template>
```

The observer can be toggled on or off by passing a boolean argument to the directive:

```html
<script>
export default {
  data() {
    return {
      shouldObserve: true,
    };
  },
  methods: {
    handleResize() {},
  },
};
</script>
<template>
  <div v-gl-resize-observer-directive[shouldObserve]="handleResize"></div>
</template>
```
