import { mount } from '@vue/test-utils';
import { isSlotEmpty } from './is_slot_empty';

describe('is slot empty', () => {
  const TestComponent = {
    template: `
      <div>
        <slot></slot>
      </div>
    `,
  };

  it('should return true for empty slot', () => {
    const PassesNothing = {
      components: { TestComponent },
      template: '<test-component></test-component>',
    };

    const wrapper = mount(PassesNothing);

    expect(isSlotEmpty(wrapper.findComponent(TestComponent).vm, 'default')).toBe(true);
  });

  it('should return true for slot with comment', () => {
    const PassesComment = {
      components: { TestComponent },
      template: '<test-component><!-- comment --></test-component>',
    };

    const wrapper = mount(PassesComment);

    expect(isSlotEmpty(wrapper.findComponent(TestComponent).vm, 'default')).toBe(true);
  });

  it('should return true for slot with multiple comments', () => {
    const PassesComment = {
      components: { TestComponent },
      template: '<test-component><!-- comment --><!-- comment2 --></test-component>',
    };

    const wrapper = mount(PassesComment);

    expect(isSlotEmpty(wrapper.findComponent(TestComponent).vm, 'default')).toBe(true);
  });

  it('should return false for non-empty slot', () => {
    const PassesComment = {
      components: { TestComponent },
      template: '<test-component>non-empty</test-component>',
    };

    const wrapper = mount(PassesComment);

    expect(isSlotEmpty(wrapper.findComponent(TestComponent).vm, 'default')).toBe(false);
  });

  it.each([true, false])(
    'should return %s for conditional slot contents based on slot-scope',
    (shouldRender) => {
      const PassesComment = {
        components: { TestComponent },
        template:
          '<test-component><template #default="{ shouldRender }"><span v-if="shouldRender">empty</span></template></test-component>',
      };

      const wrapper = mount(PassesComment);

      expect(
        isSlotEmpty(wrapper.findComponent(TestComponent).vm, 'default', { shouldRender })
      ).toBe(!shouldRender);
    }
  );
});
