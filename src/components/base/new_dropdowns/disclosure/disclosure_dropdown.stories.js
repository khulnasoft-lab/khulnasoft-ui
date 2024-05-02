import {
  buttonCategoryOptions,
  buttonSizeOptions,
  buttonVariantOptions,
  dropdownPlacements,
} from '../../../../utils/constants';
import GlBadge from '../../badge/badge.vue';
import GlToggle from '../../toggle/toggle.vue';
import GlAvatar from '../../avatar/avatar.vue';
import GlModal from '../../modal/modal.vue';
import GlIcon from '../../icon/icon.vue';
import GlTooltip from '../../tooltip/tooltip.vue';
import { makeContainer } from '../../../../utils/story_decorators/container';
import GlDisclosureDropdown from './disclosure_dropdown.vue';
import GlDisclosureDropdownItem from './disclosure_dropdown_item.vue';
import GlDisclosureDropdownGroup from './disclosure_dropdown_group.vue';
import { DISCLOSURE_DROPDOWN_GROUP_BORDER_POSITIONS } from './constants';
import readme from './disclosure_dropdown.md';
import {
  mockItems,
  mockItemsCustomItem,
  mockGroups,
  mockProfileGroups,
  mockGroupsCustomItem,
} from './mock_data';

const makeBindings = (overrides = {}) =>
  Object.entries({
    ':items': 'items',
    ':category': 'category',
    ':variant': 'variant',
    ':size': 'size',
    ':disabled': 'disabled',
    ':loading': 'loading',
    ':no-caret': 'noCaret',
    ':placement': 'placement',
    ':toggle-id': 'toggleId',
    ':toggle-text': 'toggleText',
    ':text-sr-only': 'textSrOnly',
    ':icon': 'icon',
    ':toggle-aria-labelled-by': 'toggleAriaLabelledBy',
    ':list-aria-labelled-by': 'listAriaLabelledBy',
    ':block': 'block',
    ':fluid-width': 'fluidWidth',
    ':auto-close': 'autoClose',
    ':positioning-strategy': 'positioningStrategy',
    ':start-opened': 'startOpened',

    ...overrides,
  })
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n');

const template = (content = '', { bindingOverrides = {}, after = '' } = {}) => `
  <div>
    <gl-disclosure-dropdown
      ref="disclosure"
      ${makeBindings(bindingOverrides)}
    >
      ${content}
    </gl-disclosure-dropdown>
    ${after}
  </div>
`;

const TOGGLE_ID = 'custom-toggle-id';
export const Default = (args, { argTypes }) => ({
  toggleId: TOGGLE_ID,
  props: Object.keys(argTypes),
  components: {
    GlDisclosureDropdown,
    GlTooltip,
  },
  template: `
    <div>
      ${template()}
      <gl-tooltip :target="$options.toggleId" placement="right">
        This is a default disclosure
      </gl-tooltip>
    </div>
  `,
});
Default.args = {
  items: mockItems,
  icon: 'ellipsis_v',
  noCaret: true,
  toggleText: 'Disclosure',
  textSrOnly: true,
  toggleId: TOGGLE_ID,
};
Default.decorators = [makeContainer({ height: '200px' })];

export const CustomListItem = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlDisclosureDropdown,
    GlBadge,
  },
  template: template(
    `
      <template #list-item="{ item }">
        <span class="gl-display-flex gl-align-items-center gl-justify-content-space-between">
          {{ item.text }}
          <gl-badge pill size="sm" variant="neutral">{{ item.count }}</gl-badge>
        </span>
      </template>
    `,
    {
      bindingOverrides: {
        class: 'gl-display-block! gl-text-center',
      },
    }
  ),
});

CustomListItem.args = {
  items: mockItemsCustomItem,
  toggleText: 'Merge requests',
  placement: 'center',
};
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
    ...changes,
  });

  story.args = { items: mockGroups };
  story.decorators = [makeContainer({ height: '340px' })];

  return story;
};

export const Groups = makeGroupedExample({
  template: template(''),
});
Groups.args = {
  icon: 'plus-square',
  items: mockGroups,
  toggleText: 'Create new',
  textSrOnly: true,
};

export const CustomGroupsAndItems = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlDisclosureDropdown,
    GlBadge,
  },
  methods: {
    getTotalMrs(items) {
      return items.reduce((acc, item) => acc + item.count, 0);
    },
  },
  template: template(
    `
      <template #group-label="{ group }">
        {{ group.name }} <gl-badge pill size="sm" variant="neutral">{{ getTotalMrs(group.items) }}</gl-badge>
      </template>
      <template #list-item="{ item }">
        <span class="gl-display-flex gl-align-items-center gl-justify-content-space-between">
          {{ item.text }}
          <gl-badge pill size="sm" variant="neutral">{{ item.count }}</gl-badge>
        </span>
      </template>
    `
  ),
});

CustomGroupsAndItems.args = {
  items: mockGroupsCustomItem,
  toggleText: 'Merge requests',
  block: true,
};
CustomGroupsAndItems.decorators = [makeContainer({ height: '200px' })];

export const CustomGroupsItemsAndToggle = makeGroupedExample({
  template: template(
    `
      <template #toggle>
     <button class="gl-rounded-base gl-border-none gl-p-2 gl-bg-gray-50 ">
        <span class="gl-sr-only">
          Orange Fox user's menu
        </span>
        <gl-avatar :size="32" entity-name="Orange Fox" aria-hidden="true"/>
      </button>
      </template>
      <gl-disclosure-dropdown-group>
        <gl-disclosure-dropdown-item @action="closeDropdown">
          <template #list-item>
            <span class="gl-display-flex gl-flex-direction-column">
              <span class="gl-font-weight-bold gl-white-space-nowrap">Orange Fox</span>
              <span class="gl-text-gray-600">@thefox</span>
            </span>
          </template>
        </gl-disclosure-dropdown-item>
      </gl-disclosure-dropdown-group>
      <gl-disclosure-dropdown-group :bordered="bordered" :border-position="borderPosition" :group="$options.groups[0]" @action="closeDropdown">
        <template #list-item="{ item }">
          <span class="gl-display-flex gl-align-items-center gl-justify-content-space-between">
            {{item.text}}
            <gl-icon v-if="item.icon" :name="item.icon"/>
          </span>
        </template>
      </gl-disclosure-dropdown-group>
      <gl-disclosure-dropdown-group :bordered="bordered" :border-position="borderPosition">
        <template #group-label>
          <span class="gl-font-sm">Navigation redesign</span>
          <gl-badge size="sm" variant="info">Beta</gl-badge>
        </template>
        <gl-disclosure-dropdown-item @action="toggleNewNavigation">
          <div  class="gl-new-dropdown-item-content">
            <div class="gl-new-dropdown-item-text-wrapper">
              <gl-toggle label="New navigation" label-position="left" :value="newNavigation"/>
            </div>
          </div>
        </gl-disclosure-dropdown-item>
        <gl-disclosure-dropdown-item @action="toggleModalVisibility(true)">
          <template #list-item>Provide feedback</template>
        </gl-disclosure-dropdown-item>
      </gl-disclosure-dropdown-group>
      <gl-disclosure-dropdown-group :bordered="bordered" :border-position="borderPosition" :group="$options.groups[1]" @action="closeDropdown"/>
    `,
    {
      after: `
      <gl-modal :visible="feedBackModalVisible" @change="toggleModalVisibility" modal-id="feedbackModal" size="sm">
        <textarea class="gl-w-full">Tell us what you think!</textarea>
      </gl-modal>
    `,
    }
  ),
  data() {
    return {
      newNavigation: true,
      feedBackModalVisible: false,
    };
  },
  methods: {
    closeDropdown() {
      this.$refs.disclosure.closeAndFocus();
    },
    toggleModalVisibility(value) {
      this.feedBackModalVisible = value;
      this.closeDropdown();
    },
    toggleNewNavigation() {
      this.newNavigation = !this.newNavigation;
      // eslint-disable-next-line no-restricted-globals
      setTimeout(() => {
        this.closeDropdown();
      }, 500);
    },
  },
  groups: mockProfileGroups,
});
CustomGroupsItemsAndToggle.args = {
  icon: 'plus-square',
  toggleText: 'User profile menu',
  textSrOnly: true,
  autoClose: false,
  bordered: true,
  borderPosition: DISCLOSURE_DROPDOWN_GROUP_BORDER_POSITIONS.top,
};
CustomGroupsItemsAndToggle.argTypes = {
  borderPosition: {
    options: DISCLOSURE_DROPDOWN_GROUP_BORDER_POSITIONS,
    control: {
      type: 'select',
    },
  },
};

CustomGroupsItemsAndToggle.decorators = [makeContainer({ height: '400px' })];

export const MiscellaneousContent = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlDisclosureDropdown,
  },
  template: template(
    `
      <div class="gl-p-3">A disclosure dropdown is a button that toggles a panel containing a list of items and/or links.</div>
    `
  ),
});

MiscellaneousContent.args = {
  icon: 'doc-text',
  toggleText: 'Miscellaneous content',
  textSrOnly: true,
  fluidWidth: true,
};
MiscellaneousContent.decorators = [makeContainer({ height: '200px' })];

export default {
  title: 'base/dropdown/disclosure-dropdown',
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
      },
      options: buttonCategoryOptions,
    },
    variant: {
      control: {
        type: 'select',
      },
      options: buttonVariantOptions,
    },
    size: {
      control: {
        type: 'select',
      },
      options: Object.keys(buttonSizeOptions),
    },
    placement: {
      control: {
        type: 'select',
      },
      options: Object.keys(dropdownPlacements),
    },
  },
  args: {
    startOpened: true,
  },
};

export const InMainWrapper = (args, { argTypes }) => ({
  toggleId: TOGGLE_ID,
  props: Object.keys(argTypes),
  components: {
    GlDisclosureDropdown,
    GlTooltip,
  },
  template: `
    <div>
      ${template()}
      <gl-tooltip :target="$options.toggleId" placement="right">
        Automatic placement to stay inside &lt;main&gt; boundary
      </gl-tooltip>
    </div>
  `,
});
InMainWrapper.args = {
  items: mockItems,
  icon: 'ellipsis_v',
  noCaret: true,
  toggleText: 'Disclosure',
  textSrOnly: true,
  toggleId: TOGGLE_ID,
};
InMainWrapper.decorators = [
  makeContainer({ backgroundColor: '#efefef', textAlign: 'right', height: '200px' }, 'main'),
];
