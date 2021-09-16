import DropdownDefaultExample from './dropdown.default.example.vue';
import DropdownLinksExample from './dropdown.links.example.vue';
import DropdownWithAvatarAndSecondaryText from './dropdown.with_avatar_and_secondary_text.example.vue';
import DropdownWithCheckedItemsExample from './dropdown.with_checked_items.example.vue';
import DropdownClearAllExample from './dropdown.with_clear_all.example.vue';
import DropdownWithDividerExample from './dropdown.with_divider.example.vue';
import DropdownWithFormExample from './dropdown.with_form.example.vue';
import DropdownWithHeaderExample from './dropdown.with_header.example.vue';
import DropdownWithHighlightedItemsExample from './dropdown.with_highlighted_items.example.vue';
import DropdownWithIcons from './dropdown.with_icons.example.vue';
import DropdownWithRightAlignExample from './dropdown.with_right_align.example.vue';
import DropdownWithSearchExample from './dropdown.with_search.example.vue';
import DropdownWithSectionHeadersExample from './dropdown.with_section_headers.example.vue';

export default [
  {
    name: 'Dropdown',
    items: [
      {
        id: 'new-dropdown-default',
        name: 'Default',
        description: 'Default Dropdown',
        component: DropdownDefaultExample,
      },
      {
        id: 'new-dropdown-links',
        name: 'With Links',
        description: 'Dropdown with links as items',
        component: DropdownLinksExample,
      },
      {
        id: 'new-dropdown-with-divider',
        name: 'With Divider',
        description: 'Dropdown with divider',
        component: DropdownWithDividerExample,
      },
      {
        id: 'new-dropdown-with-header',
        name: 'With Header',
        description: 'Dropdown with section header',
        component: DropdownWithHeaderExample,
      },
      {
        id: 'new-dropdown-with-highlighted-items',
        name: 'With Highlighted items',
        description: 'Dropdown with highlighted items',
        component: DropdownWithHighlightedItemsExample,
      },
      {
        id: 'new-dropdown-with-section-headers',
        name: 'With Section Headers',
        description: 'Dropdown with section headers',
        component: DropdownWithSectionHeadersExample,
      },
      {
        id: 'new-dropdown-with-right-align',
        name: 'With Right Alignment',
        description: 'Dropdown aligned to the right side',
        component: DropdownWithRightAlignExample,
      },
      {
        id: 'new-dropdown-with-search',
        name: 'With Search',
        description: 'Dropdown with search field',
        component: DropdownWithSearchExample,
      },
      {
        id: 'new-dropdown-with-checked-items',
        name: 'With Checked Items',
        description: 'Dropdown with checked items',
        component: DropdownWithCheckedItemsExample,
      },
      {
        id: 'new-dropdown-with-avatar-and-secondary-text',
        name: 'With Avatar and Secondary Text',
        description: 'Dropdown with avatar and secondary text',
        component: DropdownWithAvatarAndSecondaryText,
      },
      {
        id: 'new-dropdown-with-icons',
        name: 'With Icons',
        description: 'Dropdown with icons',
        component: DropdownWithIcons,
      },
      {
        id: 'new-dropdown-with-form',
        name: 'With Form',
        description: 'Dropdown with form',
        component: DropdownWithFormExample,
      },
      {
        id: 'new-dropdown-with-clear-all',
        name: 'With Clear all',
        description: 'Dropdown with clear all',
        component: DropdownClearAllExample,
      },
    ],
  },
];
