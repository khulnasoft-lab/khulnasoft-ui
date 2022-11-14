<!-- eslint-disable vue/multi-word-component-names -->
<script>
import merge from 'lodash/merge';
import { GlResizeObserverDirective } from '../../../directives/resize_observer/resize_observer';
import {
  defaultChartOptions,
  mergeSeriesToOptions,
  symbolSize,
} from '../../../utils/charts/config';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';

// the padding is needed so the mark points don't overflow when visible
const gridPadding = symbolSize / 2;

export default {
  components: { Chart, ChartTooltip },
  directives: {
    resizeObserver: GlResizeObserverDirective,
  },
  props: {
    /**
     * The data that is used to plot the chart.
     */
    data: {
      type: Array,
      required: true,
    },
    /**
     * Controls the label that is shown within the chart's tooltip. Use it to describe your data.
     */
    tooltipLabel: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Sets the chart's height in pixel.
     */
    height: {
      type: Number,
      required: false,
      default: 50,
    },
    /**
     * If enabled will show the value of the latest "y" data-point on the side right of the chart.
     */
    showLastYValue: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      chartInstance: null,
      tooltip: {
        show: false,
        title: '',
        content: '',
        position: {
          left: '0',
          top: '0',
        },
      },
    };
  },
  computed: {
    options() {
      const sparkLineChartOptions = {
        grid: {
          top: gridPadding,
          bottom: gridPadding,
          left: gridPadding,
          right: gridPadding,
        },
        xAxis: {
          type: 'category',
          show: false,
          axisLabel: {
            show: true,
          },
          axisPointer: {
            show: true,
            type: 'none',
            label: {
              formatter: this.xAxisLabelFormatter,
            },
          },
        },
        yAxis: {
          type: 'value',
          show: false,
          min: 'datamin',
        },
      };
      const mergedOptions = merge({}, defaultChartOptions, sparkLineChartOptions);
      return mergeSeriesToOptions(mergedOptions, this.series);
    },
    series() {
      const { data } = this;
      return {
        type: 'line',
        symbol: 'circle',
        hoverAnimation: false,
        animation: true,
        cursor: 'auto',
        symbolSize,
        markPoint: {
          symbol: 'circle',
          cursor: 'auto',
          animation: false,
          symbolSize,
          data: [
            {
              xAxis: data.length - 1,
              yAxis: data[data.length - 1][1],
            },
          ],
        },
        data,
      };
    },
    lastYValue() {
      const latestEntry = this.data.slice(-1)[0];

      return latestEntry[1];
    },
  },
  methods: {
    onChartCreated(chartInstance) {
      this.chartInstance = chartInstance;
      /**
       * Emitted when the chart is created.
       * The payload contains the echarts instance.
       * @event chartCreated
       * @type {object}
       */
      this.$emit('chartCreated', chartInstance);
    },
    handleResize() {
      this.chartInstance.resize();
    },
    hideTooltip() {
      this.tooltip.show = false;
    },
    formatTooltipText([xValue, yValue]) {
      this.tooltip.title = xValue;
      this.tooltip.content = yValue;
    },
    setTooltipPosition(data) {
      const [left, top] = this.chartInstance.convertToPixel('grid', data);
      this.tooltip.position = {
        left: `${left}px`,
        top: `${top}px`,
      };
    },
    // This function is called any time the axis pointer is changed (the black bubble showing which
    // point on the line is selected). Note that it will not trigger if the axis pointer is removed,
    // only when it changes from one point to another or is shown for the first time.
    xAxisLabelFormatter({ seriesData = [] }) {
      // seriesData is an array of nearby data point coordinates
      // seriesData[0] is the nearest point at which the tooltip is displayed
      // https://echarts.apache.org/en/option.html#xAxis.axisPointer.label.formatter
      const [firstEntry = {}] = seriesData;
      const { data } = firstEntry;

      if (data) {
        this.tooltip.show = true;
        this.formatTooltipText(data);
        this.setTooltipPosition(data);
      }
    },
  },
};
</script>

<template>
  <div
    v-resize-observer="handleResize"
    class="gl-display-flex gl-align-items-center"
    @mouseleave="hideTooltip"
  >
    <slot name="default"></slot>
    <div class="gl-flex-grow-1 gl-relative">
      <chart
        v-bind="$attrs"
        :height="height"
        :options="options"
        @created="onChartCreated"
        v-on="$listeners"
      />
      <chart-tooltip
        v-if="chartInstance"
        :show="tooltip.show"
        :chart="chartInstance"
        :top="tooltip.position.top"
        :left="tooltip.position.left"
        :style="{ pointerEvents: 'none' }"
        placement="top"
      >
        <template #title>
          <div data-testid="tooltip-title" class="gl-white-space-nowrap">
            {{ tooltip.title }}
          </div>
        </template>
        <template #default>
          <div class="gl-display-flex" data-testid="tooltip-content">
            <span v-if="tooltipLabel" class="gl-pr-6 gl-mr-auto">{{ tooltipLabel }}</span>
            <strong>{{ tooltip.content }}</strong>
          </div>
        </template>
      </chart-tooltip>
    </div>
    <span
      v-if="showLastYValue"
      class="gl-display-inline-flex gl-justify-content-center gl-ml-5"
      data-testid="last-y-value"
    >
      {{ lastYValue }}
    </span>
  </div>
</template>
