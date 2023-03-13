import { shallowMount } from '@vue/test-utils';

import TooltipDefaultFormat from '~/components/shared_components/charts/tooltip_default_format.vue';
import { createMockChartInstance, ChartTooltipStub } from '~helpers/chart_stubs';
import { expectHeightAutoClasses } from '~helpers/chart_height';
import { LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE } from '~/utils/charts/constants';
import {
  mockDefaultStackedLineData,
  mockDefaultStackedBarData,
  mockSecondaryData,
} from '../../../utils/charts/mock_data';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
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
  const getOptions = () => findChart().props('options');
  const findDataTooltip = () => wrapper.findComponent(ChartTooltipStub);

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  const createShallowWrapper = ({ props = {}, slots = {} } = {}) => {
    wrapper = shallowMount(StackedColumnChart, {
      propsData: { ...defaultChartProps, ...props },
      stubs: {
        'tooltip-default-format': TooltipDefaultFormat,
        ChartTooltip: ChartTooltipStub,
      },
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
    describe('position', () => {
      const tooltipTitle = 'FooBar';

      beforeEach(() => {
        createShallowWrapper();
      });

      it('is initialized', () => {
        expect(findDataTooltip().props('left')).toBe('0');
        expect(findDataTooltip().props('top')).toBe('0');
        expect(findDataTooltip().text()).not.toContain(tooltipTitle);
      });

      it('is reset when mouse moves', async () => {
        const left = '10px';
        const top = '30px';

        wrapper.setData({ tooltipPosition: { left, top }, tooltipTitle });

        await wrapper.vm.$nextTick();

        expect(findDataTooltip().props('left')).toBe(`${left}`);
        expect(findDataTooltip().props('top')).toBe(`${top}`);
        expect(findDataTooltip().text()).toContain(tooltipTitle);
      });
    });

    const params = {
      seriesData: [{ seriesIndex: '0', seriesName: 'Blah', value: 'Jan' }],
    };

    describe('default', () => {
      beforeEach(() => {
        createShallowWrapper();
      });

      it('calls the default tooltip text function', async () => {
        wrapper.vm.defaultFormatTooltipText = jest.fn();

        expect(wrapper.vm.defaultFormatTooltipText).not.toHaveBeenCalled();

        getOptions().xAxis.axisPointer.label.formatter(params);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.defaultFormatTooltipText).toHaveBeenCalled();
      });

      it('displays the generic tooltip content', async () => {
        getOptions().xAxis.axisPointer.label.formatter(params);

        await wrapper.vm.$nextTick();

        const tooltipText = findDataTooltip().element.textContent;

        expect(tooltipText).toContain(defaultChartProps.xAxisTitle);
        expect(tooltipText).toContain(params.seriesData[0].seriesName);
        expect(tooltipText).toContain(params.seriesData[0].value);
      });
    });

    describe('custom', () => {
      const formatTooltipText = jest.fn();
      const customTitle = 'Custom title';
      const customContent = 'Custom content';

      beforeEach(() => {
        createShallowWrapper({
          props: {
            formatTooltipText,
          },
          slots: {
            'tooltip-title': customTitle,
            'tooltip-content': customContent,
          },
        });
      });

      it('calls the formatTooltipText tooltip text function', async () => {
        expect(formatTooltipText).not.toHaveBeenCalled();

        getOptions().xAxis.axisPointer.label.formatter(params);

        await wrapper.vm.$nextTick();

        expect(formatTooltipText).toHaveBeenCalled();
      });

      it('displays the custom tooltip content', async () => {
        getOptions().xAxis.axisPointer.label.formatter(params);

        await wrapper.vm.$nextTick();

        const tooltipText = findDataTooltip().element.textContent;

        expect(tooltipText).toContain(customTitle);
        expect(tooltipText).toContain(customContent);
      });
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
