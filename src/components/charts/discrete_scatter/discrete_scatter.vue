<script>
import merge from 'lodash/merge';
import { GRAY_200 } from '../../../../dist/tokens/js/tokens';
import {
  defaultChartOptions,
  dataZoomAdjustments,
  mergeSeriesToOptions,
} from '../../../utils/charts/config';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import { HEIGHT_AUTO_CLASSES } from '../../../utils/charts/constants';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';

export default {
  name: 'GlDiscreteScatterChart',
  components: {
    Chart,
    ChartTooltip,
    TooltipDefaultFormat,
  },
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
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
    symbolSize: {
      type: Number,
      required: false,
      default: 8,
    },
    formatTooltipText: {
      type: Function,
      required: false,
      default: null,
    },
    disableTooltip: {
      type: Boolean,
      required: false,
      default: false,
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
      tooltipTitle: '',
      tooltipContent: {},
      tooltipPosition: {
        left: '0',
        top: '0',
      },
      selectedFormatTooltipText: this.formatTooltipText || this.defaultFormatTooltipText,
    };
  },
  computed: {
    series() {
      return this.data.map((series, index) => {
        const defaultColor = colorFromDefaultPalette(index);
        const getColor = (type) =>
          series[type] && series[type].color ? series[type].color : defaultColor;

        return merge(
          {
            symbolSize: this.symbolSize,
            lineStyle: {
              color: getColor('lineStyle'),
            },
            itemStyle: {
              color: getColor('itemStyle'),
            },
          },
          series
        );
      });
    },
    options() {
      const mergedOptions = merge(
        {},
        defaultChartOptions,
        {
          tooltip: this.disableTooltip
            ? undefined
            : {
                formatter: this.onLabelChange,
              },
          xAxis: {
            type: 'category',
            name: this.xAxisTitle,
            axisTick: {
              alignWithLabel: true,
              show: true,
              lineStyle: {
                color: GRAY_200,
              },
            },
            axisLabel: {
              margin: 20,
              verticalAlign: 'bottom',
            },
          },
          yAxis: {
            type: 'value',
            name: this.yAxisTitle,
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
  methods: {
    defaultFormatTooltipText(params) {
      const data = this.getChartData(params);
      const [title, content] = data;
      this.tooltipTitle = title;
      const seriesName = this.yAxisTitle;
      const tooltipContent = {
        [seriesName]: {
          value: content,
          color: '',
        },
      };
      this.$set(this, 'tooltipContent', tooltipContent);
    },
    onCreated(chart) {
      this.chart = chart;
      this.$emit('created', chart);
    },
    onLabelChange(params) {
      this.selectedFormatTooltipText(params);

      const data = this.getChartData(params);

      if (data.length) {
        const [left, top] = this.chart.convertToPixel('grid', data);

        this.tooltipPosition = {
          left: `${left}px`,
          top: `${top}px`,
        };
      }
    },
    getChartData({ data }) {
      const chartData = data?.value || data;
      return Array.isArray(chartData) ? chartData : [];
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
      v-if="!disableTooltip && chart"
      :chart="chart"
      :top="tooltipPosition.top"
      :left="tooltipPosition.left"
    >
      <template #title>
        <slot name="tooltip-title">{{ tooltipTitle }} ({{ xAxisTitle }})</slot>
      </template>

      <slot name="tooltip-content">
        <tooltip-default-format :tooltip-content="tooltipContent" />
      </slot>
    </chart-tooltip>
  </div>
</template>
