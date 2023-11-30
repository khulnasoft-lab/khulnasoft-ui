A Vue Directive to call a callback when a click occurs *outside* of the element
the directive is bound to. Any clicks on the element or any descendant elements are ignored.

## Usage

```html
<script>
import { GlOutsideDirective as Outside } from '@gitlab/ui';

export default {
  directives: { Outside },
  methods: {
    onClick(event) {
      console.log('User clicked somewhere outside of this component', event);
    },
  },
};
</script>

<template>
  <div v-outside="onClick">Click anywhere but here</div>
</template>
```

### When handler expects arguments

In case a click handler expects an arument to be passed, simple `v-outside="onClick('foo')"` will
invoke the handler instantly when mounting the component and the directive won't be active. The
simplest solution to pass the arguments to the directive is to wrap the handler into an anonumous
function.

```html
<script>
import { GlOutsideDirective as Outside } from '@gitlab/ui';

export default {
  directives: { Outside },
  methods: {
    onClick(foo) {
      // This
    },
  },
};
</script>

<template>
  <div v-outside="() => onClick('foo')">Click anywhere but here</div>
</template>
```

## Caveats

- If a click event is stopped (e.g., via `event.stopPropagation()`) before it
  bubbles up to the `document`, it cannot be detected by `GlOutsideDirective`.
- Clicks cannot be detected across document boundaries (e.g., across an
  `iframe` boundary), in either direction.
