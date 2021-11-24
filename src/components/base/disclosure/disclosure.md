A disclosure dropdown is a button that toggles a panel containing a list of links or navigational items
where each item has its own tab stop. If a dropdown contains both a link and an action,
it should be a disclosure with a tab stop for each item.

### Icon-only disclosure

Icon-only disclosures must have an accessible name.
You can provide this with the combination of `text` and `text-sr-only` props.

Optionally, you can use `no-caret` to remove the caret and `category="tertiary"` to remove the border.

```html
<gl-disclosure
  icon="ellipsis_v"
  text="More actions"
  :text-sr-only="true"
  category="tertiary"
  no-caret
>
```
