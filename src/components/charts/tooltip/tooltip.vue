<!-- eslint-disable vue/multi-word-component-names -->
<script>
import * as echarts from 'echarts';
import { uid, debounceByAnimationFrame } from '../../../utils/utils';
import GlPopover from '../../base/popover/popover.vue';
import { popoverPlacements } from '../../../utils/constants';
import { TOOLTIP_LEFT_OFFSET, TOOLTIP_TOP_OFFSET } from '../../../utils/charts/constants';
import { getTooltipTitle, getTooltipContent } from '../../../utils/charts/config';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';

export default {
  name: 'GlChartTooltip',
  components: {
    GlPopover,
    TooltipDefaultFormat,
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

    /**
     * Set to true to use the default tooltip formatter.
     */
    useDefaultTooltipFormatter: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      pointerPosition: null,
      isPointerInChart: false,

      debouncedMouseHandler: debounceByAnimationFrame(this.mouseHandler),

      title: null,
      content: {},
      params: null,
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

    if (this.useDefaultTooltipFormatter) {
      this.chart.setOption({
        xAxis: {
          axisPointer: {
            show: true,
            label: {
              formatter: (params) => {
                const options = this.chart.getOption();
                const titleAxisName = options.xAxis?.[0]?.name;
                const valueAxisName = options.yAxis?.[0]?.name;

                this.title = getTooltipTitle(params, titleAxisName);
                this.content = getTooltipContent(params, valueAxisName);
                this.params = params;
              },
            },
          },
        },
      });
    }
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
      <template #title>
        <!--
          @slot Tooltip title
          @binding {string} title - Default title
          @binding {object} params
        -->
        <slot name="title" v-bind="{ title, params }">{{ title }}</slot>
      </template>
      <!--
        @slot Tooltip content
        @binding {object} content - Key-value pairs of series information
        @binding {object} params - Full list of params from `onLabelChange`. Can be null before tooltip is shown
       -->
      <slot v-bind="{ content, params }">
        <tooltip-default-format :tooltip-content="content">
          <template v-if="$scopedSlots['tooltip-value']" #tooltip-value="scope">
            <!-- @slot Tooltip value formatter -->
            <slot name="tooltip-value" v-bind="scope"></slot>
          </template>
        </tooltip-default-format>
      </slot>
    </gl-popover>
  </div>
</template>
