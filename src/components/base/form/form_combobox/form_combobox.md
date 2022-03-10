Use this component to add a [`FormInput`](/?path=/story/base-form-form-input--default) component
with synchronous autocomplete dropdown. It behaves as follows:

- Typing matches tokens; dropdown disappears when there is no match  
- Up and down arrows navigate the dropdown  
- Enter selects keyboard-highlighted item; clicking overrides this  
- Esc closes dropdown when it is open, clears field when it is not  
- Browser/native autocomplete dropdown hidden when ours is open, shows when it is not  
- Tab selects current entered text and moves to next field  

This behavior based on
[this w3c pattern](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html)
and [this accessible combobox example](https://alligator.io/vuejs/vue-a11y-autocomplete/).

## Usage

The combobox accepts an array of string tokens, a `v-model`, and label text. Internally, it generates
unique element IDs so multiple can be used on one page without clashing.

On selection it sets the input value to the selected string and emits a `value-selected` event for
consumption by parent components.

```html
<gl-form-combobox
  v-model="inputVal"
  :token-list="tokens"
  label-text="Combobox Label"
/>
```

It does not have a loading state nor does it accept tokens other than strings. It allows for one
selected value.

### What if I need to load the options asynchronously?

You may want to look at [`GlSearchBoxByType`] or [`GlSearchBoxByClick`].

### What if I need multiple options?

The [`GlTokenSelector`] may be what you need. Alternately, [`GlFilteredSearch`] will let you search
and include tokens.

## Edge cases

The algorithm to match tokens with the input is very naive. If you need to use the component with a
very large list of matches, you may want to update the implementation or use one of the search
inputs, like [`GlSearchBoxByType`], [`GlSearchBoxByClick`], or [`GlFilteredSearch`].

[`GlSearchBoxByType`]: https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-search-box-by-type--default
[`GlSearchBoxByClick`]: https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-search-box-by-click--default
[`GlTokenSelector`]: https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-token-selector--default
[`GlFilteredSearch`]: https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-filtered-search--default
