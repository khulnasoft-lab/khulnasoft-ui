import { shallowMount } from '@vue/test-utils';

import { nextTick } from 'vue';
import { createMockChartInstance } from '~helpers/chart_stubs';
import { expectHeightAutoClasses } from '~helpers/chart_height';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import HeatMapChart from './heatmap.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

describe('heatmap component', () => {
  let wrapper;

  const findChart = () => wrapper.findComponent(Chart);
  const findChartTooltip = () => wrapper.findComponent(ChartTooltip);
  const getOptions = () => findChart().props('options');

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  const createComponent = (props = {}) => {
    wrapper = shallowMount(HeatMapChart, {
      propsData: {
        options: { series: [] },
        dataSeries: [],
        ...props,
      },
    });

    emitChartCreated();
  };

  beforeEach(async () => {
    mockChartInstance = createMockChartInstance();
  });

  it('emits `created`, with the chart instance', () => {
    createComponent();

    expect(wrapper.emitted('created').length).toBe(1);
    expect(wrapper.emitted('created')[0][0]).toBe(mockChartInstance);
  });

  describe('tooltip position', () => {
    beforeEach(() => {
      createComponent();
    });

    it('is initialized', () => {
      expect(findChartTooltip().props('left')).toBe('0');
      expect(findChartTooltip().props('top')).toBe('0');
    });

    it('is reset when the xAxis formatter is triggered', () => {
      const seriesId = 'Series Name0';
      const value = ['2020-02-10T06:45:26.879Z', 0.002671530922619002];
      const pixel = [66, 99];

      const params = {
        seriesData: [{ seriesId, value }],
      };

      mockChartInstance.convertToPixel.mockReturnValueOnce(pixel);

      getOptions().xAxis.axisPointer.label.formatter(params);

      return wrapper.vm.$nextTick(() => {
        expect(mockChartInstance.convertToPixel).toHaveBeenCalledWith({ seriesId }, value);

        expect(findChartTooltip().props('left')).toBe(`${pixel[0]}px`);
        expect(findChartTooltip().props('top')).toBe(`${pixel[1]}px`);
      });
    });
  });

  describe('showTooltip', () => {
    it('is true by default', async () => {
      createComponent();
      await nextTick();

      expect(findChartTooltip().props('show')).toBe(true);
    });

    it('sets show prop on the tooltip component', async () => {
      createComponent({ showTooltip: false });
      await nextTick();

      expect(findChartTooltip().props('show')).toBe(false);
    });
  });

  describe('height', () => {
    expectHeightAutoClasses({
      createComponent,
      findContainer: () => wrapper,
      findChart,
    });
  });
});
