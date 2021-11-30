import {
  GlIcon,
  GlDisclosure,
  GlDisclosureItem,
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
import readme from './disclosure.md';

const components = {
  GlIcon,
  GlDisclosure,
  GlDisclosureItem,
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
  items,
  category = defaultValue('category'),
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  block = false,
  disabled,
  icon = '',
  text = 'Disclosure widget',
  textSrOnly = false,
  loading = false,
  headerText = '',
  hideHeaderBorder = true,
} = {}) => ({
  items,
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
});

const wrap = ([template]) => {
  return `
    <gl-disclosure
     :items="items"
      ref="disclosure"
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
    >
      ${template}
    </gl-disclosure>`;
};

export const Default = (args, { argTypes = {} }) => ({
  components,
  props: Object.keys(argTypes),
  template: wrap``,
});
Default.args = generateProps({
  text: 'Simple links list',
  items: [
    { text: 'Link one', href: '#link1' },
    { text: 'Link two', to: '#link2', target: '_blank' },
    { text: 'Link three', href: '#link3' },
  ],
});

export const WithHeaderAndFooter = (args, { argTypes = {} }) => ({
  components,
  props: Object.keys(argTypes),
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
      <gl-disclosure-item href="#link1">Artifact link one</gl-disclosure-item>
      <gl-disclosure-item href="#link2">Artifact link two</gl-disclosure-item>
      <gl-disclosure-item href="#link2">Artifact link three</gl-disclosure-item>
      <template #footer>
        <div class="gl-p-3">
            <gl-link>Open in Web IDE</gl-link>
        </div>
      </template>`,
});
WithHeaderAndFooter.args = generateProps({ icon: 'download', text: '' });

export default {
  title: 'base/new-dropdowns/disclosure',
  component: GlDisclosure,
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
