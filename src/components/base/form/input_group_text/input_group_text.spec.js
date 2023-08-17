import { shallowMount } from '@vue/test-utils';
import GlInputGroupText from './input_group_text.vue';

describe('GlInputGroupText', () => {
  it('renders main components', () => {
    const wrapper = shallowMount(GlInputGroupText);
    expect(wrapper).toBeInstanceOf(Object);
  });
});
