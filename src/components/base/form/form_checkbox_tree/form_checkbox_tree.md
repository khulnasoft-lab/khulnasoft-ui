`GlFormCheckboxTree` lets you display an options structure where any option can have n-level of
children. It can be useful for creating a search filter that has nested facets.

## Usage

`GlFormCheckboxTree` accepts an `options` prop representing the available options in the form of
an n-level deep tree. Each option should have a `value` and can have optional
`label` and `children`. If `label` is omitted, `value` is used as the checkbox's label.
Here's a simple `options` tree for example:

```js
[
  {
    label: 'Option #1',
    value: 1,
    children: [
      {
        label: 'Option #2',
        value: 2,
      },
    ],
  },
  {
    label: 'Option #3',
    value: 3,
  },
]
```

`GlFormCheckboxTree` exposes the selected options via a `v-model` which is being kept in sync with
the `change` event.

## Dos and don'ts

### Don't

When rendering a `GlFormCheckboxTree` with pre-selected options, all the selected values should be
passed to the component via the `v-model`/`value` property. For example, with the options tree
above, if you wanted options `1` and `2` to be pre-selected, make sure that they are both included
in the initial value, don't rely on the component to infer initially checked boxes by only passing
`1` or `2`.

```html
<!-- Good -->
<gl-form-checkbox-tree
  :value="[1, 2]"
  :options="[
    {
      value: 1,
      children: [
        {
          value: 2,
        },
      ],
    },
  ]"
/>

<!-- Bad -->
<gl-form-checkbox-tree
  :value="[1]"
  :options="[
    {
      value: 1,
      children: [
        {
          value: 2,
        },
      ],
    },
  ]"
/>
```
