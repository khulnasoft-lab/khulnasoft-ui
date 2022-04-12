import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { GlBadge } from '../../../index';
import { badgeSizeOptions, badgeVariantOptions } from '../../../utils/constants';
import { disableControls } from '../../../utils/stories_utils';
import readme from './badge.md';

const template = `
    <gl-badge
      :href="href"
      :variant="variant"
      :size="size"
      :icon="icon"
    >{{ content }}</gl-badge>
  `;

const defaultValue = (prop) => GlBadge.props[prop].default;

const generateProps = ({
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  href = '',
  content = 'TestBadge',
  icon = '',
} = {}) => ({
  variant,
  size,
  href,
  content,
  icon,
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
    <div>
      <gl-badge
        :href="href"
        :variant="variant"
        :size="size"
        :icon="icon"
      >{{ content }}</gl-badge>
      <gl-badge
        :href="href"
        :variant="variant"
        :size="size"
        :icon="icon"
      />
    </div>
  `,
});
BadgeIcon.args = generateProps({
  variant: badgeVariantOptions.success,
  icon: 'calendar',
  content: 'Badge icon',
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
  },
};
