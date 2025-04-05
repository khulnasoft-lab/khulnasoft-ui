The drawer is used to show more information about a certain resource in the UI and potentially
handle actions on the information.

### By default

```html
<gl-drawer :open="open" @close="close" @opened="opened">
  <template #header>Your Title</template>
  <template>
   ...children
  </template>
</gl-drawer>
```

- `v-bind:open` will be a boolean you will pass to `gl-drawer` and `@close` is a listener that will
be a function that will toggle open to `false`.
- The component emits an `opened` event after the opening animation has finished.
