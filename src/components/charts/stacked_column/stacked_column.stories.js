import { withKnobs, object, text, array, select } from '@storybook/addon-knobs';
import { GlStackedColumnChart } from '../../../../charts';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  mockDefaultStackedLineData,
  mockDefaultStackedBarData,
  mockSecondaryData,
} from '../../../utils/charts/mock_data';
import { toolbox } from '../../../utils/charts/story_config';
import { columnOptions } from '../../../utils/constants';
import readme from './stacked_column.md';

const components = {
  GlStackedColumnChart,
};

const template = `
  <gl-stacked-column-chart
    :bars="bars"
    :lines="lines"
    :option="option"
    :presentation="presentation"
    :group-by="groupBy"
    :x-axis-type="xAxisType"
    :x-axis-title="xAxisTitle"
    :y-axis-title="yAxisTitle"
    :secondary-data="secondaryData"
    :secondary-data-title="secondaryDataTitle"
  />
`;

const mockSecondaryDataTitle = 'Merges';

function generateProps({
  bars = mockDefaultStackedBarData,
  lines = [],
  option = {},
  groupBy = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  xAxisType = 'category',
  xAxisTitle = 'January - December 2018',
  yAxisTitle = 'Commits',
  presentation = columnOptions.stacked,
  secondaryData = [],
  secondaryDataTitle = '',
} = {}) {
  return {
    bars: {
      default: object('Bar chart Data', bars),
    },
    lines: {
      default: object('Line chart Data', lines),
    },
    option: {
      default: object('Echart Options', option),
    },
    presentation: {
      default: select('presentation', columnOptions, presentation),
    },
    groupBy: {
      default: array('Group By', groupBy),
    },
    xAxisType: {
      default: text('X Axis Type', xAxisType),
    },
    xAxisTitle: {
      default: text('X Axis Title', xAxisTitle),
    },
    yAxisTitle: {
      default: text('Y Axis Title', yAxisTitle),
    },
    secondaryDataTitle: {
      default: text('Secondary Data Title', secondaryDataTitle),
    },
    secondaryData: {
      default: object('Secondary Data', secondaryData),
    },
  };
}

documentedStoriesOf('charts/stacked-column-chart', readme)
  .addDecorator(withKnobs)
  .add('stacked', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('tiled', () => ({
    props: generateProps({ presentation: columnOptions.tiled }),
    components,
    template,
  }))
  .add('stacked with line data', () => ({
    props: generateProps({ lines: mockDefaultStackedLineData }),
    components,
    template,
  }))
  .add('tiled with line data', () => ({
    props: generateProps({ presentation: columnOptions.tiled, lines: mockDefaultStackedLineData }),
    components,
    template,
  }))
  .add('with zoom and scroll', () => ({
    props: generateProps({
      option: {
        dataZoom: [
          {
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
      secondaryData: mockSecondaryData,
      secondaryDataTitle: mockSecondaryDataTitle,
    }),
    components,
    template,
  }))
  .add('secondary Y axis line', () => ({
    props: generateProps({
      secondaryData: [{ ...mockSecondaryData[0], type: 'line' }],
      secondaryDataTitle: mockSecondaryDataTitle,
    }),
    components,
    template,
  }));
