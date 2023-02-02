A disclosure dropdown is a button that toggles a panel containing a list of actions and/or links. Use
[this decision tree](https://design.gitlab.com/components/dropdown-overview#which-component-should-you-use)
to make sure this is the right dropdown component for you.

### Basic usage

```html
<gl-disclosure-dropdown-dropdown toggle-text="Actions" :items="items" />
```

### Icon-only disclosure dropdown

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

### Opening the disclosure dropdown

Disclosure dropdown will open on toggle button click (if it was previously closed).
On open, `GlDisclosureDropdown` will emit the `shown` event.

### Closing the disclosure dropdown

The disclosure dropdown is closed by any of the following:

- pressing <kbd>Esc</kbd>
- clicking anywhere outside the component

After closing, `GlDisclosureDropdown` emits a `hidden` event.

### Setting disclosure dropdown items

Use the `items` prop to provide actions/links to the disclosure dropdown. Each
item can be either an item or a group. For `Item`s, provide an `href` string to
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

#### Actions/links

The `text` property is used to render the default disclosure dropdown item
template. If you want to render a custom template for items, use the
`list-item` scoped slot. To wrap custom  content in a default styled `button/a`
element, place the content into `<gl-disclosure-dropdown-item-content/>` component.
This should cover the majority of non-default cases.

```html
<gl-disclosure-dropdown :items="items">
  <template #list-item="{ item }">
      <gl-disclosure-dropdown-item-content :item="item">
          <span class="gl-display-flex gl-justify-content-space-between">
            {{ item.text }}
            <gl-badge pill size="sm" variant="neutral">{{ item.count }}</gl-badge>
          </span>
      </gl-disclosure-dropdown-item-content>
  </template>
</gl-disclosure-dropdown>
```

**Note:** when providing custom content to the item, user should
define the correct tab order inside the disclosure dropdown by setting
the `tabindex` attribute on the elements.
The `li` item will get the focus so you might want elements inside it
not to be focused - this can be done by setting `tabindex="-1"` on them.

#### Groups

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

#### Miscellaneous content

Besides default components, disclosure dropdown can render miscellaneous content inside it.
In this case the user is responsible for handling all events and navigation inside the disclosure.
