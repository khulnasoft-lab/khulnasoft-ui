import { shallowMount } from '@vue/test-utils';

import { createMockChartInstance } from '~helpers/chart_stubs';
import { expectHeightAutoClasses } from '~helpers/chart_height';
import { LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE } from '~/utils/charts/constants';
import {
  mockDefaultStackedLineData,
  mockDefaultStackedBarData,
  mockSecondaryData,
} from '../../../utils/charts/mock_data';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import * as themeUtils from '../../../utils/charts/theme';
import StackedColumnChart from './stacked_column.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

const defaultChartProps = {
  seriesNames: [],
  bars: mockDefaultStackedBarData,
  groupBy: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  xAxisType: 'category',
  xAxisTitle: 'January - December 2018',
  yAxisTitle: 'Commits',
};

describe('stacked column chart component', () => {
  let wrapper;

  const findChart = () => wrapper.findComponent(Chart);
  const findLegend = () => wrapper.findComponent(ChartLegend);
  const findDataTooltip = () => wrapper.findComponent(ChartTooltip);

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  const createShallowWrapper = ({ props = {}, slots = {} } = {}) => {
    wrapper = shallowMount(StackedColumnChart, {
      propsData: { ...defaultChartProps, ...props },
      slots,
    });
    emitChartCreated();
  };

  beforeEach(() => {
    mockChartInstance = createMockChartInstance();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('emits `created`, with the chart instance', () => {
    createShallowWrapper();

    return wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('created').length).toBe(1);
      expect(wrapper.emitted('created')[0][0]).toBe(mockChartInstance);
    });
  });

  it('should correctly render the chart', () => {
    createShallowWrapper();

    const chart = findChart();

    expect(chart.props('options')).toMatchSnapshot();
  });

  describe('with line data provided', () => {
    beforeEach(() => {
      createShallowWrapper({
        props: {
          bars: [],
          lines: mockDefaultStackedLineData,
        },
      });
    });
    it('should correctly render the chart', () => {
      expect(findChart().props('options')).toMatchSnapshot();
    });
  });

  describe('legend', () => {
    it('is inline by default', () => {
      createShallowWrapper();

      return wrapper.vm.$nextTick(() => {
        expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
      });
    });

    it('is inline if correct prop value is set', () => {
      createShallowWrapper({ props: { legendLayout: LEGEND_LAYOUT_INLINE } });

      return wrapper.vm.$nextTick(() => {
        expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
      });
    });

    it('is tabular if correct prop value is set', () => {
      createShallowWrapper({ props: { legendLayout: LEGEND_LAYOUT_TABLE } });

      return wrapper.vm.$nextTick(() => {
        expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_TABLE);
      });
    });
  });

  describe('with secondary axis data provided', () => {
    const secondaryDataTitle = 'test secondary';

    beforeEach(() => {
      createShallowWrapper({
        props: {
          ...defaultChartProps,
          secondaryData: mockSecondaryData,
          secondaryDataTitle,
        },
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
    beforeEach(() => {
      createShallowWrapper();
    });

    it('is initialized', () => {
      expect(findDataTooltip().props('chart')).toBe(mockChartInstance);
    });
  });

  describe('color palette', () => {
    let paletteSpy;

    describe('default palette', () => {
      beforeEach(() => {
        paletteSpy = jest.spyOn(themeUtils, 'colorFromDefaultPalette');

        createShallowWrapper();
      });

      it('calls colorFromDefaultPalette', () => {
        expect(paletteSpy).toHaveBeenCalled();
      });
    });

    describe('custom palette', () => {
      beforeEach(() => {
        paletteSpy = jest.spyOn(themeUtils, 'colorFromDefaultPalette');

        createShallowWrapper({
          props: {
            customPalette: ['#FFFHHH', '#FFFJJJ', '#FFFIII', '#FFFKKK'],
          },
        });
      });

      it('does not call colorFromDefaultPalette', () => {
        expect(paletteSpy).not.toHaveBeenCalled();
      });

      it('matches the snapshot', () => {
        const chart = findChart();

        expect(chart.props('options')).toMatchSnapshot();
      });
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
