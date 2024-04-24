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
