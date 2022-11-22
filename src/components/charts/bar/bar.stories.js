import { GlBarChart } from '../../../charts';
import readme from './bar.md';

const Template = (args, { argTypes }) => ({
  components: { GlBarChart },
  props: Object.keys(argTypes),
  template: `<gl-bar-chart
  :data="data"
  :option="option"
  :y-axis-title="yAxisTitle"
  :x-axis-title="xAxisTitle"
  :x-axis-type="xAxisType"
/>`,
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
} = {}) => ({
  data,
  option,
  xAxisTitle,
  yAxisTitle,
  xAxisType,
});

export const Default = Template.bind({});
Default.args = generateProps();

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
