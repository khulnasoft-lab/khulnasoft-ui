import {
  buttonCategoryOptions,
  buttonSizeOptions,
  buttonVariantOptions,
} from '../../../../utils/constants';
import {
  GlDisclosureDropdown,
  GlBadge,
  GlDisclosureDropdownGroup,
  GlDisclosureDropdownItem,
  GlToggle,
  GlAvatar,
  GlModal,
  GlIcon,
} from '../../../../index';
import { makeContainer } from '../../../../utils/story_decorators/container';
import readme from './disclosure_dropdown.md';
import {
  mockItems,
  mockItemsCustomItem,
  mockGroups,
  mockProfileGroups,
  mockGroupsCustomItem,
} from './mock_data';

const defaultValue = (prop) => GlDisclosureDropdown.props[prop].default;

const generateProps = ({
  items = mockItems,
  category = defaultValue('category'),
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  disabled = defaultValue('disabled'),
  loading = defaultValue('loading'),
  noCaret = defaultValue('noCaret'),
  right = defaultValue('right'),
  toggleText,
  textSrOnly = defaultValue('textSrOnly'),
  icon = '',
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
  noCaret,
  right,
  toggleText,
  textSrOnly,
  icon,
  toggleAriaLabelledBy,
  listAriaLabelledBy,
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
    ':no-caret': 'noCaret',
    ':right': 'right',
    ':toggle-text': 'toggleText',
    ':text-sr-only': 'textSrOnly',
    ':icon': 'icon',
    ':toggle-aria-labelled-by': 'toggleAriaLabelledBy',
    ':list-aria-labelled-by': 'listAriaLabelledBy',
    ...overrides,
  })
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n');

function openDisclosure(component) {
  component.$nextTick(() => {
    component.$refs.disclosure.open();
  });
}

const template = (content, { bindingOverrides = {} } = {}) => `
    <gl-disclosure-dropdown
      ref="disclosure"
      ${makeBindings(bindingOverrides)}
    >
      ${content || ''}
    </gl-disclosure-dropdown>
`;

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlDisclosureDropdown,
  },
  mounted() {
    if (this.startOpened) {
      openDisclosure(this);
    }
  },
  template: template(),
});
Default.args = generateProps({
  icon: 'ellipsis_v',
  noCaret: true,
  toggleText: 'Disclosure',
  textSrOnly: true,
});
Default.decorators = [makeContainer({ height: '200px' })];

export const CustomListItem = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlDisclosureDropdown,
    GlBadge,
  },
  mounted() {
    if (this.startOpened) {
      openDisclosure(this);
    }
  },
  methods: {
    navigate() {
      this.$refs.link.click();
    },
  },
  template: template(
    `
      <template #list-item="{ item }">
        <a ref="link" class="gl-display-flex gl-align-items-center gl-justify-content-space-between gl-hover-text-gray-900 gl-hover-text-decoration-none gl-text-gray-900" :href="item.href" v-bind="item.extraAttrs">
          {{item.text}}
          <gl-badge pill variant="info" v-if="item.count">{{item.count}}</gl-badge>
        </a>
      </template>
    `,
    {
      bindingOverrides: {
        '@action': 'navigate',
      },
    }
  ),
});

CustomListItem.args = generateProps({ items: mockItemsCustomItem, toggleText: 'Merge requests' });
CustomListItem.decorators = [makeContainer({ height: '200px' })];

const makeGroupedExample = (changes) => {
  const story = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
      GlBadge,
      GlDisclosureDropdown,
      GlDisclosureDropdownGroup,
      GlDisclosureDropdownItem,
      GlToggle,
      GlAvatar,
      GlModal,
      GlIcon,
    },
    mounted() {
      if (this.startOpened) {
        openDisclosure(this);
      }
    },
    ...changes,
  });

  story.args = generateProps({ items: mockGroups });
  story.decorators = [makeContainer({ height: '340px' })];

  return story;
};

export const Groups = makeGroupedExample({
  template: template(''),
});
Groups.args = generateProps({
  icon: 'plus-square',
  items: mockGroups,
  toggleText: 'Create new',
  textSrOnly: true,
});

export const CustomGroupsAndItems = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlDisclosureDropdown,
    GlBadge,
  },
  mounted() {
    if (this.startOpened) {
      openDisclosure(this);
    }
  },
  methods: {
    navigate() {
      this.$refs.link.click();
    },
    getTotalMrs(items) {
      return items.reduce((acc, item) => acc + item.count, 0);
    },
  },
  template: template(
    `
      <template #group-label="{ group }">
        {{ group.name }} <gl-badge size="sm">{{ getTotalMrs(group.items)  }}</gl-badge>
      </template>
      <template #list-item="{ item }">
        <a ref="link" class="gl-display-flex gl-align-items-center gl-justify-content-space-between gl-hover-text-gray-900 gl-hover-text-decoration-none gl-text-gray-900" :href="item.href" v-bind="item.extraAttrs">
          {{item.text}}
          <gl-badge pill size="sm" v-if="item.count">{{item.count}}</gl-badge>
        </a>
       </template>
    `,
    {
      bindingOverrides: {
        '@action': 'navigate',
      },
    }
  ),
});

CustomGroupsAndItems.args = generateProps({
  items: mockGroupsCustomItem,
  toggleText: 'Merge requests',
});
CustomGroupsAndItems.decorators = [makeContainer({ height: '200px' })];

export const CustomGroupsItemsAndToggle = makeGroupedExample({
  template: template(`
    <template #toggle>
      <span class="gl-sr-only">
        Orange Fox user's menu
      </span>
      <gl-avatar :size="32" entity-name="Orange Fox" aria-hidden="true"></gl-avatar>
    </template>

    <div role="group">
      <gl-disclosure-dropdown-group>
        <gl-disclosure-dropdown-item>
          <span class="gl-display-flex gl-flex-direction-column">
            <span class="gl-font-weight-bold gl-white-space-nowrap">Orange Fox</span>
            <span class="gl-text-gray-400">@thefox</span>
          </span>
        </gl-disclosure-dropdown-item>
      </gl-disclosure-dropdown-group>
      <gl-disclosure-dropdown-group bordered :group="$options.groups[0]">
        <template #list-item="{ item }">
          <a
            class="gl-display-flex gl-align-items-center gl-justify-content-space-between gl-hover-text-gray-900 gl-hover-text-decoration-none gl-text-gray-900"
            :href="item.href"
            v-bind="item.extraAttrs"
          >
            {{item.text}}
            <gl-icon v-if="item.icon" :name="item.icon"/>
          </a>
        </template>
      </gl-disclosure-dropdown-group>
      <gl-disclosure-dropdown-group bordered>
        <template #group-label>
          <span class="gl-font-sm">Navigation redesign</span>
          <gl-badge size="sm" variant="info">Beta</gl-badge>
        </template>
        <gl-disclosure-dropdown-item>
          <gl-toggle label="New navigation" label-position="left" v-model="newNavigation"/>
        </gl-disclosure-dropdown-item>
        <gl-disclosure-dropdown-item @action="toggleModalVisibility(true)">
          <a>Provide feedback</a>
        </gl-disclosure-dropdown-item>
      </gl-disclosure-dropdown-group>
      <gl-disclosure-dropdown-group bordered :group="$options.groups[1]"> </gl-disclosure-dropdown-group>
      <gl-modal :visible="feedBackModalVisible" @change="toggleModalVisibility" modal-id="feedbackModal" size="sm">
        <textarea class="gl-w-full">Tell us what you think!</textarea>
      </gl-modal>
    </div>
  `),
  data() {
    return {
      newNavigation: true,
      feedBackModalVisible: false,
    };
  },
  methods: {
    toggleModalVisibility(value) {
      this.feedBackModalVisible = value;
    },
  },
  groups: mockProfileGroups,
});
CustomGroupsItemsAndToggle.args = generateProps({
  icon: 'plus-square',
  toggleText: 'User profile menu',
  textSrOnly: true,
  items: null,
});
CustomGroupsItemsAndToggle.decorators = [makeContainer({ height: '400px' })];

export const MiscellaneousContent = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlDisclosureDropdown,
  },
  mounted() {
    if (this.startOpened) {
      openDisclosure(this);
    }
  },
  template: template(
    `
      <div class="gl-p-3">A disclosure dropdown is a button that toggles a panel containing a list of items and/or links.</div>
    `
  ),
});

MiscellaneousContent.args = generateProps({
  icon: 'doc-text',
  toggleText: 'Miscellaneous content',
  textSrOnly: true,
  items: null,
});
MiscellaneousContent.decorators = [makeContainer({ height: '200px' })];

export default {
  title: 'base/new-dropdowns/disclosure',
  component: GlDisclosureDropdown,
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
