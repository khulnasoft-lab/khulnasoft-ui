import { shallowMount } from '@vue/test-utils';
import { createMockChartInstance, ChartTooltipStub } from '~helpers/chart_stubs';
import { expectHeightAutoClasses } from '~helpers/chart_height';
import {
  mockDefaultLineData,
  mockDefaultBarData,
  mockSecondaryData,
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
  const findTooltip = () => wrapper.findComponent(ChartTooltipStub);
  const getChartOptions = () => findChart().props('options');

  const factory = (props = defaultChartProps, slots = {}) => {
    wrapper = shallowMount(ColumnChart, {
      propsData: { ...props },
      stubs: {
        'chart-tooltip': ChartTooltipStub,
      },
      listeners: {
        chartItemClicked: chartItemClickedSpy,
      },
      data() {
        return {
          chart: mockChartInstance,
        };
      },
      slots,
    });
  };

  beforeEach(() => {
    mockChartInstance = createMockChartInstance();

    factory();
  });

  it('emits "created" when onCreated is called', () => {
    wrapper.vm.onCreated(wrapper.vm.chart);

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

  describe('tooltip', () => {
    it('displays the generic tooltip content', async () => {
      const params = {
        seriesData: [{ seriesIndex: '0', seriesName: 'Full', value: ['Mary', 934] }],
      };

      getChartOptions().xAxis.axisPointer.label.formatter(params);

      await wrapper.vm.$nextTick();

      const expectedTooltipTitle = `${params.seriesData[0].value[0]} (${defaultChartProps.xAxisTitle})`;

      expect(findTooltip().text()).toContain(expectedTooltipTitle);
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
