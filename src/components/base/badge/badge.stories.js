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
      :icon-size="iconSize"
      :round-icon="roundIcon"
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
        :icon-size="iconSize"
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
        :icon-size="iconSize"
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
        :icon-size="iconSize"
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
    <div style="display: grid; grid-template-columns: repeat(4, 150px); row-gap: 8px; align-items: center;">
      <div><gl-badge :variant="variant" size="sm" icon="terminal" icon-size="sm">12px default icon</gl-badge></div>
      <div><gl-badge :variant="variant" icon="terminal" icon-size="sm">12px default icon</gl-badge></div>
      <div><gl-badge :variant="variant" icon="terminal">16px default icon</gl-badge></div>
      <div><gl-badge :variant="variant" size="lg" icon="terminal" icon-size="md">16px default icon</gl-badge></div>
      <div><gl-badge :variant="variant" size="sm" icon="status" :round-icon="true" icon-size="sm">12px round icon</gl-badge></div>
      <div><gl-badge :variant="variant" icon="status" :round-icon="true" icon-size="sm">12px round icon</gl-badge></div>
      <div><gl-badge :variant="variant" icon="status" :round-icon="true">16px round icon</gl-badge></div>
      <div><gl-badge :variant="variant" size="lg" icon="status" :round-icon="true" icon-size="md">16px round icon</gl-badge></div>
    </div>
  `,
});
BadgeIcon.argTypes = disableControls(['content', 'iconSize', 'icon', 'size', 'roundIcon']);

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
        :icon-size="iconSize"
      />
      <gl-badge
        :href="href"
        :variant="variant"
        :size="size"
        :icon="icon"
        :icon-size="iconSize"
        :round-icon="true"
      />
    </div>
  `,
});
IconOnly.args = generateProps({
  variant: badgeVariantOptions.success,
  icon: 'calendar',
});
IconOnly.argTypes = disableControls(['content', 'roundIcon']);

export const AllVariantsAndCategories = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template: `
  <div>
    <div class="gl-display-flex gl-gap-3">
      <gl-badge variant="info" size="sm" icon="terminal" icon-size="sm" />
      <gl-badge variant="info" size="sm" icon="cancel" :round-icon="true" icon-size="sm" />
      <gl-badge variant="info" size="sm" icon="terminal" icon-size="sm">Small</gl-badge>
      <gl-badge variant="info" size="sm" icon="cancel" :round-icon="true" icon-size="sm">Small</gl-badge>
      <gl-badge variant="info" size="sm">Small</gl-badge>
      <gl-badge variant="info" size="sm">5</gl-badge>
    </div>
    <div class="gl-display-flex gl-gap-3 gl-mt-6">
      <gl-badge variant="info" size="md" icon="terminal" icon-size="sm" />
      <gl-badge variant="info" size="md" icon="cancel" :round-icon="true" icon-size="sm" />
      <gl-badge variant="info" size="md" icon="terminal" icon-size="sm">Medium</gl-badge>
      <gl-badge variant="info" size="md" icon="cancel" :round-icon="true" icon-size="sm">Medium</gl-badge>
      <gl-badge variant="info" size="md">Medium</gl-badge>
    </div>
    <div class="gl-display-flex gl-gap-3 gl-mt-3">
      <gl-badge variant="info" size="md" icon="terminal" icon-size="md" />
      <gl-badge variant="info" size="md" icon="cancel" :round-icon="true" icon-size="md" />
      <gl-badge variant="info" size="md" icon="terminal" icon-size="md">Medium</gl-badge>
      <gl-badge variant="info" size="md" icon="cancel" :round-icon="true" icon-size="md">Medium</gl-badge>
      <gl-badge variant="info" size="md">5</gl-badge>
    </div>
    <div class="gl-display-flex gl-gap-3 gl-mt-6">
      <gl-badge variant="info" size="lg" icon="terminal" icon-size="md" />
      <gl-badge variant="info" size="lg" icon="cancel" :round-icon="true" icon-size="md" />
      <gl-badge variant="info" size="lg" icon="terminal" icon-size="md">Large</gl-badge>
      <gl-badge variant="info" size="lg" icon="cancel" :round-icon="true" icon-size="md">Large</gl-badge>
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
