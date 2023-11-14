<script>
import merge from 'lodash/merge';
import {
  defaultChartOptions,
  grid,
  gridWithSecondaryYAxis,
  yAxis,
  dataZoomAdjustments,
  mergeSeriesToOptions,
  generateBarSeries,
  generateLineSeries,
} from '../../../utils/charts/config';
import {
  LEGEND_LAYOUT_INLINE,
  LEGEND_LAYOUT_TABLE,
  LEGEND_AVERAGE_TEXT,
  LEGEND_CURRENT_TEXT,
  LEGEND_MIN_TEXT,
  LEGEND_MAX_TEXT,
  CHART_TYPE_LINE,
  HEIGHT_AUTO_CLASSES,
} from '../../../utils/charts/constants';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import { columnOptions } from '../../../utils/constants';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ChartTooltip from '../tooltip/tooltip.vue';

const yAxisDefaults = {
  ...yAxis,
  nameLocation: 'center',
  axisTick: {
    show: false,
  },
};

export default {
  name: 'GlStackedColumnChart',
  components: {
    Chart,
    ChartTooltip,
    ChartLegend,
    TooltipDefaultFormat,
  },
  inheritAttrs: false,
  props: {
    bars: {
      type: Array,
      required: false,
      default: () => [],
    },
    lines: {
      type: Array,
      required: false,
      default: () => [],
    },
    secondaryData: {
      type: Array,
      required: false,
      default: () => [],
    },
    option: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    presentation: {
      type: String,
      required: false,
      default: 'stacked',
      validator: (value) => ['stacked', 'tiled'].indexOf(value) !== -1,
    },
    groupBy: {
      type: Array,
      required: true,
    },
    xAxisType: {
      type: String,
      required: true,
      validator: (value) => ['value', 'category', 'time', 'log'].indexOf(value) !== -1,
    },
    xAxisTitle: {
      type: String,
      required: true,
    },
    yAxisTitle: {
      type: String,
      required: true,
    },
    secondaryDataTitle: {
      type: String,
      required: false,
      default: '',
    },
    seriesNames: {
      type: Array,
      required: false,
      default: () => [],
    },
    legendAverageText: {
      type: String,
      required: false,
      default: LEGEND_AVERAGE_TEXT,
    },
    legendMaxText: {
      type: String,
      required: false,
      default: LEGEND_MAX_TEXT,
    },
    legendMinText: {
      type: String,
      required: false,
      default: LEGEND_MIN_TEXT,
    },
    legendCurrentText: {
      type: String,
      required: false,
      default: LEGEND_CURRENT_TEXT,
    },
    legendLayout: {
      type: String,
      required: false,
      default: LEGEND_LAYOUT_INLINE,
      validator(layout) {
        return [LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE].indexOf(layout) !== -1;
      },
    },
    formatTooltipText: {
      type: Function,
      required: false,
      default: null,
    },
    customPalette: {
      type: Array,
      required: false,
      default: null,
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
    };
  },
  computed: {
    hasSecondaryAxis() {
      return Boolean(this.secondaryData.length);
    },
    barSeries() {
      return this.bars.map(({ name, data }, index) => {
        const stack = this.presentation === 'stacked' ? this.groupBy : null;
        const color = this.getColor(index);
        return generateBarSeries({ stack, name, data, color });
      });
    },
    lineSeries() {
      const offset = this.bars.length;
      return this.lines.map(({ name, data }, index) => {
        const color = this.getColor(offset + index);
        return generateLineSeries({ name, data, color });
      });
    },
    secondarySeries() {
      const offset = this.bars.length + this.lines.length;
      return this.secondaryData.map(({ name, data, type, stack = columnOptions.tiled }, index) => {
        const color = this.getColor(offset + index);
        return type === CHART_TYPE_LINE
          ? generateLineSeries({ color, name, data, yAxisIndex: 1 })
          : generateBarSeries({ color, name, data, yAxisIndex: 1, stack });
      });
    },
    series() {
      return [...this.barSeries, ...this.lineSeries, ...this.secondarySeries];
    },
    options() {
      const mergedOptions = merge(
        {},
        defaultChartOptions,
        {
          grid: this.hasSecondaryAxis ? gridWithSecondaryYAxis : grid,
          xAxis: {
            boundaryGap: true,
            axisLabel: {
              margin: 20,
              verticalAlign: 'bottom',
            },
            axisLine: {
              show: false,
            },
            axisPointer: {
              show: true,
              type: 'none',
              label: {
                formatter: this.onLabelChange,
              },
            },
            data: this.groupBy,
            name: this.xAxisTitle,
            type: this.xAxisType,
          },
          yAxis: [
            {
              ...yAxisDefaults,
              name: this.yAxisTitle,
            },
            {
              ...yAxisDefaults,
              name: this.secondaryDataTitle,
              show: this.hasSecondaryAxis,
            },
          ],
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
    legendStyle() {
      return { paddingLeft: `${grid.left}px` };
    },
    compiledOptions() {
      return this.chart ? this.chart.getOption() : null;
    },
    seriesInfo() {
      return this.compiledOptions.series.reduce((acc, series, index) => {
        acc.push({
          name: series.name,
          type: series.type,
          color: this.getColor(index),
          data: series.data.map((data) => data),
          yAxisIndex: series.yAxisIndex,
        });
        return acc;
      }, []);
    },
    autoHeight() {
      return this.height === 'auto';
    },
  },
  methods: {
    getColor(index) {
      return this.customPalette ? this.customPalette?.[index] : colorFromDefaultPalette(index);
    },
    onCreated(chart) {
      this.chart = chart;
      this.$emit('created', chart);
    },
    defaultFormatTooltipText(params) {
      const { tooltipContent } = params.seriesData.reverse().reduce(
        (acc, bar) => {
          acc.tooltipContent[bar.seriesName] = {
            value: bar.value,
            index: bar.seriesIndex,
            color: this.getColor(bar.seriesIndex),
          };

          return acc;
        },
        {
          tooltipContent: {},
        }
      );

      this.tooltipTitle = params.value;
      this.$set(this, 'tooltipContent', tooltipContent);
    },
    onLabelChange(params) {
      if (this.formatTooltipText) {
        this.formatTooltipText(params);
      } else {
        this.defaultFormatTooltipText(params);
      }
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
    <chart-tooltip v-if="chart" :chart="chart">
      <template #title>
        <slot name="tooltip-title">{{ tooltipTitle }} ({{ xAxisTitle }})</slot>
      </template>

      <slot name="tooltip-content">
        <tooltip-default-format :tooltip-content="tooltipContent" />
      </slot>
    </chart-tooltip>
    <chart-legend
      v-if="compiledOptions"
      :chart="chart"
      :style="legendStyle"
      :series-info="seriesInfo"
      :text-style="compiledOptions.textStyle"
      :min-text="legendMinText"
      :max-text="legendMaxText"
      :average-text="legendAverageText"
      :current-text="legendCurrentText"
      :layout="legendLayout"
    />
  </div>
</template>
