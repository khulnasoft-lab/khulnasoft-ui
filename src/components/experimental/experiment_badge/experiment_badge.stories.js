import GlExperimentBadge from './experiment_badge.vue';
import readme from './experiment_badge.md';

const defaultValue = (prop) => GlExperimentBadge.props[prop].default;

const generateProps = ({
  experimentHelpPageUrl = defaultValue('experimentHelpPageUrl'),
  popoverPlacement = defaultValue('popoverPlacement'),
} = {}) => ({
  experimentHelpPageUrl,
  popoverPlacement,
});

const Template = (args, { argTypes }) => ({
  components: { GlExperimentBadge },
  props: Object.keys(argTypes),
  template: `
    <div class='gl-h-13'>
      <gl-experiment-badge
        :experiment-help-page-url='experimentHelpPageUrl'
        :popover-placement='popoverPlacement' />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithHelpPageUrl = Template.bind({});
WithHelpPageUrl.args = {
  ...generateProps({
    experimentHelpPageUrl:
      'https://docs.gitlab.com/ee/policy/experiment-beta-support.html#experiment',
  }),
};

export const CustomPlacement = Template.bind({});
CustomPlacement.args = {
  ...generateProps({
    popoverPlacement: 'right',
  }),
};

export default {
  title: 'experimental/experiment_badge',
  component: GlExperimentBadge,
  parameters: {
    storyshots: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};
