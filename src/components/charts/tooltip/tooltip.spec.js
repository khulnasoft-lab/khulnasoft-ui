import { shallowMount } from '@vue/test-utils';
import GlPopover from '../../base/popover/popover.vue';
import { popoverPlacements } from '../../../utils/constants';
import ChartTooltip from './tooltip.vue';
import { createMockChartInstance } from '~helpers/chart_stubs';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

describe('ChartTooltip', () => {
  let wrapper;

  const findGlPopover = () => wrapper.findComponent(GlPopover);

  const createWrapper = (props = {}) => {
    mockChartInstance = createMockChartInstance();
    wrapper = shallowMount(ChartTooltip, {
      propsData: {
        chart: mockChartInstance,
        ...props,
      },
    });
  };

  describe('GlPopover', () => {
    it('is right-positioned by default', () => {
      createWrapper();

      expect(findGlPopover().props('placement')).toBe(popoverPlacements.right);
    });

    it('applies passed placement if any', () => {
      const placement = popoverPlacements.bottom;
      createWrapper({ placement });

      expect(findGlPopover().props('placement')).toBe(placement);
    });
  });
});
