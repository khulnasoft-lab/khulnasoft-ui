import { GlChart, GlChartLegend } from '../../../charts';
import { LEGEND_LAYOUT_TABLE } from '../../../utils/charts/constants';
import { generateSeriesData } from '../../../utils/charts/story_config';
import {
  SERIES_NAME_SHORT,
  SERIES_NAME_LONG,
  SERIES_NAME_LONG_WITHOUT_SPACES,
} from '../../../utils/stories_constants';
import { gray200 } from '../../../../scss_to_js/scss_variables';
import readme from './legend.md';

const generateOptions = (seriesLength, seriesNameType) => {
  return {
    legend: {
      show: false,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: generateSeriesData(seriesLength, seriesNameType).map((data) => ({
      color: data.color,
      data: data.data,
      name: data.name,
      showSymbol: true,
      type: 'line',
    })),
    animation: false,
  };
};

const generateSeriesInfo = (amount, nameType) => {
  const seriesData = generateSeriesData(amount, nameType);

  return seriesData.map((item) => ({
    type: 'solid',
    name: item.name,
    color: item.color,
    data: item.data,
  }));
};

const generateTemplate = (type) => {
  const layoutTypeAttribute =
    type === LEGEND_LAYOUT_TABLE ? `:layout="'${LEGEND_LAYOUT_TABLE}'"` : '';

  return `<div>
    <gl-chart
      :options="$options.options"
      @created="onCreated"
    />
    <gl-chart-legend
      v-if="chart"
      ${layoutTypeAttribute}
      :chart="chart"
      :series-info="$options.seriesInfo"
    />
  </div>`;
};

const components = {
  GlChart,
  GlChartLegend,
};

const baseStoryOptions = {
  props: {},
  components,
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    onCreated(chart) {
      this.chart = chart;
    },
  },
};

const disabledLegendItem = {
  type: 'solid',
  name: 'Disabled Item',
  color: gray200,
  disabled: true,
};

const getStoryOptions = (seriesLength, seriesNameType, legendLayoutType) => {
  return {
    ...baseStoryOptions,
    options: generateOptions(seriesLength, seriesNameType),
    seriesInfo: generateSeriesInfo(seriesLength, seriesNameType),
    template: legendLayoutType ? generateTemplate(legendLayoutType) : generateTemplate(),
  };
};

export const Default = () => getStoryOptions(10, SERIES_NAME_SHORT);
export const DefaultWithDisabledLegendItem = () => {
  const storyOptions = getStoryOptions(10, SERIES_NAME_SHORT);

  storyOptions.seriesInfo = [...storyOptions.seriesInfo, disabledLegendItem];

  return storyOptions;
};
export const DefaultWithLongSeriesNames = () => getStoryOptions(10, SERIES_NAME_LONG);

export const DefaultWithLongSeriesNamesAndNoSpaces = () =>
  getStoryOptions(10, SERIES_NAME_LONG_WITHOUT_SPACES);

export const WithTabularLayout = () => getStoryOptions(10, SERIES_NAME_SHORT, LEGEND_LAYOUT_TABLE);
export const WithTabularLayoutAndDisabledLegendItem = () => {
  const storyOptions = getStoryOptions(10, SERIES_NAME_SHORT, LEGEND_LAYOUT_TABLE);

  storyOptions.seriesInfo = [...storyOptions.seriesInfo, disabledLegendItem];

  return storyOptions;
};
export const WithTabularLayoutAndLongSeriesNames = () =>
  getStoryOptions(10, SERIES_NAME_LONG, LEGEND_LAYOUT_TABLE);
export const WithTabularLayoutAndLongSeriesNamesWithNoSpaces = () =>
  getStoryOptions(10, SERIES_NAME_LONG_WITHOUT_SPACES, LEGEND_LAYOUT_TABLE);

export default {
  title: 'charts/chart-legend',
  component: GlChartLegend,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
