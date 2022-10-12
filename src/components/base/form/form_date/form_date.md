`GlFormDate` extends `<input type="date">` with an `<output>` for audible announcement 
of selected date, in full format, by screen-readers.

## Usage

`GlFormDate` accepts date props as type `Date` which are converted to RFC3339 `YYYY-MM-DD` 
strings for `value`, `min`, and `max` atributes.

On `change` the value is emitted in RFC3339 `YYYY-MM-DD` format.
