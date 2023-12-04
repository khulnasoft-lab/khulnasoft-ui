import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { createMockChartInstance } from '~helpers/chart_stubs';
import GlPopover from '../../base/popover/popover.vue';
import { popoverPlacements } from '../../../utils/constants';
import { waitForAnimationFrame } from '../../../utils/test_utils';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';

import ChartTooltip from './tooltip.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

describe('ChartTooltip', () => {
  let wrapper;
  let mockContainPixel;

  const findPopover = () => wrapper.findComponent(GlPopover);
  const findTooltipDefaultFormat = () => wrapper.findComponent(TooltipDefaultFormat);
  const findPopoverTarget = () => wrapper.find(`#${findPopover().attributes('target')}`);
  const getPopoverTargetStyle = (name) => findPopoverTarget().element.style.getPropertyValue(name);

  const getMouseHandler = () => mockChartInstance.getZr().on.mock.calls[0][1];
  const triggerMouseHandler = async (event) => {
    getMouseHandler()({ event });
    await waitForAnimationFrame();
  };

  const createWrapper = (props = {}, options) => {
    mockChartInstance = {
      ...createMockChartInstance(),
      containPixel: mockContainPixel,
    };

    wrapper = shallowMount(ChartTooltip, {
      propsData: {
        chart: mockChartInstance,
        ...props,
      },
      ...options,
    });
  };

  beforeEach(() => {
    mockContainPixel = jest.fn();
  });

  it('sets target as container instead of a trigger', () => {
    createWrapper();

    expect(findPopover().props('triggers')).toBe('');
    expect(findPopover().props('container')).toEqual(findPopover().props('target'));

    expect(findPopoverTarget().exists()).toBe(true);
  });

  it('is right-positioned by default', () => {
    createWrapper();

    expect(findPopover().props('placement')).toBe(popoverPlacements.right);
  });

  it('applies placement if any', () => {
    createWrapper({ placement: popoverPlacements.bottom });

    expect(findPopover().props('placement')).toBe(popoverPlacements.bottom);
  });

  it('applies initial position and updates it', async () => {
    createWrapper({ show: true, left: '0', top: '50%' });

    expect(findPopover().attributes('show')).toBe('true');
    expect(getPopoverTargetStyle('left')).toBe('0px');
    expect(getPopoverTargetStyle('top')).toBe('50%');

    wrapper.setProps({ left: '100px', top: '200px' });

    await waitForAnimationFrame();

    expect(findPopover().attributes('show')).toBe('true');
    expect(getPopoverTargetStyle('left')).toBe('100px');
    expect(getPopoverTargetStyle('top')).toBe('200px');
  });

  it('reacts to `mousemove` and `mouseout` in chart dom', () => {
    createWrapper();

    const zr = mockChartInstance.getZr();
    const handler = getMouseHandler();

    expect(zr.on).toHaveBeenCalledWith('mousemove', handler);
    expect(zr.on).toHaveBeenCalledWith('mouseout', handler);
  });

  it('tooltip target has default offset', () => {
    createWrapper();

    expect(getPopoverTargetStyle('margin-top')).toBe('-10px');
    expect(getPopoverTargetStyle('height')).toBe('20px');

    expect(getPopoverTargetStyle('margin-left')).toBe('-2px');
    expect(getPopoverTargetStyle('width')).toBe('4px');
  });

  it('tooltip target defines offsets', () => {
    const xOffset = 7;
    const yOffset = 12;

    createWrapper({
      xOffset,
      yOffset,
    });

    expect(getPopoverTargetStyle('margin-top')).toBe('-12px');
    expect(getPopoverTargetStyle('height')).toBe('24px');

    expect(getPopoverTargetStyle('margin-left')).toBe('-7px');
    expect(getPopoverTargetStyle('width')).toBe('14px');
  });

  describe('when setting a `show` value', () => {
    it('applies initial `show` value and updates it', async () => {
      createWrapper({ show: true });

      expect(findPopover().attributes('show')).toBe('true');

      wrapper.setProps({ show: false });
      await waitForAnimationFrame();

      expect(findPopover().attributes('show')).toBe(undefined);
    });
  });

  describe('when not setting a `show` value', () => {
    describe('with no position defined', () => {
      beforeEach(() => {
        createWrapper();
      });

      it('when mouse moves outside of chart', async () => {
        mockContainPixel.mockReturnValueOnce(false);

        await triggerMouseHandler({ zrX: 1, zrY: 2.3 });

        expect(mockContainPixel).toHaveBeenCalledWith('grid', [1, 2]);

        expect(findPopover().attributes('show')).toBe(undefined);
      });

      it('when mouse moves inside chart', async () => {
        mockContainPixel.mockReturnValueOnce(true);

        await triggerMouseHandler({ zrX: 3, zrY: 4.3 });

        expect(mockContainPixel).toHaveBeenCalledWith('grid', [3, 4]);

        expect(findPopover().attributes('show')).toBe('true');
        expect(getPopoverTargetStyle('left')).toBe('3px');
        expect(getPopoverTargetStyle('top')).toBe('4px');
      });
    });

    describe('with position defined', () => {
      beforeEach(() => {
        createWrapper({ right: '50px', bottom: '100px' });
      });

      it('when mouse moves outside of chart', async () => {
        mockContainPixel.mockReturnValueOnce(false);
        await triggerMouseHandler({ zrX: 1, zrY: 2.3 });

        expect(mockContainPixel).toHaveBeenCalledWith('grid', [1, 2]);
        expect(findPopover().attributes('show')).toBe(undefined);
      });

      it('when mouse moves inside chart', async () => {
        mockContainPixel.mockReturnValueOnce(true);
        await triggerMouseHandler({ zrX: 3, zrY: 4.3 });

        expect(mockContainPixel).toHaveBeenCalledWith('grid', [3, 4]);
        expect(findPopover().attributes('show')).toBe('true');

        expect(getPopoverTargetStyle('left')).toBe('');
        expect(getPopoverTargetStyle('top')).toBe('');
        expect(getPopoverTargetStyle('right')).toBe('50px');
        expect(getPopoverTargetStyle('bottom')).toBe('100px');
      });
    });
  });

  describe('is customized via slots', () => {
    const triggerFormatter = (params) => {
      const { formatter } = mockChartInstance.setOption.mock.calls[0][0].xAxis.axisPointer.label;
      formatter(params);
    };

    describe('formats tooltip', () => {
      beforeEach(() => {
        createWrapper(
          {
            useDefaultTooltipFormatter: true,
          },
          {
            stubs: {
              GlPopover: {
                template: `<div>
                  <slot name="title"></slot>
                    <slot></slot>
                  </div>`,
              },
            },
          }
        );
      });

      it('sets tooltip formatter function', () => {
        expect(mockChartInstance.setOption).toHaveBeenCalledWith({
          xAxis: {
            axisPointer: {
              label: {
                formatter: expect.any(Function),
              },
              show: true,
            },
          },
        });
      });

      it('formats tooltip', async () => {
        expect(findTooltipDefaultFormat().props('tooltipContent')).toEqual({});

        triggerFormatter({
          seriesData: [
            {
              seriesName: 'Series 1',
              value: ['Value', 1],
              color: '#aaa',
            },
            {
              seriesName: 'Series 2',
              value: ['Value', 2],
              color: '#bbb',
            },
          ],
        });
        await nextTick();

        expect(findPopover().text()).toBe('Value');
        expect(findTooltipDefaultFormat().props('tooltipContent')).toEqual({
          'Series 1': { color: '#aaa', value: 1 },
          'Series 2': { color: '#bbb', value: 2 },
        });
      });

      it('formats tooltip with axis names', async () => {
        mockChartInstance.getOption.mockReturnValueOnce({
          xAxis: [{ name: 'Time' }],
          yAxis: [{ name: 'Amount' }],
        });

        triggerFormatter({
          seriesData: [
            {
              seriesName: 'Series 1',
              value: ['Value', 1],
              color: '#aaa',
            },
          ],
        });
        await nextTick();

        expect(findPopover().text()).toBe('Value (Time)');
        expect(findTooltipDefaultFormat().props('tooltipContent')).toEqual({
          Amount: { color: '', value: 1 },
        });
      });
    });
  });
});
