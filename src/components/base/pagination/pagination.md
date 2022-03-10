## Current page

The current page's value should be bound using `v-model`, e.g.:

```html
<script>
  export default {
    data: () => ({
      page: 2,
    }),
  };
</script>

<template>
  <gl-pagination v-model="page" :per-page="10" :total-items="100" />
</template>
```

## Compact pagination

In some cases, you might not be able to provide the total items count because your API doesn't
support it or because of performance concerns. For such cases, the pagination component supports a
compact mode, where only the previous and next buttons are displayed.

To enable the compact mode, you'll need to provide the previous and/or next page numbers via the
`prev-page` and `next-page` props respectively.

> NOTE: If one of the props is omitted, the corresponding button will be disabled. If both
> properties are omitted the pagination won't render at all.

```html
<template>
  <gl-pagination :value="2" :prev-page="1" :next-page="3" />
</template>
```

## Limits

The `limits` prop is used to define pagination link limits based on Bootstrap's breakpoint sizes.
It is strongly recommended you provide a 'default' property, even if you have accounted for all
breakpoint sizes. While unlikely, it is possible breakpoints could change, thus, a default property
ensures a graceful fallback.

Here is `limits` default value:

```js
{
  xs: 0,
  sm: 3,
  md: 9,
  default: 9,
}
```

> Note: The component will not render any UI if the total items available for display is less than
> the max items per page.

## Internet Explorer 11

This component makes use of the
[`Number.isInteger` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger),
which is not supported in IE11, make sure it's being polyfilled when using the component.
[`core-js`](https://github.com/zloirock/core-js) incudes the appropriate polyfill for this.
