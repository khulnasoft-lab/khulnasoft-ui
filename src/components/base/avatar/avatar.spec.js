import { shallowMount } from '@vue/test-utils';
import { avatarSizeOptions } from '../../../utils/constants';
import GlAvatar from './avatar.vue';

describe('GlAvatar', () => {
  let wrapper;

  const createWrapper = (props) => {
    wrapper = shallowMount(GlAvatar, {
      propsData: props,
    });
  };

  describe('size property', () => {
    it('uses default size if none is provided', () => {
      createWrapper();

      expect(wrapper.props('size')).toBe(avatarSizeOptions[1]);
    });

    it.each([96, 64, 48, 32, 24, 16])('accepts size %s', (size) => {
      createWrapper({ size });

      expect(wrapper.props('size')).toBe(size);
    });

    it.each([12, 28, 36, 54, 98])('displays an error for size %s', (size) => {
      createWrapper({ size });

      expect(wrapper).toHaveLoggedVueErrors();
    });
  });
});
