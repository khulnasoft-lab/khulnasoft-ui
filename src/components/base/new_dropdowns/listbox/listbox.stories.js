import {
  buttonCategoryOptions,
  buttonSizeOptions,
  buttonVariantOptions,
} from '../../../../utils/constants';
import {
  GlIcon,
  GlListbox,
  GlSearchBoxByType,
  GlButtonGroup,
  GlButton,
  GlBadge,
  GlAvatar,
} from '../../../../index';
import { makeContainer } from '../../../../utils/story_decorators/container';
import { disableControls } from '../../../../utils/stories_utils';
import { setStoryTimeout } from '../../../../utils/test_utils';
import readme from './listbox.md';
import { mockOptions, mockGroups, mockUsers } from './mock_data';
import { flattenedOptions } from './utils';

const defaultValue = (prop) => GlListbox.props[prop].default;

const generateProps = ({
  items = mockOptions,
  category = defaultValue('category'),
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  disabled = defaultValue('disabled'),
  loading = defaultValue('loading'),
  searchable = defaultValue('searchable'),
  searching = defaultValue('searching'),
  infiniteScroll = defaultValue('infiniteScroll'),
  infiniteScrollLoading = defaultValue('infiniteScrollLoading'),
  noResultsText = defaultValue('noResultsText'),
  searchPlaceholder = defaultValue('searchPlaceholder'),
  noCaret = defaultValue('noCaret'),
  right = defaultValue('right'),
  toggleText,
  textSrOnly = defaultValue('textSrOnly'),
  headerText = defaultValue('headerText'),
  icon = '',
  multiple = defaultValue('multiple'),
  isCheckCentered = defaultValue('isCheckCentered'),
  toggleAriaLabelledBy,
  listAriaLabelledBy,
  resetButtonLabel = defaultValue('resetButtonLabel'),
  startOpened = true,
} = {}) => ({
  items,
  category,
  variant,
  size,
  disabled,
  loading,
  searchable,
  searching,
  infiniteScroll,
  infiniteScrollLoading,
  noResultsText,
  searchPlaceholder,
  noCaret,
  right,
  toggleText,
  textSrOnly,
  headerText,
  icon,
  multiple,
  isCheckCentered,
  toggleAriaLabelledBy,
  listAriaLabelledBy,
  resetButtonLabel,
  startOpened,
});

const makeBindings = (overrides = {}) =>
  Object.entries({
    ':items': 'items',
    ':category': 'category',
    ':variant': 'variant',
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
    ':right': 'right',
    ':toggle-text': 'toggleText',
    ':text-sr-only': 'textSrOnly',
    ':header-text': 'headerText',
    ':icon': 'icon',
    ':multiple': 'multiple',
    ':is-check-centered': 'isCheckCentered',
    ':toggle-aria-labelled-by': 'toggleAriaLabelledBy',
    ':list-aria-labelled-by': 'listAriaLabelledBy',
    ':reset-button-label': 'resetButtonLabel',
    ...overrides,
  })
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n');

function openListbox(component) {
  component.$nextTick(() => {
    component.$refs.listbox.open();
  });
}

const template = (content, { label = '', bindingOverrides = {} } = {}) => `
  <div>
    ${label}
    ${label && '<br/>'}
    <gl-listbox
      ref="listbox"
      v-model="selected"
      ${makeBindings(bindingOverrides)}
    >
      ${content}
    </gl-listbox>
  </div>
`;

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlListbox,
  },
  data() {
    return {
      selected: mockOptions[1].value,
    };
  },
  mounted() {
    if (this.startOpened) {
      openListbox(this);
    }
  },
  template: template('', {
    label: `<span class="gl-my-0" id="listbox-label">Select a department</span>`,
  }),
});
Default.args = generateProps({ toggleAriaLabelledBy: 'listbox-label' });
Default.decorators = [makeContainer({ height: '370px' })];

export const HeaderAndFooter = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlListbox,
    GlSearchBoxByType,
    GlButtonGroup,
    GlButton,
  },
  data() {
    return {
      selected: [],
    };
  },
  mounted() {
    if (this.startOpened) {
      openListbox(this);
    }
  },
  methods: {
    selectItem(index) {
      this.selected.push(mockOptions[index].value);
    },
    onReset() {
      this.selected = [];
    },
  },
  template: template(
    `
    <template #footer>
      <div class="gl-border-t-solid gl-border-t-1 gl-border-t-gray-100 gl-display-flex gl-justify-content-center gl-p-3">
        <gl-button-group :vertical="false">
          <gl-button @click="selectItem(0)">1st</gl-button>
          <gl-button @click="selectItem(1)">2nd</gl-button>
          <gl-button @click="selectItem(2)">3rd</gl-button>
        </gl-button-group>
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
});
HeaderAndFooter.decorators = [makeContainer({ height: '370px' })];

export const CustomListItem = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      selected: [mockUsers[0].value],
    };
  },
  components: {
    GlListbox,
    GlIcon,
    GlAvatar,
  },
  mounted() {
    if (this.startOpened) {
      openListbox(this);
    }
  },
  computed: {
    customToggleText() {
      return this.selected.length !== 1
        ? `${this.selected.length} assignees`
        : this.items.find(({ value }) => value === this.selected[0]).text;
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
                <gl-avatar :size="32" :entity-name="item.value" class-="gl-mr-3"/>
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
    GlListbox,
    GlAvatar,
  },
  data() {
    return {
      selected: mockUsers[1].value,
    };
  },
  mounted() {
    if (this.startOpened) {
      openListbox(this);
    }
  },
  template: template(
    `
    <template #toggle>
      <gl-avatar :size="32" :entity-name="selected"></gl-avatar>
    </template>
    <template #list-item="{ item }">
      <span class="gl-display-flex gl-align-items-center">
        <gl-avatar :size="32" :entity-name="item.value" class-="gl-mr-3"/>
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
      GlListbox,
    },
    data() {
      return {
        selected: 'v1.0',
      };
    },
    mounted() {
      if (this.startOpened) {
        openListbox(this);
      }
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

      const selectedBranches = mockGroups[0].options.filter(isSelected);
      const availableBranches = mockGroups[0].options.filter(notSelected);
      const selectedTags = mockGroups[1].options.filter(isSelected);
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

export default {
  title: 'base/new-dropdowns/listbox',
  component: GlListbox,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    category: {
      control: {
        type: 'select',
        options: buttonCategoryOptions,
      },
    },
    variant: {
      control: {
        type: 'select',
        options: buttonVariantOptions,
      },
    },
    size: {
      control: {
        type: 'select',
        options: Object.keys(buttonSizeOptions),
      },
    },
  },
};

export const Searchable = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlListbox,
  },
  data() {
    return {
      selected: mockOptions[1].value,
      filteredItems: mockOptions,
      searchInProgress: false,
      timeoutId: null,
    };
  },
  mounted() {
    if (this.startOpened) {
      openListbox(this);
    }
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
      return this.filteredItems.length === 1 ? '1 result' : `${this.filteredItems.length} results`;
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
Searchable.decorators = [makeContainer({ height: '370px' })];

export const SearchableGroups = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlListbox,
  },
  data() {
    return {
      selected: mockGroups[1].options[0].value,
      filteredGroupOptions: mockGroups,
      searchInProgress: false,
      timeoutId: null,
    };
  },
  mounted() {
    if (this.startOpened) {
      openListbox(this);
    }
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
    numberOfSearchResults() {
      return this.flattenedFilteredOptions.length === 1
        ? '1 result'
        : `${this.flattenedFilteredOptions.length} results`;
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
  },
  template: template(
    `<template #search-summary-sr-only>
      {{ numberOfSearchResults }}
    </template>`,
    {
      bindingOverrides: {
        ':items': 'filteredGroupOptions',
        ':toggle-text': 'customToggleText',
        ':searching': 'searchInProgress',
        '@search': 'filterList',
      },
    }
  ),
});
SearchableGroups.args = generateProps({
  headerText: 'Select ref',
  searchable: true,
  items: mockGroups,
});
SearchableGroups.decorators = [makeContainer({ height: '370px' })];

export const InfiniteScroll = (
  args,
  { argTypes: { infiniteScroll, infiniteScrollLoading, items, ...argTypes } }
) => ({
  props: Object.keys(argTypes),
  components: {
    GlListbox,
  },
  data() {
    return {
      selected: mockOptions[1].value,
      items: mockOptions.slice(0, 10),
      infiniteScrollLoading: false,
      infiniteScroll: true,
    };
  },
  mounted() {
    if (this.startOpened) {
      openListbox(this);
    }
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
InfiniteScroll.parameters = {
  storyshots: { disable: true },
};
InfiniteScroll.args = generateProps();
InfiniteScroll.decorators = [makeContainer({ height: '370px' })];
