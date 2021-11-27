import { shallowMount } from '@vue/test-utils';
import Icon from '../icon/icon.vue';
import Badge from './badge.vue';

describe('badge', () => {
  let wrapper;

  const findIcon = () => wrapper.findComponent(Icon);

  const createComponent = ({ attrs = {}, propsData = {}, slots } = {}) => {
    wrapper = shallowMount(Badge, {
      propsData,
      attrs,
      slots,
    });
  };

  describe('with "icon" prop', () => {
    describe.each`
      scenario           | hasSlot  | iconName     | expectedRole
      ${'icon-only'}     | ${false} | ${'warning'} | ${'img'}
      ${'icon and slot'} | ${true}  | ${'warning'} | ${undefined}
    `('with $scenario', ({ iconName, hasSlot, expectedRole }) => {
      beforeEach(() => {
        const slots = hasSlot ? { default: 'slot-content' } : undefined;
        createComponent({ propsData: { icon: iconName }, slots });
      });

      it(`sets badge "role" attribute to ${expectedRole}`, () => {
        expect(wrapper.attributes('role')).toBe(expectedRole);
      });

      describe('renders icon', () => {
        it('with correct props', () => {
          const icon = findIcon();
          expect(icon.exists()).toBe(true);
          expect(icon.props('name')).toBe(iconName);
        });

        it('with correct class', () => {
          const icon = findIcon();

          expect(icon.classes('gl-mr-2')).toBe(hasSlot);
        });
      });
    });
  });

  describe('without "icon" prop', () => {
    const mockSlotContent = 'slot-content';
    beforeEach(() => {
      createComponent({ slots: { default: mockSlotContent } });
    });

    it('renders slot content', () => {
      expect(wrapper.html()).toContain(mockSlotContent);
    });

    it('does not render icon', () => {
      expect(findIcon().exists()).toBe(false);
    });

    it('sets badge "role" attribute to undefined', () => {
      expect(wrapper.attributes('role')).toBe(undefined);
    });
  });
});
