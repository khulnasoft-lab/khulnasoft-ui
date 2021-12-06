import {
  GlIcon,
  GlActionsDisclosure,
  GlActionsDisclosureItem,
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
import readme from './actions_disclosure.md';

const components = {
  GlIcon,
  GlActionsDisclosure,
  GlActionsDisclosureItem,
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
  text = 'Actions disclosure widget',
  textSrOnly = false,
  loading = false,
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
});

const wrap = ([template]) => {
  return `
    <gl-actions-disclosure
     :items="items"
      ref="actions-disclosure"
      :category="category"
      :variant="variant"
      :size="size"
      :block="block"
      :disabled="disabled"
      :text="text"
      :text-sr-only="textSrOnly"
      :icon="icon"
      :toggle-class="toggleClass"
      :loading="loading"
      :right="right"
    >
      ${template}
    </gl-actions-disclosure>`;
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

export const IconActionButton = (args, { argTypes = {} }) => ({
  components,
  props: Object.keys(argTypes),
  methods: {
    notifyDownloadStarted() {
      /* eslint-disable-next-line no-alert */
      window.alert('Download started...');
    },
  },
  template: wrap`
      <gl-dropdown-section-header>Download artifacts</gl-dropdown-section-header>
      <gl-actions-disclosure-item href="#link1">Artifact link one</gl-actions-disclosure-item>
      <gl-actions-disclosure-item href="#link2" target="_blank">Artifact link two</gl-actions-disclosure-item>
      <gl-actions-disclosure-item @click="notifyDownloadStarted">Artifact link three</gl-actions-disclosure-item>`,
});
IconActionButton.args = generateProps({
  icon: 'download',
  text: 'Download artifcats dropdown',
  textSrOnly: true,
});

export default {
  title: 'base/new_dropdowns/actions_disclosure',
  component: GlActionsDisclosure,
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
