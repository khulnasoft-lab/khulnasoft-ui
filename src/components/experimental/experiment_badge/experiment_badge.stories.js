import { propDefaultFactory } from '../../../utils/stories_utils';
import GlExperimentBadge from './experiment_badge.vue';
import readme from './experiment_badge.md';

const defaultValue = propDefaultFactory(GlExperimentBadge);

const generateProps = ({
  popoverPlacement = defaultValue('popoverPlacement'),
  type = defaultValue('type'),
} = {}) => ({
  popoverPlacement,
  type,
});

const Template = (args, { argTypes }) => ({
  components: { GlExperimentBadge },
  props: Object.keys(argTypes),
  template: `
    <div class="gl-flex gl-justify-center gl-items-center gl-h-62">
      <gl-experiment-badge
        :popover-placement='popoverPlacement'
        :type='type' />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const Beta = Template.bind({});
Beta.args = {
  ...generateProps({
    type: 'beta',
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
