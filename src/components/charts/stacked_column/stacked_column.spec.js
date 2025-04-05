import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';

import {
  mockCreateChartInstance,
  ChartTooltipStub,
  chartTooltipStubData,
} from '~helpers/chart_stubs';
import { expectHeightAutoClasses } from '~helpers/chart_height';
import { LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE } from '~/utils/charts/constants';
import {
  mockDefaultStackedLineData,
  mockDefaultStackedBarData,
  mockSecondaryData,
} from '../../../utils/charts/mock_data';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ChartTooltip from '../shared/tooltip/tooltip.vue';
import * as themeUtils from '../../../utils/charts/theme';
import TooltipDefaultFormat from '../shared/tooltip/tooltip_default_format/tooltip_default_format.vue';
import StackedColumnChart from './stacked_column.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
  init: () => mockChartInstance,
  registerTheme: jest.fn(),
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
  const findTooltipDefaultFormat = () => wrapper.findComponent(TooltipDefaultFormat);

  const createShallowWrapper = async ({ props = {}, stubs, ...options } = {}) => {
    wrapper = shallowMount(StackedColumnChart, {
      propsData: { ...defaultChartProps, ...props },
      stubs: {
        'chart-tooltip': ChartTooltipStub,
        Chart,
        ...stubs,
      },
      ...options,
    });

    await findChart().vm.$nextTick(); // GlChart waits for $nextTick when mounting, await for mount to complete.
  };

  beforeEach(() => {
    mockChartInstance = mockCreateChartInstance();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('emits `created`, with the chart instance', async () => {
    await createShallowWrapper();

    expect(wrapper.emitted('created').length).toBe(1);
    expect(wrapper.emitted('created')[0][0]).toBe(mockChartInstance);
  });

  it('should correctly render the chart', async () => {
    await createShallowWrapper();

    expect(findChart().props('options')).toMatchSnapshot();
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
    it('is inline by default', async () => {
      await createShallowWrapper();

      expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
    });

    it('is inline if correct prop value is set', async () => {
      await createShallowWrapper({ props: { legendLayout: LEGEND_LAYOUT_INLINE } });

      expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_INLINE);
    });

    it('is tabular if correct prop value is set', async () => {
      await createShallowWrapper({ props: { legendLayout: LEGEND_LAYOUT_TABLE } });

      expect(findLegend().props('layout')).toBe(LEGEND_LAYOUT_TABLE);
    });

    describe('legend series info', () => {
      beforeEach(async () => {
        await createShallowWrapper({
          props: {
            bars: [mockDefaultStackedBarData[0], mockDefaultStackedBarData[1]],
          },
        });
      });

      it('passes correct series info to legend', () => {
        expect(findLegend().props('seriesInfo')).toHaveLength(2);
        expect(findLegend().props('seriesInfo')).toEqual([
          {
            name: 'Fun 1',
            type: 'bar',
            color: '#617ae2',
            data: mockDefaultStackedBarData[0].data,
            yAxisIndex: 0,
          },
          {
            name: 'Fun 2',
            type: 'bar',
            color: '#b14f18',
            data: mockDefaultStackedBarData[1].data,
            yAxisIndex: 0,
          },
        ]);
      });

      it('reacts to data changes', async () => {
        wrapper.setProps({
          bars: [...mockDefaultStackedBarData],
        });
        await nextTick();

        expect(findLegend().props('seriesInfo')).toHaveLength(4);
        expect(findLegend().props('seriesInfo')).toEqual([
          {
            name: 'Fun 1',
            type: 'bar',
            color: '#617ae2',
            data: mockDefaultStackedBarData[0].data,
            yAxisIndex: 0,
          },
          {
            name: 'Fun 2',
            type: 'bar',
            color: '#b14f18',
            data: mockDefaultStackedBarData[1].data,
            yAxisIndex: 0,
          },
          {
            name: 'Fun 3',
            type: 'bar',
            color: '#0090b1',
            data: mockDefaultStackedBarData[2].data,
            yAxisIndex: 0,
          },
          {
            name: 'Fun 4',
            type: 'bar',
            color: '#4e7f0e',
            data: mockDefaultStackedBarData[3].data,
            yAxisIndex: 0,
          },
        ]);
      });
    });

    describe('when `includeLegendAvgMax` prop is disabled', () => {
      beforeEach(async () => {
        await createShallowWrapper({ props: { includeLegendAvgMax: false } });
      });

      it('passes correct series info to legend', () => {
        expect(findLegend().props('seriesInfo')).toEqual(
          expect.arrayContaining([
            {
              type: 'bar',
              name: 'Fun 1',
              color: expect.any(String),
              data: undefined,
              yAxisIndex: 0,
            },
          ])
        );
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

    it('inverts order of series in tooltip and uses border color', async () => {
      await createShallowWrapper({
        stubs: {
          TooltipDefaultFormat,
        },
      });

      const tooltipContentEntries = Object.entries(
        findTooltipDefaultFormat().props('tooltipContent')
      );

      expect(tooltipContentEntries).toEqual([
        ['Apples (2)', { color: 'red2', value: ['Count', 10] }],
        ['Oranges (1)', { color: 'orange2', value: ['Count', 9] }],
      ]);
    });

    describe('is customized via slots', () => {
      const { params, title, content } = chartTooltipStubData;

      it('customizes tooltip value', async () => {
        const tooltipValueSlot = jest.fn().mockReturnValue('Custom tooltip value');

        await createShallowWrapper({
          stubs: {
            TooltipDefaultFormat,
          },
          scopedSlots: {
            'tooltip-value': tooltipValueSlot,
          },
        });

        expect(tooltipValueSlot).toHaveBeenCalledWith({ value: ['Count', 10] });
        expect(findDataTooltip().text()).toContain('Custom tooltip value');
      });

      it('customizes title', async () => {
        const tooltipTitleSlot = jest.fn().mockReturnValue('Title');

        await createShallowWrapper({
          scopedSlots: {
            'tooltip-title': tooltipTitleSlot,
          },
        });

        expect(tooltipTitleSlot).toHaveBeenCalledWith({
          params,
          title,
        });

        expect(findDataTooltip().text()).toBe('Title');
      });

      it('customizes content', async () => {
        const tooltipContentSlot = jest.fn().mockReturnValue('Custom Content');

        await createShallowWrapper({
          scopedSlots: {
            'tooltip-content': tooltipContentSlot,
          },
        });

        expect(tooltipContentSlot).toHaveBeenCalledWith({
          params,
          content,
        });
        expect(findDataTooltip().text()).toBe('Custom Content');
      });
    });

    it('is customized via deprecated formatting function', async () => {
      const formatTooltipText = jest.fn();

      await createShallowWrapper({
        props: {
          formatTooltipText,
        },
      });

      expect(findDataTooltip().props()).toMatchObject({
        useDefaultTooltipFormatter: false,
        chart: mockChartInstance,
      });

      expect(findChart().props('options').xAxis.axisPointer.label.formatter).toBe(
        formatTooltipText
      );
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
