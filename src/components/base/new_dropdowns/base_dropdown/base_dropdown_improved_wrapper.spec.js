import { shallowMount } from '@vue/test-utils';
import { OutsideDirective } from '../../../../directives/outside/outside';
import BaseDropdownImprovedWrapper from './base_dropdown_improved_wrapper.vue';

describe('BaseDropdownImprovedWrapper', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseDropdownImprovedWrapper, {
      global: {
        directives: {
          Outside: OutsideDirective,
        },
      },
    });
  });

  it('emits close event on outside click', async () => {
    const event = new Event('click');
    document.dispatchEvent(event);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('close')).toHaveLength(1);
    expect(wrapper.emitted('close')[0]).toEqual([event]);
  });

  it('emits close event on focusin', async () => {
    const event = new Event('focusin');
    document.dispatchEvent(event);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('close')).toHaveLength(1);
    expect(wrapper.emitted('close')[0]).toEqual([event]);
  });
});
