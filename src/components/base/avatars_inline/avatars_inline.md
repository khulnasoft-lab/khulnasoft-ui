Use `<avatars-inline />` to display multiple avatars organized in a single row.

### Basic usage

The `avatars` property accepts an array of objects that contains the avatar properties. By default,
`<avatars-inline />` expects each object contained in the array to have the same shape as the
properties of the `<avatar />` component. You can customize the display of each avatar by
overriding the default slot:

```html
<gl-avatars-inline :avatars="avatars">
  <template #avatar="{ avatar }">
    <gl-avatar-link v-gl-tooltip target="blank" :href="avatar.href" :title="avatar.tooltip">
      <gl-avatar :src="avatar.src" :size="32" />
    </gl-avatar-link>
  </template>
</gl-avatars-inline>
```

In the example above, the avatars displayed inside `<avatars-inline />` are links pointing to a URL
stored in each avatar object. Each avatar also displays a tooltip. If you override
`<inline-avatars />` default display, you can pass an array of objects with any desired shape to
the `avatars` property.

### Collapsing

When the `collapse` property value is `true` and the `maxVisible` property value is a number less
than the length of the `avatars` property array, `<avatars-inline>` will hide the overflown avatars
and display a badge instead.

### Badge description in screen readers

The `badgeSrOnlyText` property provides a meaningful description of the badge that appears
when avatars are collapsed for screen reader users.

### Supported sizes

`<avatars-inline>` supports avatars with `16`, `24`, or `32` size.
