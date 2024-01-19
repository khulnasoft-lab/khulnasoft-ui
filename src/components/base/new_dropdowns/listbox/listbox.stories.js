import {
  buttonCategoryOptions,
  buttonSizeOptions,
  buttonVariantOptions,
  dropdownPlacements,
} from '../../../../utils/constants';
import GlIcon from '../../icon/icon.vue';
import GlSearchBoxByType from '../../search_box_by_type/search_box_by_type.vue';
import GlButtonGroup from '../../button_group/button_group.vue';
import GlButton from '../../button/button.vue';
import GlBadge from '../../badge/badge.vue';
import GlAvatar from '../../avatar/avatar.vue';
import GlTruncate from '../../../utilities/truncate/truncate.vue';
import { makeContainer } from '../../../../utils/story_decorators/container';
import { setStoryTimeout } from '../../../../utils/test_utils';
import { disableControls } from '../../../../utils/stories_utils';
import {
  ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
  ARG_TYPE_SUBCATEGORY_STATE,
  ARG_TYPE_SUBCATEGORY_SEARCH,
  ARG_TYPE_SUBCATEGORY_ACCESSIBILITY,
  ARG_TYPE_SUBCATEGORY_INFINITE_SCROLL,
  LISTBOX_CONTAINER_HEIGHT,
} from '../../../../utils/stories_constants';
import { POSITION } from '../../../utilities/truncate/constants';
import readme from './listbox.md';
import { mockOptions, mockGroups, mockGroupsWithTextSrOnly, mockUsers } from './mock_data';
import { flattenedOptions } from './utils';
import GlCollapsibleListbox from './listbox.vue';

const defaultValue = (prop) => GlCollapsibleListbox.props[prop].default;

const generateProps = ({
  items = mockOptions,
  category = defaultValue('category'),
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  disabled = defaultValue('disabled'),
  block = defaultValue('block'),
  loading = defaultValue('loading'),
  searchable = defaultValue('searchable'),
  searching = defaultValue('searching'),
  infiniteScroll = defaultValue('infiniteScroll'),
  infiniteScrollLoading = defaultValue('infiniteScrollLoading'),
  noResultsText = defaultValue('noResultsText'),
  searchPlaceholder = defaultValue('searchPlaceholder'),
  noCaret = defaultValue('noCaret'),
  placement = defaultValue('placement'),
  toggleClass,
  toggleText,
  textSrOnly = defaultValue('textSrOnly'),
  headerText = defaultValue('headerText'),
  icon = '',
  multiple = defaultValue('multiple'),
  isCheckCentered = defaultValue('isCheckCentered'),
  toggleAriaLabelledBy,
  listAriaLabelledBy,
  resetButtonLabel = defaultValue('resetButtonLabel'),
  showSelectAllButtonLabel = defaultValue('showSelectAllButtonLabel'),
  startOpened = true,
  fluidWidth,
  positioningStrategy,
  srOnlyResultsLabel,
} = {}) => ({
  items,
  category,
  variant,
  size,
  disabled,
  block,
  loading,
  searchable,
  searching,
  infiniteScroll,
  infiniteScrollLoading,
  noResultsText,
  searchPlaceholder,
  noCaret,
  placement,
  toggleClass,
  toggleText,
  textSrOnly,
  headerText,
  icon,
  multiple,
  isCheckCentered,
  toggleAriaLabelledBy,
  listAriaLabelledBy,
  resetButtonLabel,
  showSelectAllButtonLabel,
  startOpened,
  fluidWidth,
  positioningStrategy,
  srOnlyResultsLabel,
});

const makeBindings = (overrides = {}) =>
  Object.entries({
    ':items': 'items',
    ':category': 'category',
    ':variant': 'variant',
    ':block': 'block',
    ':size': 'size',
    ':disabled': 'disabled',
    ':loading': 'loading',
    ':searchable': 'searchable',
    ':searching': 'searching',
    ':infinite-scroll': 'infiniteScroll',
    ':infinite-scroll-loading': 'infiniteScrollLoading',
    ':no-results-text': 'noResultsText',
    ':search-placeholder': 'searchPlaceholder',
    ':no-caret': 'noCaret',
    ':placement': 'placement',
    ':toggle-class': 'toggleClass',
    ':toggle-text': 'toggleText',
    ':text-sr-only': 'textSrOnly',
    ':header-text': 'headerText',
    ':icon': 'icon',
    ':multiple': 'multiple',
    ':is-check-centered': 'isCheckCentered',
    ':toggle-aria-labelled-by': 'toggleAriaLabelledBy',
    ':list-aria-labelled-by': 'listAriaLabelledBy',
    ':reset-button-label': 'resetButtonLabel',
    ':show-select-all-button-label': 'showSelectAllButtonLabel',
    ':fluid-width': 'fluidWidth',
    ':positioning-strategy': 'positioningStrategy',
    ':startOpened': 'startOpened',
    ':sr-only-results-label': 'srOnlyResultsLabel',
    ...overrides,
  })
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n');

const template = (content, { label = '', bindingOverrides = {} } = {}) => `
  <div>
    ${label}
    ${label && '<br/>'}
    <gl-collapsible-listbox
      ref="listbox"
      v-model="selected"
      ${makeBindings(bindingOverrides)}
    >
      ${content}
    </gl-collapsible-listbox>
  </div>
`;

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlCollapsibleListbox,
  },
  data() {
    return {
      selected: mockOptions[1].value,
    };
  },
  template: template('', {
    label: `<span class="gl-my-0" id="listbox-label">Select a department</span>`,
  }),
});
Default.args = generateProps({ toggleAriaLabelledBy: 'listbox-label' });
Default.decorators = [makeContainer({ height: LISTBOX_CONTAINER_HEIGHT })];

export const HeaderAndFooter = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlCollapsibleListbox,
    GlSearchBoxByType,
    GlButtonGroup,
    GlButton,
  },
  data() {
    return {
      selected: [],
    };
  },
  methods: {
    selectAllItems() {
      const allValues = mockOptions.map(({ value }) => value);
      this.selected = [...allValues];
    },
    onReset() {
      this.selected = [];
    },
  },
  template: template(
    `
    <template #footer>
       <div class="gl-border-t-solid gl-border-t-1 gl-border-t-gray-200 gl-display-flex gl-flex-direction-column gl-p-2! gl-pt-0!">
        <gl-button @click="selectAllItems" category="tertiary" block class="gl-justify-content-start! gl-mt-2!">
          Select all
        </gl-button>
        <gl-button category="tertiary" block class="gl-justify-content-start! gl-mt-2!" data-testid="footer-bottom-button">
          Manage departments
        </gl-button>
      </div>
    </template>
  `,
    {
      bindingOverrides: {
        '@reset': 'onReset',
      },
    }
  ),
});
HeaderAndFooter.args = generateProps({
  toggleText: 'Header and Footer',
  headerText: 'Assign to department',
  resetButtonLabel: 'Unassign',
  multiple: true,
  block: true,
});
HeaderAndFooter.decorators = [makeContainer({ height: LISTBOX_CONTAINER_HEIGHT })];

export const HeaderActions = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlCollapsibleListbox,
    GlSearchBoxByType,
    GlButtonGroup,
    GlButton,
  },
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    allValues() {
      return mockOptions.map(({ value }) => value);
    },
  },
  methods: {
    selectAllItems() {
      this.selected = [...this.allValues];
    },
    onReset() {
      this.selected = [];
    },
  },
  template: template('', {
    bindingOverrides: {
      '@reset': 'onReset',
      '@select-all': 'selectAllItems',
    },
  }),
});

HeaderActions.args = generateProps({
  toggleText: 'Header actions',
  headerText: 'Assign to department',
  resetButtonLabel: 'Unassign',
  showSelectAllButtonLabel: 'Select All',
  multiple: true,
  block: true,
});
HeaderActions.decorators = [makeContainer({ height: LISTBOX_CONTAINER_HEIGHT })];

export const CustomListItem = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      selected: [mockUsers[0].value],
    };
  },
  components: {
    GlCollapsibleListbox,
    GlIcon,
    GlAvatar,
  },
  computed: {
    customToggleText() {
      if (this.selected.length === 0) return 'Select assignee(s)';
      if (this.selected.length === 1)
        return this.items.find(({ value }) => value === this.selected[0]).text;
      return `${this.selected.length} assignees`;
    },
  },
  methods: {
    onReset() {
      this.selected = [];
    },
  },
  template: template(
    `<template #list-item="{ item }">
              <span class="gl-display-flex gl-align-items-center">
                <gl-avatar :size="32" :entity-name="item.value" class="gl-mr-3"/>
                  <span class="gl-display-flex gl-flex-direction-column">
                    <span class="gl-font-weight-bold gl-white-space-nowrap">{{ item.text }}</span>
                    <span class="gl-text-gray-400"> {{ item.secondaryText }}</span>
                  </span>
              </span>
            </template>
        `,
    {
      bindingOverrides: {
        ':toggle-text': 'customToggleText',
        '@reset': 'onReset',
      },
    }
  ),
});

CustomListItem.args = generateProps({
  items: mockUsers,
  multiple: true,
  isCheckCentered: true,
  headerText: 'Select assignees',
  resetButtonLabel: 'Unassign',
});
CustomListItem.decorators = [makeContainer({ height: '200px' })];

export const CustomToggle = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlCollapsibleListbox,
    GlAvatar,
  },
  data() {
    return {
      selected: mockUsers[1].value,
    };
  },
  template: template(
    `
    <template #toggle>
     <button class="gl-rounded-base gl-border-none gl-p-2 gl-bg-gray-50 ">
       <span class="gl-sr-only">
          {{selected}}
       </span>
       <gl-avatar :size="32" :entity-name="selected" aria-hidden="true"/>
     </button>
    </template>
    <template #list-item="{ item }">
      <span class="gl-display-flex gl-align-items-center">
        <gl-avatar :size="32" :entity-name="item.value" class="gl-mr-3"/>
          <span class="gl-display-flex gl-flex-direction-column">
            <span class="gl-font-weight-bold gl-white-space-nowrap">{{ item.text }}</span>
            <span class="gl-text-gray-400"> {{ item.secondaryText }}</span>
          </span>
      </span>
    </template>
  `
  ),
});
CustomToggle.args = generateProps({
  items: mockUsers,
  isCheckCentered: true,
});
CustomToggle.decorators = [makeContainer({ height: '200px' })];

const makeGroupedExample = (changes) => {
  const story = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
      GlBadge,
      GlCollapsibleListbox,
    },
    data() {
      return {
        selected: 'v1.0',
      };
    },
    ...changes,
  });

  story.args = generateProps({ items: mockGroups });
  story.decorators = [makeContainer({ height: '280px' })];

  return story;
};

export const Groups = makeGroupedExample({
  template: template('', {
    bindingOverrides: {
      ':toggle-text': 'customToggleText',
      ':items': 'computedItems',
    },
  }),
  data() {
    return {
      selected: ['v1.0'],
    };
  },
  computed: {
    customToggleText() {
      return this.selected.length ? `${this.selected.length} refs selected` : 'Select refs';
    },
    computedItems() {
      const isSelected = (option) => this.selected.includes(option.value);
      const notSelected = (option) => !isSelected(option);

      // eslint-disable-next-line unicorn/no-array-callback-reference
      const selectedBranches = mockGroups[0].options.filter(isSelected);
      // eslint-disable-next-line unicorn/no-array-callback-reference
      const availableBranches = mockGroups[0].options.filter(notSelected);
      // eslint-disable-next-line unicorn/no-array-callback-reference
      const selectedTags = mockGroups[1].options.filter(isSelected);
      // eslint-disable-next-line unicorn/no-array-callback-reference
      const availableTags = mockGroups[1].options.filter(notSelected);

      return [
        {
          text: 'Selected branches',
          options: selectedBranches,
        },
        {
          text: 'Selected tags',
          options: selectedTags,
        },
        {
          text: 'Branches',
          options: availableBranches,
        },
        {
          text: 'Tags',
          options: availableTags,
        },
      ].filter((group) => group.options.length);
    },
  },
});
Groups.args = generateProps({ multiple: true });

export const CustomGroupsAndItems = makeGroupedExample({
  template: template(`
    <template #group-label="{ group }">
      {{ group.text }} <gl-badge size="sm">{{ group.options.length }}</gl-badge>
    </template>
    <template #list-item="{ item }">
      {{ item.text }} <gl-badge v-if="item.value === 'main'" size="sm">default</gl-badge>
    </template>
  `),
});

export const GroupWithoutLabel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlBadge,
    GlCollapsibleListbox,
  },
  data() {
    return {
      selected: mockGroupsWithTextSrOnly[1].options[1].value,
    };
  },
  template: template(`
    <template #list-item="{ item }">
      {{ item.text }} <gl-badge v-if="item.value === 'main'" size="sm">default</gl-badge>
    </template>
  `),
});
GroupWithoutLabel.args = generateProps({
  items: mockGroupsWithTextSrOnly,
  headerText: 'Select branch',
});

export default {
  title: 'base/dropdown/collapsible-listbox',
  component: GlCollapsibleListbox,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    category: {
      control: 'select',
      options: buttonCategoryOptions,
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    variant: {
      control: 'select',
      options: buttonVariantOptions,
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    size: {
      control: 'select',
      options: Object.keys(buttonSizeOptions),
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    block: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    noCaret: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    placement: {
      control: 'select',
      options: Object.keys(dropdownPlacements),
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    toggleText: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    icon: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    isCheckCentered: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    headerText: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    resetButtonLabel: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    toggleClass: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    fluidWidth: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL,
      },
    },
    disabled: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_STATE,
      },
    },
    loading: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_STATE,
      },
    },
    searchable: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_SEARCH,
      },
    },
    searching: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_SEARCH,
      },
    },
    noResultsText: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_SEARCH,
      },
    },
    searchPlaceholder: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_SEARCH,
      },
    },
    textSrOnly: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_ACCESSIBILITY,
      },
    },
    toggleAriaLabelledBy: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_ACCESSIBILITY,
      },
    },
    srOnlyResultsLabel: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_ACCESSIBILITY,
      },
    },
    listAriaLabelledBy: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_ACCESSIBILITY,
      },
    },
    infiniteScroll: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_INFINITE_SCROLL,
      },
    },
    infiniteScrollLoading: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_INFINITE_SCROLL,
      },
    },
    totalItems: {
      table: {
        subcategory: ARG_TYPE_SUBCATEGORY_INFINITE_SCROLL,
      },
    },
  },
};

export const Searchable = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlCollapsibleListbox,
  },
  data() {
    return {
      selected: mockOptions[1].value,
      filteredItems: mockOptions,
      searchInProgress: false,
      timeoutId: null,
    };
  },
  methods: {
    filterList(searchTerm) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.searchInProgress = true;

      // eslint-disable-next-line no-restricted-globals
      this.timeoutId = setTimeout(() => {
        this.filteredItems = this.items.filter(({ text }) =>
          text.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.searchInProgress = false;
      }, 2000);
    },
  },
  computed: {
    customToggleText() {
      let toggleText = 'Search for department';
      const selectedValues = Array.isArray(this.selected) ? this.selected : [this.selected];

      if (selectedValues.length === 1) {
        toggleText = this.items.find(({ value }) => value === selectedValues[0]).text;
      } else {
        toggleText = `Selected ${selectedValues.length} departments`;
      }

      return toggleText;
    },
    numberOfSearchResults() {
      return `${this.filteredItems.length} department${this.filteredItems.length > 1 ? 's' : ''}`;
    },
  },
  template: template(
    `<template #search-summary-sr-only>
      {{ numberOfSearchResults }}
    </template>`,
    {
      bindingOverrides: {
        ':items': 'filteredItems',
        ':toggle-text': 'customToggleText',
        ':searching': 'searchInProgress',
        '@search': 'filterList',
      },
    }
  ),
});
Searchable.args = generateProps({
  headerText: 'Assign to department',
  searchable: true,
  searchPlaceholder: 'Find department',
});
Searchable.decorators = [makeContainer({ height: LISTBOX_CONTAINER_HEIGHT })];

export const SearchableGroups = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlCollapsibleListbox,
  },
  data() {
    return {
      selected: mockGroups[1].options[0].value,
      filteredGroupOptions: mockGroups,
      searchInProgress: false,
      timeoutId: null,
    };
  },
  computed: {
    flattenedOptions() {
      return flattenedOptions(this.items);
    },
    flattenedFilteredOptions() {
      return flattenedOptions(this.filteredGroupOptions);
    },
    customToggleText() {
      let toggleText = 'Search for department';
      const selectedValues = Array.isArray(this.selected) ? this.selected : [this.selected];

      if (selectedValues.length === 1) {
        toggleText = this.flattenedOptions.find(({ value }) => value === selectedValues[0]).text;
      } else {
        toggleText = `Selected ${selectedValues.length} departments`;
      }

      return toggleText;
    },
  },
  methods: {
    filterList(searchTerm) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.searchInProgress = true;

      // eslint-disable-next-line no-restricted-globals
      this.timeoutId = setTimeout(() => {
        this.filteredGroupOptions = this.items
          .map(({ text, options }) => {
            return {
              text,
              options: options.filter((option) =>
                option.text.toLowerCase().includes(searchTerm.toLowerCase())
              ),
            };
          })
          .filter(({ options }) => options.length);

        this.searchInProgress = false;
      }, 2000);
    },
    srOnlyResultsLabel(count) {
      return `${count} branch${count > 1 ? 'es' : ''} or tag${count > 1 ? 's' : ''}`;
    },
  },
  template: template('', {
    bindingOverrides: {
      ':items': 'filteredGroupOptions',
      ':toggle-text': 'customToggleText',
      ':searching': 'searchInProgress',
      ':sr-only-results-label': 'srOnlyResultsLabel',
      '@search': 'filterList',
    },
  }),
});
SearchableGroups.args = generateProps({
  headerText: 'Select ref',
  searchable: true,
  items: mockGroups,
});
SearchableGroups.decorators = [makeContainer({ height: LISTBOX_CONTAINER_HEIGHT })];

export const InfiniteScroll = (
  args,
  { argTypes: { infiniteScroll, infiniteScrollLoading, items, ...argTypes } }
) => ({
  props: Object.keys(argTypes),
  components: {
    GlCollapsibleListbox,
  },
  data() {
    return {
      selected: mockOptions[1].value,
      items: mockOptions.slice(0, 10),
      infiniteScrollLoading: false,
      infiniteScroll: true,
    };
  },
  methods: {
    onBottomReached() {
      this.infiniteScrollLoading = true;

      setStoryTimeout(() => {
        this.items.push(...mockOptions.slice(10, 12));
        this.infiniteScrollLoading = false;
        this.infiniteScroll = false;
      }, 1000);
    },
  },
  template: template('', {
    label: `<span class="gl-my-0" id="listbox-label">Select a department</span>`,
    bindingOverrides: {
      ':items': 'items',
      ':infinite-scroll': 'infiniteScroll',
      ':infinite-scroll-loading': 'infiniteScrollLoading',
      ':total-items': 12,
      '@bottom-reached': 'onBottomReached',
    },
  }),
});
InfiniteScroll.argTypes = {
  ...disableControls(['infiniteScroll', 'infiniteScrollLoading', 'items']),
};
InfiniteScroll.tags = ['skip-visual-test'];
InfiniteScroll.args = generateProps();
InfiniteScroll.decorators = [makeContainer({ height: LISTBOX_CONTAINER_HEIGHT })];

export const WithLongContent = (args, { argTypes: { items, ...argTypes } }) => ({
  props: Object.keys(argTypes),
  components: {
    GlCollapsibleListbox,
    GlButton,
    GlTruncate,
  },
  data() {
    const positions = Object.values(POSITION);
    const longItems = Array.from({ length: positions.length }).map((_, index) => ({
      value: `long_value_${index}`,
      text: `${
        index + 1
      }. This is a super long option. Its text is so long that it overflows the max content width. Thankfully, we are truncating it!`,
      truncatePosition: positions[index],
    }));

    return {
      selected: longItems[0].value,
      items: longItems,
    };
  },
  computed: {
    customToggleText() {
      return this.items.find(({ value }) => value === this.selected).text;
    },
    numberOfSearchResults() {
      return this.filteredItems.length === 1 ? '1 result' : `${this.filteredItems.length} results`;
    },
  },
  template: template(
    `
    <template #toggle>
      <gl-button class="gl-w-30">
        <gl-truncate :text="customToggleText" />
      </gl-button>
    </template>
    <template #list-item="{ item }">
      <gl-truncate :text="item.text" :position="item.truncatePosition" />
    </template>
  `,
    {
      label: `<span class="gl-my-0" id="listbox-label">Select the longest option</span>`,
      bindingOverrides: {
        ':items': 'items',
      },
    }
  ),
});
WithLongContent.args = generateProps({
  fluidWidth: true,
});
