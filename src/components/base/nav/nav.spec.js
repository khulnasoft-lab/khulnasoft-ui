import { shallowMount } from '@vue/test-utils';
import GlNav from './nav.vue';
import GlNavItem from './nav_item.vue';

describe('GlNav', () => {
  let wrapper;

  describe('Nav style', () => {
    it('renders slot content', () => {
      wrapper = shallowMount(GlNav, {
        slots: {
          default: [GlNavItem, GlNavItem],
        },
      });

      expect(wrapper.findAllComponents(GlNavItem).exists()).toBe(true);
    });
  });
});
