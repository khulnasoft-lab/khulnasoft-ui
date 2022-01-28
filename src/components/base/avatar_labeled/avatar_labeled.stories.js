import Vue from 'vue';
import { GlAvatarLabeled, GlBadge } from '../../../../index';
import { GlTooltipDirective } from '../../../directives/tooltip';
import { avatarSizeOptions, avatarShapeOptions, tooltipPlacements } from '../../../utils/constants';
import readme from './avatar_labeled.md';

Vue.directive('gl-tooltip', GlTooltipDirective);

const components = { GlAvatarLabeled };

const generateProps = ({
  label = 'GitLab User',
  subLabel = '@gitlab',
  size = 32,
  shape = 'circle',
  src = 'https://assets.gitlab-static.net/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png?width=64',
} = {}) => ({
  label,
  subLabel,
  size,
  shape,
  src,
});

const generateTooltipProps = ({ tooltipText = 'Avatar tooltip', placement = 'top' } = {}) => ({
  tooltipText,
  placement,
});

export const Default = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
      <gl-avatar-labeled
        :shape="shape"
        :size="size"
        :src="src"
        :label="label"
        :sub-label="subLabel"
      />
    `,
});
Default.args = generateProps();

export const WithTooltip = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
      <gl-avatar-labeled
        :shape="shape"
        :size="size"
        :src="src"
        :label="label"
        :sub-label="subLabel"
        :title="tooltipText"
        v-gl-tooltip="{ placement }"
      />
    `,
});
WithTooltip.args = { ...generateProps(), ...generateTooltipProps() };
WithTooltip.argTypes = {
  placement: {
    control: {
      type: 'select',
      options: tooltipPlacements,
    },
  },
};

export const WithBadges = (args, { argTypes }) => ({
  components: { GlAvatarLabeled, GlBadge },
  props: Object.keys(argTypes),
  template: `
      <gl-avatar-labeled
        :shape="shape"
        :size="size"
        :src="src"
        :label="label"
        :sub-label="subLabel"
      >
        <template #meta>
          <div class="gl-p-1">
            <gl-badge class="gl-display-flex!" size="sm" variant="info">2FA</gl-badge>
          </div>
          <div class="gl-p-1">
            <gl-badge class="gl-display-flex!" size="sm" variant="danger">Blocked</gl-badge>
          </div>
        </template>
      </gl-avatar-labeled>
    `,
});
WithBadges.args = generateProps();

export default {
  title: 'base/avatar/labeled',
  component: GlAvatarLabeled,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: avatarSizeOptions,
      },
    },
    shape: {
      control: {
        type: 'select',
        options: avatarShapeOptions,
      },
    },
  },
};
