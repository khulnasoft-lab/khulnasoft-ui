import { mount } from '@vue/test-utils';
import GlNav from './nav.vue';

describe('nav', () => {
  it('has expected default structure', () => {
    const wrapper = mount(GlNav);

    expect(wrapper.element.tagName).toBe('UL');
    expect(wrapper.classes()).toEqual(['nav']);
    expect(wrapper.text()).toBe('');
  });

  it('renders custom root element when prop tag set', () => {
    const wrapper = mount(GlNav, {
      propsData: {
        tag: 'ol',
      },
    });

    expect(wrapper.element.tagName).toBe('OL');
  });

  it('renders default slot content', () => {
    const wrapper = mount(GlNav, {
      slots: {
        default: 'foobar',
      },
    });

    expect(wrapper.text()).toBe('foobar');
  });

  it('applies pill style', () => {
    const wrapper = mount(GlNav, {
      propsData: {
        pills: true,
      },
    });

    expect(wrapper.classes()).toEqual(['nav', 'nav-pills']);
  });

  it('applies tab style', () => {
    const wrapper = mount(GlNav, {
      propsData: {
        tabs: true,
      },
    });

    expect(wrapper.classes()).toEqual(['nav', 'nav-tabs']);
  });

  it('applies justify style when justified', () => {
    const wrapper = mount(GlNav, {
      propsData: {
        justified: true,
      },
    });

    expect(wrapper.classes()).toEqual(['nav', 'nav-justified']);
  });

  it('applies fill style style when fill set', () => {
    const wrapper = mount(GlNav, {
      propsData: {
        fill: true,
      },
    });

    expect(wrapper.classes()).toEqual(['nav', 'nav-fill']);
  });

  it('applies alignment correctly', () => {
    const wrapper = mount(GlNav, {
      propsData: {
        align: 'center',
      },
    });

    expect(wrapper.classes()).toEqual(['nav', 'justify-content-center']);
  });

  it('applies small style', () => {
    const wrapper = mount(GlNav, {
      propsData: {
        small: true,
      },
    });

    expect(wrapper.classes()).toEqual(['nav', 'small']);
  });

  it('applies card-header-tabs class when tabs and card-header props set', () => {
    const wrapper = mount(GlNav, {
      propsData: {
        tabs: true,
        cardHeader: true,
      },
    });

    expect(wrapper.classes()).toEqual(['nav', 'nav-tabs', 'card-header-tabs']);
    expect(wrapper.text()).toBe('');
  });

  it('applies card-header-pills class when pills and card-header props set', () => {
    const wrapper = mount(GlNav, {
      propsData: {
        pills: true,
        cardHeader: true,
      },
    });

    expect(wrapper.classes()).toEqual(['nav', 'nav-pills', 'card-header-pills']);
  });
});
