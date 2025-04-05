Date picker allows users to choose and input a date by manually typing the date into the input field
or by using a calendar-like dropdown.

### Warning

Be careful when binding a date value using `value` prop. `value` is a watched property and Date
picker will emit `input` event on _initial load_. Alternatively, use `defaultDate` to set the
initial date then receive updated date values through `input` events.
