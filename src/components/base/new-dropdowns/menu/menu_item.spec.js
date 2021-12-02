import { shallowMount } from '@vue/test-utils';

import GlMenuItem, { ExtendedBDropdownItem, ExtendedBDropdownItemButton } from './menu_item.vue';

describe('menu item', () => {
  let wrapper;

  const buildWrapper = (propsData) => {
    wrapper = shallowMount(GlMenuItem, {
      propsData,
    });
  };

  afterEach(() => wrapper.destroy());

  describe('dynamic component rendering', () => {
    it('with no "href" or "to" attrs, renders a button', () => {
      buildWrapper();
      expect(wrapper.findComponent(ExtendedBDropdownItemButton).exists()).toBe(true);
    });

    it('with "href" attr, renders an item', () => {
      buildWrapper({ href: '/home' });
      expect(wrapper.findComponent(ExtendedBDropdownItem).exists()).toBe(true);
    });

    it('with "to" attr, renders an item', () => {
      buildWrapper({ to: { path: 'home' } });
      expect(wrapper.findComponent(ExtendedBDropdownItem).exists()).toBe(true);
    });
  });
});
