import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { colorThemes } from '../../../utils/constants';
import GlBroadcastMessage from './broadcast_message.vue';
import { TYPE_LIST, TYPE_NOTIFICATION } from './constants';
import readme from './broadcast_message.md';

const template = `
    <gl-broadcast-message
      :icon-name="iconName"
      :dismissible="dismissible"
      :dismiss-label="dismissLabel"
      :theme="theme"
      :type="type">
      {{ text }}
    </gl-broadcast-message>
  `;

const templateWithTheme = (theme) => `
  <gl-broadcast-message
    :icon-name="iconName"
    :dismissible="dismissible"
    :dismiss-label="dismissLabel"
    theme="${theme}"
    :type="type">
    {{ text }}
  </gl-broadcast-message>
`;

const defaultValue = (prop) => GlBroadcastMessage.props[prop].default;

const generateProps = ({
  text = 'Tuesday June 12th, at 14:30 UTC we will perform database maintenance that will require up to 1 minute of downtime.',
  iconName = defaultValue('iconName'),
  dismissible = defaultValue('dismissible'),
  dismissLabel = defaultValue('dismissLabel'),
  theme = defaultValue('theme'),
  type = defaultValue('type'),
} = {}) => ({
  text,
  iconName,
  dismissible,
  dismissLabel,
  theme,
  type,
});

const DefaultStory = (args, { argTypes }) => ({
  components: {
    GlBroadcastMessage,
  },
  props: Object.keys(argTypes),
  template: `<div>${template}</div>`,
});
export const Default = DefaultStory.bind({});
Default.args = generateProps();

const NotificationStory = (args, { argTypes }) => ({
  components: {
    GlBroadcastMessage,
  },
  props: Object.keys(argTypes),
  template: `<div>${template}</div>`,
});
export const Notification = NotificationStory.bind({});
Notification.args = generateProps({ type: TYPE_NOTIFICATION });

const StackedStory = (args, { argTypes }) => ({
  components: {
    GlBroadcastMessage,
  },
  props: Object.keys(argTypes),
  // eslint-disable-next-line unicorn/no-array-callback-reference
  template: `<div>${Object.keys(colorThemes).map(templateWithTheme).join('')}</div>`,
});
export const Stacked = StackedStory.bind({});
Stacked.args = generateProps();
Stacked.tags = ['skip-visual-test'];

export const IncreasedSpacing = (args, { argTypes }) => ({
  components: {
    GlBroadcastMessage,
  },
  props: Object.keys(argTypes),
  template: `<div style="--gl-broadcast-message-padding-x: 0.5rem;">${template}</div>`,
});
IncreasedSpacing.args = generateProps();

export default {
  title: 'base/broadcast message',
  component: GlBroadcastMessage,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    iconName: {
      options: iconSpriteInfo.icons,
      control: 'select',
    },
    theme: {
      options: Object.keys(colorThemes),
      control: 'select',
    },
    type: {
      options: TYPE_LIST,
      control: 'select',
    },
  },
};
