import { shallowMount } from '@vue/test-utils';
import { waitForAnimationFrame } from '~/utils/test_utils';
import { HEIGHT_AUTO_HORIZONTAL_LAYOUT_CLASSES } from '~/utils/charts/constants';
import { createMockChartInstance, ChartTooltipStub } from '~helpers/chart_stubs';
import { expectHeightAutoClasses } from '~helpers/chart_height';
import Chart from '../chart/chart.vue';
import SparklineChart from './sparkline.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
  graphic: {
    LinearGradient: jest.fn(),
  },
}));

let triggerResize = () => {};
jest.mock('~/directives/resize_observer/resize_observer', () => ({
  GlResizeObserverDirective: {
    bind(el, { value: resizeHandler }) {
      triggerResize = () => resizeHandler();
    },
  },
}));

describe('sparkline chart component', () => {
  let wrapper;
  let componentOptions;
  const factory = (props = {}) => {
    componentOptions = {
      propsData: {
        data: [[]],
        variant: null,
        ...props,
      },
      scopedSlots: { latestSeriesEntry: jest.fn() },
      stubs: {
        'chart-tooltip': ChartTooltipStub,
      },
    };

    wrapper = shallowMount(SparklineChart, componentOptions);
  };

  // helpers
  const getByTestId = (id) => wrapper.find(`[data-testid="${id}"]`);
  const getChart = () => wrapper.findComponent(Chart);
  const getChartContainer = () => getByTestId('chart-container');

  const getTooltip = () => wrapper.findComponent(ChartTooltipStub);
  const getTooltipTitle = () => getByTestId('tooltip-title');
  const getTooltipContent = () => getByTestId('tooltip-content');

  const getLastYValue = () => getByTestId('last-y-value');

  const getChartOptions = () => getChart().props('options');
  const getXAxisLabelFormatter = () => {
    const {
      xAxis: {
        axisPointer: {
          label: { formatter },
        },
      },
    } = getChartOptions();

    return formatter;
  };

  const validateSmooth = (smooth) => SparklineChart.props.smooth.validator(smooth);

  const emitChartCreated = () => getChart().vm.$emit('created', mockChartInstance);

  beforeEach(() => {
    mockChartInstance = createMockChartInstance();
    factory();
    // needs to run after every mount, or the chart-instance is `null` and `beforeDestroy` throws
    emitChartCreated();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('emits `chartCreated`, which passes on the chart instance', () => {
    expect(wrapper.emitted('chartCreated')).toHaveLength(1);
    expect(wrapper.emitted('chartCreated')[0][0]).toBe(mockChartInstance);
  });

  it('renders a chart', () => {
    expect(wrapper.findComponent(Chart).exists()).toBe(true);
  });

  it('has a default height of 50', () => {
    expect(getChart().props('height')).toBe(50);
  });

  it('accepts a custom height', async () => {
    const newHeight = 1000;
    wrapper.setProps({ height: newHeight });

    expect(getChart().props('height')).not.toBe(newHeight);

    await wrapper.vm.$nextTick();

    expect(getChart().props('height')).toBe(newHeight);
  });

  it('triggers the chart to resize when the containing elements size changes', () => {
    expect(mockChartInstance.resize).toHaveBeenCalledTimes(0);

    triggerResize();

    expect(mockChartInstance.resize).toHaveBeenCalledTimes(1);
  });

  it('includes a chart tooltip', () => {
    expect(getTooltip().exists()).toBe(true);
  });

  it('displays the given tooltip label', async () => {
    const tooltipLabel = 'foo';

    wrapper.setProps({ tooltipLabel: 'foo' });

    await wrapper.vm.$nextTick();
    expect(getTooltipContent().text()).toContain(tooltipLabel);
  });

  it('adds the right content to the tooltip', async () => {
    const xValue = 'foo';
    const yValue = 'bar';
    const mockData = { seriesData: [{ data: [xValue, yValue] }] };

    getXAxisLabelFormatter()(mockData);

    expect(getTooltipTitle().text()).toBe('');
    expect(getTooltipContent().text()).toBe('');

    await waitForAnimationFrame();
    expect(getTooltipTitle().text()).toBe(xValue);
    expect(getTooltipContent().text()).toBe(yValue);
  });

  it(`shows the last entry's y-value per default`, async () => {
    const data = [
      ['foo', 'bar'],
      ['baz', 'qux'],
    ];
    const latestEntryYValue = data[1][1];

    wrapper.setProps({ data });

    await wrapper.vm.$nextTick();
    expect(getLastYValue().text()).toBe(latestEntryYValue);
  });

  it(`does not show the last entry's y-value if 'showLastYValue' is false`, async () => {
    expect(getLastYValue().exists()).toBe(true);

    wrapper.setProps({ showLastYValue: false });

    await wrapper.vm.$nextTick();
    expect(getLastYValue().exists()).toBe(false);
    expect(getChartOptions().series[0].markPoint).toBe(undefined);
  });

  it('gradient will set the series itemStyle color', async () => {
    wrapper.setProps({ gradient: ['red', 'green'] });

    await wrapper.vm.$nextTick();

    expect(getChartOptions().series[0].itemStyle.color).toBeDefined();
  });

  describe('smooth', () => {
    it.each`
      value  | expected
      ${-1}  | ${false}
      ${0}   | ${true}
      ${0.5} | ${true}
      ${1}   | ${true}
      ${1.1} | ${false}
    `(`validate $value`, ({ value, expected }) => {
      expect(validateSmooth(value)).toBe(expected);
    });

    it('sets the series smoothing', async () => {
      const smooth = 0.75;
      wrapper.setProps({ smooth });

      await wrapper.vm.$nextTick();

      expect(getChartOptions().series[0].smooth).toBe(smooth);
    });
  });

  describe('height', () => {
    expectHeightAutoClasses({
      createComponent: factory,
      findContainer: getChartContainer,
      findChart: getChart,
      classes: HEIGHT_AUTO_HORIZONTAL_LAYOUT_CLASSES,
    });

    describe('sparkline root element style', () => {
      it('does not set the root element style to height full', () => {
        factory();

        expect(wrapper.element.classList.value).not.toContain('gl-h-full');
      });

      it('set the root element style to height full when height is "auto"', () => {
        factory({ height: 'auto' });

        expect(wrapper.element.classList.value).toContain('gl-h-full');
      });
    });
  });
});
