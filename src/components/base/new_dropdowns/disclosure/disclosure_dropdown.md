A disclosure dropdown is a button that toggles a panel containing a list of actions and/or links. Use
[this decision tree](https://design.gitlab.com/components/dropdown-overview#which-component-should-you-use)
to make sure this is the right dropdown component for you.

## Basic usage

```html
<gl-disclosure-dropdown toggle-text="Actions" :items="items" />
```

## Icon-only disclosure dropdown

Icon-only disclosure dropdowns must have an accessible name.
You can provide this with the combination of `toggleText` and `textSrOnly` props.

Optionally, you can use `no-caret` to remove the caret and `category="tertiary"` to remove the border.

```html
<gl-disclosure-dropdown
  icon="ellipsis_v"
  toggle-text="Actions"
  text-sr-only
  category="tertiary"
  no-caret
/>
```

## Opening the disclosure dropdown

Disclosure dropdown will open on toggle button click (if it was previously closed).
On open, `GlDisclosureDropdown` will emit the `shown` event.

## Closing the disclosure dropdown

The disclosure dropdown is closed by any of the following:

- pressing <kbd>Esc</kbd>
- clicking anywhere outside the component
- clicking the action or link inside the dropdown

Before closing, `GlDisclosureDropdown` emits a `beforeClose` event with these properties:

1. `originalEvent` – the event that triggered closing of the dropdown
2. `preventDefault` – a method which will prevent closing of the dropdown

An example of using this event to prevent the dropdown from closing:

```html
<gl-disclosure-dropdown @beforeClose="$event.preventDefault()" />
```

Note that this method will also prevent the dropdown from closing even if the trigger button is clicked.

You can use the `preventDefault` to filter out events that are causing undesired dropdown closing:

```html
<gl-disclosure-dropdown
  @beforeClose="(e) => { ignoreElement.contains(e.originalEvent.target) && e.preventDefault() }"
/>
```

After closing, `GlDisclosureDropdown` emits a `hidden` event.

## Setting disclosure dropdown items

Use the `items` prop to provide actions/links to the disclosure dropdown. Each
item can be either an item or a group. For `Item`s, provide an `href` or `to` string to
make them render as links. Otherwise, they will be buttons. Provide an `action`
function to items to be called when they are pressed, or, listen for the
`action` event on the top-level component. Both will receive the given item as
an argument.
A <!-- markdownlint-disable-next-line line-length -->
[validation error](https://gitlab.com/gitlab-org/gitlab-ui/-/blob/6cbff4f908b429cc01f17a4cc2868e881db1aa31/src/components/base/new_dropdowns/disclosure/utils.js#L1)
will be triggered if neither field is set.

Below are the expected shapes of these objects:

```typescript
type Item = {
  // The item text
  text: string;
  // href link
  href?: string;
  // or, a Vue router link with `to`
  to?: string;
  // Item action
  action?: (item: Item) => void;
  // Set of extra attributes applied directly to the element
  extraAttrs?: Object;
  // Additional class/classes applied to the item wrapper
  wrapperClass?: string;
};

type Group = {
  // Name of the group, used as a header
  name?: string;
  // Items of the group
  items: Array<Item>;
  // Set of extra attributes applied directly to the element
  extraAttrs?: Object;
};

type ItemsProp = Array<Item> | Array<Group>;
```

### Actions/links

The `text` property is used to render the default disclosure dropdown item
template. If you want to render a custom template for items, use the
`list-item` scoped slot:

```html
<gl-disclosure-dropdown :items="items">
  <template #list-item="{ item }">
    <span class="gl-display-flex gl-align-items-center gl-justify-content-space-between">
      {{item.text}}
      <gl-icon v-if="item.icon" :name="item.icon" />
    </span>
  </template>
</gl-disclosure-dropdown>
```

### Groups

Actions/links can be contained within groups. A group can have a `name`
property, which will be used as the group header if present.
It also has a required property `items` that must be an array of links/actions.

Groups can be at most one level deep: a group can only contain actions/links.
Items and groups _cannot_ be siblings. Either all items are actions/links,
or they are all groups.

To render custom group labels, use the `group-label` scoped slot:

```html
<gl-disclosure-dropdown :items="groups">
  <template #group-label="{ group }">
    {{ group.name }} <gl-badge size="sm">{{ group.items.length }}</gl-badge>
  </template>
</gl-disclosure-dropdown>
```

To draw a horizontal line that separates two groups, set the `bordered` property.
By default, the border appears above the group. You can change the border position
using the `border-position` property:

```html
<gl-disclosure-dropdown>
  <gl-disclosure-dropdown-group bordered border-position="bottom" :group="group" />
</gl-disclosure-dropdown>
```

### Miscellaneous content

Besides default components, disclosure dropdown can render miscellaneous content inside it.
In this case the user is responsible for handling all events and navigation inside the disclosure.

### Dealing with long option texts

- Some options might have long non-wrapping text that would overflow the dropdown maximum width. In
  such cases, it's recommended to override the `#list-item` slot and to truncate the option text using
  `GlTruncate`.
- If the toggle text reflects the selected option text, it might be necessary to truncate
  it too by overriding the `#toggle` slot.

## Split dropdown

See [button group documentation](/docs/base-button-group--docs#split-dropdowns).
