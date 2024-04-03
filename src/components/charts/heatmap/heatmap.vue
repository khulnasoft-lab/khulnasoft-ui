<!-- eslint-disable vue/multi-word-component-names -->
<script>
import merge from 'lodash/merge';
import { WHITE, GRAY_100 } from '../../../../dist/tokens/js/tokens';
import { getTooltipTitle, getTooltipContent } from '../../../utils/charts/config';
import { HEIGHT_AUTO_CLASSES } from '../../../utils/charts/constants';
import { heatmapHues } from '../../../utils/charts/theme';
import { engineeringNotation } from '../../../utils/number_utils';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ChartTooltip from '../tooltip/tooltip.vue';

const defaultOptions = {
  visualMap: {
    show: false,
    inRange: {
      color: heatmapHues,
    },
  },
  series: {
    type: 'heatmap',
  },
};

/*
 * The series is an array of arrays containing [x, y, value]
 * x and y are position, value determines the color
 * We want the min and max from value field to make the range of colors
 */
function getRange(series) {
  return series.reduce(
    (acc, curr) => {
      const value = curr[2] || 0;
      if (value < acc.min) acc.min = value;
      if (value > acc.max) acc.max = value;
      return acc;
    },
    { min: 0, max: 0 }
  );
}

export default {
  name: 'GlHeatmap',
  components: {
    Chart,
    ChartLegend,
    ChartTooltip,
    TooltipDefaultFormat,
  },
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    dataSeries: {
      type: Array,
      required: true,
    },
    xAxisLabels: {
      type: Array,
      required: false,
      default: () => [],
    },
    yAxisLabels: {
      type: Array,
      required: false,
      default: () => [],
    },
    xAxisName: {
      type: String,
      required: false,
      default: '',
    },
    yAxisName: {
      type: String,
      required: false,
      default: '',
    },
    formatTooltipText: {
      type: Function,
      required: false,
      default: null,
    },
    legendAverageText: {
      type: String,
      required: false,
      default: 'Avg',
    },
    legendMaxText: {
      type: String,
      required: false,
      default: 'Max',
    },
    responsive: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * Sets the chart's height in pixels. Set to `"auto"` to use the height of the container.
     */
    height: {
      type: [Number, String],
      required: false,
      default: null,
    },
    showTooltip: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      chart: null,
      tooltip: {
        title: '',
        content: {},
        left: '0',
        top: '0',
      },
      selectedFormatTooltipText: this.formatTooltipText || this.defaultFormatTooltipText,
    };
  },
  computed: {
    computedOptions() {
      const { min, max } = getRange(this.dataSeries);
      return merge(
        {},
        defaultOptions,
        {
          series: {
            data: this.dataSeries,
            z: 2,
          },
          grid: {
            left: '64px',
            right: '32px',
            show: true,
            borderWidth: 0,
            backgroundColor: GRAY_100,
          },
          visualMap: {
            min,
            max,
          },
          xAxis: {
            data: this.xAxisLabels,
            z: 3,
            axisTick: false,
            axisLabel: {
              margin: 2,
            },
            name: this.xAxisName,
            nameGap: 16,
            nameLocation: 'middle',
            nameTextStyle: {
              verticalAlign: 'middle',
            },
            offset: 0,
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: WHITE,
                width: 2,
              },
            },
            axisPointer: {
              show: true,
              label: {
                formatter: this.onLabelChange,
              },
            },
          },
          yAxis: {
            data: this.yAxisLabels,
            z: 3,
            type: 'category',
            axisTick: false,
            axisLabel: {
              margin: 8,
            },
            name: this.yAxisName,
            nameLocation: 'center',
            nameGap: 50,
            nameRotate: 90,
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: WHITE,
                width: 2,
              },
            },
          },
        },
        this.options
      );
    },
    legendStyle() {
      return { paddingLeft: this.computedOptions.grid.left, marginTop: '-32px' };
    },
    compiledOptions() {
      return this.chart ? this.chart.getOption() : null;
    },
    seriesInfo() {
      const { min, max } = getRange(this.dataSeries);
      const step = (max - min) / heatmapHues.length;

      return heatmapHues.map((color, index) => {
        const lowerBound = engineeringNotation(min + step * index);
        const upperBound = engineeringNotation(min + step * (index + 1));

        return {
          name: `${lowerBound} - ${upperBound}`,
          color,
          type: 'solid',
        };
      });
    },
    autoHeight() {
      return this.height === 'auto';
    },
  },
  methods: {
    defaultFormatTooltipText(params) {
      this.tooltip.title = getTooltipTitle(params, this.computedOptions.xAxis.name);
      this.tooltip.content = getTooltipContent(params, this.computedOptions.yAxis.name);
    },
    onCreated(chart) {
      this.chart = chart;
      this.$emit('created', chart);
    },
    onLabelChange(params) {
      this.selectedFormatTooltipText(params);
      const { seriesData = [] } = params;
      if (seriesData.length && seriesData[0].value) {
        const { seriesId, value } = seriesData[0];
        const [left, top] = this.chart.convertToPixel({ seriesId }, value);

        this.tooltip = {
          ...this.tooltip,
          left: `${left}px`,
          top: `${top}px`,
        };
      }
    },
  },
  HEIGHT_AUTO_CLASSES,
};
</script>

<template>
  <div class="gl-heatmap" :class="{ [$options.HEIGHT_AUTO_CLASSES]: autoHeight }">
    <chart
      v-bind="$attrs"
      :class="{ 'gl-flex-grow-1': autoHeight }"
      :height="height"
      :options="computedOptions"
      @created="onCreated"
      v-on="$listeners"
    />
    <chart-tooltip
      v-if="chart"
      :chart="chart"
      :top="tooltip.top"
      :left="tooltip.left"
      :show="showTooltip"
    >
      <template #title>
        <slot v-if="formatTooltipText" name="tooltip-title"></slot>
        <div v-else>{{ tooltip.title }}</div>
      </template>
      <slot v-if="formatTooltipText" name="tooltip-content"></slot>
      <tooltip-default-format v-else :tooltip-content="tooltip.content" />
    </chart-tooltip>
    <chart-legend
      v-if="compiledOptions"
      :chart="chart"
      :series-info="seriesInfo"
      :style="legendStyle"
      :text-style="compiledOptions.textStyle"
      :max-text="legendMaxText"
      :average-text="legendAverageText"
    />
  </div>
</template>
