The `presentation` property allows you to change between a stacked and tiled presentation style. It
is only setup to accept `stacked` or `tiled` as values, the default value is `stacked`.

The `stacked` presentation allows to view multiple series of the same stack as a single column,
while `tiled` presents the information in multiple columns for each series of a stack.

`groupBy` is a property that defines how the data is going to be grouped by for each of the series
that the `data` property provides. For example if the `data` property has a total of 3 series, with
7 elements each, `groupBy` could use a 7 element array to show 7 stacked bars or 7 groups of bars
depending on the preference set by the `presentation` property.
