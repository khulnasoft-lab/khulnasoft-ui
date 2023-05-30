<!-- eslint-disable vue/multi-word-component-names -->
<script>
import merge from 'lodash/merge';
import truncate from 'lodash/truncate';
import { grid, dataZoomAdjustments, mergeSeriesToOptions } from '../../../utils/charts/config';
import { TOOLTIP_LEFT_OFFSET, HEIGHT_AUTO_CLASSES } from '../../../utils/charts/constants';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import { engineeringNotation } from '../../../utils/number_utils';
import { hexToRgba, debounceByAnimationFrame } from '../../../utils/utils';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';

/**
 * `nameGap` in charts/config is set to 50 but it is not
 * used for bar charts as the axes are flipped. That is why
 * we're explicitly setting it here
 */
const DEFAULT_NAME_GAP = 50;

/**
 * This is the magic number at which the y-axis name
 * and y-axis labels don't overlap
 * @Number
 */
const AXIS_LABEL_LENGTH = 7;

/**
 * Because the axes are reversed in bar charts defaultChartOptions
 * xAxis and yAxis needs to be handled specifically.
 */
const defaultOptions = {
  grid,
  xAxis: {
    nameLocation: 'center',
    axisLabel: {
      formatter: (num) => engineeringNotation(num, 2),
    },
  },
  yAxis: {
    nameGap: DEFAULT_NAME_GAP,
    boundaryGap: true,
    nameLocation: 'center',
    splitLine: {
      show: false,
    },
    axisLabel: {
      interval: 0,
      formatter: (str) =>
        truncate(str, {
          length: AXIS_LABEL_LENGTH,
          separator: '...',
        }),
    },
  },
};

export default {
  name: 'GlBarChart',
  components: {
    Chart,
    ChartTooltip,
    TooltipDefaultFormat,
  },
  inheritAttrs: false,
  props: {
    data: {
      type: Object,
      required: true,
    },
    option: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    yAxisTitle: {
      type: String,
      required: true,
    },
    xAxisTitle: {
      type: String,
      required: true,
    },
    xAxisType: {
      type: String,
      required: false,
      default: 'value',
    },
    /**
     * Sets the chart's height in pixels. Set to `"auto"` to use the height of the container.
     */
    height: {
      type: [Number, String],
      required: false,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
      showTooltip: false,
      tooltipTitle: '',
      tooltipContent: {},
      tooltipPosition: {
        left: '0',
        top: '0',
      },
      debouncedMoveShowTooltip: debounceByAnimationFrame(this.moveShowTooltip),
    };
  },
  computed: {
    series() {
      return Object.keys(this.data).map((key, index) => {
        const barColor = colorFromDefaultPalette(index);

        return {
          name: key,
          data: this.data[key],
          type: 'bar',
          stack: 'chart',
          itemStyle: {
            color: hexToRgba(barColor, 0.2),
            borderColor: barColor,
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              color: hexToRgba(barColor, 0.4),
            },
          },
          barMaxWidth: '50%',
        };
      });
    },
    options() {
      const mergedOptions = merge(
        {},
        defaultOptions,
        {
          xAxis: {
            axisLine: {
              show: false,
            },
            name: this.xAxisTitle,
            type: this.xAxisType,
          },
          yAxis: {
            name: this.yAxisTitle,
            type: 'category',
            axisTick: {
              show: true,
            },
            axisPointer: {
              show: true,
              type: 'none',
              label: {
                formatter: this.onLabelChange,
              },
            },
          },
          legend: {
            show: false,
          },
        },
        this.option,
        dataZoomAdjustments(this.option.dataZoom)
      );
      // All chart options can be merged but series
      // needs to be handled specially
      return mergeSeriesToOptions(mergedOptions, this.series);
    },
    autoHeight() {
      return this.height === 'auto';
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.getZr().off('mousemove', this.debouncedMoveShowTooltip);
      this.chart.getZr().off('mouseout', this.debouncedMoveShowTooltip);
    }
  },
  methods: {
    moveShowTooltip({ event: mouseEvent }) {
      this.tooltipPosition = {
        left: `${mouseEvent.zrX + TOOLTIP_LEFT_OFFSET}px`,
        top: `${mouseEvent.zrY}px`,
      };
      this.showTooltip = this.chart.containPixel('grid', [mouseEvent.zrX, mouseEvent.zrY]);
    },
    onCreated(chart) {
      this.chart = chart;
      this.$emit('created', chart);
      chart.getZr().on('mousemove', this.debouncedMoveShowTooltip);
      chart.getZr().on('mouseout', this.debouncedMoveShowTooltip);
    },
    onLabelChange(params) {
      const { yLabels, tooltipContent } = this.getDefaultTooltipContent(params, this.xAxisTitle);

      this.$set(this, 'tooltipContent', tooltipContent);
      this.tooltipTitle = yLabels.join(', ');
    },
    /**
     * The existing getDefaultTooltipContent in utils works against the y-axis value.
     * However, for bar charts, the tooltip should be against x-axis values.
     * This method will be removed after https://gitlab.com/gitlab-org/gitlab-ui/-/issues/674
     *
     * @param {Object} params series data
     * @param {String} xAxisTitle x-axis title
     * @returns {Object} tooltip title and content
     */
    getDefaultTooltipContent(params, xAxisTitle = null) {
      const seriesDataLength = params.seriesData.length;
      const { yLabels, tooltipContent } = params.seriesData.reduce(
        (acc, chartItem) => {
          const [value, title] = chartItem.value || [];
          // The x axis title is used instead of y axis
          const seriesName =
            seriesDataLength === 1 && xAxisTitle ? xAxisTitle : chartItem.seriesName;
          const color = seriesDataLength === 1 ? '' : chartItem.color;
          acc.tooltipContent[seriesName] = {
            value,
            color,
          };
          if (!acc.yLabels.includes(title)) {
            acc.yLabels.push(title);
          }
          return acc;
        },
        {
          yLabels: [],
          tooltipContent: {},
        }
      );

      return { yLabels, tooltipContent };
    },
  },
  HEIGHT_AUTO_CLASSES,
};
</script>

<template>
  <div class="position-relative" :class="{ [$options.HEIGHT_AUTO_CLASSES]: autoHeight }">
    <chart
      v-bind="$attrs"
      :class="{ 'gl-flex-grow-1': autoHeight }"
      :height="height"
      :options="options"
      v-on="$listeners"
      @created="onCreated"
    />
    <chart-tooltip
      v-if="chart"
      :show="showTooltip"
      :chart="chart"
      :top="tooltipPosition.top"
      :left="tooltipPosition.left"
    >
      <template #title>
        <div>{{ tooltipTitle }} ({{ yAxisTitle }})</div>
      </template>
      <tooltip-default-format :tooltip-content="tooltipContent" />
    </chart-tooltip>
  </div>
</template>
