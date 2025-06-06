# Form Group

> The `<b-form-group>` component is the easiest way to add some structure to forms. Its purpose is
> to pair form controls with a legend or label, and to provide help text and invalid/valid feedback
> text, as well as visual (color) contextual state feedback.

```html
<template>
  <div>
    <b-form-group
      id="fieldset-1"
      description="Let us know your name."
      label="Enter your name"
      label-for="input-1"
      valid-feedback="Thank you!"
      :invalid-feedback="invalidFeedback"
      :state="state"
    >
      <b-form-input id="input-1" v-model="name" :state="state" trim></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
  export default {
    computed: {
      state() {
        return this.name.length >= 4
      },
      invalidFeedback() {
        if (this.name.length > 0) {
          return 'Enter at least 4 characters.'
        }
        return 'Please enter something.'
      }
    },
    data() {
      return {
        name: ''
      }
    }
  }
</script>

<!-- b-form-group.vue -->
```

## Label

Use the prop `label` to set the content of the generated `<legend>` or `<label>` element, or by
using the named slot `label`, You may optionally visually hide the label text while still making it
available to screen readers by setting the prop `label-sr-only`.

`<b-form-group>` will render a `<fieldset>` with `<legend>` if the `label-for` prop is not set. If
an input ID is provided to the `label-for` prop, then a `<div>` with `<label>` will be rendered.

If you provide an input `id` value to the `label-for` prop (the `id` must exist on the input
contained within the `<b-form-group>`), a `<label>` element will be rendered instead of a `<legend>`
element, and will have the `for` attribute set to the `id` specified. When specifying the id, **do
not** prepend it with `#`. The `label-for` prop should only be used when you have a single form
input inside the `<b-form-group>` component. Do not set the `label-for` prop when using
`<b-form-radio-group>`, `<b-form-checkbox-group>`, `<b-form-radio>`, `<b-form-checkbox>` or
`<b-form-file>` components (or when placing multiple inputs in the same form group), as these inputs
include integrated label element(s) and the `<legend>` element is more suitable.

You can also apply additional classes to the label via the `label-class` prop, such as responsive
padding and text alignment utility classes. The `label-class` prop accepts either a string or array
of strings.

### Horizontal layout

By default, the label appears above the input element(s), but you may optionally render horizontal
(label to the left of the input) at the various standard Bootstrap breakpoints.

The props `label-cols` and `label-cols-{breakpoint}` allow you to specify how many columns the label
should occupy in the row. The input will fill the rest of the row width. The value must be a number
greater than `0`. Or you can set the prop to `true` to make the label and input(s) each occupy half
of the width of the rendered row (handy if you have custom Bootstrap with an odd number of columns),
or set the value to `'auto'` so that the label occupies only the width that is needed.

Since BootstrapVue `v2.21.0` it is also possible to specify how many columns the content should
occupy in the row via the `content-cols` and `content-cols-{breakpoint}` props.

When using both, the `label-cols` and `content-cols` props, make sure that the total amount of
columns doesn't exceed `12`.

See the [Layout and Grid System](?path=/docs/base-form-form-group--docs#how-it-works) docs for
further information.

| Prop              | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `label-cols`      | Applies to breakpoint `xs` up                                                         |
| `label-cols-sm`   | Applies to breakpoint `sm` and up                                                     |
| `label-cols-md`   | Applies to breakpoint `md` and up                                                     |
| `label-cols-lg`   | Applies to breakpoint `lg` and up                                                     |
| `label-cols-xl`   | Applies to breakpoint `xl` and up                                                     |
| `content-cols`    | <span class="badge badge-secondary">v2.21.0+</span> Applies to breakpoint `xs` up     |
| `content-cols-sm` | <span class="badge badge-secondary">v2.21.0+</span> Applies to breakpoint `sm` and up |
| `content-cols-md` | <span class="badge badge-secondary">v2.21.0+</span> Applies to breakpoint `md` and up |
| `content-cols-lg` | <span class="badge badge-secondary">v2.21.0+</span> Applies to breakpoint `lg` and up |
| `content-cols-xl` | <span class="badge badge-secondary">v2.21.0+</span> Applies to breakpoint `xl` and up |

```html
<div>
  <div>
    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      content-cols-sm
      content-cols-lg="7"
      description="Let us know your name."
      label="Enter your name"
      label-for="input-horizontal"
    >
      <b-form-input id="input-horizontal"></b-form-input>
    </b-form-group>
  </div>
</div>

<!-- b-form-group-horizontal.vue -->
```

The ability to set the label cols to `'auto'` was added in BootstrapVue version `v2.1.0`.

### Label size

You can control the label text size match the size of your form input(s) via the optional
`label-size` prop. Values can be `'sm'` or `'lg'` for small or large label, respectively. Sizes work
for both horizontal and non-horizontal form groups.

```html
<div>
  <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Small" label-for="input-sm">
    <b-form-input id="input-sm" size="sm"></b-form-input>
  </b-form-group>

  <b-form-group label-cols="4" label-cols-lg="2" label="Default" label-for="input-default">
    <b-form-input id="input-default"></b-form-input>
  </b-form-group>

  <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Large" label-for="input-lg">
    <b-form-input id="input-lg" size="lg"></b-form-input>
  </b-form-group>
</div>

<!-- b-form-group-label-size.vue -->
```

### Label text alignment

The label text may also optionally be aligned `left`, `center` or `right` by setting the respective
value via the prop `label-text-align` and/or `label-align-{breakpoint}`.

| Prop             | Description                       |
| ---------------- | --------------------------------- |
| `label-align`    | Applies to breakpoint `xs` up     |
| `label-align-sm` | Applies to breakpoint `sm` and up |
| `label-align-md` | Applies to breakpoint `md` and up |
| `label-align-lg` | Applies to breakpoint `lg` and up |
| `label-align-xl` | Applies to breakpoint `xl` and up |

Alignment has no effect if the `label-sr-only` prop is set.

## Description

Optional descriptive text which is always shown with the `.text-muted` class by setting the
`description` prop or using the named slot `description`. The description text is rendered using the
[`<b-form-text>`](?path=/docs/base-form-form--docs#helper-components) form sub-component.

## Nested form groups

Feel free to nest `<b-form-group>` components to produce advanced form layouts and semantic grouping
of related form controls:

```html
<div>
  <b-card bg-variant="light">
    <b-form-group
      label-cols-lg="3"
      label="Shipping Address"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
    >
      <b-form-group
        label="Street:"
        label-for="nested-street"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-street"></b-form-input>
      </b-form-group>

      <b-form-group
        label="City:"
        label-for="nested-city"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-city"></b-form-input>
      </b-form-group>

      <b-form-group
        label="State:"
        label-for="nested-state"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-state"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Country:"
        label-for="nested-country"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-country"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Ship via:"
        label-cols-sm="3"
        label-align-sm="right"
        class="mb-0"
        v-slot="{ ariaDescribedby }"
      >
        <b-form-radio-group
          class="pt-2"
          :options="['Air', 'Courier', 'Mail']"
          :aria-describedby="ariaDescribedby"
        ></b-form-radio-group>
      </b-form-group>
    </b-form-group>
  </b-card>
</div>

<!-- b-form-group-nested.vue -->
```

## Disabled form group

Setting the `disabled` prop will disable the rendered `<fieldset>` and, on most browsers, will
disable all the input elements contained within the fieldset.

`disabled` has no effect when `label-for` is set (as a `<fieldset>` element is not rendered).

## Validation state feedback

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

- `false` (denotes invalid state) is great for when there's a blocking or required field. A user
  must fill in this field properly to submit the form.
- `true` (denotes valid state) is ideal for situations when you have per-field validation throughout
  a form and want to encourage a user through the rest of the fields.
- `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `<b-form-group>`, set the `state` prop to `false` (for
invalid), `true` (for valid), or `null` (no validation state).

Bootstrap v4 uses sibling CSS selectors of `:invalid` or `:valid` inputs to show the feedback text.
Some form controls (such as checkboxes, radios, and file inputs, or inputs inside input-groups) are
wrapped in additional markup that will no longer make the feedback text a sibling of the input, and
hence the feedback will not show. In these situations you will need to set the validity `state` on
the `<b-form-group>` _as well as_ the input.

Feedback will be shown if the parent `<b-form>` component does _not_ have the `novalidate` prop set
(or set to `false`) along with the `validated` prop set (and the input fails or passes native
browser validation constraints such as `required`). Refer to Bootstrap v4's
[Form component](https://getbootstrap.com/docs/4.5/components/forms/#validation) documentation for
details on validation methods.

You should always provide content via the `invalid-feedback` prop (or slot) to aid users using
assistive technologies when setting a contextual `invalid` state.

### Invalid feedback

Show optional invalid state feedback text to provide textual state feedback (html supported) by
setting the prop `invalid-feedback` or using the named slot `invalid-feedback`.

Invalid feedback is rendered using the
[`<b-form-invalid-feedback>`](?path=/docs/base-form-form--docs#helper-components) form
sub-component.

### Valid feedback

Show optional valid state feedback text to provide textual state feedback (html supported) by
setting the prop `valid-feedback` or using the named slot `valid-feedback`.

Valid feedback is rendered using the
[`<b-form-valid-feedback>`](?path=/docs/base-form-form--docs#helper-components) form sub-component.

### Feedback style

By default, when visible, feedback (valid or invalid) will show as a block of text. You can change
the feedback so that it shows as a static tooltip when visible, by setting the prop `tooltip` to
`true`.

### Feedback limitations

**Note:** When using `<b-input-group>`, `<b-form-file>`, `<b-form-radio-group>`, `<b-form-radio>`,
`<b-form-checkbox-group>` or `<b-form-checkbox>` inside a `<b-form-group>`, setting an invalid (or
valid) `state` on the `input` alone will **not** trigger the invalid (or valid) feedback to show
(due to limitations with the new Bootstrap v4 validation CSS). To get around this, **you must also**
set the invalid/valid `state` on `<b-form-group>`. Native browser validation will **not** trigger
the invalid feedback to show when using one of the above mentioned form controls.

## Accessibility

By default, when no `label-for` value is provided, `<b-form-group>` renders the input control(s)
inside a an HTML `<fieldset>` element with the label content placed inside the fieldset's `<legend>`
element. By nature of this markup, the legend content is automatically associated to the containing
input control(s).

It is **highly recommended** that you provide a unique `id` prop on your input element and set the
`label-for` prop to this ID, when you have only a single input in the `<b-form-group>`.

When multiple form controls are placed inside `<b-form-group>` (i.e. a series or radio or checkbox
inputs, or a series of related inputs), **do not set** the `label-for` prop, as a label can only be
associated with a single input. It is best to use the default rendered markup that produces a
`<fieldset>` + `<legend>` which will describe the group of inputs.

When placing multiple form controls inside a `<b-form-group>` (and you are not nesting
`<b-form-group>` components), it is recommended to give each control its own associated `<label>`
(which may be visually hidden using the `.sr-only` class) and set the labels `for` attribute to the
`id` of the associated input control. Alternatively, you can set the `aria-label` attribute on each
input control instead of using a `<label>`. For `<b-form-radio>` and `<b-form-checkbox>` (or the
group versions), you do not need to set individual labels, as the rendered markup for these types of
inputs already includes a `<label>` element.

When the `<b-form-group>` has a `label-for` prop set, the `aria-describedby` attribute will be
auto-assigned to the input. When the form group has multiple form controls, make sure to set the
attribute to each control yourself by using the `ariaDescribedby` prop value from the optionally
scoped `default` slot.

<!-- Component reference added automatically from component package.json -->
