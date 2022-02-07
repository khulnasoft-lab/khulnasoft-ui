import { withKnobs, object, array, boolean } from '@storybook/addon-knobs';
import { times } from 'lodash';
import { GlAreaChart } from '../../../charts';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { mockAnnotationsSeries, mockAnnotationsConfigs } from '../../../utils/charts/mock_data';
import { toolbox } from '../../../utils/charts/story_config';
import { timeSeriesDateFormatter } from '../../../utils/charts/utils';
import { generateTimeSeries } from '../../../utils/data_utils';
import readme from './area.md';

const components = {
  GlAreaChart,
};
const defaultData = [
  {
    name: 'First Series',
    data: [
      ['Mon', 1220],
      ['Tue', 932],
      ['Wed', 901],
      ['Thu', 934],
      ['Fri', 1290],
      ['Sat', 1330],
      ['Sun', 1320],
    ],
  },
];

const defaultOptions = {
  xAxis: {
    name: 'Time',
    type: 'category',
  },
};
const template = `<gl-area-chart
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
    option: {
      default: object('EChart Options', option),
    },
    thresholds: {
      default: array('Thresholds', thresholds),
    },
    annotations: {
      default: object('Annotations', annotations),
    },
    data: {
      default: object('Chart Data', data),
    },
    includeLegendAvgMax: {
      default: boolean('Include Legend Avg Max', includeLegendAvgMax),
    },
  };
}

documentedStoriesOf('charts/area-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('with threshold', () => ({
    props: generateProps({
      thresholds: [{ threshold: 1200, operator: '>' }],
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
  }))
  .add('mult-series', () => ({
    props: generateProps({
      data: times(10, (index) => ({
        name: index,
        data: defaultData[0].data.map(([label, value]) => [label, value * index]),
      })),
    }),
    components,
    template,
  }));
