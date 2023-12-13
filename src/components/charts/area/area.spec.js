import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';

import { LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE } from '~/utils/charts/constants';
import {
  createMockChartInstance,
  ChartTooltipStub,
  chartTooltipStubData,
} from '~helpers/chart_stubs';
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

  const createShallowWrapper = ({ props = {}, ...options } = {}) => {
    wrapper = shallowMount(AreaChart, {
      propsData: { option: { series: [] }, data: [], ...props },
      stubs: {
        'chart-tooltip': ChartTooltipStub,
      },
      ...options,
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

  describe('data tooltip', () => {
    it('is initialized', async () => {
      createShallowWrapper();

      await nextTick();

      expect(findDataTooltip().props()).toMatchObject({
        useDefaultTooltipFormatter: true,
        chart: mockChartInstance,
      });
    });

    describe('is customized via slots', () => {
      const { params, title, content } = chartTooltipStubData;
      const value = params.seriesData[0].value[1];

      it('customizes tooltip value', async () => {
        const tooltipValueSlot = jest.fn().mockReturnValue('Value');

        createShallowWrapper({
          scopedSlots: {
            'tooltip-value': tooltipValueSlot,
          },
        });
        await nextTick();

        expect(tooltipValueSlot).toHaveBeenCalledWith({ value });
        expect(findDataTooltip().text()).toBe('Value');
      });

      it('customizes title', async () => {
        const tooltipTitleSlot = jest.fn().mockReturnValue('Title');

        createShallowWrapper({
          scopedSlots: {
            'tooltip-title': tooltipTitleSlot,
          },
        });
        await nextTick();

        expect(tooltipTitleSlot).toHaveBeenCalledWith({
          params,
          title,
        });
        expect(findDataTooltip().text()).toBe('Title');
      });

      it('customizes content', async () => {
        const tooltipContentSlot = jest.fn().mockReturnValue('Title');

        createShallowWrapper({
          scopedSlots: {
            'tooltip-content': tooltipContentSlot,
          },
        });
        await nextTick();

        expect(tooltipContentSlot).toHaveBeenCalledWith({
          params,
          content,
        });
        expect(findDataTooltip().text()).toBe('Title');
      });
    });

    it('is customized via formatting function', async () => {
      createShallowWrapper({
        props: {
          formatTooltipText: jest.fn(),
        },
      });

      await nextTick();

      expect(findDataTooltip().props()).toMatchObject({
        useDefaultTooltipFormatter: false,
        chart: mockChartInstance,
      });
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
