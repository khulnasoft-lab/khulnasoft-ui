import { propDefaultFactory } from '../../../utils/stories_utils';
import { linkVariantOptions, targetOptions } from '../../../utils/constants';
import GlLink from './link.vue';
import readme from './link.md';

const defaultValue = propDefaultFactory(GlLink);

const generateProps = ({
  text = 'link',
  href = '#',
  showExternalIcon = defaultValue('showExternalIcon'),
  target = null,
  variant = defaultValue('variant'),
} = {}) => ({
  text,
  href,
  showExternalIcon,
  target,
  variant,
});

const Template = (args) => ({
  components: {
    GlLink,
  },
  props: Object.keys(args),
  template: `
    <gl-link
      :href="href"
      :show-external-icon="showExternalIcon"
      :target="target"
      :variant="variant"
    >
      {{ text }}
    </gl-link>
  `,
});

export const Default = Template.bind({});
Default.args = generateProps({
  text: 'This is a UI link',
});
Default.storyName = 'UI Link (Default)';

export const InlineLink = Template.bind({});
InlineLink.args = generateProps({
  text: 'This is an inline link',
  variant: 'inline',
});

export const InlineExternalLink = Template.bind({});
InlineExternalLink.args = generateProps({
  text: 'I have an arrow character because my target URL is external',
  href: 'https://design.khulnasoft.com',
  showExternalIcon: true,
  target: '_blank',
  variant: 'inline',
});

export const MetaLink = Template.bind({});
MetaLink.args = generateProps({
  text: 'This is a meta link',
  variant: 'meta',
});

export const MentionLink = Template.bind({});
MentionLink.args = generateProps({
  text: '@anotheruser',
  variant: 'mention',
});

export const MentionLinkCurrentUser = Template.bind({});
MentionLinkCurrentUser.args = generateProps({
  text: '@currentuser',
  variant: 'mentionCurrent',
});

export default {
  title: 'base/link',
  component: GlLink,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    variant: {
      options: Object.keys(linkVariantOptions),
      control: 'select',
    },
    target: {
      options: targetOptions,
      control: 'select',
    },
  },
};
