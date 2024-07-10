A Vue Directive to call a callback when a supported event type occurs *outside* of the element
the directive is bound to. Any events on the element or any descendant elements are ignored.
The directive supports the event types `click` and `focusin` and can be configured in several ways.
If no event type is set, `click` is the default.

## Usage

### Default

The following example listens for click events outside the specified element:

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

### When binding another event type than `click`

You can specify event types as modifiers. The following example listens for `focusin` events,
but not for `click`. With this implementation:

```html
<script>
export default {
  methods: {
    onFocusin(event) {
      console.log('User set the focus somewhere outside of this component', event);
    }
  }
};
</script>

<template>
  <div v-outside.focusin="onFocusin">...</div>
</template>
```

### When binding multiple event types

You can specify multiple event types by providing multiple modifiers. The following example
listens for `click` and `focusin` events:

```html
<script>
export default {
  methods: {
    onEvent(event) {
      console.log('Event occurred outside the element:', event);
    }
  }
};
</script>

<template>
  <div v-outside.click.focusin="onEvent">...</div>
</template>
```

💡 The callback function receives the `event` as a parameter. You can use the `event.type`
property to execute different code paths depending on which event triggered the callback.

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
    onClick(event, foo) {
      console.log('Event occurred outside the element:', event);
      console.log('An argument was passed along:', foo);
    },
  },
};
</script>

<template>
  <div v-outside="(event) => onClick(event, 'foo')">Click anywhere but here</div>
</template>
```

## Caveats

* Clicks cannot be detected across document boundaries (e.g., across an
  `iframe` boundary), in either direction.
* Clicks on focusable elements, such as buttons or input fields, will fire both
  `click` and `focusin` events. When both event types are registered,
  the callback will be executed twice. To prevent executing the same code twice
  after only one user interaction, use a flag in the callback to stop its
  execution. Example:

  ```html
    <script>
    export default {
      data: () => ({
        isOpen: false,
      }),
      methods: {
        openDropdown() {
          this.isOpen = true;
        },
        closeDropdown() {
          if(!this.isOpen) {
            return
          }

          // more code

          this.isOpen = false;
        }
      }
    };
    </script>

    <template>
      <button type="button" @click="openDropdown">Open</button>
      <div v-outside.click.focusin="closeDropdown">...</div>
    </template>
  ```
