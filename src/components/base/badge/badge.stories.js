import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { badgeVariantOptions, badgeIconSizeOptions } from '../../../utils/constants';
import { disableControls } from '../../../utils/stories_utils';
import BVueReadme from '../../../vendor/bootstrap-vue/src/components/badge/README.md';
import GlBadge from './badge.vue';
import readme from './badge.md';

const template = `
    <gl-badge
      :href="href"
      :variant="variant"
      :icon="icon"
      :icon-size="iconSize"
    >{{ content }}</gl-badge>
  `;

const defaultValue = (prop) => GlBadge.props[prop].default;

const generateProps = ({
  variant = defaultValue('variant'),
  href = '',
  content = 'TestBadge',
  icon = '',
  iconSize = defaultValue('iconSize'),
} = {}) => ({
  variant,
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

export const BadgeIcon = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template: `
    <div class="gl-flex gl-gap-3">
      <gl-badge variant="tier" icon="license" iconSize="md">With icon</gl-badge>
      <gl-badge variant="success" icon="issue-open-m" iconSize="md">With status open</gl-badge>
      <gl-badge variant="info" icon="issue-close" iconSize="md">With status closed</gl-badge>
      <gl-badge variant="warning" icon="status-alert" iconSize="sm">With sm icon</gl-badge>
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

export const Truncated = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template: `
    <div>
      <!-- Badges inside normal flow should not shrink by default -->
      <div class="gl-mb-5 gl-border gl-border-red-500" style="width: 50px">
        <gl-badge>Regular text</gl-badge>
      </div>

      <div class="gl-mb-5 gl-border gl-border-red-500" style="width: 50px">
        <gl-badge icon="spinner">Regular text</gl-badge>
      </div>

      <!-- Badges inside flexbox should not shrink by default -->
      <div class="gl-flex gl-mb-5 gl-border gl-border-red-500" style="width: 200px">
        <gl-badge>Regular text</gl-badge>
        <gl-badge>Regular text</gl-badge>
        <gl-badge>Regular text</gl-badge>
        <gl-badge>Regular text</gl-badge>
        <gl-badge>Regular text</gl-badge>
      </div>

      <!-- Edge case: wrapping elements and adjacent flex items should not cause shrinking -->
      <div class="gl-flex gl-mb-5 gl-border gl-border-red-500" style="width: 200px">
        <div class="gl-flex">
          <button><gl-badge>Regular text</gl-badge></button>
          <div class="gl-inline-flex" style="width: 100px"></div>
        </div>
        <div style="width: 100%"></div>
      </div>

      <!-- Content inside badge should shrink to container width when gl-truncate applied -->
      <div class="gl-mb-5 gl-border gl-border-red-500" style="width: 80px">
        <gl-badge><span class="gl-truncate">Truncated text</span></gl-badge>
      </div>
      <div class="gl-mb-5 gl-border gl-border-red-500" style="width: 80px">
        <gl-badge icon="spinner"><span class="gl-truncate">Truncated text</span></gl-badge>
      </div>

      <!-- 1 and 2 should match in width (20px) -->
      <div class="gl-mb-5 gl-border gl-border-red-500" style="width: 22px">
        <gl-badge>1</gl-badge>
      </div>
      <div class="gl-mb-5 gl-border gl-border-red-500" style="width: 22px">
        <gl-badge>2</gl-badge>
      </div>

    </div>
  `,
});

export default {
  title: 'base/badge',
  component: GlBadge,
  parameters: {
    bootstrapComponent: 'b-badge',
    bootstrapDocs: BVueReadme,
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
