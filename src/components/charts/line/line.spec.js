import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';

import { LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE } from '~/utils/charts/constants';
import { createMockChartInstance, ChartTooltipStub } from '~helpers/chart_stubs';
import { expectHeightAutoClasses } from '~helpers/chart_height';

import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';

import LineChart from './line.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

describe('line component', () => {
  let wrapper;
  let option;

  const findChart = () => wrapper.findComponent(Chart);
  const findLegend = () => wrapper.findComponent(ChartLegend);
  const findDataTooltip = () => wrapper.findComponent({ ref: 'dataTooltip' });
  const findAnnotationsTooltip = () => wrapper.findComponent({ ref: 'annotationsTooltip' });

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  const createShallowWrapper = (props = {}, mountOptions = {}) => {
    wrapper = shallowMount(LineChart, {
      propsData: { option, data: [], ...props },
      ...mountOptions,
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
        annotations: [
          {
            min: '',
            max: '',
          },
        ],
      });

      await nextTick();

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

      createShallowWrapper(
        {
          annotations: [
            {
              min: '',
              max: '',
            },
          ],
        },
        {
          stubs: {
            'chart-tooltip': ChartTooltipStub,
          },
        }
      );

      wrapper.vm.onChartDataPointMouseOver(params);

      await nextTick();

      expect(findAnnotationsTooltip().html()).toContain(params.data.xAxis);
      expect(findAnnotationsTooltip().html()).toContain(params.data.tooltipData.content);
    });
  });

  describe('tooltip', () => {
    const tooltipParams = {
      seriesData: [
        {
          seriesName: 'Series 1',
          value: ['x', 1000],
          color: '#fff',
        },
        {
          seriesName: 'Series 2',
          value: ['x', 1001],
          color: '#fff',
        },
      ],
    };

    it('renders tooltip', async () => {
      createShallowWrapper(
        {},
        {
          stubs: { TooltipDefaultFormat },
        }
      );

      wrapper.vm.defaultFormatTooltipText(tooltipParams); // force render of a tooltip
      await nextTick();

      const tooltipText = findDataTooltip().text();
      expect(tooltipText).toContain('1000');
      expect(tooltipText).toContain('1001');
    });

    it('renders formatted tooltip values', async () => {
      createShallowWrapper(
        {},
        {
          stubs: { TooltipDefaultFormat },
          scopedSlots: {
            'tooltip-value': ({ value }) => `$ ${value.toLocaleString()}`,
          },
        }
      );

      wrapper.vm.defaultFormatTooltipText(tooltipParams); // force render of a tooltip
      await nextTick();

      const tooltipText = findDataTooltip().text();
      expect(tooltipText).toContain('$ 1,000');
      expect(tooltipText).toContain('$ 1,001');
    });
  });

  describe('tooltip position', () => {
    const dataTooltipTitle = 'FooBar';

    beforeEach(() => {
      createShallowWrapper(
        {},
        {
          stubs: {
            'chart-tooltip': ChartTooltipStub,
          },
        }
      );
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

      await nextTick();

      expect(findDataTooltip().props('left')).toBe(`${left}`);
      expect(findDataTooltip().props('top')).toBe(`${top}`);
      expect(findDataTooltip().text()).toContain(dataTooltipTitle);
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
        legendLayout: LEGEND_LAYOUT_INLINE,
      });

      await nextTick();

      expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
    });

    it('is tabular if correct prop value is set', async () => {
      createShallowWrapper({
        legendLayout: LEGEND_LAYOUT_TABLE,
      });

      await nextTick();

      expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_TABLE);
    });
    it('can be hidden', async () => {
      createShallowWrapper({
        showLegend: false,
      });

      await nextTick();

      expect(findLegend().exists()).toBe(false);
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
