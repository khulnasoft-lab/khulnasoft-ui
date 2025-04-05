## Usage

Paths are horizontal process flows composed of a series of "stages".
Like tabs, paths let users focus in on specific content at each stage
whilst still keeping all the other stages in view. Only one stage can
be active at a given time.

### Implemetation

The component should be initialized with an array of data objects. By
default, the first item in the array will be selected. This can be
overridden by passing in an object with the selected property set to
true.

```js
items: [
  {
    title: 'First',
  },
  {
    title: 'Second',
    selected: true
  },
  ...
```

Once an item has been selected the `selected` event will be emitted.
The emitted event will include the entire object at the selected index.

#### Customization

Additional attributes can be configured via the `items` object. Currently
support for `metric` and `icon` are provided. Please see the individual
examples for further information on these.

### Additional information

A `backgroundColor` property can be specified when using this component
on different colored backgrounds.

This component supports various themes and is mobile responsive.
