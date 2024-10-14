import { shallowMount } from '@vue/test-utils';
import { BLink } from '../../../vendor/bootstrap-vue/src/components/link/link';
import { badgeVariantOptions } from '../../../utils/constants';
import Icon from '../icon/icon.vue';
import Badge from './badge.vue';

describe('badge', () => {
  let wrapper;

  const findIcon = () => wrapper.findComponent(Icon);
  const findLink = () => wrapper.findComponent(BLink);

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

  describe('wrapper element', () => {
    it('uses "span" element by default', () => {
      createComponent();

      expect(wrapper.element.tagName).toBe('SPAN');
    });

    it('creates element based on "tag" if not link', () => {
      createComponent({ propsData: { tag: 'div' } });

      expect(wrapper.element.tagName).toBe('DIV');
    });

    it('uses a link if "href" prop is set, regardless of "tag" prop', () => {
      createComponent({ propsData: { tag: 'div', href: 'https://www.gitlab.com' } });

      expect(findLink().exists()).toBe(true);
    });
  });

  describe('classes', () => {
    it('sets default classes', () => {
      createComponent({ slots: { default: 'slot-content' } });

      expect(wrapper.classes()).toMatchObject(['gl-badge', 'badge', 'badge-pill', 'badge-muted']);
    });

    it.each(Object.values(badgeVariantOptions))(
      'sets correct css class for variant %s',
      (variant) => {
        createComponent({ propsData: { variant } });

        expect(wrapper.classes(`badge-${variant}`)).toBe(true);
      }
    );

    it('sets "!gl-px-2" class when no child content is set', () => {
      createComponent();

      expect(wrapper.classes('!gl-px-2')).toBe(true);
    });
  });

  describe('link badge', () => {
    it('passes link props to BLink', () => {
      const linkProps = {
        href: 'https://www.gitlab.com',
        rel: 'external',
        target: '_blank',
        active: true,
        disabled: true,
      };
      createComponent({
        propsData: linkProps,
      });

      expect(findLink().props()).toMatchObject(linkProps);
    });
  });
});
