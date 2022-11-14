<!-- eslint-disable vue/multi-word-component-names -->
<script>
import merge from 'lodash/merge';
import {
  defaultChartOptions,
  grid,
  gridWithSecondaryYAxis,
  yAxis,
  dataZoomAdjustments,
  mergeSeriesToOptions,
  getDefaultTooltipContent,
  generateBarSeries,
  generateLineSeries,
} from '../../../utils/charts/config';
import { TOOLTIP_LEFT_OFFSET, CHART_TYPE_LINE } from '../../../utils/charts/constants';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import { columnOptions } from '../../../utils/constants';
import { debounceByAnimationFrame } from '../../../utils/utils';
import { ToolboxMixin } from '../../mixins/toolbox_mixin';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';

const yAxisDefaults = {
  ...yAxis,
  nameLocation: 'center',
  axisTick: {
    show: false,
  },
};

export default {
  components: {
    Chart,
    ChartTooltip,
    TooltipDefaultFormat,
  },
  mixins: [ToolboxMixin],
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
    yAxisTitle: {
      type: String,
      required: true,
    },
    secondaryDataTitle: {
      type: String,
      required: false,
      default: '',
    },
    xAxisTitle: {
      type: String,
      required: true,
    },
    xAxisType: {
      type: String,
      required: true,
      validator: (value) => ['value', 'category', 'time', 'log'].indexOf(value) !== -1,
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
    hasSecondaryAxis() {
      return Boolean(this.secondaryData.length);
    },
    barSeries() {
      return this.bars.map(({ name, data }, index) => {
        const color = colorFromDefaultPalette(index);
        return generateBarSeries({ name, data, color });
      });
    },
    lineSeries() {
      const offset = this.bars.length;
      return this.lines.map(({ name, data }, index) => {
        const color = colorFromDefaultPalette(offset + index);
        return generateLineSeries({ name, data, color });
      });
    },
    secondarySeries() {
      const offset = this.bars.length + this.lines.length;
      return this.secondaryData.map(({ name, data, type, stack = columnOptions.tiled }, index) => {
        const color = colorFromDefaultPalette(offset + index);
        return type === CHART_TYPE_LINE
          ? generateLineSeries({ color, name, data, yAxisIndex: 1 })
          : generateBarSeries({ color, name, data, yAxisIndex: 1, stack });
      });
    },
    series() {
      return [...this.barSeries, ...this.lineSeries, ...this.secondarySeries];
    },
    options() {
      const yAxisPrimary = {
        ...yAxisDefaults,
        name: this.yAxisTitle,
      };

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
            name: this.xAxisTitle,
            type: this.xAxisType,
          },
          yAxis: this.hasSecondaryAxis
            ? [
                yAxisPrimary,
                {
                  ...yAxisDefaults,
                  name: this.secondaryDataTitle,
                  show: this.hasSecondaryAxis,
                },
              ]
            : yAxisPrimary,
          legend: {
            show: false,
          },
        },
        this.option,
        dataZoomAdjustments(this.option.dataZoom),
        this.toolboxAdjustments
      );
      // All chart options can be merged but series
      // needs to be handled specially
      return mergeSeriesToOptions(mergedOptions, this.series);
    },
  },
  beforeDestroy() {
    this.chart.getDom().removeEventListener('mousemove', this.debouncedMoveShowTooltip);
    this.chart.getDom().removeEventListener('mouseout', this.debouncedMoveShowTooltip);
  },
  methods: {
    moveShowTooltip(mouseEvent) {
      this.tooltipPosition = {
        left: `${mouseEvent.zrX + TOOLTIP_LEFT_OFFSET}px`,
        top: `${mouseEvent.zrY}px`,
      };
      this.showTooltip = this.chart.containPixel('grid', [mouseEvent.zrX, mouseEvent.zrY]);
    },
    onCreated(chart) {
      chart.getDom().addEventListener('mousemove', this.debouncedMoveShowTooltip);
      chart.getDom().addEventListener('mouseout', this.debouncedMoveShowTooltip);
      this.chart = chart;
      this.$emit('created', chart);
    },
    onLabelChange(params) {
      const { xLabels, tooltipContent } = getDefaultTooltipContent(params, this.yAxisTitle);

      this.$set(this, 'tooltipContent', tooltipContent);
      this.tooltipTitle = xLabels.join(', ');
    },
  },
};
</script>
<template>
  <div class="position-relative">
    <chart v-bind="$attrs" :options="options" v-on="$listeners" @created="onCreated" />
    <chart-tooltip
      v-if="chart"
      :show="showTooltip"
      :chart="chart"
      :top="tooltipPosition.top"
      :left="tooltipPosition.left"
    >
      <template #title>
        <div>{{ tooltipTitle }} ({{ xAxisTitle }})</div>
      </template>
      <tooltip-default-format :tooltip-content="tooltipContent" />
    </chart-tooltip>
  </div>
</template>
