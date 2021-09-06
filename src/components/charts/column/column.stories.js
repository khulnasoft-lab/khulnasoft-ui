import { withKnobs, object, text } from '@storybook/addon-knobs';
import { GlColumnChart } from '../../../../charts';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  mockDefaultLineData,
  mockDefaultBarData,
  mockSecondaryBarData,
  mockSecondaryTrendlineData,
} from '../../../utils/charts/mock_data';
import { toolbox } from '../../../utils/charts/story_config';
import readme from './column.md';

const components = {
  GlColumnChart,
};

const template = `
  <gl-column-chart
    :bars="bars"
    :lines="lines"
    :secondary-data="secondaryData"
    :option="option"
    :y-axis-title="yAxisTitle"
    :secondary-data-title="secondaryDataTitle"
    :x-axis-title="xAxisTitle"
    :x-axis-type="xAxisType"
  />
  `;

function generateProps({
  bars = mockDefaultBarData,
  lines = [],
  option = {},
  yAxisTitle = 'Pushes per day',
  xAxisTitle = 'User',
  xAxisType = 'category',
  secondaryData = [],
  secondaryDataTitle = '',
} = {}) {
  return {
    bars: {
      default: object('Chart Data', bars),
    },
    lines: {
      default: object('Line chart Data', lines),
    },
    secondaryData: {
      default: object('Secondary Data', secondaryData),
    },
    option: {
      default: object('Echart Options', option),
    },
    yAxisTitle: {
      default: text('Y Axis Title', yAxisTitle),
    },
    secondaryDataTitle: {
      default: text('Secondary Y Axis Title', secondaryDataTitle),
    },
    xAxisTitle: {
      default: text('X Axis Title', xAxisTitle),
    },
    xAxisType: {
      default: text('X Axis Type', xAxisType),
    },
  };
}

documentedStoriesOf('charts/column-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('with line series', () => ({
    props: generateProps({ lines: mockDefaultLineData }),
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
  }))
  .add('secondary Y axis', () => ({
    props: generateProps({
      legend: true,
      secondaryData: mockSecondaryBarData,
      secondaryDataTitle: 'New bar data',
    }),
    components,
    template,
  }))
  .add('secondary Y axis line', () => ({
    props: generateProps({
      legend: true,
      secondaryData: mockSecondaryTrendlineData,
      secondaryDataTitle: 'New line data',
    }),
    components,
    template,
  }));
