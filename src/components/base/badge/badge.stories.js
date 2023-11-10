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
  roundIcon = false,
} = {}) => ({
  variant,
  size,
  href,
  content,
  icon,
  iconSize,
  roundIcon,
});

const Template = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();
Default.parameters = {
  storyshots: { disable: true },
};

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
Actionable.parameters = {
  storyshots: { disable: true },
};
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

export const AllVariantsAndCategories = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template: `
  <div>
    <div class="gl-display-flex gl-gap-3">
      <gl-badge variant="info" size="sm" icon="terminal" iconSize="sm" />
      <gl-badge variant="info" size="sm" icon="cancel" :roundIcon="true" iconSize="sm" />
      <gl-badge variant="info" size="sm" icon="terminal" iconSize="sm">Small</gl-badge>
      <gl-badge variant="info" size="sm" icon="cancel" :roundIcon="true" iconSize="sm">Small</gl-badge>
      <gl-badge variant="info" size="sm">Small</gl-badge>
      <gl-badge variant="info" size="sm">5</gl-badge>
    </div>
    <div class="gl-display-flex gl-gap-3 gl-mt-6">
      <gl-badge variant="info" size="md" icon="terminal" iconSize="sm" />
      <gl-badge variant="info" size="md" icon="cancel" :roundIcon="true" iconSize="sm" />
      <gl-badge variant="info" size="md" icon="terminal" iconSize="sm">Medium</gl-badge>
      <gl-badge variant="info" size="md" icon="cancel" :roundIcon="true" iconSize="sm">Medium</gl-badge>
      <gl-badge variant="info" size="md">Medium</gl-badge>
    </div>
    <div class="gl-display-flex gl-gap-3 gl-mt-3">
      <gl-badge variant="info" size="md" icon="terminal" iconSize="md" />
      <gl-badge variant="info" size="md" icon="cancel" :roundIcon="true" iconSize="md" />
      <gl-badge variant="info" size="md" icon="terminal" iconSize="md">Medium</gl-badge>
      <gl-badge variant="info" size="md" icon="cancel" :roundIcon="true" iconSize="md">Medium</gl-badge>
      <gl-badge variant="info" size="md">5</gl-badge>
    </div>
    <div class="gl-display-flex gl-gap-3 gl-mt-6">
      <gl-badge variant="info" size="lg" icon="terminal" iconSize="md" />
      <gl-badge variant="info" size="lg" icon="cancel" :roundIcon="true" iconSize="md" />
      <gl-badge variant="info" size="lg" icon="terminal" iconSize="md">Large</gl-badge>
      <gl-badge variant="info" size="lg" icon="cancel" :roundIcon="true" iconSize="md">Large</gl-badge>
      <gl-badge variant="info" size="lg">5</gl-badge>
      <gl-badge variant="info" size="lg">Large</gl-badge>
    </div>
  </div>
  `,
});
AllVariantsAndCategories.argTypes = disableControls([
  'iconSize',
  'icon',
  'variant',
  'size',
  'roundIcon',
]);

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
