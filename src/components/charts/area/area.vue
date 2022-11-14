<!-- eslint-disable vue/multi-word-component-names -->
<script>
/**
 * Area charts as of %12.10 support annotations.
 * Annotations is composed of a dotted line and an arrow
 * at the bottom. The dotted line is constructed
 * with markLine and arrows with markPoint.
 *
 * Similar to how custom tooltips are displayed when area chart
 * is hovered, a tooltip should be displayed when the annotation
 * arrow is hovered. This component adds event listeners
 * to figure out if mouse is hovered on charts to show tooltips.
 * While that works for data points inside the grid, for arrows
 * that live right under the chart, we use eCharts inbuilt
 * event listeners to detect hover. Given this limitation,
 * we use a separate tooltip for data point and arrow.
 */

import merge from 'lodash/merge';
import defaultChartOptions, {
  grid,
  getThresholdConfig,
  generateAnnotationSeries,
  dataZoomAdjustments,
  defaultAreaOpacity,
  mergeSeriesToOptions,
  mergeAnnotationAxisToOptions,
  lineStyle,
  getDefaultTooltipContent,
} from '../../../utils/charts/config';
import {
  ANNOTATION_TOOLTIP_TOP_OFFSET,
  DATA_TOOLTIP_LEFT_OFFSET,
  LEGEND_LAYOUT_INLINE,
  LEGEND_LAYOUT_TABLE,
  LEGEND_AVERAGE_TEXT,
  LEGEND_CURRENT_TEXT,
  LEGEND_MIN_TEXT,
  LEGEND_MAX_TEXT,
} from '../../../utils/charts/constants';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import { seriesHasAnnotations, isDataPointAnnotation } from '../../../utils/charts/utils';
import { debounceByAnimationFrame } from '../../../utils/utils';
import { ToolboxMixin } from '../../mixins/toolbox_mixin';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ChartTooltip from '../tooltip/tooltip.vue';

export default {
  components: {
    Chart,
    ChartLegend,
    ChartTooltip,
    TooltipDefaultFormat,
  },
  mixins: [ToolboxMixin],
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
    formatAnnotationsTooltipText: {
      type: Function,
      required: false,
      default: null,
    },
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
  },
  data() {
    // Part of the tooltip related data can be
    // moved into the tooltip component.
    // Tracking that progress in
    // https://gitlab.com/gitlab-org/gitlab-ui/-/issues/618
    return {
      chart: null,
      showDataTooltip: false,
      dataTooltipTitle: '',
      dataTooltipContent: {},
      dataTooltipPosition: {
        left: '0',
        top: '0',
      },
      showAnnotationsTooltip: false,
      annotationsTooltipTitle: '',
      annotationsTooltipContent: '',
      annotationsTooltipPosition: {
        left: '0',
        top: '0',
      },
      debouncedShowHideTooltip: debounceByAnimationFrame(this.showHideTooltip),
      selectedFormatTooltipText: this.formatTooltipText || this.defaultFormatTooltipText,
    };
  },
  computed: {
    series() {
      const dataSeries = this.data.map((series, index) => {
        const defaultColor = colorFromDefaultPalette(index);
        const getColor = (type) =>
          series[type] && series[type].color ? series[type].color : defaultColor;
        return merge(
          {
            areaStyle: {
              opacity: defaultAreaOpacity,
              color: getColor('areaStyle'),
            },
            showSymbol: false,
            lineStyle: {
              color: getColor('lineStyle'),
            },
            itemStyle: {
              color: getColor('itemStyle'),
            },
          },
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
      const defaultAreaChartOptions = {
        xAxis: {
          axisPointer: {
            show: true,
            lineStyle: {
              type: 'solid',
            },
            label: {
              formatter: this.onLabelChange,
            },
          },
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
      };
      const mergedOptions = merge(
        {},
        defaultChartOptions,
        defaultAreaChartOptions,
        this.option,
        dataZoomAdjustments(this.option.dataZoom),
        this.toolboxAdjustments
      );
      // All chart options can be merged but series
      // needs to be handled specially.
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
    compiledOptions() {
      return this.chart ? this.chart.getOption() : null;
    },
    legendStyle() {
      return { paddingLeft: `${grid.left}px` };
    },
    seriesInfo() {
      return this.compiledOptions.series.reduce((acc, series, index) => {
        if (series.type === 'line') {
          acc.push({
            name: series.name,
            type: series.lineStyle.type,
            color: series.lineStyle.color || colorFromDefaultPalette(index),
            data: this.includeLegendAvgMax ? series.data.map((data) => data[1]) : undefined,
          });
        }
        return acc;
      }, []);
    },
  },
  beforeDestroy() {
    this.chart.getDom().removeEventListener('mousemove', this.debouncedShowHideTooltip);
    this.chart.getDom().removeEventListener('mouseout', this.debouncedShowHideTooltip);

    this.chart.off('mouseout', this.hideAnnotationsTooltip);
    this.chart.off('mouseover', this.onChartMouseOver);
  },
  methods: {
    defaultFormatTooltipText(params) {
      const { xLabels, tooltipContent } = getDefaultTooltipContent(params, this.options.yAxis.name);

      this.$set(this, 'dataTooltipContent', tooltipContent);
      this.dataTooltipTitle = xLabels.join(', ');
    },
    defaultAnnotationTooltipText(params) {
      return {
        title: params.data.xAxis,
        content: params.data.tooltipData?.content,
      };
    },
    onCreated(chart) {
      // These listeners are used to show/hide data tooltips
      // when the mouse is hovered over the parent container
      // of echarts' svg element. This works only for data points
      // and not markPoints.
      chart.getDom().addEventListener('mousemove', this.debouncedShowHideTooltip);
      chart.getDom().addEventListener('mouseout', this.debouncedShowHideTooltip);

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
    showHideTooltip(mouseEvent) {
      this.showDataTooltip = this.chart.containPixel('grid', [mouseEvent.zrX, mouseEvent.zrY]);

      this.dataTooltipPosition = {
        left: `${mouseEvent.zrX + DATA_TOOLTIP_LEFT_OFFSET}px`,
        top: `${mouseEvent.zrY}px`,
      };
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
          top: `${event.event.zrY + ANNOTATION_TOOLTIP_TOP_OFFSET}px`,
        };
      }
    },
    onLabelChange(params) {
      this.selectedFormatTooltipText(params);
    },
  },
};
</script>

<template>
  <div class="position-relative">
    <chart v-bind="$attrs" :options="options" v-on="$listeners" @created="onCreated" />
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
      id="dataTooltip"
      ref="dataTooltip"
      class="gl-pointer-events-none"
      :show="showDataTooltip"
      :chart="chart"
      :top="dataTooltipPosition.top"
      :left="dataTooltipPosition.left"
    >
      <template #title>
        <slot v-if="formatTooltipText" name="tooltip-title"></slot>
        <template v-else>
          {{ dataTooltipTitle }}
          <template v-if="options.xAxis.name">({{ options.xAxis.name }})</template>
        </template>
      </template>
      <slot v-if="formatTooltipText" name="tooltip-content"></slot>
      <tooltip-default-format v-else :tooltip-content="dataTooltipContent" />
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
