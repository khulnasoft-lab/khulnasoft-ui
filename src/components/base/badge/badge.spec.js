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
      scenario                | hasSlot  | iconName     | iconSize | expectedIconSize | expectedRole | expectedAriaLabel
      ${'icon-only'}          | ${false} | ${'warning'} | ${'md'}  | ${16}            | ${'img'}     | ${'warning'}
      ${'16px icon and slot'} | ${true}  | ${'warning'} | ${'md'}  | ${16}            | ${undefined} | ${undefined}
      ${'12px icon and slot'} | ${true}  | ${'warning'} | ${'sm'}  | ${12}            | ${undefined} | ${undefined}
    `(
      'with $scenario',
      ({ iconName, iconSize, expectedIconSize, hasSlot, expectedRole, expectedAriaLabel }) => {
        beforeEach(() => {
          const slots = hasSlot ? { default: 'slot-content' } : undefined;
          createComponent({ propsData: { icon: iconName, iconSize }, slots });
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

          it('with correct size', () => {
            expect(findIcon().props('size')).toBe(expectedIconSize);
          });
        });

        it('sets aria-label', () => {
          expect(wrapper.attributes('aria-label')).toBe(expectedAriaLabel);
        });
      }
    );
  });

  describe('without "icon" prop', () => {
    const mockSlotContent = 'slot-content';
    beforeEach(() => {
      createComponent({ slots: { default: mockSlotContent }, attrs: { 'aria-label': 'Success' } });
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

    it('sets aria-label', () => {
      expect(wrapper.attributes('aria-label')).toBe('Success');
    });
  });
});
