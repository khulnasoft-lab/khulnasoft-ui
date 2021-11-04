import { shallowMount } from '@vue/test-utils';
import { tooltipActionEvents } from '../../../utils/constants';
import GlPopover from './popover.vue';

describe('GlPopover', () => {
  let wrapper;

  const createWrapper = (props) => {
    wrapper = shallowMount(GlPopover, {
      propsData: {
        target: document.body,
        ...props,
      },
    });
  };

  const findBVPopover = () => wrapper.findComponent({ ref: 'bPopover' });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it.each(tooltipActionEvents)('passes through the %s event to the bvPopover instance', (event) => {
    createWrapper();
    wrapper.vm.$emit(event);

    expect(findBVPopover().emitted(event)).toHaveLength(1);
  });

  describe('triggers', () => {
    it('defaults to "hover focus" for triggers', () => {
      createWrapper();

      expect(findBVPopover().exists()).toBe(true);
    });

    it('uses custom triggers if provided', () => {
      const triggers = 'manual';
      createWrapper({ triggers });

      expect(findBVPopover().props('triggers')).toBe(triggers);
    });
  });

  describe('title slot', () => {
    it('renders title slot content', () => {
      const title = 'Popover title';
      createWrapper({ title });

      expect(findBVPopover().props('title')).toBe(title);
    });
  });
});
