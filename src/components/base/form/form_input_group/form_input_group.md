The `GlFormInputGroup` component allows one to build more advanced text
input fields than generic `GlFormInput` when one needs that flexibility.
Basic usage of the component:

```html
<div>
  <gl-form-input-group>
    <template #prepend>
      <!-- Content to prepend your text input field -->
    </template>
    <template #append>
      <!-- Content to append your text input field -->
    </template>
  </gl-form-input-group>
</div>
```

One can use any other component (custom or `<gl-*>`) in both slots or
not to use the slots at all. In the latter, the component will fallback
to simple `GlFormInput`.

## Predefined options

Sometimes custom text input from the user isn't desired. Instead, the
user should pick one of the predefined options that will automatically
populate the input field. Typically, such cases will also include an
actionable button (like **Copy**) put into the `append` slot.

To achieve this effect, the `GlFormInputGroup` component accepts an
array of options in the form of `predefinedOptions` param. For example:

```javascript
const optionValues = [
  { name: 'Option #1', value: 'Option #1 is selected!' },
  { name: 'Option #2', value: 'Option #2 is selected!' },
];
...
<gl-form-input-group :predefined-options="optionValues" />
```

This will tell `GlFormInputGroup` to render a dropdown in the `prepend`
slot with all of the supplied options' `name`s. When one of the options
is selected, the input field is automatically populated with the
option's `value`. Check the "Examples" section below for "With
predefined options" example.

### Pro tips

Read some useful tips below about specific usage of the component.

### Readonly input

Often you want to make sure user doesn't mess up the predefined content
pasted into the input field. In this case, you can set `readonly`
param to `true`. You can play with `Readonly` knob on the right.

### Preselect the text to copy

If you set the `readonly` param on the `GlFormInputGroup` component,
users will still be able to manually select the text and copy it.
However, it's more user-friendly to preselect the text for the users if
they click anywhere in the input field. This can be achieved by setting
the `select-on-click` param to `true`. You can play with
`Select text on click` knob on the right. Even better, try enabling
`Readonly`, `Select text on click`, and `Switch to predefined input`
altogether. And, probably, remove `Prepend text`. Or leave it. It's your
call. :)
