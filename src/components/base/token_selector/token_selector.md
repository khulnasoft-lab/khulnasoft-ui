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
