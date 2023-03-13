import { shallowMount } from '@vue/test-utils';
import { createMockChartInstance } from '~helpers/chart_stubs';
import { expectHeightAutoClasses } from '~helpers/chart_height';
import Chart from '../chart/chart.vue';
import DiscreteScatterChart from './discrete_scatter.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

describe('column chart component', () => {
  const defaultChartProps = {
    xAxisTitle: 'x axis',
    yAxisTitle: 'y axis',
    xAxisType: 'category',
    data: [['19 May', 6.95]],
  };
  let wrapper;

  const findChart = () => wrapper.findComponent(Chart);

  const createComponent = (props = {}) => {
    wrapper = shallowMount(DiscreteScatterChart, {
      propsData: { ...defaultChartProps, ...props },
    });
  };

  beforeEach(() => {
    mockChartInstance = createMockChartInstance();
  });

  describe('height', () => {
    expectHeightAutoClasses({
      createComponent,
      findContainer: () => wrapper,
      findChart,
    });
  });
});
