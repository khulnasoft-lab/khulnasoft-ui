The filtered search component is responsible for managing search with possible filters.

## Usage

Each filter option (named token) requires a separate Vue component. `GlFilteredSearchToken` is an
example of such a token.

Prepare array of available token configurations with the following fields:

- `type`: unique identifier of token type
- `title`: human-readable title of the token
- `icon`: token icon
- `token`: (optional) the token Vue component to use (e.g. `AuthorToken`)
- `dataType`: (optional) identifier of type (for example "user") for this filter. Tokens
  of the same type could be switched without losing their values
- `unique`: (optional) indicate this token could appear only once in the filter
- `disabled`: (optional) indicate this token should be hidden from the dropdown
- `operators`: (optional) an array of selectable operators.
  Each array item is an object that must contain `value` and `description`, and optionally `default`
  (e.g. `{ value: '=', description: 'is', default: 'true' }`)
- `multiSelect`: (optional) when `true`, the suggestions list becomes multi-select instead of single-select.
  It is discouraged to use this together with `unique`, as `unique` is intended for single-select.
- `options`: (optional) an array of options which the user can pick after the
  operator has been selected. The option object can have the following
  properties defined: `value: string`, `icon: string`, `title: string`,
  `component: Object` and `default: boolean`. If `component` is provided, it is
  is used to render the option in the suggestions list.
- `optionComponent`: (optional) A component used to render the token option
  itself when adding a new token or replacing an existing one
- any additional fields required to configure your component

Each token for filtered search is a Vue component with the following props:

- `value`: an object with a `data` property containing the current value, and optionally an
  `operator` value containing the operator value
- `active`: indicates if the token is currently active. It's the token's responsibility
  to render proper control for editing (for example input).
- `current-value`: current tokens of the filtered search.
- `index`: current token position in the filtered search.
- `config`: additional configuration, supplied in filtered search config for this token.

The token should emit the following events:

- `activate`: when the token requests activation (for example, when being clicked).
- `deactivate`: when token requests deactivation (for example due to losing blur on input).
- `destroy`: when token requests self-destruction (for instance for clicking "X" sign).
- `replace`: token requests its replacement with another token.
- `split`: token requests adding string values after the current token.
- `complete`: token indicates its editing is completed.

### Improve space handling

Set the `terms-as-tokens` prop to `true` to enable new term rendering and
interaction behavior. This makes it easier to input/edit free text tokens, and
removes the need for quoting values with spaces and other workarounds.

In future, this prop will be enabled by default and eventually removed. Opt in
to this earlier rather than later to ease migration.

## Examples

Define a list of available tokens:

```js
const availableTokens = [
  { type: 'static', icon: 'label', title: 'static:token', token: staticToken },
  { type: 'dynamic', icon: 'rocket', title: 'dynamic:~token', token: dynamicToken },
];
```

Pass the list of tokens to the search component. Optionally, you can use `v-model` to receive
realtime updates:

```html
<gl-filtered-search :available-tokens="tokens" v-model="value" terms-as-tokens />
```
