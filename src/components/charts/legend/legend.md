## Disabling Legends

By default, to prevent the chart from disappearing, all legends can't be toggled off – the last
active legend will be disabled. To manually disable a legend, pass it the
`disabled` property in `seriesInfo`:

```js
seriesInfo = [
  {
    name: 'Example Legend',
    color: 'blue',
    disabled: true,
    type: 'line'
  }
]
```
