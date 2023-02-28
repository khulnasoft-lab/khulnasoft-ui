import { GlBarChart } from '../../../charts';
import { makeContainer } from '../../../utils/story_decorators/container';
import readme from './bar.md';

const Template = (args, { argTypes }) => ({
  components: { GlBarChart },
  props: Object.keys(argTypes),
  template: `
    <gl-bar-chart
      :data="data"
      :option="option"
      :y-axis-title="yAxisTitle"
      :x-axis-title="xAxisTitle"
      :x-axis-type="xAxisType"
      :height="height"
    />
  `,
});

const mockData = {
  Office: [
    [100, 'Jim'],
    [210, 'Dwight'],
    [300, 'Pam'],
    [340, 'Ryan'],
    [130, 'Kelly'],
    [50, 'David'],
    [90, 'Mike'],
    [10, 'Andy'],
    [50, 'Stanley'],
    [30, 'Erin'],
  ],
};

const generateProps = ({
  data = mockData,
  option = {},
  xAxisTitle = 'Pushes per day',
  yAxisTitle = 'User',
  xAxisType = 'value',
  height = null,
} = {}) => ({
  data,
  option,
  xAxisTitle,
  yAxisTitle,
  xAxisType,
  height,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const AutoHeight = Template.bind({});
Object.assign(AutoHeight, {
  args: generateProps({
    height: 'auto',
  }),
  decorators: [makeContainer({ height: '600px' })],
});

export default {
  title: 'charts/bar-chart',
  component: GlBarChart,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
