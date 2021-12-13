The intersperse component separates a list of elements
by a given character (the default is `, `).

It takes all direct descendants of its default slot and inserts
the given separator between each item:

`item 1, item 2, item 3`

Optionally the character used for separating each item and the last separator can be set
independently:

* `separator="/"`  renders `item 1/item 2/item 3`
* `lastSeparator=" and "` will render `item 1, item 2, and item 3`
* `lastSeparator=" and "` and given two items will render `item 1 and item 2`

**Note**:

The component provides an inline context since the result is wrapped in a `span`.

Also, whitespace elements that are direct children of the default-slot get removed to ensure
consistent formatting.

## Usage

### Default

```html
<gl-intersperse>
    <span>Item 1</span>
    <span>Item 2</span>
    <span>Item 3</span>
</gl-intersperse>
```

This renders to the following HTML:

```html
<span><span>Item 1</span>, <span>Item 2</span>, <span>Item 3</span></span>
```

### Custom Separator

A custom separator can be defined via the `separator` prop:

```html
<gl-intersperse separator="/">
    <span>Item 1</span>
    <span>Item 2</span>
    <span>Item 3</span>
</gl-intersperse>
```

This renders to the following HTML:

```html
<span><span>Item 1</span>/<span>Item 2</span>/<span>Item 3</span></span>
```

### Custom Last Separator

A custom last separator can be defined via the `lastSeparator` prop:

```html
<gl-intersperse last-separator=" and ">
    <span>Item 1</span>
    <span>Item 2</span>
    <span>Item 3</span>
</gl-intersperse>
```

This renders to the following HTML:

```html
<span><span>Item 1</span>, <span>Item 2</span>, and <span>Item 3</span></span>
```

A custom last separator used on two items will only place `lastSeparator` between them:

```html
<gl-intersperse last-separator=" and ">
    <span>Item 1</span>
    <span>Item 2</span>
</gl-intersperse>
```

This renders to the following HTML:

```html
<span><span>Item 1</span> and <span>Item 2</span></span>
```
