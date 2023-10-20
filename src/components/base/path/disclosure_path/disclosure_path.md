## Usage

Disclosure Paths are horizontal flows composed of a series of items.
They allow to view a succession of related items at a glance.
They also have the ability to be truncated, displaying only first and last items,
grouping the remaining items under an ellipsis dropdown.

### Implementation

The component should be initialized with an array of data objects.

```js
items: [
  {
    title: 'First',
  },
  {
    title: 'Second',
  },
  ...
```

#### Customization

Additional attributes can be configured via the `items` object. Currently
support for `icon` is provided. Please see the individual
examples for further information on these.

### Additional information

A `withEllipsis` property can be set to true to display only first and last elements,
moving the remaining into a dropdown.
A `ellipsisTooltipLabel` property can be defined to add a tooltip on the ellipsis dropdown button.
