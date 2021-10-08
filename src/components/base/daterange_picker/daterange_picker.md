## Usage

Daterange picker allows users to choose a date range by manually typing the start/end date
into the input fields or by using a calendar-like dropdown.

A `maxDateRange` can be specified in order to limit the maximum number of days the component
will allow to be selected i.e. if the start date is `2020-08-01` and `maxDateRange` is set to `10`,
the highest selectable end date would be `2020-08-11`. This value will be offset by `1` if
`sameDaySelection` is set to `true`. A `defaultMaxDate` will need to be
provided when making use of the `maxDateRange`.

By default, the component does not allow selection of the same start and end date.
In a scenario where this is required, the `sameDaySelection` property can be configured.
This is specifically useful when a single day selection is being defined as `2020-01-01 00:00:00`
to `2020-01-01 23:59:59` instead of `2020-01-01 00:00:00` to `2020-01-02 00:00:00`.

When `maxDateRange` is set it's a good idea to set the `tooltip` specifying the date range limit
and to indicate the number of days currently selected using the default slot. For example:

```vue
<template #default="{ daysSelected }">
  <span v-if="daysSelected > -1">{{ daysSelected }} days selected</span>
  <span v-else>No days selected</span>
</template>
```

The `daysSelected` slot prop is the effective date range, thus the value is increased by one when
`sameDaySelection` is set to `true`. When no date range has been selected the value is `-1`.

### Note

If specifying a maxDateRange, it is good practice to include a date range indicator and toolip.
