import { withKnobs, object, boolean, array } from '@storybook/addon-knobs';
import { GlLineChart } from '../../../charts';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { mockAnnotationsSeries, mockAnnotationsConfigs } from '../../../utils/charts/mock_data';
import { toolbox } from '../../../utils/charts/story_config';
import { timeSeriesDateFormatter } from '../../../utils/charts/utils';
import { generateTimeSeries } from '../../../utils/data_utils';
import readme from './line.md';

const components = {
  GlLineChart,
};
const defaultData = [
  {
    name: 'Requested',
    data: [
      ['Mon', 1184],
      ['Tue', 1346],
      ['Wed', 1035],
      ['Thu', 1226],
      ['Fri', 1421],
      ['Sat', 1347],
      ['Sun', 1035],
    ],
  },
  {
    name: 'Actual',
    data: [
      ['Mon', 1509],
      ['Tue', 1275],
      ['Wed', 1187],
      ['Thu', 1287],
      ['Fri', 1098],
      ['Sat', 1457],
      ['Sun', 1452],
    ],
  },
  {
    name: 'Predicted',
    data: [
      ['Mon', 1041],
      ['Tue', 1468],
      ['Wed', 1273],
      ['Thu', 1503],
      ['Fri', 1209],
      ['Sat', 1416],
      ['Sun', 1213],
    ],
  },
];

const defaultOptions = {
  xAxis: {
    name: 'Time',
    type: 'category',
  },
};

const template = `<gl-line-chart
  :data="data"
  :option="option"
  :thresholds="thresholds"
  :annotations="annotations"
  :includeLegendAvgMax="includeLegendAvgMax"
/>`;

function generateProps({
  data = defaultData,
  option = defaultOptions,
  thresholds = [],
  annotations = [],
  includeLegendAvgMax = true,
} = {}) {
  return {
    includeLegendAvgMax: {
      default: boolean('Include Legend Avg Max', includeLegendAvgMax),
    },
    option: {
      default: object('EChart Options', option),
    },
    thresholds: {
      default: object('Thresholds', thresholds),
    },
    annotations: {
      default: array('Annotations', annotations),
    },
    data: {
      default: object('Chart Data', data),
    },
  };
}

documentedStoriesOf('charts/line-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('with threshold', () => ({
    props: generateProps({
      thresholds: [{ threshold: 1350, operator: '>' }],
    }),
    components,
    template,
  }))
  .add('with annotations as props (recommended)', () => ({
    props: generateProps({
      ...mockAnnotationsConfigs,
      data: [
        {
          name: 'Time Series',
          data: generateTimeSeries(),
        },
      ],
      option: {
        xAxis: {
          type: 'time',
          name: 'Time',
          axisLabel: {
            formatter: timeSeriesDateFormatter,
          },
        },
      },
    }),
    components,
    template,
  }))
  .add('with annotations as option series', () => ({
    props: generateProps({
      data: [
        {
          name: 'Time Series',
          data: generateTimeSeries(),
        },
      ],
      option: {
        ...mockAnnotationsSeries,
        xAxis: {
          type: 'time',
          name: 'Time',
          axisLabel: {
            formatter: timeSeriesDateFormatter,
          },
        },
      },
    }),
    components,
    template,
  }))
  .add('with zoom and scroll', () => ({
    props: generateProps({
      data: [
        {
          name: 'Time Series',
          data: generateTimeSeries(),
        },
      ],
      option: {
        xAxis: {
          type: 'time',
          name: 'Time',
          axisLabel: {
            formatter: timeSeriesDateFormatter,
          },
        },
        dataZoom: [
          {
            type: 'slider',
            startValue: '2018-03-01T00:00:00.000',
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
        xAxis: {
          name: 'Time',
          type: 'category',
        },
        toolbox,
      },
    }),
    components,
    template,
  }));
