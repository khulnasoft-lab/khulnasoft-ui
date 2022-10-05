import { shallowMount } from '@vue/test-utils';
import { BNavItemDropdown } from 'bootstrap-vue';
import GlIcon from '../icon/icon.vue';
import GlNavItemDropdown from './nav_item_dropdown.vue';

describe('GlNavItemDropdown', () => {
  let wrapper;

  const factory = (propsData = {}, slots = {}) => {
    wrapper = shallowMount(GlNavItemDropdown, {
      propsData,
      slots,
      stubs: {
        BNavItemDropdown,
      },
    });
  };

  const findBNavItemDropdown = () => wrapper.findComponent(BNavItemDropdown);

  describe('default', () => {
    it('renders BNavItemDropdown', () => {
      const expectedText = 'Hello!';

      factory({ text: expectedText });

      const navItemDropdown = findBNavItemDropdown();

      expect(navItemDropdown.exists()).toBe(true);
      expect(navItemDropdown.find('.dropdown-toggle').text()).toBe(expectedText);
    });

    describe('button-content slot', () => {
      it('renders default template', () => {
        factory();

        const glIcon = wrapper.findComponent(GlIcon);

        expect(glIcon.exists()).toBe(true);
        expect(glIcon.classes('dropdown-chevron')).toBe(true);
      });

      it('renders custom template', () => {
        factory(
          {},
          {
            'button-content': '<div class="foo">Custom button-content</div>',
          }
        );

        const buttonContentSlot = wrapper.find('.foo');

        expect(buttonContentSlot.exists()).toBe(true);
        expect(buttonContentSlot.text()).toBe('Custom button-content');
      });
    });
  });
});
