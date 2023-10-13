## Usage

The infinite scroll component wraps around a results list and emits a message
(`bottomReached`) when the bottom of the viewport is reached, which should trigger
a re-fetching. The `gl-infinite-scroll` component expects its parent component to
manage the re-fetching.

Additionally it emits a `topReached` message when the top of the viewport is reached, which
can be useful to load items on top of the available data. If only `topReached` is present, the
viewport will be scrolled to the bottom the first time this component is mounted.

## Public methods

Useful public methods you can call via `$refs`:

- `.scrollUp()`: Scrolls to the top of the container.
- `.scrollDown()`: Scrolls to the bottom of the container.
- `.scrollTo({ top, behavior })`: Scrolls to a number of pixels
  along the Y axis of the container. The scrolling behavior can also be specified,
  as per MDN spec (<https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo>)

## Implementation Example

This is how a full implementation would look like with paginated results from GitLab's
`projects` API.

In the component's state, initialize a `pageInfo` object:

```js
pageInfo: {
  currentPage: 0,
  nextPage: 0,
  totalPages: 0,
  totalResults: 0,
}
```

When fetching for the first time, set the state with the header
information in the mutations:

```html
Vue.set(state.pageInfo, 'currentPage', parseInt(headers['X-Page'], 10));
Vue.set(state.pageInfo, 'nextPage', parseInt(headers['X-Next-Page'], 10));
Vue.set(state.pageInfo, 'totalPages', parseInt(headers['X-Total-Pages'], 10));
Vue.set(state.pageInfo, 'totalResults', parseInt(headers['X-Total'], 10));
```

_Note: There is a function you can use for parsing integers in headers in
GitLab called `parseIntPagination` in `common/utils.js`_

Every time `bottomReached` happens, update the state in your mutations:

```js
state.searchResults = state.searchResults.concat(results.data);
Vue.set(state.pageInfo, 'nextPage', parseInt(headers['X-Next-Page'],10));
Vue.set(state.pageInfo, 'totalPages', parseInt(headers['X-Total-Pages'],10));
```

Use the state to fetch the next page in the actions. In this case, the `Projects`
API allows us to send in a `page` parameter to fetch a certain page from the
list of results.

```js
export const fetchNextPage = ({ state, dispatch }) => {
  if(state.pageInfo.currentPage < state.pageInfo.totalPages) {
    Api.projects(searchQuery, { page: state.pageInfo.nextPage })
      ...
  }
};
```

```html
<script>
exportDefault {
  components: {
    GlInfiniteScroll,
  },
  computed: {
    ...mapState([
      'pageInfo',
      'searchResults',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchNextPage',
    ]),
    bottomReached() {
      this.fetchNextPage();
    },
  },
}
</script>
<template>
  <gl-infinite-scroll
    @bottomReached="bottomReached"
    :max-list-height="400"
    :fetched-items="searchResults.length"
    :total-items="totalResults"
  >
    ...Results in a list, another component, etc ....
  </gl-infinite-scroll>
</template>
```
