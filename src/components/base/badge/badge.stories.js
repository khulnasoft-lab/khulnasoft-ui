import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import {
  badgeSizeOptions,
  badgeVariantOptions,
  badgeIconSizeOptions,
} from '../../../utils/constants';
import { disableControls } from '../../../utils/stories_utils';
import GlBadge from './badge.vue';
import readme from './badge.md';

const template = `
    <gl-badge
      :href="href"
      :variant="variant"
      :size="size"
      :icon="icon"
      :iconSize="iconSize"
    >{{ content }}</gl-badge>
  `;

const defaultValue = (prop) => GlBadge.props[prop].default;

const generateProps = ({
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  href = '',
  content = 'TestBadge',
  icon = '',
  iconSize = defaultValue('iconSize'),
} = {}) => ({
  variant,
  size,
  href,
  content,
  icon,
  iconSize,
});

const Template = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();
Default.tags = ['skip-visual-test'];

export const Variants = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template: `
    <div>
      <gl-badge
        v-for="variant in $options.badgeVariantOptions"
        :key="variant"
        :href="href"
        :variant="variant"
        :size="size"
        :icon="icon"
        :iconSize="iconSize"
        class="gl-mr-3"
      >{{ variant }}</gl-badge>
    </div>
  `,
  badgeVariantOptions,
});
Variants.args = generateProps({
  variant: badgeVariantOptions.warning,
});
Variants.argTypes = disableControls(['content', 'variant']);

export const Actionable = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template: `
    <div>
      <gl-badge
        v-for="variant in $options.badgeVariantOptions"
        :key="variant"
        :href="href"
        :variant="variant"
        :size="size"
        :icon="icon"
        :iconSize="iconSize"
        class="gl-mr-3"
      >{{ variant }}</gl-badge>
    </div>
  `,
  badgeVariantOptions,
});
Actionable.args = generateProps({
  href: '#foo',
  variant: badgeVariantOptions.warning,
});
Actionable.tags = ['skip-visual-test'];
Actionable.argTypes = disableControls(['content', 'variant']);

export const Sizes = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template: `
    <div>
      <gl-badge
        v-for="size in $options.badgeSizeOptions"
        :key="size"
        :href="href"
        :variant="variant"
        :size="size"
        :icon="icon"
        :iconSize="iconSize"
        class="gl-mr-3"
      >{{ size }}</gl-badge>
    </div>
  `,
  badgeSizeOptions,
});
Sizes.args = generateProps({
  variant: badgeVariantOptions.danger,
});
Sizes.argTypes = disableControls(['content', 'size']);

export const BadgeIcon = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template: `
    <div class="gl-display-flex gl-gap-3">
      <gl-badge variant="tier" icon="license">16px icon</gl-badge>
      <gl-badge variant="tier" icon="license-sm" iconSize="sm">12px icon</gl-badge>
    </div>
  `,
});
BadgeIcon.argTypes = disableControls(['content', 'iconSize']);

export const IconOnly = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template: `
    <div>
      <gl-badge
        :href="href"
        :variant="variant"
        :size="size"
        :icon="icon"
        :iconSize="iconSize"
      />
    </div>
  `,
});
IconOnly.args = generateProps({
  variant: badgeVariantOptions.success,
  icon: 'calendar',
});

export default {
  title: 'base/badge',
  component: GlBadge,
  parameters: {
    bootstrapComponent: 'b-badge',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    variant: {
      options: Object.keys(badgeVariantOptions),
      control: 'select',
    },
    size: {
      options: Object.keys(badgeSizeOptions),
      control: 'select',
    },
    icon: {
      options: ['', ...iconSpriteInfo.icons],
      control: 'select',
    },
    iconSize: {
      options: Object.keys(badgeIconSizeOptions),
      control: 'select',
    },
  },
};
