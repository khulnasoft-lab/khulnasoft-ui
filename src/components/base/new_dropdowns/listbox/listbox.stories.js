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
import readme from './listbox.md';
import { mockOptions, mockGroups } from './mock_data';
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
  noResultsText = defaultValue('noResultsText'),
  noCaret = defaultValue('noCaret'),
  right = defaultValue('right'),
  toggleText,
  textSrOnly = defaultValue('textSrOnly'),
  icon = '',
  multiple = defaultValue('multiple'),
  isCheckCentered = defaultValue('isCheckCentered'),
  toggleAriaLabelledBy,
  listAriaLabelledBy,
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
  noResultsText,
  noCaret,
  right,
  toggleText,
  textSrOnly,
  icon,
  multiple,
  isCheckCentered,
  toggleAriaLabelledBy,
  listAriaLabelledBy,
  startOpened,
});

function openListbox(component) {
  component.$nextTick(() => {
    component.$refs.listbox.open();
  });
}

const template = (content, label = '') => `
  <div>
    ${label}
    <br/>
    <gl-listbox
      ref="listbox"
      v-model="selected"
      :items="items"
      :category="category"
      :variant="variant"
      :size="size"
      :disabled="disabled"
      :loading="loading"
      :searchable="searchable"
      :searching="searching"
      :no-results-text="noResultsText"
      :no-caret="noCaret"
      :right="right"
      :toggle-text="toggleText"
      :text-sr-only="textSrOnly"
      :icon="icon"
      :multiple="multiple"
      :is-check-centered="isCheckCentered"
      :toggle-aria-labelled-by="toggleAriaLabelledBy"
      :list-aria-labelled-by="listAriaLabelledBy"
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
  template: template('', `<span class="gl-my-0" id="listbox-label">Select a department</span>`),
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
  },
  template: template(
    `<template #header>
        <p class="gl-font-weight-bold gl-font-sm gl-m-0 gl-text-center gl-py-2 gl-border-1 gl-border-b-solid gl-border-gray-200">Assign to department</p>
    </template>
    <template #footer>
      <div class="gl-border-t-solid gl-border-t-1 gl-border-t-gray-100 gl-display-flex gl-justify-content-center gl-p-3">
        <gl-button-group :vertical="false">
          <gl-button @click="selectItem(0)">1st</gl-button>
          <gl-button @click="selectItem(1)">2nd</gl-button>
          <gl-button @click="selectItem(2)">3rd</gl-button>
        </gl-button-group>
      </div>
    </template>
  `
  ),
});
HeaderAndFooter.args = generateProps({
  toggleText: 'Header and Footer',
  multiple: true,
});
HeaderAndFooter.decorators = [makeContainer({ height: '370px' })];

export const CustomListItem = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      selected: ['mikegreiling'],
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
    headerText() {
      return this.selected.length !== 1
        ? `${this.selected.length} assignees`
        : this.items.find(({ value }) => value === this.selected[0]).text;
    },
  },
  template: `
    <gl-listbox
      ref="listbox"
      v-model="selected"
      :items="items"
      :category="category"
      :variant="variant"
      :size="size"
      :disabled="disabled"
      :loading="loading"
      :searchable="searchable"
      :searching="searching"
      :no-results-text="noResultsText"
      :no-caret="noCaret"
      :right="right"
      :toggle-text="headerText"
      :text-sr-only="textSrOnly"
      :icon="icon"
      :multiple="multiple"
      :is-check-centered="isCheckCentered"
      :toggle-aria-labelled-by="toggleAriaLabelledBy"
      :list-aria-labelled-by="listAriaLabelledBy"
    >
    <template #list-item="{ item }">
          <span class="gl-display-flex gl-align-items-center">
            <gl-avatar :size="32" class-="gl-mr-3"/>
              <span class="gl-display-flex gl-flex-direction-column">
                <span class="gl-font-weight-bold gl-white-space-nowrap">{{ item.text }}</span>
                <span class="gl-text-gray-400"> {{ item.secondaryText }}</span>
              </span>
          </span>
    </template>
    </gl-listbox>
  `,
});

CustomListItem.args = generateProps({
  items: [
    {
      value: 'mikegreiling',
      text: 'Mike Greiling',
      secondaryText: '@mikegreiling',
      icon: 'foo',
    },
    { value: 'ohoral', text: 'Olena Horal-Koretska', secondaryText: '@ohoral', icon: 'bar' },
    { value: 'markian', text: 'Mark Florian', secondaryText: '@markian', icon: 'bin' },
  ],
  multiple: true,
  isCheckCentered: true,
});
CustomListItem.decorators = [makeContainer({ height: '200px' })];

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
    template: template(''),
    ...changes,
  });

  story.args = generateProps({ items: mockGroups });
  story.decorators = [makeContainer({ height: '280px' })];

  return story;
};

export const Groups = makeGroupedExample();

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
        options: buttonSizeOptions,
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
      headerId: 'listbox-header',
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
  template: `
    <gl-listbox
      ref="listbox"
      v-model="selected"
      :items="filteredItems"
      :category="category"
      :variant="variant"
      :size="size"
      :disabled="disabled"
      :loading="loading"
      :no-caret="noCaret"
      :right="right"
      :toggle-text="customToggleText"
      :text-sr-only="textSrOnly"
      :icon="icon"
      :multiple="multiple"
      :is-check-centered="isCheckCentered"
      :toggle-aria-labelled-by="toggleAriaLabelledBy"
      :list-aria-labelled-by="headerId"
      :searchable="searchable"
      :searching="searchInProgress"
      :no-results-text="noResultsText"
      @search="filterList"
    >
      <template #header>
        <p :id="headerId"
          class="gl-font-weight-bold gl-font-sm gl-m-0 gl-text-center gl-py-2 gl-border-1 gl-border-b-solid gl-border-gray-200">
          Assign to department</p>
      </template>
      <template #search-summary-sr-only>
        {{ numberOfSearchResults }}
      </template>
    </gl-listbox>
  `,
});
Searchable.args = generateProps({ searchable: true });
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
      headerId: 'listbox-header',
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
  template: `
    <gl-listbox
      ref="listbox"
      v-model="selected"
      :items="filteredGroupOptions"
      :category="category"
      :variant="variant"
      :size="size"
      :disabled="disabled"
      :loading="loading"
      :no-caret="noCaret"
      :right="right"
      :toggle-text="customToggleText"
      :text-sr-only="textSrOnly"
      :icon="icon"
      :multiple="multiple"
      :is-check-centered="isCheckCentered"
      :toggle-aria-labelled-by="toggleAriaLabelledBy"
      :list-aria-labelled-by="headerId"
      :searching="searchInProgress"
      :no-results-text="noResultsText"
      :searchable="searchable"
      @search="filterList"
    >
      <template #header>
        <p :id="headerId"
          class="gl-font-weight-bold gl-font-sm gl-m-0 gl-text-center gl-py-2 gl-border-1 gl-border-b-solid gl-border-gray-200">
          Assign to department</p>
      </template>
      <template #search-summary-sr-only>
        {{ numberOfSearchResults }}
      </template>
    </gl-listbox>
  `,
});
SearchableGroups.args = generateProps({ searchable: true, items: mockGroups });
SearchableGroups.decorators = [makeContainer({ height: '370px' })];
