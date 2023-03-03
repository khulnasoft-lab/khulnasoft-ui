## Usage

This component provides a `<slot #avatar>` so an avatar can appear before the first breadcrumb.

**note:** the component supports passing the property `to` in the list items to enable navigation
through `vue-router`

### Example

```html
<gl-breadcrumb :items="items">
  <template #avatar>
    <img 
      alt=""
      class="gl-breadcrumb-avatar-tile"
      src="/path/to/image.png"
      width="16"
      height="16"
    />
  </template>
</gl-breadcrumb>
```
