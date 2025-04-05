import { mount } from '@vue/test-utils';
import { useMockIntersectionObserver } from '~/utils/use_mock_intersection_observer';
import GlCollapsibleListbox from '../new_dropdowns/listbox/listbox.vue';
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

  const selectDropdownButton = () => wrapper.find('button');
  const selectDirectionButton = () => wrapper.findAll('button').at(1);
  const findListbox = () => wrapper.findComponent(GlCollapsibleListbox);
  const findListboxItem = (text) =>
    wrapper
      .findAll('[role="option"]')
      .filter((w) => w.text().includes(text))
      .at(0);

  const createComponent = (propsData) => {
    wrapper = mount(GlSorting, {
      propsData: {
        ...defaultProps,
        ...propsData,
      },
    });
  };

  describe('using listbox', () => {
    useMockIntersectionObserver();

    it('should display given toggle text in dropdown', () => {
      createComponent({ sortOptions: [] });

      expect(selectDropdownButton().text()).toBe(defaultDropdownText);
    });

    it('should show new text value when passed in as a prop', () => {
      const newDropdownText = 'Some new text';

      createComponent({
        text: newDropdownText,
      });

      expect(selectDropdownButton().text()).toBe(newDropdownText);
    });

    it('should use the selected sort option text in dropdown if text is not given', () => {
      createComponent({ text: null, sortOptions: [{ value: 0, text: 'Foo' }], sortBy: 0 });

      expect(selectDropdownButton().text()).toBe('Foo');
    });

    it('renders the given sort options', () => {
      createComponent({
        sortOptions: [
          { value: 'foo', text: 'Foo' },
          { value: 'bar', text: 'Bar' },
        ],
      });

      expect(findListboxItem('Foo').exists()).toBe(true);
      expect(findListboxItem('Bar').exists()).toBe(true);
    });

    it('emits sortByChange event when user changes sort option', async () => {
      createComponent({
        sortOptions: [
          { value: 'foo', text: 'Foo' },
          { value: 'bar', text: 'Bar' },
        ],
        sortBy: 'foo',
      });

      await findListboxItem('Foo').trigger('click');
      expect(wrapper.emitted('sortByChange')).toBe(undefined);

      await findListboxItem('Bar').trigger('click');
      expect(wrapper.emitted('sortByChange')).toEqual([['bar']]);
    });

    it('should have a default sort direction of desc and displays the descending icon', () => {
      createComponent({ sortOptions: [] });

      expect(selectDirectionButton().findComponent(GlIcon).props('name')).toBe('sort-highest');
    });

    it('should accept isAscending true as a default sort direction and display the ascending icon', () => {
      createComponent({
        sortOptions: [],
        isAscending: true,
      });

      expect(selectDirectionButton().findComponent(GlIcon).props('name')).toBe('sort-lowest');
    });

    it('should emit the sortDirectionChange event when direction button is clicked', () => {
      createComponent({ sortOptions: [] });

      selectDirectionButton().trigger('click');

      expect(wrapper.emitted('sortDirectionChange')[0]).toEqual([true]);
    });

    it('should allow custom sort tooltip to be applied', () => {
      const newDirectionTooltip = 'New tooltip text';

      createComponent({
        sortDirectionToolTip: newDirectionTooltip,
      });

      expect(selectDirectionButton().attributes('title')).toBe(newDirectionTooltip);
      expect(selectDirectionButton().attributes('aria-label')).toBe(newDirectionTooltip);
    });

    it('adds classes passed in `dropdownClass` prop to dropdown', () => {
      createComponent({
        sortOptions: [],
        dropdownClass: 'foo-bar',
      });

      expect(findListbox().classes()).toContain('foo-bar');
    });

    it('adds classes passed in `dropdownToggleClass` prop to dropdown toggle', () => {
      createComponent({
        sortOptions: [],
        dropdownToggleClass: 'foo-bar',
      });

      expect(selectDropdownButton().classes()).toEqual(expect.arrayContaining(['foo-bar']));
    });

    it('adds classes passed in `sortDirectionToggleClass` prop to sort direction toggle', () => {
      createComponent({
        sortOptions: [],
        sortDirectionToggleClass: 'foo-bar',
      });

      expect(selectDirectionButton().classes()).toEqual(
        expect.arrayContaining(['sorting-direction-button', 'foo-bar'])
      );
    });

    it('passes `block` prop to listbox', () => {
      createComponent({
        block: true,
      });

      expect(findListbox().props('block')).toBe(true);
    });

    it('sets aria-label of sort direction button', async () => {
      createComponent({ sortOptions: [] });

      expect(selectDirectionButton().attributes('aria-label')).toBe('Sort direction: descending');

      await wrapper.setProps({ isAscending: true });

      expect(selectDirectionButton().attributes('aria-label')).toBe('Sort direction: ascending');
    });
  });
});
