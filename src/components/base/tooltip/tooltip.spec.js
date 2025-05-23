import { shallowMount } from '@vue/test-utils';
import { tooltipActionEvents } from '../../../utils/constants';
import { setGlTooltipDefaultContainer } from '../../../directives/tooltip/container';
import GlTooltip from './tooltip.vue';

describe('GlTooltip', () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = shallowMount(GlTooltip, {
      propsData: {
        target: document.body,
      },
    });
  };

  const findBVTooltip = () => wrapper.findComponent({ ref: 'bvTooltip' });

  it.each(tooltipActionEvents)('passes through the %s event to the bvTooltip instance', (event) => {
    createWrapper();
    wrapper.vm.$emit(event);

    expect(findBVTooltip().emitted(event)).toHaveLength(1);
  });

  it('respects custom default container', () => {
    setGlTooltipDefaultContainer('#custom-element');
    createWrapper();
    expect(findBVTooltip().props('container')).toBe('#custom-element');
  });
});
