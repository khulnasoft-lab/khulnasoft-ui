import GlExperimentBadge from './experiment_badge.vue';
import readme from './experiment_badge.md';

const defaultValue = (prop) => GlExperimentBadge.props[prop].default;

const generateProps = ({
  helpPageUrl = defaultValue('helpPageUrl'),
  popoverPlacement = defaultValue('popoverPlacement'),
  type = defaultValue('type'),
} = {}) => ({
  helpPageUrl,
  popoverPlacement,
  type,
});

const Template = (args, { argTypes }) => ({
  components: { GlExperimentBadge },
  props: Object.keys(argTypes),
  template: `
    <div class='gl-h-13'>
      <gl-experiment-badge
        :help-page-url='helpPageUrl'
        :popover-placement='popoverPlacement'
        :type='type' />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithHelpPageUrl = Template.bind({});
WithHelpPageUrl.args = {
  ...generateProps({
    helpPageUrl: 'https://docs.gitlab.com/ee/policy/experiment-beta-support.html#experiment',
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
  tags: ['skip-visual-test'],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};
