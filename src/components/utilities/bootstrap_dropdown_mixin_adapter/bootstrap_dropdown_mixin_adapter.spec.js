import { shallowMount } from '@vue/test-utils';
import { waitForAnimationFrame } from '../../../utils/test_utils';
import GlBootstrapDropdownMixinAdapter from './bootstrap_dropdown_mixin_adapter.vue';

describe('GlBootstrapDropdownMixinAdapter', () => {
  let wrapper;
  const toggleSlotContent = '<span>Toggle slot</span>';
  const menuItemsSlotContent = `
        <li>Item 1</li>
        <li>Item 2</li>
  `;

  const createComponent = (props) => {
    wrapper = shallowMount(GlBootstrapDropdownMixinAdapter, {
      propsData: {
        visibleProp: false,
        ...props,
      },
      slots: {
        toggle: toggleSlotContent,
        'menu-items': menuItemsSlotContent,
      },
    });
  };

  const findDropdown = () => wrapper.findComponent({ ref: 'menu' });

  it('renders toggle slot content', () => {
    createComponent();
    expect(wrapper.html()).toContain(toggleSlotContent);
  });

  it('renders menu-items slot content', () => {
    createComponent();
    expect(wrapper.html()).toContain(menuItemsSlotContent);
  });

  describe('dropdown', () => {
    it('is not visible when the visible props is false', () => {
      createComponent();
      expect(findDropdown().classes()).not.toContain('show');
    });

    it('is visible when visible prop is passed', async () => {
      createComponent({ visibleProp: true });

      await wrapper.vm.$nextTick();

      expect(findDropdown().classes()).toContain('show');
    });

    it('emits the visible state when new props passed', async () => {
      createComponent({ visibleProp: false });

      await waitForAnimationFrame();
      await wrapper.setProps({ visibleProp: true });

      expect(wrapper.emitted('update:visibleProp')).toEqual([[true]]);
    });
  });
});
