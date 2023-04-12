<!-- eslint-disable vue/multi-word-component-names -->
<script>
import * as echarts from 'echarts';
import { uid } from '../../../utils/utils';
import GlPopover from '../../base/popover/popover.vue';
import { popoverPlacements } from '../../../utils/constants';

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
    top: {
      type: String,
      required: false,
      default: null,
    },
    bottom: {
      type: String,
      required: false,
      default: null,
    },
    left: {
      type: String,
      required: false,
      default: null,
    },
    right: {
      type: String,
      required: false,
      default: null,
    },
    placement: {
      type: String,
      required: false,
      default: popoverPlacements.right,
    },
  },
  computed: {
    containerId() {
      // if multiple tooltips are used in a chart component,
      // `this.id` can be used to uniquely identify them
      return `${this.chart.getDom().getAttribute('_echarts_instance_')}-tooltip-${this.id}`;
    },
    containerPosition() {
      const props = ['top', 'bottom', 'left', 'right'];

      return props.reduce((accumulator, prop) => {
        const position = this[prop];
        if (position) {
          accumulator[prop] = position;
        }

        return accumulator;
      }, {});
    },
  },
};
</script>

<template>
  <div>
    <!--
      Width and height need to be greater than 0px for the
      popover component to render within the following container
    -->
    <div
      :id="containerId"
      :style="containerPosition"
      style="width: 1px; height: 1px"
      class="gl-chart-tooltip"
    ></div>
    <!--
      Needs to be triggered programatically using `show` property
      This is why `triggers` is currently set to an empty string
    -->
    <gl-popover
      v-bind="$attrs"
      :target="containerId"
      :container="containerId"
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
