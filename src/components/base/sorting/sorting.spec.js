import { mount } from '@vue/test-utils';
import GlDropdown from '../dropdown/dropdown.vue';
import GlIcon from '../icon/icon.vue';
import GlSorting from './sorting.vue';

describe('sorting component', () => {
  let wrapper;

  const defaultDropdownText = 'Sorting component';
  const isAscending = false;

  const defaultProps = {
    text: defaultDropdownText,
    isAscending,
  };

  const selectDropdownButton = () => wrapper.find('.gl-dropdown button');
  const selectDirectionButton = () => wrapper.find('.sorting-direction-button');
  const selectDropdown = () => wrapper.findComponent(GlDropdown);

  const createComponent = (propsData) => {
    wrapper = mount(GlSorting, {
      propsData: {
        ...defaultProps,
        ...propsData,
      },
    });
  };

  it('should display default text in dropdown', () => {
    createComponent();

    expect(selectDropdownButton().text()).toBe(defaultDropdownText);
  });

  it('should have a default sort direction of desc and displays the descending icon', () => {
    createComponent();

    expect(selectDirectionButton().findComponent(GlIcon).props('name')).toBe('sort-highest');
  });

  it('should show new text value when passed in as a prop', () => {
    const newDropdownText = 'Some new text';

    createComponent({
      text: newDropdownText,
    });

    expect(selectDropdownButton().text()).toBe(newDropdownText);
  });

  it('should accept isAscending true as a default sort direction and display the ascending icon', () => {
    createComponent({
      isAscending: true,
    });

    expect(selectDirectionButton().findComponent(GlIcon).props('name')).toBe('sort-lowest');
  });

  it('should emit the sortDirectionChange event when direction button is clicked', () => {
    createComponent();

    selectDirectionButton().trigger('click');

    expect(wrapper.emitted('sortDirectionChange')[0]).toEqual([true]);
  });

  it('should allow custom sort tooltip to be applied', () => {
    const newDirectionTooltip = 'New tooltip text';

    createComponent({
      sortDirectionToolTip: newDirectionTooltip,
    });

    expect(selectDirectionButton().attributes('title')).toBe(newDirectionTooltip);
  });

  it('adds classes passed in `dropdownClass` prop to dropdown', () => {
    createComponent({
      dropdownClass: 'foo-bar',
    });

    expect(selectDropdown().classes()).toContain('foo-bar');
  });

  it('adds classes passed in `dropdownToggleClass` prop to dropdown toggle', () => {
    createComponent({
      dropdownToggleClass: 'foo-bar',
    });

    expect(selectDropdownButton().classes()).toEqual(expect.arrayContaining(['foo-bar']));
  });

  it('adds classes passed in `sortDirectionToggleClass` prop to sort direction toggle', () => {
    createComponent({
      sortDirectionToggleClass: 'foo-bar',
    });

    expect(selectDirectionButton().classes()).toEqual(
      expect.arrayContaining(['sorting-direction-button', 'foo-bar'])
    );
  });
});
