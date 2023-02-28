import { shallowMount } from '@vue/test-utils';
import TooltipDefaultFormat from '~/components/shared_components/charts/tooltip_default_format.vue';
import { createMockChartInstance } from '~helpers/chart_stubs';
import { expectHeightAutoClasses } from '~helpers/chart_height';
import Chart from '../chart/chart.vue';
import BarChart from './bar.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

const defaultChartProps = {
  xAxisTitle: 'Pushes per day',
  xAxisType: 'value',
  yAxisTitle: 'User',
  data: {
    Office: [
      [100, 'Scranton Strangler'],
      [300, 'Dwight'],
    ],
  },
};

describe('Bar chart component', () => {
  let wrapper;

  const findChart = () => wrapper.findComponent(Chart);
  const getOptions = () => findChart().props('options');
  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  const createComponent = (props = {}) => {
    wrapper = shallowMount(BarChart, {
      propsData: { ...defaultChartProps, ...props },
      stubs: {
        'tooltip-default-format': TooltipDefaultFormat,
      },
    });
  };

  beforeEach(() => {
    mockChartInstance = createMockChartInstance();
  });

  describe('when mounted', () => {
    beforeEach(() => {
      createComponent();
    });

    it('should render chart with axis and series', () => {
      const chart = findChart();

      expect(chart.props('options')).toMatchSnapshot();
    });

    it('should not emit created', () => {
      expect(wrapper.emitted('created')).toBeUndefined();
    });
  });

  describe('when mounted and chart has created', () => {
    beforeEach(() => {
      createComponent();
      emitChartCreated();
    });

    it('emits "created" when onCreated is called', () => {
      expect(wrapper.emitted('created')).toEqual([[mockChartInstance]]);
    });

    it('long Y axis labels are ellipsized', () => {
      const { yAxis: { axisLabel: { formatter } } = {} } = getOptions();

      defaultChartProps.data.Office.map(([, name]) => expect(formatter(name)).toMatchSnapshot());
    });

    describe('Tooltip', () => {
      const labelParams = {
        value: 'Jim',
        seriesName: 'Office',
        seriesData: [
          {
            seriesId: 'Office',
            data: [100, 'Jim'],
            value: [100, 'Jim'],
          },
        ],
      };

      it('calls custom method and returns title with y labels', () => {
        const getDefaultTooltipContentReturnVal = { yLabels: [], tooltipContent: {} };

        // stub the method
        wrapper.vm.getDefaultTooltipContent = jest
          .fn()
          .mockReturnValue(getDefaultTooltipContentReturnVal);

        // label formatter is triggered here which should eventually call
        // getDefaultTooltipContent
        getOptions().yAxis.axisPointer.label.formatter(labelParams);

        return wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.getDefaultTooltipContent).toHaveBeenCalled();
        });
      });

      it('sets accurate tooltip title and content state', () => {
        getOptions().yAxis.axisPointer.label.formatter(labelParams);

        return wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.tooltipTitle).toBe(labelParams.value);
          expect(wrapper.vm.tooltipContent[defaultChartProps.xAxisTitle].value).toBe(
            labelParams.seriesData[0].data[0]
          );
        });
      });
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
