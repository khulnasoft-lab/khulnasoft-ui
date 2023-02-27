Filtered search token is a helper component, intended to
simplify the creation of filters tokens which consist of a title, operators
and an editable value with autocomplete. This component abstracts token management
logic and allows you to focus on implementing autocomplete or view logic.

This component is not intended to be used outside of the `GlFilteredSearch` component.

## Usage

Make sure to pass `$listeners` to `gl-filtered-search-token`, or route events properly:

```html
<gl-filtered-search-token title="Confidential" :active="active" :value="value" v-on="$listeners">
  <template #suggestions>
    <gl-filtered-search-suggestion value="Yes"
      ><gl-icon name="eye-slash" :size="16" /> Yes</gl-filtered-search-suggestion
    >
    <gl-filtered-search-suggestion value="No"
      ><gl-icon name="eye" :size="16" /> No</gl-filtered-search-suggestion
    >
  </template>
</gl-filtered-search-token>
```
