<script>
import echarts from 'echarts';
import { defaultHeight, validRenderers } from '../../../utils/charts/config';
import createTheme, { themeName } from '../../../utils/charts/theme';

export default {
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
  mounted() {
    /* eslint-disable promise/catch-or-return, promise/always-return */
    this.$nextTick().then(() => {
      this.chart = echarts.init(this.$refs.chart, this.disableTheme ? null : themeName, {
        renderer: this.renderer,
      });
      if (this.groupId.length) {
        this.chart.group = this.groupId;
        echarts.connect(this.groupId);
      }
      this.chart.on('click', this.clickHandler);
      /**
       * Emitted after calling `echarts.init`
       */
      this.$emit('created', this.chart);
      this.draw();
      this.setChartSize();
    });
    /* eslint-enable */
  },
  beforeDestroy() {
    this.chart.off('click', this.clickHandler);
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
    clickHandler(params) {
      /**
       * Emitted when clicked on a data item in the chart (e.g., a bar/column).
       *
       * @property {object} chart The chart instance
       * @property {object} params A params object, see also https://echarts.apache.org/en/api.html#events.Mouse%20events
       */
      this.$emit('chartItemClicked', { chart: this.chart, params });
    },
  },
};
</script>

<template>
  <div ref="chart"></div>
</template>
