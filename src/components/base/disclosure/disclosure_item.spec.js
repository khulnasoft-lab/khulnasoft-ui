import { shallowMount } from '@vue/test-utils';
import { BDropdownItem, BDropdownItemButton } from 'bootstrap-vue';

import GlDisclosureItem from './disclosure_item.vue';

describe('disclosure item', () => {
  let wrapper;

  const buildWrapper = (propsData) => {
    wrapper = shallowMount(GlDisclosureItem, {
      propsData,
    });
  };

  afterEach(() => wrapper.destroy());

  describe('dynamic component rendering', () => {
    it('with no "href" or "to" attrs, renders a button', () => {
      buildWrapper();
      expect(wrapper.findComponent(BDropdownItemButton).exists()).toBe(true);
    });

    it('with "href" attr, renders an item', () => {
      buildWrapper({ href: '/home' });
      expect(wrapper.findComponent(BDropdownItem).exists()).toBe(true);
    });

    it('with "to" attr, renders an item', () => {
      buildWrapper({ to: { path: 'home' } });
      expect(wrapper.findComponent(BDropdownItem).exists()).toBe(true);
    });
  });
});
