import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import {
  createMockChartInstance,
  ChartTooltipStub,
  chartTooltipStubData,
} from '~helpers/chart_stubs';
import { expectHeightAutoClasses } from '~helpers/chart_height';
import {
  mockDefaultLineData,
  mockDefaultBarData,
  mockSecondaryData,
  mockDefaultStackedBarData,
} from '../../../utils/charts/mock_data';
import Chart from '../chart/chart.vue';
import ColumnChart from './column.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

describe('column chart component', () => {
  const defaultChartProps = {
    xAxisTitle: 'x axis',
    yAxisTitle: 'y axis',
    xAxisType: 'category',
    bars: mockDefaultBarData,
  };
  let wrapper;

  const chartItemClickedSpy = jest.fn();
  const findChart = () => wrapper.findComponent(Chart);
  const findChartTooltip = () => wrapper.findComponent({ ref: 'dataTooltip' });

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  const factory = (props = defaultChartProps, options = {}) => {
    wrapper = shallowMount(ColumnChart, {
      propsData: { ...props },
      listeners: {
        chartItemClicked: chartItemClickedSpy,
      },
      ...options,
    });
  };

  describe('mounted', () => {
    beforeEach(() => {
      factory();

      mockChartInstance = createMockChartInstance();
      emitChartCreated();
    });

    it('emits "created" when onCreated is called', () => {
      expect(wrapper.emitted('created')).toHaveLength(1);
    });

    it('calls event listener when "chartItemClicked" is emitted on the Chart component', () => {
      findChart().vm.$emit('chartItemClicked');

      expect(chartItemClickedSpy).toHaveBeenCalled();
    });

    it('should correctly render the chart', () => {
      const chart = findChart();

      expect(chart.props('options')).toMatchSnapshot();
    });
  });

  describe('with line data provided', () => {
    beforeEach(() => {
      factory({
        ...defaultChartProps,
        bars: [],
        lines: mockDefaultLineData,
      });
    });
    it('should correctly render the chart', () => {
      expect(findChart().props('options')).toMatchSnapshot();
    });
  });

  describe('with secondary axis data provided', () => {
    const secondaryDataTitle = 'Column test secondary';

    beforeEach(() => {
      factory({
        ...defaultChartProps,
        secondaryData: mockSecondaryData,
        secondaryDataTitle,
      });
    });
    it('should correctly render the chart', () => {
      const chart = findChart();

      expect(chart.props('options')).toMatchSnapshot();
    });

    it('should set the secondary Y axis name', () => {
      const chart = findChart();

      expect(chart.props('options').yAxis[1].name).toEqual(secondaryDataTitle);
    });
  });

  describe('with multiple series data provided', () => {
    it('should pass through custom stack series property', () => {
      factory({
        ...defaultChartProps,
        bars: mockDefaultStackedBarData.map((series) => ({
          ...series,
          stack: 'some-custom-stack',
        })),
      });

      const hasExpectedStackProperty = findChart()
        .props('options')
        .series.every((series) => series.stack === 'some-custom-stack');

      expect(hasExpectedStackProperty).toBe(true);
    });
  });

  describe('tooltip', () => {
    it('configures chart tooltip', async () => {
      factory(defaultChartProps, {
        stubs: {
          'chart-tooltip': ChartTooltipStub,
        },
      });
      mockChartInstance = createMockChartInstance();
      emitChartCreated();
      await nextTick();

      expect(findChartTooltip().props()).toMatchObject({
        chart: mockChartInstance,
        useDefaultTooltipFormatter: true,
      });
    });

    describe('custom tooltip slots', () => {
      const { params, title, content } = chartTooltipStubData;

      it('customizes value', async () => {
        const tooltipValueSlot = jest.fn().mockReturnValue('Custom tooltip value');

        factory(defaultChartProps, {
          stubs: {
            'chart-tooltip': ChartTooltipStub,
          },
          scopedSlots: {
            'tooltip-value': tooltipValueSlot,
          },
        });

        mockChartInstance = createMockChartInstance();
        emitChartCreated();
        await nextTick();

        expect(tooltipValueSlot).toHaveBeenCalledWith({ value: 9 });
        expect(findChartTooltip().text()).toBe('Custom tooltip value');
      });

      it('customizes title', async () => {
        const tooltipTitleSlot = jest.fn().mockReturnValue('Custom tooltip title');

        factory(defaultChartProps, {
          stubs: {
            'chart-tooltip': ChartTooltipStub,
          },
          scopedSlots: {
            'tooltip-title': tooltipTitleSlot,
          },
        });

        mockChartInstance = createMockChartInstance();
        emitChartCreated();
        await nextTick();

        expect(tooltipTitleSlot).toHaveBeenCalledWith({
          params,
          title,
        });
        expect(findChartTooltip().text()).toBe('Custom tooltip title');
      });

      it('customizes content', async () => {
        const tooltipContentSlot = jest.fn().mockReturnValue('Custom tooltip content');

        factory(defaultChartProps, {
          stubs: {
            'chart-tooltip': ChartTooltipStub,
          },
          scopedSlots: {
            'tooltip-content': tooltipContentSlot,
          },
        });

        mockChartInstance = createMockChartInstance();
        emitChartCreated();
        await nextTick();

        expect(tooltipContentSlot).toHaveBeenCalledWith({
          params,
          content,
        });
        expect(findChartTooltip().text()).toBe('Custom tooltip content');
      });
    });
  });

  describe('height', () => {
    expectHeightAutoClasses({
      createComponent: (props) => factory({ ...defaultChartProps, ...props }),
      findContainer: () => wrapper,
      findChart,
    });
  });
});
