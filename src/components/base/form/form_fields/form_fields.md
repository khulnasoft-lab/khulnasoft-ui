## Usage

`GlFormFields` provides form builder functionality for ease of building simple
forms out of other GitLab UI form components.

For a code example, look at the story. It covers usage of `mapValue`, `validators`,
custom form elements, and `inputAttrs`.

## Fields type

Each value of `fields` prop is expected to be a `FieldDefinition`. See below for the shape of this type:

```ts
interface FieldDefinition<TValue> {
  // Label text to show for this field.
  label: string;

  // Collection of validator functions
  validators?: Array<(value: TValue) => string | undefined>;

  // Function that maps the inputted string value to the field's actual value
  // (e.g. a Number).
  mapValue?: (input: string) => TValue;

  // Properties that are passed to the actual input for this field.
  inputAttrs?: {};

  // Properties that are passed to the group wrapping this field.
  groupAttrs?: {};
}
```

## Slots

| Name | Description |
| ------ | ------ |
| `input(<fieldName>)` | Used to render components other than `GlFormInput`. |
| `group(<fieldName>)-label` | Used for `label` slot on `GlFormGroup` of a specific field. |
| `group(<fieldName>)-description` | Used for `description` slot on `GlFormGroup` of a specific field. |
| `group(<fieldName>)-label-description` | Used for `label-description` slot on `GlFormGroup` of a specific field. |
| `after(<fieldName>)` | Used to render content after `GlFormGroup` of a specific field. |
