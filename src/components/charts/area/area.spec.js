import { nextTick } from 'vue';
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

  const createShallowWrapper = ({ props = {}, slots = {} } = {}) => {
    wrapper = shallowMount(AreaChart, {
      propsData: { option: { series: [] }, data: [], ...props },
      stubs: {
        'chart-tooltip': ChartTooltipStub,
      },
      slots,
    });
    emitChartCreated();
  };

  beforeEach(() => {
    mockChartInstance = createMockChartInstance();
  });

  it('emits `created`, with the chart instance', async () => {
    createShallowWrapper();

    await nextTick();

    expect(wrapper.emitted('created').length).toBe(1);
    expect(wrapper.emitted('created')[0][0]).toBe(mockChartInstance);
  });

  describe('Annotations tooltips', () => {
    it('are hidden by default', async () => {
      createShallowWrapper();

      await nextTick();

      expect(findAnnotationsTooltip().exists()).toBe(false);
    });

    it('are displayed if passed via annotations props', async () => {
      createShallowWrapper({
        props: {
          annotations: [
            {
              min: '',
              max: '',
            },
          ],
        },
      });

      await nextTick();

      expect(findAnnotationsTooltip().exists()).toBe(true);
    });

    it('are displayed if passed via option props', async () => {
      createShallowWrapper({
        props: {
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
        },
      });

      await nextTick();

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
        props: {
          annotations: [
            {
              min: '',
              max: '',
            },
          ],
        },
      });

      wrapper.vm.onChartDataPointMouseOver(params);

      await nextTick();

      expect(findAnnotationsTooltip().html()).toContain(params.data.xAxis);
      expect(findAnnotationsTooltip().html()).toContain(params.data.tooltipData.content);
    });
  });

  describe('data tooltip is set', () => {
    beforeEach(() => {
      createShallowWrapper();
    });

    it('is initialized', () => {
      expect(findDataTooltip().props('chart')).toBe(mockChartInstance);
    });
  });

  describe('legend', () => {
    it('is inline by default', async () => {
      createShallowWrapper();

      await nextTick();

      expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
    });

    it('is inline if correct prop value is set', async () => {
      createShallowWrapper({
        props: {
          legendLayout: LEGEND_LAYOUT_INLINE,
        },
      });

      await nextTick();

      expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
    });

    it('is tabular if correct prop value is set', async () => {
      createShallowWrapper({
        props: {
          legendLayout: LEGEND_LAYOUT_TABLE,
        },
      });

      await nextTick();

      expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_TABLE);
    });

    it('displays custom series info when prop is set', async () => {
      const legendSeriesInfo = [
        {
          name: 'Custom Legend Item',
          type: 'solid',
          color: '#000',
          data: [10, 20, 30],
        },
      ];

      createShallowWrapper({
        props: {
          legendSeriesInfo,
        },
      });

      await nextTick();

      expect(findLegend().props('seriesInfo')).toEqual(expect.arrayContaining(legendSeriesInfo));
    });
  });

  describe('height', () => {
    expectHeightAutoClasses({
      createComponent: (props) => createShallowWrapper({ props: { ...props } }),
      findContainer: () => wrapper,
      findChart,
    });
  });
});
