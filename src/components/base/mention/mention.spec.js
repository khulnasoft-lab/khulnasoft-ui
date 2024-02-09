import { mount } from '@vue/test-utils';
import Mention from './mention.vue';

describe('mention component', () => {
  let wrapper;

  const createWrapper = (options) => {
    wrapper = mount(Mention, options);
  };

  describe('default settings', () => {
    beforeEach(() => {
      createWrapper();
    });

    it('should not have a target attribute', () => {
      expect(wrapper.attributes('target')).toBeUndefined();
    });

    it('should not have a rel attribute', () => {
      expect(wrapper.attributes('rel')).toBeUndefined();
    });

    it('should have a default href as #', () => {
      expect(wrapper.attributes('href')).toBe('#');
    });
  });
});
