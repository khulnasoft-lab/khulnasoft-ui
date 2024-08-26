import { shallowMount } from '@vue/test-utils';
import GlBaseAnimatedIcon from './base_animated_icon.vue';

describe('GlBaseAnimatedIcon component', () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(GlBaseAnimatedIcon, {
      ...options,
    });
  };

  describe('state class', () => {
    it.each`
      isOn     | expectedClass
      ${false} | ${'gl-animated-icon-off'}
      ${true}  | ${'gl-animated-icon-on'}
    `('adds the $expectedClass when isOn is $isOn', ({ isOn, expectedClass }) => {
      createComponent({ propsData: { isOn } });

      expect(wrapper.classes()).toStrictEqual(['gl-animated-icon', expectedClass]);
    });
  });

  describe('aria-label', () => {
    it('renders aria-label attribute', () => {
      const ariaLabel = "Icon's accessible label";
      createComponent({ propsData: { ariaLabel } });

      expect(wrapper.attributes('aria-label')).toBe(ariaLabel);
    });
  });
});
