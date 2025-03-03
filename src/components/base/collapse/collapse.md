Collapse is used to keep pages focused on the overview of what the user can do. Details and
additional actions are hidden in the fold, and can be opened if the user wants to interact with
those elements.

## `v-model` support

The component's collapsed (visible) state can be set with `v-model` which binds internally to
the `visible` prop.

Note that when using `v-model` to control `<gl-collapse>`, the `aria-*` attributes are not
automatically placed on the trigger button. Specifically, you should add `aria-expanded` to
reflect the state of the target `<gl-collapse>` component, and `aria-controls` should be set
to the ID(s) of the target `<gl-collapse>` component(s).

```html
<template>
  <div>
    <gl-button
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="collapse-4"
      @click="visible = !visible"
    >
      Toggle Collapse
    </gl-button>
    <gl-collapse id="collapse-4" v-model="visible">
      <span>Surprise! But I am just a span</span>
    </gl-collapse>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: true
      }
    }
  }
</script>
```

## Troubleshooting

When collapsing the container, padding on the collapse component causes
complications with the height calculations.
The result is a bit of jumpiness at the end of the collapse animation.

The quick solution is to bring the padding into an inner container, which
simplifies the height calculations and removes the jumpiness.

```html
<!-- bad -->
<gl-collapse class="gl-p-3">
    <!-- content -->
</gl-collapse>

<!-- good -->
 <gl-collapse>
    <div class="gl-p-3">
        <!-- content -->
    </div>
</gl-collapse>
```
