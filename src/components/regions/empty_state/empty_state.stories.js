import { GlButton, GlEmptyState } from '../../../index';
import readme from './empty_state.md';

const template = `
  <gl-empty-state
    :title="title"
    :svg-path="svgPath"
    :svg-height="svgHeight"
    :description="description"
    :primary-button-text="primaryButtonText"
    :secondary-button-text="secondaryButtonText"
    :compact="compact"
    :primary-button-link="primaryButtonLink"
    :secondary-button-link="secondaryButtonLink"
  />`;

const Template = (args) => ({
  components: {
    GlEmptyState,
  },
  props: Object.keys(args),
  template,
});

const generateProps = ({
  title = 'This state is empty',
  svgPath = 'https://gitlab.com/gitlab-org/gitlab-svgs/raw/v1.152.0/illustrations/security-dashboard-empty-state.svg',
  svgHeight = 145,
  description = 'The title and message should be clear, concise, and explain why the user is seeing this screen.',
  primaryButtonText = 'Something actionable',
  secondaryButtonText = 'Something else',
  primaryButtonLink = '#',
  secondaryButtonLink = '#',
  compact = false,
} = {}) => ({
  title,
  svgPath,
  svgHeight,
  description,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonLink,
  secondaryButtonLink,
  compact,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const SingleButton = Template.bind({});
SingleButton.args = generateProps({
  secondaryButtonText: null,
});

export const NoButtons = Template.bind({});
NoButtons.args = generateProps({
  primaryButtonText: null,
  secondaryButtonText: null,
});

export const NoIllustration = Template.bind({});
NoIllustration.args = generateProps({
  svgPath: null,
});

export const CustomActions = (args) => ({
  components: {
    GlEmptyState,
    GlButton,
  },
  props: Object.keys(args),
  template: `
    <gl-empty-state
      :title="title"
      :svg-path="svgPath"
      :svg-height="svgHeight"
      :description="description"
      :primary-button-text="primaryButtonText"
      :secondary-button-text="secondaryButtonText"
      :compact="compact"
      :primary-button-link="primaryButtonLink"
      :secondary-button-link="secondaryButtonLink"
    >
      <template #actions>
        <gl-button
          variant="confirm"
          class="gl-mb-3"
        >Custom button</gl-button>
        <gl-button
          variant="link"
          class="gl-mb-3 gl-ml-3"
          href="#"
          @click.prevent
        >Custom link</gl-button>
      </template>
    </gl-empty-state>
  `,
});
CustomActions.args = generateProps();

export const NotFullscreen = Template.bind({});
NotFullscreen.args = generateProps({
  compact: true,
  svgHeight: null,
  title: 'This is a compact empty state',
  description: 'It could be included in a settings page, or a list view',
});

export const SlottedDescription = (args) => ({
  components: {
    GlEmptyState,
    GlButton,
  },
  props: Object.keys(args),
  template: `
    <gl-empty-state
      :title="title"
      :svg-path="svgPath"
      :svg-height="svgHeight"
      :description="description"
      :primary-button-text="primaryButtonText"
      :secondary-button-text="secondaryButtonText"
      :compact="compact"
      :primary-button-link="primaryButtonLink"
      :secondary-button-link="secondaryButtonLink"
    >
      <template #description>
        <p>A slotted description allows you to use more custom HTML such as <a href="#">links</a>.</p>
        <pre>You could also include code snippets</pre>
        <p><strong>Note:</strong> A slotted description will override one provided by a property.</p>
      </template>
    </gl-empty-state>
  `,
});
SlottedDescription.args = generateProps({
  title: 'Slotted description example',
  svgPath: 'https://gitlab.com/gitlab-org/gitlab-svgs/raw/v1.152.0/illustrations/issues.svg',
  primaryButtonText: 'Learn more',
  secondaryButtonText: null,
});

export default {
  title: 'regions/empty-state',
  component: GlEmptyState,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
