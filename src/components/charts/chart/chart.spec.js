import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import * as echarts from 'echarts';
import { toolboxHeight } from '~/utils/charts/config';
import { createTheme } from '~/utils/charts/theme';
import { waitForAnimationFrame } from '~/utils/test_utils';
import { useMockResizeObserver } from '~helpers/mock_dom_observer';
import { mockCreateChartInstance as createdMockChartInstance } from '~helpers/chart_stubs';
import Chart from './chart.vue';

let mockChartInstance;

jest.mock('echarts', () => {
  return {
    init: jest.fn(() => {
      mockChartInstance = createdMockChartInstance();
      return mockChartInstance;
    }),
    registerTheme: jest.fn(),
  };
});

describe('chart component', () => {
  const themeName = 'gitlab';
  const defaultHeight = 400;

  let wrapper;

  const createWrapper = (props) => {
    wrapper = shallowMount(Chart, {
      propsData: {
        options: {},
        ...props,
      },
    });
  };

  const { trigger: triggerResize } = useMockResizeObserver();

  it('initializes chart using $refs.chart', async () => {
    createWrapper();
    await nextTick();

    expect(echarts.init).toHaveBeenCalledWith(
      wrapper.findComponent({ ref: 'chart' }).element,
      themeName,
      {
        renderer: wrapper.props().renderer,
        width: 300,
        height: 400,
      }
    );
  });

  it('does not resize the chart when responsive = false', async () => {
    createWrapper({
      responsive: false,
    });
    await nextTick();
    // initial call when chart gets created
    expect(wrapper.vm.chart.resize).toHaveBeenCalledTimes(1);

    triggerResize(wrapper.element);
    await waitForAnimationFrame();

    expect(wrapper.vm.chart.resize).toHaveBeenCalledTimes(1);
  });

  it('resizes the chart only once per animation frame when responsive = true', async () => {
    createWrapper();
    await nextTick();

    expect(wrapper.vm.chart.resize).toHaveBeenCalledTimes(1);

    triggerResize(wrapper.element);
    triggerResize(wrapper.element);
    await waitForAnimationFrame();

    expect(wrapper.vm.chart.resize).toHaveBeenCalledTimes(2);
  });

  it('emits "created" after initializing chart', async () => {
    createWrapper();
    await nextTick();

    expect(wrapper.emitted('created')).toEqual([[wrapper.vm.chart]]);
  });

  it('uses GitLab theme', () => {
    createWrapper();

    const [firstRegisterThemeCall] = echarts.registerTheme.mock.calls;
    expect(firstRegisterThemeCall[0]).toBe(themeName);
    expect(JSON.stringify(firstRegisterThemeCall[1])).toEqual(JSON.stringify(createTheme()));
  });

  it('waits a tick before creating the chart', async () => {
    createWrapper();

    expect(wrapper.vm.chart).toBe(null);

    await nextTick();

    expect(wrapper.vm.chart).toBeDefined();
  });

  describe('sets chart options', () => {
    beforeEach(async () => {
      createWrapper({
        options: {
          title: { text: 'My chart title' },
        },
      });
      await nextTick();
    });

    it('inits chart options, adding aria.enabled', async () => {
      expect(wrapper.vm.chart.setOption).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.chart.setOption).toHaveBeenCalledWith({
        title: { text: 'My chart title' },
        aria: { enabled: true },
      });

      expect(wrapper.emitted('updated').length).toEqual(1);
    });

    it('reacts to options changes by merging options', async () => {
      wrapper.setProps({
        options: {
          title: { text: 'My new chart title' },
          xAxis: { show: true },
        },
      });
      await nextTick();

      expect(wrapper.vm.chart.setOption).toHaveBeenCalledTimes(2);
      expect(wrapper.vm.chart.setOption).toHaveBeenLastCalledWith({
        title: { text: 'My new chart title' },
        xAxis: { show: true },
        aria: { enabled: true },
      });
      expect(wrapper.emitted('updated').length).toEqual(2);
    });
  });

  describe('sets chart dimensions', () => {
    it('sets dimensions', async () => {
      createWrapper();
      await nextTick();

      expect(wrapper.vm.chart.resize).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.chart.resize).toHaveBeenLastCalledWith({
        height: 400,
        width: 'auto',
      });
    });

    it('sets custom dimensions', async () => {
      const width = 1234;
      const height = 123;

      createWrapper({
        width,
        height,
      });

      await nextTick();

      expect(wrapper.vm.chart.resize).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.chart.resize).toHaveBeenLastCalledWith({
        width,
        height,
      });
    });

    describe('reacts to dimension changes', () => {
      beforeEach(async () => {
        createWrapper();
        await nextTick();
      });

      it('reacts to width changes', async () => {
        wrapper.setProps({
          width: 301,
        });
        await nextTick();

        expect(wrapper.vm.chart.resize).toHaveBeenCalledTimes(2);
        expect(wrapper.vm.chart.resize).toHaveBeenLastCalledWith({
          width: 301,
          height: defaultHeight,
        });
      });

      it('reacts to height changes', async () => {
        wrapper.setProps({
          height: 401,
        });
        await nextTick();

        expect(wrapper.vm.chart.resize).toHaveBeenCalledTimes(2);
        expect(wrapper.vm.chart.resize).toHaveBeenCalledWith({
          width: 'auto',
          height: 401,
        });
      });
    });
  });

  describe('with toolbox in options', () => {
    it('increases grid top by `toolboxHeight`', async () => {
      const optionsWithToolbox = { toolbox: { show: true } };
      wrapper = shallowMount(Chart, { propsData: { options: optionsWithToolbox } });
      await nextTick();

      expect(wrapper.vm.chart.setOption).toHaveBeenCalledWith({
        ...optionsWithToolbox,
        grid: { top: toolboxHeight },
        aria: { enabled: true },
      });
    });
  });
});
