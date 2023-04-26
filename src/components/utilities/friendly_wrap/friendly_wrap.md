The friendly-wrap component lets you wrap text in a predictable way by appending [`<wbr>`] elements
to specific break-symbols.

[`<wbr>`]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr

## Internet Explorer 11

IE11 doesn't support the `<wbr>` element: <https://caniuse.com/#search=wbr>
To use this component on IE11, you'll need some CSS to preserve its behaviour:

```css
wbr {
  display: inline-block;
}
```

## Usage

### Default

By default, `GlFriendlyWrap` wraps text with slashes (`/`) as the break-symbol, which is especially
useful when displaying paths or URLs:

```html
<gl-friendly-wrap text="/some/file/path" />
```

The code above renders to the following HTML:

```html
<span class="text-break">/<wbr>some/<wbr>file/<wbr>path</span>
```

### Custom symbols

Multiple custom break-symbols can be defined via the `GlFriendlyWrap` prop:

```html
<gl-friendly-wrap
  :symbols="[';', '-', '.']"
  text="some;text-that.needs;to-be.wrapped"
/>
```

Which renders to:

```html
<span class="text-break">some;<wbr>text-<wbr>that.<wbr>needs;<wbr>to-<wbr>be.<wbr>wrapped</span>
```

### Break words

Symbols can be words too:

```html
<gl-friendly-wrap
  :symbols="['and']"
  text="it goes on and on and on and on"
/>
```

Which renders to:

```html
<span class="text-break">it goes on and<wbr> on and<wbr> on and<wbr> on</span>
```
