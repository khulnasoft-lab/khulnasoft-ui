<script>
import * as echarts from 'echarts';
import { defaultHeight, defaultWidth, validRenderers } from '../../../utils/charts/config';
import createTheme, { themeName } from '../../../utils/charts/theme';
import { GlResizeObserverDirective } from '../../../directives/resize_observer/resize_observer';

export default {
  directives: {
    resizeObserver: GlResizeObserverDirective,
  },
  props: {
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
      type: Number,
      required: false,
      default: null,
    },
    height: {
      type: Number,
      required: false,
      default: null,
    },
    groupId: {
      type: String,
      required: false,
      default: '',
    },
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
      default: false,
    },
  },
  data() {
    return {
      chart: null,
    };
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

    this.chart = echarts.init(this.$refs.chart, this.disableTheme ? null : themeName, {
      renderer: this.renderer,
      width: defaultWidth,
      height: defaultHeight,
    });

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
      this.chart.setOption(this.options);
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
      if (this.responsive) this.chart.resize();
    },
  },
};
</script>

<template>
  <div ref="chart" v-resize-observer="handleResize"></div>
</template>
