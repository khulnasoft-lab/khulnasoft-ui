import { GlHeatmap } from '../../../charts';
import { toolbox } from '../../../utils/charts/story_config';
import { disableControls } from '../../../utils/stories_utils';

function generateData() {
  let data = [
    [5, 0, 5],
    [2, 5, 1],
    [3, 2, 0],
    [5, 3, 4],
    [0, 4, 10],
    [0, 5, 4],
    [0, 6, 6],
  ];
  data = data.map((item) => [item[1], item[0], item[2] || '-']);
  return data;
}

const template = `
    <gl-heatmap
      :data-series="data"
      :x-axis-labels="xAxisLabels"
      :y-axis-labels="yAxisLabels"
      :x-axis-name="xAxisName"
      :y-axis-name="yAxisName"
      :options="options"
      :height="height"
      :show-tooltip="showTooltip"
    />
`;

const generateProps = ({
  data = generateData(),
  xAxisLabels = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  yAxisLabels = ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun'],
  xAxisName = 'Hour',
  yAxisName = 'Day',
  options = {},
  height = null,
  showTooltip = true,
} = {}) => ({
  data,
  xAxisLabels,
  yAxisLabels,
  xAxisName,
  yAxisName,
  options,
  height,
  showTooltip,
});

const Template = (args, { argTypes }) => ({
  components: {
    GlHeatmap,
  },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithToolbox = Template.bind({});
WithToolbox.args = generateProps({ options: { toolbox } });

export default {
  title: 'charts/heatmap',
  component: GlHeatmap,
  argTypes: {
    ...disableControls([
      'dataSeries',
      'formatTooltipText',
      'legendAverageText',
      'legendMaxText',
      'responsive',
    ]),
  },
};
