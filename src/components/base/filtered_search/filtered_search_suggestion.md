The filtered search suggestion component is a wrapper around `GlDropdownItem`, which registers
suggestions in a top-level suggestion list:

```html
<gl-filtered-search-suggestion-list>
  <gl-filtered-search-suggestion value="foo" key="foo-0">Example suggestion</gl-filtered-search-suggestion>
  <gl-filtered-search-suggestion value="bar" key="bar-1">Example suggestion 2</gl-filtered-search-suggestion>
</gl-filtered-search-suggestion-list>
```

> NOTE: Provide a `key` to suggestions of the form `${value}-${index}` (or
> similar). While using the index in keys is usually frowned upon for
> performance reasons, the current implementation relies on all suggestions
> getting destroyed and recreated to keep rendering order in sync with
> <kbd>Up</kbd>/<kbd>Down</kbd> keyboard interaction.
