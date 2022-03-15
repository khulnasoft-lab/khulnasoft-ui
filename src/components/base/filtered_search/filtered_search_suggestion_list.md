The filtered search suggestion list component is responsible for managing underlying suggestion instances.
You obtain the ref for this component and manage suggestion selection via the component public API:

- `getValue()` - Retrieves the current selected suggestion.
- `nextItem()` - Selects the next suggestion. If last suggestion was selected, selection is cleared.
- `prevItem()` - Selects the previous suggestion. If first suggestion was selected, selection is cleared.

```html
<gl-filtered-search-suggestion-list ref="suggestions">
  <gl-filtered-search-suggestion value="foo">Example suggestion</gl-filtered-search-suggestion>
  <gl-filtered-search-suggestion value="bar">Example suggestion 2</gl-filtered-search-suggestion>
</gl-filtered-search-suggestion-list>
```
