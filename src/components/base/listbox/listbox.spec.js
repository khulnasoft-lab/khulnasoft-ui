import { shallowMount } from '@vue/test-utils';
import Listbox from './listbox.vue';

describe('Listbox', () => {
  let wrapper;

  const factory = (props = {}, scopedSlots = {}) => {
    wrapper = shallowMount(Listbox, {
      propsData: {
        ...props,
      },
      scopedSlots,
    });
  };

  it('does something', () => {
    factory();
    expect(wrapper).toBeTruthy();
  });
});
