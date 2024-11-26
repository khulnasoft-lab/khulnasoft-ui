import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { variantCssColorMap } from '../../../utils/constants';
import { getA11yParameters } from '../../../utils/stories_utils';
import BVueReadme from '../../../vendor/bootstrap-vue/src/components/dropdown/README.md';
import GlDropdownItem from './dropdown_item.vue';
import readme from './dropdown_item.md';

const components = {
  GlDropdownItem,
};

const wrap = (template) => `
  <ul class="gl-list-none gl-pl-0">
    <gl-dropdown-item
      :avatar-url="avatarUrl"
      :icon-color="iconColor"
      :icon-name="iconName"
      :icon-right-aria-label="iconRightAriaLabel"
      :icon-right-name="iconRightName"
      :is-checked="isChecked"
      :is-check-item="isCheckItem"
      :is-check-centered="isCheckCentered"
      :secondary-text="secondaryText"
      :disabled="disabled">
      ${template}
    </gl-dropdown-item>
  </ul>
`;

const defaultValue = (prop) => GlDropdownItem.props[prop].default;

const generateProps = ({
  avatarUrl = defaultValue('avatarUrl'),
  iconColor = defaultValue('iconColor'),
  iconName = defaultValue('iconName'),
  iconRightAriaLabel = defaultValue('iconRightAriaLabel'),
  iconRightName = defaultValue('iconRightName'),
  isChecked = defaultValue('isChecked'),
  isCheckItem = defaultValue('isCheckItem'),
  isCheckCentered = defaultValue('isCheckCentered'),
  secondaryText = defaultValue('secondaryText'),
  disabled = false,
} = {}) => ({
  avatarUrl,
  iconColor,
  iconName,
  iconRightAriaLabel,
  iconRightName,
  isChecked,
  isCheckItem,
  isCheckCentered,
  secondaryText,
  disabled,
});

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: wrap('Some item'),
});
Default.args = generateProps();

export const Checked = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: wrap('Some item'),
});
Checked.args = generateProps({ isChecked: true, isCheckItem: true });

export const CheckedWithAvatar = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: wrap('Sid Sijbrandij'),
});
CheckedWithAvatar.args = generateProps({
  isChecked: true,
  isCheckItem: true,
  isCheckCentered: true,
  avatarUrl: './img/avatar.png',
  secondaryText: '@sytses',
});

export const CheckedWithSecondaryText = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: wrap('Some item'),
});
CheckedWithSecondaryText.args = generateProps({
  isChecked: true,
  isCheckItem: true,
  secondaryText: 'Lorem ipsum dolar sit amit...',
});

export default {
  title: 'base/dropdown/deprecated/dropdown-item',
  component: GlDropdownItem,
  parameters: {
    a11y: getA11yParameters({ temporarySkipRules: ['aria-required-parent', 'list'] }),
    bootstrapComponent: 'b-dropdown-item',
    bootstrapDocs: BVueReadme,

    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    iconColor: {
      options: Object.keys(variantCssColorMap),
      control: 'select',
    },
    iconName: {
      options: iconSpriteInfo.icons,
      control: 'select',
    },
  },
};
