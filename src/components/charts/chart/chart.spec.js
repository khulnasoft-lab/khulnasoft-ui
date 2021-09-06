import { shallowMount } from '@vue/test-utils';
import echarts from 'echarts';
import Chart from './chart.vue';
import createTheme from '~/utils/charts/theme';

const defaultHeight = 400;

jest.mock('echarts', () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    resize: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  })),
  registerTheme: jest.fn(),
}));

describe('chart component', () => {
  const options = {};
  const mountArgs = [Chart, { propsData: { options: {} } }];
  const themeName = 'gitlab';
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(...mountArgs);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('initializes chart using $refs.chart', () => {
    expect(echarts.init).toHaveBeenCalledWith(
      wrapper.findComponent({ ref: 'chart' }).element,
      themeName,
      {
        renderer: wrapper.props().renderer,
      }
    );
  });

  it('emits "created" after initializing chart', () => {
    expect(wrapper.emitted('created')).toEqual([[wrapper.vm.chart]]);
  });

  it('uses GitLab theme', () => {
    const [firstRegisterThemeCall] = echarts.registerTheme.mock.calls;
    expect(firstRegisterThemeCall[0]).toBe(themeName);
    expect(JSON.stringify(firstRegisterThemeCall[1])).toEqual(JSON.stringify(createTheme()));
  });

  it('waits a tick before creating the chart', async () => {
    wrapper = shallowMount(...mountArgs);

    expect(wrapper.vm.chart).toBe(null);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.chart).toBeDefined();
  });

  describe('custom sizing', () => {
    const width = 1234;
    const height = 123;

    it('sets chart to custom width and height if specified', async () => {
      wrapper = shallowMount(Chart, { propsData: { options: {}, width, height } });

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.chart.resize).toHaveBeenCalledWith({ width, height });
    });

    it('sets chart to custom width if specified', async () => {
      wrapper = shallowMount(Chart, { propsData: { options: {}, width } });

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.chart.resize).toHaveBeenCalledWith({ width, height: defaultHeight });
    });

    it('sets chart to custom height if specified', async () => {
      wrapper = shallowMount(Chart, { propsData: { options: {}, height } });

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.chart.resize).toHaveBeenCalledWith({ width: 'auto', height });
    });
  });

  describe('methods', () => {
    describe('draw method', () => {
      it('sets chart options', () => {
        wrapper.vm.draw();

        expect(wrapper.vm.chart.setOption).toHaveBeenCalledWith(options);
      });

      it('emits chart updated after drawing', () => {
        wrapper.vm.draw();
        const { chart } = wrapper.vm;

        expect(wrapper.emitted('updated')).toEqual([[chart], [chart]]);
      });
    });

    describe('setChartSize method', () => {
      it('sets chart size', () => {
        wrapper.vm.setChartSize();

        expect(wrapper.vm.chart.resize).toHaveBeenCalledWith({
          height: defaultHeight,
          width: 'auto',
        });
      });
    });
  });
});
