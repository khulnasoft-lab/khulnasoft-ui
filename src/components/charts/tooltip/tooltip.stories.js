import { GlChart, GlChartTooltip, GlChartSeriesLabel } from '../../../../charts';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  SERIES_NAME,
  SERIES_NAME_LONG,
  SERIES_NAME_LONG_WITHOUT_SPACES,
} from '../../../utils/stories_utils';

import readme from './tooltip.md';

const components = {
  GlChart,
  GlChartTooltip,
  GlChartSeriesLabel,
};

const baseStoryOptions = {
  props: {},
  components,
  data() {
    return {
      chart: null,
      options: {},
      showTooltip: true,
      top: '50%',
      left: '0px',
    };
  },
  methods: {
    onCreated(chart) {
      this.chart = chart;
    },
  },
};

const getStoryOptions = (tooltipContent) => {
  return {
    ...baseStoryOptions,
    template: `<div class="position-relative">
    <gl-chart
      :options="options"
      :height="100"
      @created="onCreated"
    />
    <gl-chart-tooltip
      v-if="chart"
      :chart="chart"
      :show="showTooltip"
      :top="top"
      :left="left"
    >
      <template #title>
        <div>
          Example Title
        </div>
      </template>
      ${tooltipContent}
    </gl-chart-tooltip>
</div>`,
  };
};

documentedStoriesOf('charts/chart-tooltip', readme)
  .add('default', () => getStoryOptions('Example Content'))
  .add('with long series label', () =>
    getStoryOptions(`
      <gl-chart-series-label color="#1F78D1">${SERIES_NAME[SERIES_NAME_LONG]}</gl-chart-series-label>
    `)
  )
  .add('with long series label with no spaces', () =>
    getStoryOptions(`
      <gl-chart-series-label color="#1F78D1">${SERIES_NAME[SERIES_NAME_LONG_WITHOUT_SPACES]}</gl-chart-series-label>
    `)
  );
