import {
  GlIcon,
  GlMenu,
  GlMenuItem,
  GlDropdownDivider,
  GlDropdownSectionHeader,
  GlDropdownText,
  GlDropdownForm,
  GlButtonGroup,
  GlButton,
  GlLink,
} from '../../../../../index';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownVariantOptions,
} from '../../../../utils/constants';
import readme from './menu.md';

const components = {
  GlIcon,
  GlMenu,
  GlMenuItem,
  GlDropdownDivider,
  GlDropdownSectionHeader,
  GlDropdownText,
  GlDropdownForm,
  GlButtonGroup,
  GlButton,
  GlLink,
};

const defaultValue = (prop) => GlButton.props[prop].default;

const generateProps = ({
  category = defaultValue('category'),
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  block = false,
  disabled,
  icon = '',
  text = 'Menu widget',
  textSrOnly = false,
  loading = false,
  headerText = '',
  hideHeaderBorder = true,
  noCaret = false,
} = {}) => ({
  category,
  variant,
  size,
  block,
  disabled,
  icon,
  text,
  textSrOnly,
  loading,
  headerText,
  hideHeaderBorder,
  noCaret,
});

const wrap = ([template]) => {
  return `
    <gl-menu
      ref="menu"
      :category="category"
      :variant="variant"
      :size="size"
      :block="block"
      :disabled="disabled"
      :text="text"
      :text-sr-only="textSrOnly"
      :icon="icon"
      :toggle-class="toggleClass"
      :header-text="headerText"
      :hide-header-border="hideHeaderBorder"
      :loading="loading"
      :right="right"
      :no-caret="noCaret"
    >
      ${template}
    </gl-menu>`;
};

export const Default = (args, { argTypes = {} }) => ({
  components,
  props: Object.keys(argTypes),
  methods: {
    showAlert(msg) {
      window.alert(msg);
    },
  },
  template: wrap`
      <gl-menu-item @click="showAlert('Action 1')">Action one</gl-menu-item>
      <gl-menu-item @click="showAlert('Action 2')" disabled>Action two</gl-menu-item>
      <gl-menu-item @click="showAlert('Action 3')">Action three</gl-menu-item>`,
});
Default.args = generateProps({
  text: 'Actions menu',
  textSrOnly: true,
  icon: 'ellipsis_v',
  noCaret: true,
});

export const WithHeaderAndFooter = (args, { argTypes = {} }) => ({
  components,
  props: Object.keys(argTypes),
  methods: {
    showAlert(msg) {
      window.alert(msg);
    },
  },
  template: wrap`
      <template #header>
        <div class="gl-p-3">
           <span  class="gl-font-weight-bold gl-font-sm">Download source code</span>
           <gl-button-group :vertical="false" class="gl-display-flex gl-my-3">
              <gl-button variant="confirm" size="small">zip</gl-button>
              <gl-button size="small">tar.gz</gl-button>
              <gl-button size="small">tar.bz2</gl-button>
              <gl-button size="small">tar</gl-button>
           </gl-button-group>
           <gl-dropdown-divider/>
        </div>
      </template>
      <gl-dropdown-section-header>Download artifacts</gl-dropdown-section-header>
      <gl-menu-item @click="showAlert('Action 1')">Action one</gl-menu-item>
      <gl-menu-item @click="showAlert('Action 2')">Action two</gl-menu-item>
      <gl-menu-item @click="showAlert('Action 3')">Action three</gl-menu-item>
      <template #footer>
        <div class="gl-p-3">
            <gl-link>Open in Web IDE</gl-link>
        </div>
      </template>`,
});
WithHeaderAndFooter.args = generateProps({ text: 'Action menu', split: true });

export default {
  title: 'base/new-dropdowns/menu',
  component: GlMenu,
  parameters: {
    bootstrapComponent: 'b-dropdown',
    docs: {
      description: {
        component: readme,
      },
    },
    knobs: {
      disable: true,
    },
  },
  argTypes: {
    category: {
      control: {
        type: 'select',
        options: Object.keys(buttonCategoryOptions),
      },
    },
    variant: {
      control: {
        type: 'select',
        options: Object.keys(dropdownVariantOptions),
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
