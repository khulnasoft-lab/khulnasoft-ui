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
import TooltipDefaultFormat from '../shared/tooltip/tooltip_default_format/tooltip_default_format.vue';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ChartTooltip from '../shared/tooltip/tooltip.vue';

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
    includeLegendAvgMax: {
      type: Boolean,
      required: false,
      default: true,
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
    /**
     * Callback called when showing or refreshing a tooltip.
     * **Deprecated:** Use slots `#tooltip-title`, `#tooltip-content` or `#tooltip-value`.
     *
     * @deprecated Use slots `#tooltip-title`, `#tooltip-content` or `#tooltip-value`.
     */
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
      compiledOptions: null,
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
      const stackedColumnChartOptions = {
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
            type: 'none',
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
      };

      // `formatTooltipText` is deprecated, these added options should be
      // removed when `formatTooltipText` is removed.
      const deprecatedTooltipFormatterOptions = {
        xAxis: {
          axisPointer: {
            show: true,
            label: {
              formatter: this.formatTooltipText,
            },
          },
        },
      };

      const mergedOptions = merge(
        {},
        defaultChartOptions,
        stackedColumnChartOptions,
        this.formatTooltipText ? deprecatedTooltipFormatterOptions : {},
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
    seriesInfo() {
      const compiledSeries = this.compiledOptions?.series || [];
      return compiledSeries.reduce((acc, series, index) => {
        acc.push({
          name: series.name,
          type: series.type,
          color: this.getColor(index),
          data: this.includeLegendAvgMax ? series.data.map((data) => data) : undefined,
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
    onUpdated() {
      this.compiledOptions = this.chart.getOption();
    },
    getTooltipTitle({ params }) {
      if (!params) return '';

      const options = this.chart.getOption();
      const titleAxisName = options?.xAxis?.[0]?.name;
      return titleAxisName ? `${params.value} (${titleAxisName})` : params.value;
    },
    getTooltipContent({ params }) {
      if (!params) return {};

      const tooltipContentEntries = params.seriesData
        .toSorted((a, b) => b.seriesIndex - a.seriesIndex) // Invert stacking order so it matches chart (see https://github.com/apache/echarts/issues/14700)
        .map(({ seriesName = '', value, borderColor }) => [
          seriesName,
          { value, color: borderColor },
        ]);

      return Object.fromEntries(tooltipContentEntries);
    },
  },
  HEIGHT_AUTO_CLASSES,
};
</script>
<template>
  <div class="gl-relative" :class="{ [$options.HEIGHT_AUTO_CLASSES]: autoHeight }">
    <chart
      v-bind="$attrs"
      :class="{ 'gl-grow': autoHeight }"
      :height="height"
      :options="options"
      v-on="$listeners"
      @created="onCreated"
      @updated="onUpdated"
    />
    <chart-tooltip v-if="chart" :chart="chart" :use-default-tooltip-formatter="!formatTooltipText">
      <template #title="scope">
        <slot name="tooltip-title" v-bind="scope">{{ getTooltipTitle(scope) }}</slot>
      </template>
      <template #default="scope">
        <slot name="tooltip-content" v-bind="scope">
          <tooltip-default-format :tooltip-content="getTooltipContent(scope)">
            <template v-if="$scopedSlots['tooltip-value']" #tooltip-value="valueScope">
              <slot name="tooltip-value" v-bind="valueScope"></slot>
            </template>
          </tooltip-default-format>
        </slot>
      </template>
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
