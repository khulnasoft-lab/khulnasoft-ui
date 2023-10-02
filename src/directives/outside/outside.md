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

### Ignore elements

If you want to ignore some elements you can pass an optional `ignore` option.
You must use an object notation in order to achieve this.

The option must be an array of functions that return ignored elements.
If the clicked element is contained within the ignored element the handler will not be called.

```html
<script>
import { GlOutsideDirective as Outside } from '@gitlab/ui';

export default {
  directives: { Outside }, 
  data() {
    return {
      ignore: [() => document.querySelector('.ignore')]
    };
  },
  methods: {
    onClick(event) {
      console.log('User clicked somewhere outside of this component', event);
    },
  },
};
</script>

<template>
  <div>
    <div v-outside="{ handler: onClick, ignore }">Click anywhere but here</div>
    <div class="ignore">Clicking here won't trigger onClick handler</div>
  </div>
</template>
```

## Caveats

- If a click event is stopped (e.g., via `event.stopPropagation()`) before it
  bubbles up to the `document`, it cannot be detected by `GlOutsideDirective`.
- Clicks cannot be detected across document boundaries (e.g., across an
  `iframe` boundary), in either direction.
