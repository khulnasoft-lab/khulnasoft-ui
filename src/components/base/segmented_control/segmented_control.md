A customizable button group that displays a set of equal options, where only one
option can be active at a time. This component includes the ability to disable
specific options and dynamically modify button content using slots.

## Features

- Displays a group of selectable buttons.
- Allows only one active selection at a time.
- Supports content customization through the button-content slot.
- Options can be disabled individually.

## Props Validation

The `options` prop is validated against a specific structure to ensure consistent
data. Each option must include:

- `value`: A `string`, `number`, or `boolean` to identify the option.
- `disabled`: A `boolean` (or `undefined`) indicating whether the option is disabled.

Optionally it can include:

- `text`: A `string` which gets displayed in the slot content.

## Notes

- Ensure each value is unique within the options array for consistent behavior.
