import { shallowMount } from '@vue/test-utils';
import GlTextInputDropdown from './text_input_dropdown.vue';

describe('GlTextInputDropdown', () => {
  it('renders main components', () => {
    const wrapper = shallowMount(GlTextInputDropdown);
    expect(wrapper).toBeInstanceOf(Object);
  });
});
