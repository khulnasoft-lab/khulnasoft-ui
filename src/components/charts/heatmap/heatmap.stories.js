import { GlHeatmap } from '../../../charts';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { toolbox } from '../../../utils/charts/story_config';
import readme from '../area/area.md';

const components = {
  GlHeatmap,
};

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

documentedStoriesOf('charts/heatmap', readme)
  .add('default', () => ({
    data() {
      return {
        data: generateData(),
        xAxisLabels: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        yAxisLabels: ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun'],
        xAxisName: 'Hour',
        yAxisName: 'Day',
      };
    },
    components,
    template: `<gl-heatmap
      :data-series="data"
      :x-axis-labels="xAxisLabels"
      :y-axis-labels="yAxisLabels"
      :x-axis-name="xAxisName"
      :y-axis-name="yAxisName"
    />`,
  }))
  .add('with toolbox', () => ({
    data() {
      return {
        data: generateData(),
        xAxisLabels: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        yAxisLabels: ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun'],
        xAxisName: 'Hour',
        yAxisName: 'Day',
        option: {
          toolbox,
        },
      };
    },
    components,
    template: `<gl-heatmap
      :data-series="data"
      :x-axis-labels="xAxisLabels"
      :y-axis-labels="yAxisLabels"
      :x-axis-name="xAxisName"
      :y-axis-name="yAxisName"
      :options="option"
    />`,
  }));
