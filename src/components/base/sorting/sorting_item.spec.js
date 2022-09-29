import { shallowMount } from '@vue/test-utils';
import GlDropdownItem from '../dropdown/dropdown_item.vue';
import GlSortingItem from './sorting_item.vue';

describe('sorting item component', () => {
  let wrapper;

  const sortingItemText = 'Some test text';

  const defaultProps = {};

  const findActiveIcon = () => wrapper.find('.js-active-icon');
  const findGlDropdownItem = () => wrapper.findComponent(GlDropdownItem);

  const createComponent = (propsData) => {
    wrapper = shallowMount(GlSortingItem, {
      context: {
        children: [sortingItemText],
        props: {
          ...defaultProps,
          ...propsData,
        },
      },
      stubs: {
        GlDropdownItem,
      },
    });
  };

  it('should render and display the supplied text', () => {
    createComponent();

    expect(wrapper.text()).toBe(sortingItemText);
  });

  it('does not show the check icon when the active prop is not provided', () => {
    createComponent();

    expect(findActiveIcon().exists()).toBe(true);
    expect(findActiveIcon().classes()).toContain('inactive');
  });

  it('does render a check icon when the active prop is provided', () => {
    createComponent({
      active: true,
    });

    expect(findActiveIcon().exists()).toBe(true);
    expect(findActiveIcon().classes()).not.toContain('inactive');
  });

  it('passes the props down to the gl-dropdown-item component', () => {
    const url = 'https://about.gitlab.com';

    createComponent({
      active: true,
      href: url,
    });

    expect(findGlDropdownItem().attributes('active')).toBe('true');
    expect(findGlDropdownItem().attributes('href')).toBe(url);
  });
});
