import { userEvent, within, waitFor, expect } from '@storybook/test';
import { makeContainer } from '../../../utils/story_decorators/container';
import GlSorting from './sorting.vue';
import readme from './sorting.md';

const components = {
  GlSorting,
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
    :sort-options="sortOptions"
    :sort-by="sortBy"
    :is-ascending="isAscending"
    :sort-direction-tool-tip="sortDirectionToolTip"
    :dropdown-class="dropdownClass"
    :dropdown-toggle-class="dropdownToggleClass"
    :sort-direction-toggle-class="sortDirectionToggleClass"
  />
`;

const Template = (args) => ({
  components,
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Object.assign(Default, {
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
  parameters: {},
});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByTestId('base-dropdown-toggle');
  await userEvent.click(button);
  await waitFor(() => expect(canvas.getByRole('listbox')).toBeVisible());
};

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
