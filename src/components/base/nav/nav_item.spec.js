import { shallowMount } from '@vue/test-utils';
import GlNavItem from './nav_item.vue';

describe('GlNavItem', () => {
  let wrapper;

  it('renders the text', () => {
    wrapper = shallowMount(GlNavItem, {
      slots: {
        default: 'Hello, World!',
      },
    });

    expect(wrapper.findComponent(GlNavItem).text()).toBe('Hello, World!');
  });
});
