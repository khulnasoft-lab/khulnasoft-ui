`GlFormDate` allows users to choose and input a date using a keyboard by by using
browser implemented calendar controls, where available.

`GlFormDate` extends `<input type="date">` with an `<output>` for audible announcement
of selected date, in full format, by screen-readers.

## Usage

On `change` the value is emitted in `YYYY-MM-DD` format.

## Accessibility

`GlFormDate` is a form `<input>` and should have an accessible name using a `<label>`.

`GlFormGroup` can be used to label `GlFormDate`.

```html
<gl-form-group
  label="Enter date"
  label-for="input-id"
>
  <gl-form-date
    id="input-id"
  />
</gl-form-group>
```
