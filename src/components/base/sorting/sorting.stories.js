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
  isAscending = propDefault('isAscending'),
  sortDirectionToolTip = propDefault('sortDirectionToolTip'),
  dropdownClass = propDefault('dropdownClass'),
  dropdownToggleClass = propDefault('dropdownToggleClass'),
  sortDirectionToggleClass = propDefault('sortDirectionToggleClass'),
} = {}) => ({
  text,
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
Default.args = generateProps();

export default {
  title: 'base/sorting',
  component: GlSorting,
  decorators: [makeContainer({ height: '100px', paddingLeft: '100px' })],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
