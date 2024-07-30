Choose from a provided list of tokens or add a user defined token.

```html
<script>
export default {
  data() {
    return {
      selectedTokens: [
        {
          id: 1,
          name: 'Vue.js',
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <gl-token-selector
      v-model="selectedTokens"
      :dropdown-items="[
        {
          id: 1,
          name: 'Vue.js',
        },
        {
          id: 2,
          name: 'Ruby On Rails',
        },
        {
          id: 3,
          name: 'GraphQL',
        },
        {
          id: 4,
          name: 'Redis',
        },
      ]"
    />
    {{ selectedTokens }}
  </div>
</template>
```

## User created tokens

This component allows for users to create their own tokens when configured to do so.
There are two props that support this functionality: `allowUserDefinedTokens` and `showAddNewAlways`.

`allowUserDefinedTokens` is required to enable the functionality

When set to `true` and a user's search text returns nothing,
they will be presented with an additional dropdown item `Add ...`
that takes their current search input and emits `@input`.
The parent component can then handle the event accordingly.

Additionally, there are scenarios where the user may want the ability to add a new token
even if some search results are returned.  This functionality can be enabled by additionally
setting `showAddNewAlways` to `true`.
This will allow for the `Add ...` dropdown item to appear at all times
whenever a user has inputted text, regardless if results are found.

```html
<template>
  <div>
    <gl-token-selector
      v-model="selectedTokens"
      :dropdown-items="dropdownItems"
      allow-user-defined-items
      show-ad-new-always
      @input="onTokenUpdate"
    />
    {{ selectedTokens }}
  </div>
</template>
```
