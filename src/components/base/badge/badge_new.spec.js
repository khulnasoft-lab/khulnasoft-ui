import { shallowMount } from '@vue/test-utils';
import Badge from './badge_new.vue';

describe('badge_new', () => {
  let wrapper;

  const createComponent = ({ attrs = {}, propsData = {}, slots } = {}) => {
    wrapper = shallowMount(Badge, {
      propsData,
      attrs,
      slots,
    });
  };

  it('renders', () => {
    createComponent();
    expect(wrapper.exists()).toBe(true);
  });
});
