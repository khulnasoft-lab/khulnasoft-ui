import { shallowMount } from '@vue/test-utils';

import { LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE } from '~/utils/charts/constants';
import { createMockChartInstance, ChartTooltipStub } from '~helpers/chart_stubs';
import { expectHeightAutoClasses } from '~helpers/chart_height';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import AreaChart from './area.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

describe('area component', () => {
  let wrapper;

  const findChart = () => wrapper.findComponent(Chart);
  const findLegend = () => wrapper.findComponent(ChartLegend);
  const findDataTooltip = () => wrapper.findComponent({ ref: 'dataTooltip' });
  const findAnnotationsTooltip = () => wrapper.findComponent({ ref: 'annotationsTooltip' });

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  const createShallowWrapper = (props = {}) => {
    wrapper = shallowMount(AreaChart, {
      propsData: { option: { series: [] }, data: [], ...props },
      stubs: {
        'chart-tooltip': ChartTooltipStub,
      },
    });
    emitChartCreated();
  };

  beforeEach(() => {
    mockChartInstance = createMockChartInstance();
  });

  it('emits `created`, with the chart instance', async () => {
    createShallowWrapper();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('created').length).toBe(1);
    expect(wrapper.emitted('created')[0][0]).toBe(mockChartInstance);
  });

  describe('Annotations tooltips', () => {
    it('are hidden by default', async () => {
      createShallowWrapper();

      await wrapper.vm.$nextTick();

      expect(findAnnotationsTooltip().exists()).toBe(false);
    });

    it('are displayed if passed via annotations props', async () => {
      createShallowWrapper({
        annotations: [
          {
            min: '',
            max: '',
          },
        ],
      });

      await wrapper.vm.$nextTick();

      expect(findAnnotationsTooltip().exists()).toBe(true);
    });

    it('are displayed if passed via option props', async () => {
      createShallowWrapper({
        option: {
          series: [
            {
              name: 'annotations',
              markPoint: {
                data: [
                  {
                    xAxis: 10,
                  },
                ],
              },
              data: [],
            },
          ],
        },
      });

      await wrapper.vm.$nextTick();

      expect(findAnnotationsTooltip().exists()).toBe(true);
    });

    it('has a default title and content when hovered', async () => {
      const params = {
        name: 'annotations',
        componentType: 'markPoint',
        data: {
          xAxis: '2018-01-25T01:00:00.000Z',
          tooltipData: { content: 'Scranton strangler was caught.' },
        },
        event: {
          event: {
            zrX: 100,
            zrY: 100,
          },
        },
      };

      createShallowWrapper({
        annotations: [
          {
            min: '',
            max: '',
          },
        ],
      });

      wrapper.vm.onChartDataPointMouseOver(params);

      await wrapper.vm.$nextTick();

      expect(findAnnotationsTooltip().html()).toContain(params.data.xAxis);
      expect(findAnnotationsTooltip().html()).toContain(params.data.tooltipData.content);
    });
  });

  describe('tooltip position', () => {
    const dataTooltipTitle = 'FooBar';

    beforeEach(() => {
      createShallowWrapper();
    });

    it('is initialized', () => {
      expect(findDataTooltip().props('left')).toBe('0');
      expect(findDataTooltip().props('top')).toBe('0');
      expect(findDataTooltip().text()).not.toContain(dataTooltipTitle);
    });

    it('is reset when mouse moves', async () => {
      const left = '10px';
      const top = '30px';

      wrapper.setData({ dataTooltipPosition: { left, top }, dataTooltipTitle });

      await wrapper.vm.$nextTick();

      expect(findDataTooltip().props('left')).toBe(`${left}`);
      expect(findDataTooltip().props('top')).toBe(`${top}`);
      expect(findDataTooltip().text()).toContain(dataTooltipTitle);
    });
  });

  describe('legend', () => {
    it('is inline by default', async () => {
      createShallowWrapper();

      await wrapper.vm.$nextTick();

      expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
    });

    it('is inline if correct prop value is set', async () => {
      createShallowWrapper({
        legendLayout: LEGEND_LAYOUT_INLINE,
      });

      await wrapper.vm.$nextTick();

      expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
    });

    it('is tabular if correct prop value is set', async () => {
      createShallowWrapper({
        legendLayout: LEGEND_LAYOUT_TABLE,
      });

      await wrapper.vm.$nextTick();

      expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_TABLE);
    });
  });

  describe('height', () => {
    expectHeightAutoClasses({
      createComponent: createShallowWrapper,
      findContainer: () => wrapper,
      findChart,
    });
  });
});
