<!-- eslint-disable vue/multi-word-component-names -->
<script>
import * as echarts from 'echarts';
import { uid, debounceByAnimationFrame } from '../../../utils/utils';
import GlPopover from '../../base/popover/popover.vue';
import { popoverPlacements } from '../../../utils/constants';
import { TOOLTIP_LEFT_OFFSET, TOOLTIP_TOP_OFFSET } from '../../../utils/charts/constants';

export default {
  name: 'GlChartTooltip',
  components: {
    GlPopover,
  },
  inheritAttrs: false,
  props: {
    chart: {
      type: Object,
      required: true,
      validator(chart) {
        return Object.is(chart, echarts.getInstanceByDom(chart.getDom()));
      },
    },
    id: {
      type: String,
      required: false,
      default: () => uid(),
    },
    /**
     * Position of the popover respective to the chart.
     * Sets the `top` style property.
     */
    top: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Position of the popover respective to the chart.
     * Sets the `bottom` style property.
     */
    bottom: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Position of the popover respective to the chart.
     * Sets the `left` style property.
     */
    left: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Position of the popover respective to the chart.
     * Sets the `right` style property.
     */
    right: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Set to `true` to show, set to `false` to not show.
     * Set to `null` to show only when the mouse is in the chart.
     */
    show: {
      type: Boolean,
      required: false,
      default: null,
    },
    /**
     * Popover placement
     */
    placement: {
      type: String,
      required: false,
      default: popoverPlacements.right,
    },
    /**
     * Distance between the popover and the pointer when
     * no position is defined
     */
    xOffset: {
      type: Number,
      required: false,
      default: TOOLTIP_LEFT_OFFSET,
      validator(value) {
        // popover target must have a size of at least 1
        return value >= 1;
      },
    },
    /**
     * Distance between the popover and the pointer when
     * no position is defined
     */
    yOffset: {
      type: Number,
      required: false,
      default: TOOLTIP_TOP_OFFSET,
      validator(value) {
        // popover target must have a size of at least 1
        return value >= 1;
      },
    },
  },
  data() {
    return {
      pointerPosition: null,
      isPointerInChart: false,

      debouncedMouseHandler: debounceByAnimationFrame(this.mouseHandler),
    };
  },
  computed: {
    targetId() {
      // if multiple tooltips are used in a chart component,
      // `this.id` can be used to uniquely identify them
      return `${this.chart.getDom().getAttribute('_echarts_instance_')}-tooltip-${this.id}`;
    },
    targetStyle() {
      // the target is a rectangular space between cursor and popover
      return {
        marginTop: `${-this.yOffset}px`,
        height: `${this.yOffset * 2}px`,

        marginLeft: `${-this.xOffset}px`,
        width: `${this.xOffset * 2}px`,
      };
    },
    fixedPosition() {
      const { top, left, bottom, right } = this;
      if (top || left || bottom || right) {
        return { top, left, bottom, right };
      }
      return null;
    },
    shouldShowPopover() {
      if (this.show !== null) {
        return this.show;
      }
      return this.isPointerInChart;
    },
  },
  created() {
    this.chart.getZr().on('mousemove', this.debouncedMouseHandler);
    this.chart.getZr().on('mouseout', this.debouncedMouseHandler);
  },
  beforeDestroy() {
    this.chart.getZr().off('mousemove', this.debouncedMouseHandler);
    this.chart.getZr().off('mouseout', this.debouncedMouseHandler);
  },
  methods: {
    mouseHandler(event) {
      let { zrX: x, zrY: y } = event.event;

      if (Number.isFinite(x) && Number.isFinite(y)) {
        x = Math.round(x);
        y = Math.round(y);

        this.pointerPosition = {
          left: `${x}px`,
          top: `${y}px`,
        };
        this.isPointerInChart = this.chart.containPixel('grid', [x, y]);
      }
    },
  },
};
</script>

<template>
  <div v-if="chart" class="gl-pointer-events-none">
    <div
      :id="targetId"
      :style="{ ...(fixedPosition || pointerPosition), ...targetStyle }"
      class="gl-chart-tooltip"
    ></div>
    <!--
      Is shown using `show` property directly so
      `triggers` are set to an empty string
    -->
    <gl-popover
      v-bind="$attrs"
      :show="shouldShowPopover"
      :target="targetId"
      :container="targetId"
      :placement="placement"
      triggers=""
    >
      <template v-if="$scopedSlots.title" #title>
        <slot name="title"></slot>
      </template>
      <slot></slot>
    </gl-popover>
  </div>
</template>
