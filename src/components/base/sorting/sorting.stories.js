import { makeContainer } from '../../../utils/story_decorators/container';
import GlSortingItem from './sorting_item.vue';
import GlSorting from './sorting.vue';
import readme from './sorting.md';

const components = {
  GlSorting,
  GlSortingItem,
};

const propDefault = (prop) => GlSorting.props[prop].default;

const generateProps = ({
  text = 'Sorting options',
  sortOptions = propDefault('sortOptions'),
  sortBy = propDefault('sortBy'),
  isAscending = propDefault('isAscending'),
  sortDirectionToolTip = propDefault('sortDirectionToolTip'),
  dropdownClass = propDefault('dropdownClass'),
  dropdownToggleClass = propDefault('dropdownToggleClass'),
  sortDirectionToggleClass = propDefault('sortDirectionToggleClass'),
} = {}) => ({
  text,
  sortOptions,
  sortBy,
  isAscending,
  sortDirectionToolTip,
  dropdownClass,
  dropdownToggleClass,
  sortDirectionToggleClass,
});

const template = `
  <gl-sorting
    :text="text"
    :is-ascending="isAscending"
    :sort-direction-tool-tip="sortDirectionToolTip"
    :dropdown-class="dropdownClass"
    :dropdown-toggle-class="dropdownToggleClass"
    :sort-direction-toggle-class="sortDirectionToggleClass"
  >
    <gl-sorting-item active>First item</gl-sorting-item>
    <gl-sorting-item>Second item</gl-sorting-item>
    <gl-sorting-item>Last item</gl-sorting-item>
  </gl-sorting>`;

const Template = (args) => ({
  components,
  props: Object.keys(args),
  mounted() {
    this.$nextTick(() => this.$el.querySelector('.gl-dropdown-toggle').click());
  },
  template,
});

export const Default = Template.bind({});
Object.assign(Default, {
  args: generateProps(),
  parameters: {
    controls: {
      // These props/events only apply when using the listbox form, so don't
      // show their controls.
      exclude: ['sortBy', 'sortOptions', 'sortByChange'],
    },
  },
});

export const UsingListbox = (args) => ({
  components,
  props: Object.keys(args),
  mounted() {
    // The first button is the dropdown trigger.
    this.$nextTick(() => this.$el.querySelector('button').click());
  },
  template: `
    <gl-sorting
      :text="text"
      :sort-options="sortOptions"
      :sort-by="sortBy"
      :is-ascending="isAscending"
      :sort-direction-tool-tip="sortDirectionToolTip"
      :dropdown-class="dropdownClass"
      :dropdown-toggle-class="dropdownToggleClass"
      :sort-direction-toggle-class="sortDirectionToggleClass"
    />
  `,
});
Object.assign(UsingListbox, {
  args: generateProps({
    text: '',
    sortOptions: [
      {
        value: 'first',
        text: 'First item',
      },
      {
        value: 'second',
        text: 'Second item',
      },
      {
        value: 'third',
        text: 'Third item',
      },
    ],
    sortBy: 'first',
  }),
  parameters: {
    controls: {
      // The default slot is deprecated, so don't show it in the controls.
      exclude: ['default'],
    },
  },
});

export default {
  title: 'base/sorting',
  component: GlSorting,
  decorators: [
    makeContainer({
      height: '150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
