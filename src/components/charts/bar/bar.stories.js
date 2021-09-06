import { withKnobs, object, text } from '@storybook/addon-knobs';
import { GlBarChart } from '../../../../charts';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { toolbox } from '../../../utils/charts/story_config';
import readme from './bar.md';

const components = {
  GlBarChart,
};

const template = `<gl-bar-chart
  :data="data"
  :option="option"
  :y-axis-title="yAxisTitle"
  :x-axis-title="xAxisTitle"
  :x-axis-type="xAxisType"
/>`;

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

function generateProps({
  data = mockData,
  option = {},
  xAxisTitle = 'Pushes per day',
  yAxisTitle = 'User',
  xAxisType = 'value',
} = {}) {
  return {
    data: {
      default: object('Chart Data', data),
    },
    option: {
      default: object('Echart Options', option),
    },
    yAxisTitle: {
      default: text('Y Axis Title', yAxisTitle),
    },
    xAxisTitle: {
      default: text('X Axis Title', xAxisTitle),
    },
    xAxisType: {
      default: text('X Axis Type', xAxisType),
    },
  };
}

documentedStoriesOf('charts/bar-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('with zoom and scroll', () => ({
    props: generateProps({
      option: {
        dataZoom: [
          {
            type: 'slider',
            startValue: 1,
          },
        ],
      },
    }),
    components,
    template,
  }))
  .add('with toolbox', () => ({
    props: generateProps({
      option: {
        toolbox,
      },
    }),
    components,
    template,
  }));
