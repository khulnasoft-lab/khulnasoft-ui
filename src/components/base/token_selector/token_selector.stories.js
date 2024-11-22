import { userEvent, within, waitFor, expect } from '@storybook/test';
import { getA11yParameters } from '../../../utils/stories_utils';
import readme from './token_selector.md';
import GlTokenSelector from './token_selector.vue';

const template = `
  <div>
    <gl-token-selector
      v-model="selectedTokens"
      v-bind="$props"
      :dropdown-items="filteredDropdownItems"
      @text-input="handleTextInput"
      @focus="handleFocus" />
    {{ selectedTokens }}
  </div>
`;

const generateProps = (props) => ({
  dropdownItems: [
    {
      id: 1,
      name: 'Vue.js',
    },
    {
      id: 2,
      name: 'Ruby On Rails',
      class: '!gl-text-white !gl-bg-data-viz-magenta-950',
    },
    {
      id: 3,
      name: 'GraphQL',
    },
    {
      id: 4,
      name: 'Redis',
      class: '!gl-text-white !gl-bg-data-viz-green-700',
    },
    {
      id: 5,
      name: 'CSS',
      class: '!gl-text-red-500',
      style: { backgroundColor: '#97acff' },
    },
  ],
  ...props,
});

const Template = (args, { argTypes }) => ({
  components: { GlTokenSelector },
  props: Object.keys(argTypes),
  template,
  data() {
    return {
      filteredDropdownItems: [],
      inputText: '',
      selectedTokens: [
        {
          id: 1,
          name: 'Vue.js',
        },
      ],
    };
  },
  methods: {
    handleTextInput(value) {
      this.inputText = value;

      if (this.inputText === '') {
        this.filteredDropdownItems = this.dropdownItems;

        return;
      }

      this.filterDropdownItems();
    },
    handleFocus() {
      if (this.inputText !== '') {
        this.filterDropdownItems();
      } else {
        this.filteredDropdownItems = this.dropdownItems;
      }
    },
    filterDropdownItems() {
      this.filteredDropdownItems = this.dropdownItems.filter((dropdownItem) => {
        return dropdownItem.name.toLowerCase().includes(this.inputText.toLowerCase());
      });
    },
  },
});

export const Default = Template.bind({});
Default.tags = ['skip-visual-test'];
Default.args = generateProps();
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('textbox');
  await userEvent.click(button);
  await waitFor(() => expect(canvas.getByRole('menu')).toBeVisible());
};

export default {
  title: 'base/token_selector',
  component: GlTokenSelector,
  parameters: {
    a11y: getA11yParameters({
      temporarySkipRules: [
        'aria-input-field-name',
        'aria-required-children',
        'nested-interactive',
        'label',
      ],
    }),
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    state: {
      options: [true, false, null],
      control: 'radio',
    },
  },
};

export const UserDefinedTokens = Template.bind({});
UserDefinedTokens.tags = ['skip-visual-test'];
UserDefinedTokens.parameters = {
  docs: {
    description: {
      story: 'Allows users to add custom tokens when no results are found.',
    },
  },
};
UserDefinedTokens.args = generateProps({ allowUserDefinedTokens: true });

export const UserDefinedTokensShowAddNewAlways = Template.bind({});
UserDefinedTokensShowAddNewAlways.tags = ['skip-visual-test'];
UserDefinedTokensShowAddNewAlways.parameters = {
  docs: {
    description: {
      story: 'Allows users to add custom tokens regardless if results are found.',
    },
  },
};
UserDefinedTokensShowAddNewAlways.args = generateProps({
  allowUserDefinedTokens: true,
  showAddNewAlways: true,
});
