The progress bar component can be used to show an amount of progress.
It comes in 4 variants and supports setting a custom maximum and height.

## Value

The `value` prop can be a Number or String. If not given, it will default to `0`.

## Variants

The following variants are available:

1. 'primary' (default)
2. 'success'
3. 'warning'
4. 'danger'

## Maximum

A custom maximum can be set with the `max` prop. If not given, it will default to `100`.

## Width and Height

The `GlProgressBar` will always expand to the maximum width of its parent container.
The height can be controlled with the `height` prop. The value should be a standard
CSS dimension (`px`, `rem`, `em`, etc.) and given as a String, e.g. `'20px'`.
