<!-- eslint-disable vue/multi-word-component-names -->
<script>
/**
 * Line charts as of %12.10 support annotations.
 * Annotations is composed of a dotted line and an arrow
 * at the bottom. The dotted line is constructed
 * with markLine and arrows with markPoint. Most of this
 * logic is in GitLab and should be eventually moved to
 * KhulnaSoft UI https://gitlab.com/gitlab-org/gitlab/-/issues/213390.
 *
 * Similar to how custom tooltips are displayed when line chart
 * is hovered, a tooltip should be displayed when the annotation
 * arrow is hovered. This component adds event listeners
 * to figure out if mouse is hovered on charts to show tooltips.
 * While that works for data points inside the grid, for arrows
 * that live right under the chart, we use eCharts inbuilt
 * event listeners to detect hover. Given this limitation,
 * we use a separate tooltip for data point and arrow.
 */

import merge from 'lodash/merge';
import {
  defaultChartOptions,
  grid,
  getThresholdConfig,
  generateAnnotationSeries,
  dataZoomAdjustments,
  symbolSize,
  mergeSeriesToOptions,
  mergeAnnotationAxisToOptions,
  lineStyle,
} from '../../../utils/charts/config';
import {
  LEGEND_LAYOUT_INLINE,
  LEGEND_LAYOUT_TABLE,
  LEGEND_AVERAGE_TEXT,
  LEGEND_CURRENT_TEXT,
  LEGEND_MIN_TEXT,
  LEGEND_MAX_TEXT,
  HEIGHT_AUTO_CLASSES,
} from '../../../utils/charts/constants';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import { seriesHasAnnotations, isDataPointAnnotation } from '../../../utils/charts/utils';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ChartTooltip from '../shared/tooltip/tooltip.vue';

export default {
  name: 'GlLineChart',
  components: {
    Chart,
    ChartLegend,
    ChartTooltip,
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
    thresholds: {
      type: Array,
      required: false,
      default: () => [],
    },
    annotations: {
      type: Array,
      required: false,
      default: () => [],
    },
    includeLegendAvgMax: {
      type: Boolean,
      required: false,
      default: true,
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
    showLegend: {
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
  },
  data() {
    // Part of the tooltip related data can be
    // moved into the tooltip component.
    // Tracking that progress in
    // https://gitlab.com/khulnasoft-org/khulnasoft-ui/-/issues/618
    return {
      chart: null,
      compiledOptions: null,
      showAnnotationsTooltip: false,
      annotationsTooltipTitle: '',
      annotationsTooltipContent: '',
      annotationsTooltipPosition: {
        left: '0',
        top: '0',
      },
    };
  },
  computed: {
    series() {
      const dataSeries = this.data.map((series, index) => {
        const defaultColor = colorFromDefaultPalette(index);
        const getColor = (type) => series[type]?.color ?? defaultColor;

        return merge(
          {
            showSymbol: true,
            lineStyle: {
              color: getColor('lineStyle'),
            },
            itemStyle: {
              color: getColor('itemStyle'),
            },
          },
          symbolSize,
          lineStyle,
          series,
          getThresholdConfig(this.thresholds)
        );
      });
      // if annotation series exists, append it
      // along with data series
      if (this.annotationSeries) {
        return [...dataSeries, this.annotationSeries];
      }
      return dataSeries;
    },
    annotationSeries() {
      return generateAnnotationSeries(this.annotations);
    },
    options() {
      const lineChartOptions = {
        xAxis: {
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: 'var(--gl-chart-axis-line-color)',
            },
          },
        },
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
        lineChartOptions,
        this.formatTooltipText ? deprecatedTooltipFormatterOptions : {},
        this.option,
        dataZoomAdjustments(this.option.dataZoom)
      );
      // All chart options can be merged but series
      // needs to be handled specially
      return mergeSeriesToOptions(
        mergeAnnotationAxisToOptions(mergedOptions, this.hasAnnotations),
        this.series
      );
    },
    /**
     * Annotations currently are passed as series options in monitoring dashboard.
     * Once https://gitlab.com/gitlab-org/gitlab/-/issues/213390 is closed,
     * annotations will be passed as props and not as series options.
     *
     * For backward compatibility, we're having to check for both.
     */
    hasAnnotations() {
      return this.annotations.length !== 0 || seriesHasAnnotations(this.option.series);
    },
    shouldShowAnnotationsTooltip() {
      return this.chart && this.hasAnnotations;
    },
    legendStyle() {
      return { paddingLeft: `${grid.left}px` };
    },
    hasLegend() {
      return this.showLegend && this.compiledOptions;
    },
    seriesInfo() {
      const compiledSeries = this.compiledOptions?.series || [];
      return compiledSeries.reduce((acc, series, index) => {
        if (series.type === 'line') {
          acc.push({
            name: series.name,
            type: series.lineStyle.type,
            color: series.lineStyle.color || colorFromDefaultPalette(index),
            data: this.includeLegendAvgMax ? series.data?.map((data) => data[1]) : undefined,
          });
        }
        return acc;
      }, []);
    },
    autoHeight() {
      return this.height === 'auto';
    },
  },
  beforeDestroy() {
    this.chart.off('mouseout', this.onChartDataPointMouseOut);
    this.chart.off('mouseover', this.onChartDataPointMouseOver);
  },
  methods: {
    defaultAnnotationTooltipText(params) {
      return {
        title: params.data.xAxis,
        content: params.data.tooltipData?.content,
      };
    },
    onCreated(chart) {
      // eCharts inbuild mouse events
      // https://echarts.apache.org/en/api.html#events.Mouse%20events
      // is used to attach listeners to markPoints. These listeners
      // are currently used for annotation arrows at the bottom of the chart.

      // Because data points and annotations arrows are in different
      // sections of the charts with their own mouseovers and mouseouts,
      // there shouldn't be an overlapping situation where both tooltips
      // are visible.

      if (this.hasAnnotations) {
        chart.on('mouseout', this.onChartDataPointMouseOut);
        chart.on('mouseover', this.onChartDataPointMouseOver);
      }

      this.chart = chart;
      this.$emit('created', chart);
    },
    onUpdated() {
      this.compiledOptions = this.chart.getOption();
    },
    onChartDataPointMouseOut() {
      this.showAnnotationsTooltip = false;
    },
    /**
     * Check if the hovered data point is an annotation
     * point to show the annotation tooltip.
     */
    onChartDataPointMouseOver(params) {
      if (isDataPointAnnotation(params)) {
        const { event } = params;
        const toolTipFormatter =
          this.formatAnnotationsTooltipText || this.defaultAnnotationTooltipText;
        const { title = '', content = '' } = toolTipFormatter(params);
        this.showAnnotationsTooltip = true;
        this.annotationsTooltipTitle = title;
        this.annotationsTooltipContent = content;
        this.annotationsTooltipPosition = {
          left: `${event.event.zrX}px`,
          top: `${event.event.zrY}px`,
        };
      }
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
    <chart-tooltip
      v-if="shouldShowAnnotationsTooltip"
      id="annotationsTooltip"
      ref="annotationsTooltip"
      :show="showAnnotationsTooltip"
      :chart="chart"
      :top="annotationsTooltipPosition.top"
      :left="annotationsTooltipPosition.left"
      placement="bottom"
    >
      <template #title>
        <div>{{ annotationsTooltipTitle }}</div>
      </template>
      <div>{{ annotationsTooltipContent }}</div>
    </chart-tooltip>
    <chart-tooltip
      v-if="chart"
      ref="dataTooltip"
      :chart="chart"
      :use-default-tooltip-formatter="!formatTooltipText"
    >
      <template v-if="$scopedSlots['tooltip-title']" #title="scope">
        <slot name="tooltip-title" v-bind="scope"></slot>
      </template>
      <template v-if="$scopedSlots['tooltip-content']" #default="scope">
        <slot name="tooltip-content" v-bind="scope"></slot>
      </template>
      <template v-if="$scopedSlots['tooltip-value']" #tooltip-value="scope">
        <slot name="tooltip-value" v-bind="scope"></slot>
      </template>
    </chart-tooltip>
    <chart-legend
      v-if="hasLegend"
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
