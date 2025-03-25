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

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  const createShallowWrapper = ({ props = {}, stubs, ...options } = {}) => {
    wrapper = shallowMount(StackedColumnChart, {
      propsData: { ...defaultChartProps, ...props },
      stubs: {
        'chart-tooltip': ChartTooltipStub,
        ...stubs,
      },
      ...options,
    });
    emitChartCreated();
  };

  beforeEach(() => {
    mockChartInstance = mockCreateChartInstance();
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
    beforeEach(() => {
      mockChartInstance = {
        ...mockCreateChartInstance(),
        getOption: jest.fn().mockReturnValueOnce({
          series: [
            {
              type: 'solid',
              name: 'Foo Bar',
              data: [1, 2, 3, 4, 5],
            },
          ],
        }),
      };
    });

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

    it('passes correct series info to legend', () => {
      createShallowWrapper();

      return wrapper.vm.$nextTick(() => {
        expect(findLegend().props('seriesInfo')).toEqual(
          expect.arrayContaining([
            {
              type: 'solid',
              name: 'Foo Bar',
              color: expect.any(String),
              data: [1, 2, 3, 4, 5],
              yAxisIndex: undefined,
            },
          ])
        );
      });
    });

    describe('when `includeLegendAvgMax` prop is disabled', () => {
      beforeEach(() => {
        createShallowWrapper({ props: { includeLegendAvgMax: false } });
      });

      it('passes correct series info to legend', () => {
        return wrapper.vm.$nextTick(() => {
          expect(findLegend().props('seriesInfo')).toEqual(
            expect.arrayContaining([
              {
                type: 'solid',
                name: 'Foo Bar',
                color: expect.any(String),
                data: undefined,
                yAxisIndex: undefined,
              },
            ])
          );
        });
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
      createShallowWrapper({
        stubs: {
          TooltipDefaultFormat,
        },
      });
      await nextTick();

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

        createShallowWrapper({
          stubs: {
            TooltipDefaultFormat,
          },
          scopedSlots: {
            'tooltip-value': tooltipValueSlot,
          },
        });
        await nextTick();

        expect(tooltipValueSlot).toHaveBeenCalledWith({ value: ['Count', 10] });
        expect(findDataTooltip().text()).toContain('Custom tooltip value');
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
        const tooltipContentSlot = jest.fn().mockReturnValue('Custom Content');

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
        expect(findDataTooltip().text()).toBe('Custom Content');
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
