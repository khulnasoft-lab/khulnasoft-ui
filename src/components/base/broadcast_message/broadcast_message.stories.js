import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { GlBroadcastMessage } from '../../../../index';
import { colorThemes } from '../../../utils/constants';
import readme from './broadcast_message.md';

const template = `
    <div>
      <gl-broadcast-message
        :icon-name="iconName"
        :dismiss-label="dismissLabel"
        :theme="theme">
        {{ text }}
      </gl-broadcast-message>
    </div>
  `;

const defaultValue = (prop) => GlBroadcastMessage.props[prop].default;

const generateProps = ({
  text = 'Tuesday June 12th, at 14:30 UTC we will perform database maintenance that will require up to 1 minute of downtime.',
  iconName = defaultValue('iconName'),
  dismissLabel = defaultValue('dismissLabel'),
  theme = defaultValue('theme'),
} = {}) => ({
  text,
  iconName,
  dismissLabel,
  theme,
});

const Template = (args, { argTypes }) => ({
  component: {
    GlBroadcastMessage,
  },
  props: Object.keys(argTypes),
  template,
});
export const Default = Template.bind({});
Default.args = generateProps();

const StackedStory = (args, { argTypes }) => ({
  component: {
    GlBroadcastMessage,
  },
  props: Object.keys(argTypes),
  template: `
    <div>
      <gl-broadcast-message
        :icon-name="iconName"
        :dismiss-label="dismissLabel"
        :theme="theme">
          {{ text }}
      </gl-broadcast-message>
      <gl-broadcast-message
        :icon-name="iconName"
        :dismiss-label="dismissLabel"
        :theme="theme">
          {{ text }}
      </gl-broadcast-message>
    </div>`,
});
export const Stacked = StackedStory.bind({});
Stacked.args = generateProps();
Stacked.parameters = {
  storyshots: { disable: true },
};

export default {
  title: 'base/broadcast message',
  component: GlBroadcastMessage,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    iconName: {
      control: {
        type: 'select',
        options: iconSpriteInfo.icons,
      },
    },
    theme: {
      control: {
        type: 'select',
        options: Object.keys(colorThemes),
      },
    },
  },
};
