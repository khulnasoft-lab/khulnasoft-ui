import emptyServiceDeskCallout from '@gitlab/svgs/dist/illustrations/empty-state/empty-service-desk-md.svg';
import GlButton from '../button/button.vue';
import { bannerVariants } from '../../../utils/constants';
import GlBanner from './banner.vue';
import readme from './banner.md';

const template = `
    <gl-banner
      :title="title"
      :button-attributes="buttonAttributes"
      :button-text="buttonText"
      :button-link="buttonLink"
      :svg-path="svgPath"
      :variant="variant"
    >
      <p>GitLab Service Desk is a simple way to allow people to create issues in your GitLab instance without needing their own user account. It provides a unique email address for end users to create issues in a project, and replies can be sent either though the GitLab interface or by email. End users will only see the thread though email.</p>
    </gl-banner>
`;

const generateProps = ({
  title = 'Upgrade your plan to activate Service Desk',
  buttonAttributes = { target: '_blank' },
  buttonText = 'Upgrade your plan',
  buttonLink = 'https://gitlab.com',
  svgPath = emptyServiceDeskCallout,
  variant = GlBanner.props.variant.default,
} = {}) => ({
  title,
  buttonAttributes,
  buttonText,
  buttonLink,
  svgPath,
  variant,
});

const Template = (args, { argTypes }) => ({
  components: {
    GlBanner,
  },
  props: Object.keys(argTypes),
  template,
});
export const Default = Template.bind({});
Default.args = generateProps();

export const NoImage = Template.bind({});
NoImage.args = generateProps({
  svgPath: null,
});

export const Introduction = Template.bind({});
Introduction.args = generateProps({
  svgPath: emptyServiceDeskCallout,
  variant: bannerVariants[1],
});

export const WithActions = (args, { argTypes }) => ({
  components: {
    GlBanner,
    GlButton,
  },
  props: Object.keys(argTypes),
  template: `
    <gl-banner
      :title="title"
      :button-attributes="buttonAttributes"
      :button-text="buttonText"
      :button-link="buttonLink"
      :svg-path="svgPath"
      :variant="variant"
    >
      <p>There should be a primary button and a link button below this text.</p>
      <template #actions>
        <gl-button class="gl-ml-3" variant="link">Ask again later</gl-button>
      </template>
    </gl-banner>`,
});
WithActions.args = generateProps({
  title: 'Button with actions banner',
  buttonText: 'Primary Button',
  svgPath: null,
});

export default {
  title: 'base/banner',
  component: GlBanner,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    variant: {
      options: bannerVariants,
      control: 'select',
    },
    svgPath: {
      control: 'text',
    },
  },
};
