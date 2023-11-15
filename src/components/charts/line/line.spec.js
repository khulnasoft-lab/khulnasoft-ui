import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';

import { LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE } from '~/utils/charts/constants';
import { createMockChartInstance, ChartTooltipStub } from '~helpers/chart_stubs';
import { textContentWithSpaces } from '~helpers/html_string_with_spaces';
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

  const createShallowWrapper = ({ props = {}, ...mountOptions } = {}) => {
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

  describe('data tooltip', () => {
    const mockDataTooltipParams = {
      seriesData: [
        { seriesName: 'Requested', value: ['Thu', 1226], color: '#617ae2' },
        { seriesName: 'Actual', value: ['Thu', 1287], color: '#b14f18' },
        { seriesName: 'Predicted', value: ['Thu', 1503], color: '#0090b1' },
      ],
    };

    beforeEach(() => {
      createShallowWrapper({
        stubs: {
          'chart-tooltip': ChartTooltipStub,
          TooltipDefaultFormat,
        },
      });
    });

    it('is initialized', () => {
      expect(findDataTooltip().props('chart')).toBe(mockChartInstance);
    });

    it('shows default tooltip', async () => {
      findChart().props('options').xAxis.axisPointer.label.formatter(mockDataTooltipParams); // trigger tooltip with given params
      await nextTick();

      expect(textContentWithSpaces(findDataTooltip().html())).toBe(
        'Thu (Value) Requested 1226 Actual 1287 Predicted 1503'
      );
    });

    it('shows custom tooltip', async () => {
      const tooltipTitleSlot = jest.fn().mockReturnValue('Tooltip Title:');
      const tooltipContentSlot = jest.fn().mockReturnValue('Tooltip Content');

      createShallowWrapper({
        stubs: {
          'chart-tooltip': ChartTooltipStub,
          TooltipDefaultFormat,
        },
        scopedSlots: {
          'tooltip-title': tooltipTitleSlot,
          'tooltip-content': tooltipContentSlot,
        },
      });

      findChart().props('options').xAxis.axisPointer.label.formatter(mockDataTooltipParams); // trigger tooltip with given params
      await nextTick();

      expect(tooltipTitleSlot).toHaveBeenCalledWith({
        title: 'Thu (Value)',
        params: mockDataTooltipParams,
      });
      expect(tooltipContentSlot).toHaveBeenCalledWith({
        content: {
          Requested: { value: 1226, color: '#617ae2' },
          Actual: { value: 1287, color: '#b14f18' },
          Predicted: { value: 1503, color: '#0090b1' },
        },
        params: mockDataTooltipParams,
      });

      expect(textContentWithSpaces(findDataTooltip().html())).toBe(
        'Tooltip Title: Tooltip Content'
      );
    });
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
        stubs: {
          'chart-tooltip': ChartTooltipStub,
        },
      });

      wrapper.vm.onChartDataPointMouseOver(params);

      await nextTick();

      expect(findAnnotationsTooltip().html()).toContain(params.data.xAxis);
      expect(findAnnotationsTooltip().html()).toContain(params.data.tooltipData.content);
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
    it('can be hidden', async () => {
      createShallowWrapper({
        props: {
          showLegend: false,
        },
      });

      await nextTick();

      expect(findLegend().exists()).toBe(false);
    });
  });

  describe('height', () => {
    expectHeightAutoClasses({
      createComponent: (props) => createShallowWrapper({ props }),
      findContainer: () => wrapper,
      findChart,
    });
  });
});
