import { shallowMount } from '@vue/test-utils';
import { createMockChartInstance } from '~helpers/chart_stubs';
import Chart from '../chart/chart.vue';
import GlChartSeriesLabel from '../series_label/series_label.vue';
import Legend from './legend.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
  init: () => mockChartInstance,
  registerTheme: jest.fn(),
}));

const mockSeriesInfo = [
  {
    type: 'solid',
    name: 'Example Title 1',
    color: 'red',
    data: [1, 2, 3, 4, 5],
  },
  {
    type: 'solid',
    name: 'Example Title 2',
    color: 'red',
    data: [1, 2, 3, 4, 5],
  },
  {
    type: 'solid',
    name: 'Example Title 3',
    color: 'red',
    data: [1, 2, 3, 4, 5],
  },
];

describe('chart legend component', () => {
  let chartWrapper;
  let legendWrapper;
  let chart;

  const chartArgs = [
    Chart,
    {
      propsData: { options: {} },
      listeners: {
        created: (chartInstance) => {
          chart = chartInstance;
          chart.getDom = () => chartInstance;
        },
      },
    },
  ];

  const buildLegend = ({ propsData = {}, seriesInfo = mockSeriesInfo } = {}) => {
    legendWrapper = shallowMount(Legend, {
      propsData: {
        ...propsData,
        chart: mockChartInstance,
        seriesInfo,
      },
    });
  };

  beforeEach(async () => {
    mockChartInstance = createMockChartInstance();

    chartWrapper = shallowMount(...chartArgs);
    await chartWrapper.vm.$nextTick();
    // Runs after mounting the chart so that it has an up to date reference
    buildLegend();
  });

  it('renders the legend with no errors', () => {
    expect(legendWrapper.exists()).toBe(true);
  });

  it('displays correct number of series labels', () => {
    expect(legendWrapper.findAllComponents(GlChartSeriesLabel).length).toBe(3);
  });

  it('allows user to override max value label text using props', () => {
    buildLegend({
      propsData: {
        maxText: 'maxText',
      },
    });

    expect(legendWrapper.text()).toMatch('maxText');
  });

  it('allows user to override average value label text using props', () => {
    buildLegend({
      propsData: {
        averageText: 'averageText',
      },
    });

    expect(legendWrapper.text()).toMatch('averageText');
  });

  it('displays "Avg" for the average value label by default', () => {
    expect(legendWrapper.props().averageText).toMatch('Avg');
  });

  it('displays "Max" for the max value label by default', () => {
    expect(legendWrapper.props().maxText).toMatch('Max');
  });

  it('displays "Min" for the min value label by default', () => {
    expect(legendWrapper.props().minText).toMatch('Min');
  });

  it('displays "Current" for the current value label by default', () => {
    expect(legendWrapper.props().currentText).toMatch('Current');
  });

  describe('when clicking on a series label', () => {
    it('dispatches a `highlight` action on the chart', () => {
      legendWrapper.findComponent(GlChartSeriesLabel).trigger('click');
      expect(chart.dispatchAction).toHaveBeenCalled();
    });

    it('does not dispatch a `legendToggleSelect` action when there is only one active series', () => {
      buildLegend({ seriesInfo: [mockSeriesInfo[0]] });

      legendWrapper.findComponent(GlChartSeriesLabel).trigger('click');

      expect(chart.dispatchAction).toHaveBeenCalledTimes(0);
    });

    it('does not dispatch a `legendToggleSelect` action on the chart when disabled=true', () => {
      const disabledLegendItem = {
        type: 'solid',
        name: 'Example Title 4',
        color: 'red',
        data: [1, 2, 3, 4, 5],
        disabled: true,
      };

      const seriesInfo = [...mockSeriesInfo, disabledLegendItem];
      const disabledLegendItemIndex = seriesInfo.length - 1;

      buildLegend({ seriesInfo });

      legendWrapper
        .findAllComponents(GlChartSeriesLabel)
        .at(disabledLegendItemIndex)
        .trigger('click');

      expect(chart.dispatchAction).toHaveBeenCalledTimes(0);
    });
  });

  it('renders the inline layout by default', () => {
    expect(legendWrapper.props().layout).toMatch('inline');
    expect(legendWrapper.find('.gl-legend-inline').exists()).toBe(true);
    expect(legendWrapper.find('.gl-legend-tabular').exists()).toBe(false);
  });

  describe('when setting the layout prop to table', () => {
    beforeEach(() => {
      buildLegend({
        propsData: {
          layout: 'table',
        },
      });
      legendWrapper.vm.$nextTick();
    });

    it('renders the table layout', () => {
      expect(legendWrapper.find('.gl-legend-tabular').exists()).toBe(true);
    });

    it('does not render the inline layout', () => {
      expect(legendWrapper.find('.gl-legend-inline').exists()).toBe(false);
    });

    it('allows user to override min value label text using props', () => {
      legendWrapper.setProps({ minText: 'minText' });

      return legendWrapper.vm.$nextTick().then(() => {
        expect(legendWrapper.text()).toMatch('minText');
      });
    });

    it('allows user to override current value label text using props', () => {
      legendWrapper.setProps({ currentText: 'currentText' });

      return legendWrapper.vm.$nextTick().then(() => {
        expect(legendWrapper.text()).toMatch('currentText');
      });
    });

    it.each`
      data          | reason
      ${null}       | ${'null'}
      ${undefined}  | ${'undefined'}
      ${[]}         | ${'empty'}
      ${[NaN, NaN]} | ${'only NaN values'}
    `('displays en-dash when series data is $reason', ({ data }) => {
      const series = [
        {
          type: 'solid',
          name: 'Example Title',
          color: 'red',
          data,
        },
      ];

      legendWrapper.setProps({
        seriesInfo: series,
      });

      return legendWrapper.vm.$nextTick().then(() => {
        legendWrapper.findAll('.gl-legend-tabular-details-cell').wrappers.forEach((wrapper) => {
          expect(wrapper.text()).toBe('-');
        });
      });
    });

    it('does not display NaN values in cells', () => {
      const series = [
        {
          type: 'solid',
          name: 'Example Title 1',
          data: [1, 2, NaN, 4, 5],
          color: 'red',
        },
        {
          type: 'solid',
          name: 'Example Title 2',
          data: [1, 2, 3, 4, NaN],
          color: 'red',
        },
      ];

      legendWrapper.setProps({
        seriesInfo: series,
      });

      return legendWrapper.vm.$nextTick().then(() => {
        legendWrapper.findAll('.gl-legend-tabular-details-cell').wrappers.forEach((wrapper) => {
          expect(wrapper.text()).not.toBe('NaN');
        });
      });
    });
  });
});
