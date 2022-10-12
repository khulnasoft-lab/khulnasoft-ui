`GlFormDateRange` implements two associated `GlFormDate` inputs with labels.

## Usage

The `minDate` and `maxDate` props set the lower/upper date boundaries. A current `endDate` value 
limits `startDate` selection to 1 day before, likewise a current `startDate` value limits `endDate` 
selection to 1 day after. The values can be the same when `sameDaySelection` is set to `true`.

A `maxDateRange` can be specified in order to limit the maximum number of days the component
will allow to be selected i.e. if the start date is `2020-08-01` and `maxDateRange` is set to `10`,
the highest selectable end date would be `2020-08-11`. This value will be offset by `1` when
`sameDaySelection` is set to `true`.

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
