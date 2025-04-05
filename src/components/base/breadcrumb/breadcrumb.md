## Usage

### `items` prop

This component also allows for optional avatars on each item.

`avatarPath` should passed along with `text` and `href` in `items`.
Here is an example of how an item with an avatar should look:

**note:** the component supports passing the property `to` in the list items to enable navigation
through `vue-router`

#### Example

```js
items = [
  {
    text: 'First item',
    href: '#',
    avatarPath: '/avatar.png',
  },
];

<gl-breadcrumb :items="items" />
```

### `size` prop

The size prop determines the size of the breadcrumb component. It accepts the following values:

"sm" (default): Small size
"md": Medium size

Using the default 'sm' size for all page breadcrumbs is considered a best practice
to ensure consistency across the application.
