import { shallowMount } from '@vue/test-utils';
import GlBootstrapDropdownMixinAdapter from './bootstrap_dropdown_mixin_adapter.vue';

describe('GlBootstrapDropdownMixinAdapter', () => {
  it('renders main components', () => {
    const wrapper = shallowMount(GlBootstrapDropdownMixinAdapter);
    expect(wrapper).toBeInstanceOf(Object);
  });
});
