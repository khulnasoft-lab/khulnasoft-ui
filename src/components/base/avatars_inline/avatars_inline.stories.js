import { avatarsInlineSizeOptions } from '../../../utils/constants';
import readme from './avatars_inline.md';

const defaultAvatars = [
  { src: 'https://picsum.photos/id/1005/32' },
  { src: 'https://picsum.photos/id/1006/32' },
  { src: 'https://picsum.photos/id/1009/32' },
  { src: 'https://picsum.photos/id/1011/32' },
  { src: 'https://picsum.photos/id/1012/32' },
];

const generateProps = (
  avatars = defaultAvatars,
  { maxVisible = 2, collapsed = true, avatarSize = 24 } = {}
) => ({
  maxVisible,
  collapsed,
  avatarSize,
  avatars,
});

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <gl-avatars-inline :avatars="avatars" :collapsed="collapsed" :avatar-size="avatarSize" :max-visible="maxVisible">
    </gl-avatars-inline>
    `,
});
Default.args = generateProps();

export const WithLinksAndTooltips = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <gl-avatars-inline :avatars="avatars" :collapsed="collapsed" :avatar-size="avatarSize" :max-visible="maxVisible">
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
  }))
);

export default {
  title: 'base/avatar/avatars-inline',
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
      control: {
        type: 'select',
        options: avatarsInlineSizeOptions,
      },
    },
  },
};
