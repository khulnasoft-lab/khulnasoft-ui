<!-- eslint-disable vue/multi-word-component-names -->
<script>
import * as echarts from 'echarts';
import {
  defaultHeight,
  defaultWidth,
  validRenderers,
  toolboxHeight,
} from '../../../utils/charts/config';
import { createTheme, themeName } from '../../../utils/charts/theme';
import { GlResizeObserverDirective } from '../../../directives/resize_observer/resize_observer';
import { debounceByAnimationFrame } from '../../../utils/utils';

/**
 * Allowed values by eCharts
 * https://echarts.apache.org/en/api.html#echartsInstance.resize
 */
const sizeValidator = (size) => Number.isFinite(size) || size === 'auto' || size == null;

const isChartWithToolbox = (options) => options?.toolbox !== undefined;

const increaseChartGridTop = (options, increaseBy) => ({
  ...options,
  grid: {
    ...options.grid,
    top: (options?.grid?.top || 0) + increaseBy,
  },
});

export default {
  name: 'GlChart',
  directives: {
    resizeObserver: GlResizeObserverDirective,
  },
  props: {
    /**
     * The ECharts configuration object.
     * https://echarts.apache.org/en/option.html#title
     */
    options: {
      type: Object,
      required: true,
    },
    /**
     * Warning: this prop is deprecated and will soon be removed
     * Please do not utilize `disableTheme` for formatting
     * Use the `options` prop to set desired echarts formatting
     */
    disableTheme: {
      type: Boolean,
      required: false,
      default: false,
    },
    width: {
      type: [Number, String],
      required: false,
      default: null,
      validator: sizeValidator,
    },
    /**
     * Sets the chart's height in pixels. Set to `"auto"` to use the height of the container.
     */
    height: {
      type: [Number, String],
      required: false,
      default: null,
      validator: sizeValidator,
    },
    /**
     * An ECharts group id. Used to connect multiple charts.
     * https://echarts.apache.org/en/api.html#echarts.connect
     */
    groupId: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * How the chart should be rendered. Valid options are 'canvas' or 'svg'.
     * https://echarts.apache.org/handbook/en/best-practices/canvas-vs-svg/
     */
    renderer: {
      type: String,
      required: false,
      default: 'svg',
      validator(renderer) {
        return validRenderers.includes(renderer);
      },
    },
    responsive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      chart: null,
      debouncedHandleResize: debounceByAnimationFrame(this.handleResize),
    };
  },
  computed: {
    normalizedOptions() {
      return isChartWithToolbox(this.options)
        ? increaseChartGridTop(this.options, toolboxHeight)
        : this.options;
    },
  },
  watch: {
    options() {
      if (this.chart) {
        this.draw();
      }
    },
    width() {
      this.setChartSize();
    },
    height() {
      this.setChartSize();
    },
  },
  created() {
    if (!this.disableTheme) {
      echarts.registerTheme(themeName, createTheme(this.options));
    }
  },
  async mounted() {
    await this.$nextTick();

    const chart = echarts.init(this.$refs.chart, this.disableTheme ? null : themeName, {
      renderer: this.renderer,
      width: defaultWidth,
      height: defaultHeight,
    });
    // FIXME: temporary workaround to ensure compatibility with @vue/compat
    // eslint-disable-next-line no-underscore-dangle
    chart.__v_skip = true;
    this.chart = chart;

    if (this.groupId.length) {
      this.chart.group = this.groupId;
      echarts.connect(this.groupId);
    }

    this.chart.on('click', this.handleClick);
    /**
     * Emitted after calling `echarts.init`
     */
    this.$emit('created', this.chart);
    this.draw();
    this.setChartSize();
  },
  beforeDestroy() {
    this.chart.off('click', this.handleClick);
  },
  methods: {
    draw() {
      this.chart.setOption(this.normalizedOptions);
      /**
       * Emitted after calling `echarts.setOption`
       */
      this.$emit('updated', this.chart);
    },
    setChartSize() {
      this.chart.resize({
        width: this.width || 'auto',
        height: this.height || defaultHeight,
      });
    },
    handleClick(params) {
      /**
       * Emitted when clicked on a data item in the chart (e.g., a bar/column).
       *
       * @property {object} chart The chart instance
       * @property {object} params A params object, see also https://echarts.apache.org/en/api.html#events.Mouse%20events
       */
      this.$emit('chartItemClicked', { chart: this.chart, params });
    },
    handleResize() {
      this.chart.resize();
    },
  },
};
</script>

<template>
  <div ref="chart" v-resize-observer:[responsive]="debouncedHandleResize"></div>
</template>
