import { withKnobs, object, boolean, radios } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './token_selector.md';
import GlTokenSelector from './token_selector.vue';

const components = {
  GlTokenSelector,
};

const generateProps = () => {
  const stateRadiosBoolean = (value) => {
    switch (value) {
      case 'null':
        return null;
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return null;
    }
  };

  return {
    dropdownItems: {
      default: object('Dropdown items', [
        {
          id: 1,
          name: 'Vue.js',
        },
        {
          id: 2,
          name: 'Ruby On Rails',
          class: 'gl-text-white! gl-bg-data-viz-magenta-950!',
        },
        {
          id: 3,
          name: 'GraphQL',
        },
        {
          id: 4,
          name: 'Redis',
          class: 'gl-text-white! gl-bg-data-viz-green-700!',
        },
        {
          id: 5,
          name: 'CSS',
          class: 'gl-text-red-500!',
          style: { backgroundColor: '#97acff' },
        },
      ]),
    },
    allowUserDefinedTokens: {
      default: boolean('Allow user defined tokens', false),
    },
    loading: {
      default: boolean('Loading', false),
    },
    hideDropdownWithNoItems: {
      default: boolean('Hide dropdown with no items', false),
    },
    state: {
      default: stateRadiosBoolean(
        radios('Validation state', { true: 'true', false: 'false', null: 'null' }, 'null')
      ),
    },
  };
};

documentedStoriesOf('base/token_selector', readme)
  .addDecorator(withKnobs)
  .addParameters({ storyshots: false })
  .add('default', () => ({
    props: generateProps(),
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
    components,
    mounted() {
      document.querySelector('.gl-token-selector input[type="text"]').focus();
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
    template: `
      <div>
        <gl-token-selector
          v-model="selectedTokens"
          :dropdown-items="filteredDropdownItems"
          :allow-user-defined-tokens="allowUserDefinedTokens"
          :loading="loading"
          :hide-dropdown-with-no-items="hideDropdownWithNoItems"
          :state="state"
          @text-input="handleTextInput"
          @focus="handleFocus" />
        {{ selectedTokens }}
      </div>
    `,
  }));
