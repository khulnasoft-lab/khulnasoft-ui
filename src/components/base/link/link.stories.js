import BVueReadme from '../../../vendor/bootstrap-vue/src/components/link/README.md';
import { linkVariantOptions, targetOptions } from '../../../utils/constants';
import GlLink from './link.vue';
import readme from './link.md';

const defaultValue = (prop) => GlLink.props[prop].default;

const generateProps = ({
  href = '#',
  isCurrentUser = defaultValue('isCurrentUser'),
  showExternalIcon = defaultValue('showExternalIcon'),
  target = null,
  variant = defaultValue('variant'),
} = {}) => ({
  href,
  isCurrentUser,
  showExternalIcon,
  target,
  variant,
});

const makeStory =
  (options) =>
  (args, { argTypes }) => ({
    components: {
      GlLink,
    },
    props: Object.keys(argTypes),
    ...options,
  });

export const Default = makeStory({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
      :variant="variant"
      :showExternalIcon="showExternalIcon"
    >
      This is an inline link
    </gl-link>`,
});
Default.args = {
  ...generateProps(),
  variant: linkVariantOptions.inline,
};
Default.storyName = 'Inline Link (Default)';

export const InlineLinkLong = makeStory({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
      :variant="variant"
      :showExternalIcon="showExternalIcon"
    >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Quamquam tu hanc copiosiorem etiam soles dicere.
    Ergo illi intellegunt quid Epicurus dicat, ego non intellego? Claudii libidini, qui tum erat summo ne imperio, dederetur.
    Si quicquam extra virtutem habeatur in bonis. Nunc omni virtuti vitium contrario nomine opponitur. Duo Reges: constructio interrete.
    </gl-link>`,
});
InlineLinkLong.args = {
  ...generateProps(),
  variant: linkVariantOptions.inline,
};
InlineLinkLong.storyName = 'Long Inline Link (Default)';

export const InlineExternalLink = makeStory({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
      :variant="variant"
      :showExternalIcon="showExternalIcon"
    >
      I have an arrow character because my target URL is external
    </gl-link>`,
});
InlineExternalLink.args = {
  ...generateProps(),
  target: '_blank',
  variant: linkVariantOptions.inline,
  showExternalIcon: true,
  href: 'https://design.gitlab.com',
};
InlineExternalLink.storyName = 'Inline External Link (Default)';

export const UILink = makeStory({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
      :variant="variant"
    >
      This is a UI link
    </gl-link>`,
});
UILink.args = {
  ...generateProps(),
  variant: linkVariantOptions.ui,
};

export const MetaLink = makeStory({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
      :variant="variant"
      :class="[color, weight]"
    >
      This is a meta link
    </gl-link>`,
});
MetaLink.args = {
  ...generateProps(),
  variant: linkVariantOptions.meta,
  color: '',
  weight: '',
};
MetaLink.argTypes = {
  color: {
    options: ['', 'gl-text-subtle', 'gl-text-default'],
    control: 'select',
  },
  weight: {
    options: ['', 'gl-font-bold', 'gl-font-semibold'],
    control: 'select',
  },
};

export const MentionLink = makeStory({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
      :variant="variant"
      :is-current-user="isCurrentUser"
    >
      @anotheruser
    </gl-link>`,
});
MentionLink.args = {
  ...generateProps(),
  variant: linkVariantOptions.mention,
  isCurrentUser: false,
};

export const MentionLinkCurrentUser = makeStory({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
      :variant="variant"
      :is-current-user="isCurrentUser"
    >
      @currentuser
    </gl-link>`,
});
MentionLinkCurrentUser.args = {
  ...generateProps(),
  variant: linkVariantOptions.mention,
  isCurrentUser: true,
};

export default {
  title: 'base/link',
  component: GlLink,
  parameters: {
    bootstrapComponent: 'b-link',
    bootstrapDocs: BVueReadme,
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
