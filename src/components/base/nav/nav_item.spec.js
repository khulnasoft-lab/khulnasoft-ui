import { mount } from '@vue/test-utils';
import GlLink from '../link/link.vue';
import GlNavItem from './nav_item.vue';

describe('GlNavItem', () => {
  it('has expected default structure', () => {
    const wrapper = mount(GlNavItem);

    expect(wrapper.element.tagName).toBe('LI');
    expect(wrapper.classes()).toEqual(['nav-item']);

    const link = wrapper.findComponent(GlLink);
    expect(link.exists()).toBe(true);
    expect(link.classes()).toEqual(['nav-link']);
    expect(link.attributes('href')).toBe('#');
  });

  it('has attrs on link when link-attrs set', () => {
    const wrapper = mount(GlNavItem, {
      propsData: {
        linkAttrs: { role: 'tab' },
      },
    });

    expect(wrapper.attributes('role')).toBeUndefined();
    expect(wrapper.find('a').attributes('role')).toBe('tab');
  });

  it('has custom classes on link when link-classes set', () => {
    const wrapper = mount(GlNavItem, {
      propsData: {
        linkClasses: ['foo', { bar: true }],
      },
    });

    expect(wrapper.find('a').classes()).toEqual(['nav-link', 'foo', 'bar']);
  });

  it('has class "disabled" on link when disabled set', () => {
    const wrapper = mount(GlNavItem, {
      propsData: {
        disabled: true,
      },
    });

    const link = wrapper.find('a');
    expect(link.classes()).toContain('disabled');
  });

  it('has class "active" on link when active set', () => {
    const wrapper = mount(GlNavItem, {
      propsData: {
        active: true,
      },
    });

    const link = wrapper.find('a');
    expect(link.classes()).toContain('active');
  });

  it('emits click event when clicked', async () => {
    const onClick = jest.fn();
    const wrapper = mount(GlNavItem, { listeners: { click: onClick } });

    await wrapper.trigger('click');
    expect(onClick).not.toHaveBeenCalled();

    const link = wrapper.find('a');
    await link.trigger('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('does not emit a click event when clicked and disabled', async () => {
    const onClick = jest.fn();
    const wrapper = mount(GlNavItem, {
      propsData: { disabled: true },
      listeners: { click: onClick },
    });

    await wrapper.trigger('click');
    expect(onClick).not.toHaveBeenCalled();

    const link = wrapper.find('a');
    await link.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
  });
});
