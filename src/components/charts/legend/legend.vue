<!-- eslint-disable vue/multi-word-component-names -->
<script>
import * as echarts from 'echarts';
import { GRAY_200 } from '../../../../dist/tokens/js/tokens';
import { defaultFontSize } from '../../../utils/charts/config';
import {
  LEGEND_LAYOUT_INLINE,
  LEGEND_LAYOUT_TABLE,
  LEGEND_AVERAGE_TEXT,
  LEGEND_CURRENT_TEXT,
  LEGEND_MIN_TEXT,
  LEGEND_MAX_TEXT,
} from '../../../utils/charts/constants';
import { average, engineeringNotation } from '../../../utils/number_utils';
import GlTruncate from '../../utilities/truncate/truncate.vue';
import GlChartSeriesLabel from '../series_label/series_label.vue';

export default {
  name: 'GlChartLegend',
  components: {
    GlChartSeriesLabel,
    GlTruncate,
  },
  props: {
    chart: {
      type: Object,
      required: true,
      validator(chart) {
        return Object.is(chart, echarts.getInstanceByDom(chart.getDom()));
      },
    },
    seriesInfo: {
      type: Array,
      required: true,
      validator(seriesInfo) {
        return seriesInfo.every((series) => series.type && series.name && series.color);
      },
    },
    textStyle: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    /**
     * Text for data average (overridden by prop if needed for internationalization)
     */
    averageText: {
      type: String,
      required: false,
      default: LEGEND_AVERAGE_TEXT,
    },
    currentText: {
      type: String,
      required: false,
      default: LEGEND_CURRENT_TEXT,
    },
    minText: {
      type: String,
      required: false,
      default: LEGEND_MIN_TEXT,
    },
    /**
     * Text for max amount (overridden by prop if needed for internationalization)
     */
    maxText: {
      type: String,
      required: false,
      default: LEGEND_MAX_TEXT,
    },
    /**
     * Sets the display layout
     */
    layout: {
      type: String,
      required: false,
      default: LEGEND_LAYOUT_INLINE,
      validator(layout) {
        return [LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE].indexOf(layout) !== -1;
      },
    },
  },
  data() {
    return {
      disabledSeries: {},
      lastActiveSeriesLabel: null,
    };
  },
  computed: {
    fontStyle() {
      return {
        fontFamily: this.textStyle.fontFamily || 'sans-serif',
        fontSize: `${this.textStyle.fontSize || defaultFontSize}px`,
      };
    },
    hasOneSeriesElement() {
      return this.seriesInfo.length === 1;
    },
  },
  created() {
    this.chart.on('legendselectchanged', this.suppressLastActiveSeriesLabelToggle);
  },
  beforeDestroy() {
    this.chart.off('legendselectchanged', this.suppressLastActiveSeriesLabelToggle);
  },
  methods: {
    sanitizeSeriesData(seriesData) {
      return seriesData?.filter((d) => !Number.isNaN(d)) ?? [];
    },
    seriesAverage(seriesData) {
      const sanitized = this.sanitizeSeriesData(seriesData);
      return engineeringNotation(average(...sanitized));
    },
    seriesMax(seriesData) {
      const sanitized = this.sanitizeSeriesData(seriesData);
      return engineeringNotation(Math.max(...sanitized));
    },
    seriesMin(seriesData) {
      const sanitized = this.sanitizeSeriesData(seriesData);
      return engineeringNotation(Math.min(...sanitized));
    },
    seriesLast(seriesData) {
      const sanitized = this.sanitizeSeriesData(seriesData);
      return engineeringNotation(sanitized[sanitized.length - 1]);
    },
    seriesNameIsLong(seriesName) {
      return seriesName.length > 120;
    },
    handleClick({ name, disabled }, key) {
      if (this.hasOneSeriesElement || this.isToggleDisabled(name, disabled)) return;

      this.chart.dispatchAction({ type: 'legendToggleSelect', name });
      this.disabledSeries = { ...this.disabledSeries, [key]: !this.disabledSeries[key] };
    },
    handleMouseEnter(name) {
      this.chart.dispatchAction({ type: 'highlight', seriesName: name });
    },
    handleMouseLeave(name) {
      this.chart.dispatchAction({ type: 'downplay', seriesName: name });
    },
    getColor(color, key) {
      return this.disabledSeries[key] ? GRAY_200 : color;
    },
    suppressLastActiveSeriesLabelToggle({ selected }) {
      const selectedSeriesLabels = Object.entries(selected).filter(([, isSelected]) =>
        Boolean(isSelected)
      );

      this.lastActiveSeriesLabel = null;

      if (selectedSeriesLabels.length === 1) {
        const [lastActiveSeriesLabelName] = selectedSeriesLabels[0];

        this.lastActiveSeriesLabel = lastActiveSeriesLabelName;
      }
    },
    /**
     * Disables toggling legend if it is the last active one or if its data series
     * has a disabled property set to true
     * @param {String} name Series name
     * @param {Boolean} isDisabled Value of the series element's disabled property
     * @returns {boolean}
     */
    isToggleDisabled(name, isDisabled) {
      return name === this.lastActiveSeriesLabel || isDisabled;
    },
  },
  legendLayoutTypes: {
    LEGEND_LAYOUT_INLINE,
    LEGEND_LAYOUT_TABLE,
  },
};
</script>

<template>
  <div class="gl-legend" data-testid="gl-chart-legend">
    <template v-if="layout === $options.legendLayoutTypes.LEGEND_LAYOUT_INLINE">
      <div class="gl-legend-inline">
        <div
          v-for="(series, key) in seriesInfo"
          :key="key"
          :class="{
            'text-muted': disabledSeries[key],
            'w-100': seriesNameIsLong(series.name),
            'gl-hover-cursor-not-allowed!':
              hasOneSeriesElement || isToggleDisabled(series.name, series.disabled),
          }"
          class="gl-legend-inline-series"
          :style="fontStyle"
          :aria-disabled="hasOneSeriesElement || isToggleDisabled(series.name, series.disabled)"
          role="button"
          @click="handleClick(series, key)"
          @mouseenter="handleMouseEnter(series.name)"
          @mouseleave="handleMouseLeave(series.name)"
        >
          <gl-chart-series-label
            :color="getColor(series.color, key)"
            :type="series.type"
            class="gl-legend-inline-series-label"
            :class="{ 'w-75': seriesNameIsLong(series.name) }"
          >
            <gl-truncate class="gl-font-weight-bold" :text="series.name" />
          </gl-chart-series-label>
          <span
            v-if="series.data && series.data.length"
            :class="{ 'gl-white-space-nowrap': seriesNameIsLong(series.name) }"
          >
            {{ averageText }}: {{ seriesAverage(series.data) }} · {{ maxText }}:
            {{ seriesMax(series.data) }}
          </span>
        </div>
      </div>
    </template>

    <template v-if="layout === $options.legendLayoutTypes.LEGEND_LAYOUT_TABLE">
      <div class="gl-legend-tabular" :style="fontStyle">
        <header class="gl-legend-tabular-header">
          <div class="gl-legend-tabular-header-cell">{{ minText }}</div>
          <div class="gl-legend-tabular-header-cell">{{ maxText }}</div>
          <div class="gl-legend-tabular-header-cell">{{ averageText }}</div>
          <div class="gl-legend-tabular-header-cell">{{ currentText }}</div>
        </header>
        <section class="gl-legend-tabular-body">
          <div
            v-for="(series, key) in seriesInfo"
            :key="key"
            :class="{
              'text-muted': disabledSeries[key],
              'gl-hover-cursor-not-allowed!':
                hasOneSeriesElement || isToggleDisabled(series.name, series.disabled),
            }"
            class="gl-legend-tabular-row"
            :style="fontStyle"
            :aria-disabled="isToggleDisabled(series.name, series.disabled)"
            role="button"
            @click="handleClick(series, key)"
            @mouseenter="handleMouseEnter(series.name)"
            @mouseleave="handleMouseLeave(series.name)"
          >
            <div class="gl-legend-tabular-title-cell">
              <gl-chart-series-label
                :color="getColor(series.color, key)"
                :style="fontStyle"
                :type="series.type"
              >
                <gl-truncate class="gl-font-weight-bold" :text="series.name" />
              </gl-chart-series-label>
            </div>

            <template v-if="sanitizeSeriesData(series.data).length">
              <div class="gl-legend-tabular-details-cell">{{ seriesMin(series.data) }}</div>
              <div class="gl-legend-tabular-details-cell">{{ seriesMax(series.data) }}</div>
              <div class="gl-legend-tabular-details-cell">{{ seriesAverage(series.data) }}</div>
              <div class="gl-legend-tabular-details-cell">{{ seriesLast(series.data) }}</div>
            </template>
            <template v-else>
              <div class="gl-legend-tabular-details-cell">-</div>
              <div class="gl-legend-tabular-details-cell">-</div>
              <div class="gl-legend-tabular-details-cell">-</div>
              <div class="gl-legend-tabular-details-cell">-</div>
            </template>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>
