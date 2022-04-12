import { GlAvatarsInline, GlAvatar, GlAvatarLink, GlTooltipDirective } from '../../../index';
import { avatarsInlineSizeOptions } from '../../../utils/constants';
import readme from './avatars_inline.md';

const defaultAvatars = [
  { src: 'https://picsum.photos/id/1005/32', alt: 'Administrator’s user avatar' },
  { src: 'https://picsum.photos/id/1006/32', alt: 'Ops Manager’s user avatar' },
  { src: 'https://picsum.photos/id/1009/32', alt: 'Developer’s user avatar' },
  { src: 'https://picsum.photos/id/1011/32', alt: 'Business Admin’s user avatar' },
  { src: 'https://picsum.photos/id/1012/32', alt: 'Product designer’s user avatar' },
];

const generateProps = (
  avatars = defaultAvatars,
  {
    maxVisible = 2,
    collapsed = true,
    avatarSize = 24,
    badgeTooltipProp = '',
    badgeSrOnlyText = `${avatars.length - maxVisible} additional users`,
  } = {}
) => ({
  maxVisible,
  collapsed,
  avatarSize,
  avatars,
  badgeTooltipProp,
  badgeSrOnlyText,
});

export const Default = (args, { argTypes }) => ({
  components: { GlAvatarsInline },
  props: Object.keys(argTypes),
  template: `
    <gl-avatars-inline :avatars="avatars" :collapsed="collapsed" :avatar-size="avatarSize" :max-visible="maxVisible" :badgeTooltipProp="badgeTooltipProp" :badgeSrOnlyText="badgeSrOnlyText">
    </gl-avatars-inline>
    `,
});
Default.args = generateProps();

export const WithLinksAndTooltips = (args, { argTypes }) => ({
  components: { GlAvatarsInline, GlAvatar, GlAvatarLink },
  directives: { GlTooltip: GlTooltipDirective },
  props: Object.keys(argTypes),
  template: `
    <gl-avatars-inline :avatars="avatars" :collapsed="collapsed" :avatar-size="avatarSize" :max-visible="maxVisible" :badgeTooltipProp="badgeTooltipProp" :badgeSrOnlyText="badgeSrOnlyText">
      <template #avatar="{ avatar }">
        <gl-avatar-link target="blank" :href="avatar.href" v-gl-tooltip :title="avatar.tooltip">
          <gl-avatar :src="avatar.src" :size="avatarSize" />
        </gl-avatar-link>
      </template>
    </gl-avatars-inline>
    `,
});
WithLinksAndTooltips.args = generateProps(
  defaultAvatars.map((avatar, index) => ({
    ...avatar,
    href: '//gitlab.com',
    tooltip: `Avatar ${index}`,
  })),
  { badgeTooltipProp: 'tooltip' }
);

export default {
  title: 'base/avatar/avatars-inline',
  component: GlAvatarsInline,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    avatarSize: {
      options: avatarsInlineSizeOptions,
      control: 'select',
    },
  },
};
