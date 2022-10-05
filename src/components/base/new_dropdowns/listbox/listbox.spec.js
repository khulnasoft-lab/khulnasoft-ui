import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import GlBaseDropdown from '../base_dropdown/base_dropdown.vue';
import {
  GL_DROPDOWN_SHOWN,
  GL_DROPDOWN_HIDDEN,
  ARROW_DOWN,
  ARROW_UP,
  HOME,
  END,
} from '../constants';
import GlListbox, { ITEM_SELECTOR } from './listbox.vue';
import GlListboxItem from './listbox_item.vue';
import GlListboxGroup from './listbox_group.vue';
import { mockOptions, mockGroups } from './mock_data';

describe('GlListbox', () => {
  let wrapper;

  const buildWrapper = (propsData, slots = {}) => {
    wrapper = mount(GlListbox, {
      propsData,
      slots,
      attachTo: document.body,
    });
  };

  const findBaseDropdown = () => wrapper.findComponent(GlBaseDropdown);
  const findListContainer = () => wrapper.find('[role="listbox"]');
  const findListboxItems = (root = wrapper) => root.findAllComponents(GlListboxItem);
  const findListboxGroups = () => wrapper.findAllComponents(GlListboxGroup);
  const findListItem = (index) => findListboxItems().at(index).find(ITEM_SELECTOR);
  const findSearchBox = () => wrapper.find("[data-testid='listbox-search-input']");
  const findNoResultsText = () => wrapper.find("[data-testid='listbox-no-results-text']");
  const findLoadingIcon = () => wrapper.find("[data-testid='listbox-search-loader']");
  const findSRNumberOfResultsText = () => wrapper.find("[data-testid='listbox-number-of-results']");

  describe('toggle text', () => {
    describe.each`
      toggleText          | multiple | selected                  | expectedToggleText
      ${'Toggle caption'} | ${true}  | ${[mockOptions[0].value]} | ${'Toggle caption'}
      ${''}               | ${true}  | ${[mockOptions[0]].value} | ${''}
      ${''}               | ${false} | ${mockOptions[0].value}   | ${mockOptions[0].text}
      ${''}               | ${false} | ${''}                     | ${''}
    `('when listbox', ({ toggleText, multiple, selected, expectedToggleText }) => {
      beforeEach(() => {
        buildWrapper({ items: mockOptions, toggleText, multiple, selected });
      });

      it(`is ${multiple ? 'multi' : 'single'}-select, toggleText is ${
        toggleText.length ? '' : 'not '
      }provided and ${selected ? 'has' : 'does not have'} selected`, () => {
        expect(findBaseDropdown().props('toggleText')).toBe(expectedToggleText);
      });
    });
  });

  describe('ARIA attributes', () => {
    it('should provide `toggleId` to the base dropdown and reference it in`aria-labelledby` attribute of the list container`', async () => {
      await buildWrapper({ items: mockOptions });
      expect(findBaseDropdown().props('toggleId')).toBe(
        findListContainer().attributes('aria-labelledby')
      );
    });

    it('should reference `listAriaLabelledby`', async () => {
      const listAriaLabelledBy = 'first-label-id second-label-id';
      await buildWrapper({ items: mockOptions, listAriaLabelledBy });
      expect(findListContainer().attributes('aria-labelledby')).toBe(listAriaLabelledBy);
    });
  });

  describe('selecting items', () => {
    describe('multi-select', () => {
      beforeEach(() => {
        buildWrapper({
          multiple: true,
          selected: [mockOptions[1].value, mockOptions[2].value],
          items: mockOptions,
        });
      });

      it('should render items as selected when `selected` provided', () => {
        expect(findListboxItems().at(1).props('isSelected')).toBe(true);
        expect(findListboxItems().at(2).props('isSelected')).toBe(true);
      });

      it('should deselect previously selected', async () => {
        findListboxItems().at(1).vm.$emit('select', false);
        await nextTick();
        expect(wrapper.emitted('select')[0][0]).toEqual([mockOptions[2].value]);
      });

      it('should add to selection', async () => {
        findListboxItems().at(0).vm.$emit('select', true);
        await nextTick();
        expect(wrapper.emitted('select')[0][0]).toEqual(
          // The first three items should now be selected.
          expect.arrayContaining(mockOptions.slice(0, 3).map(({ value }) => value))
        );
      });
    });

    describe('single-select', () => {
      beforeEach(() => {
        buildWrapper({ selected: mockOptions[1].value, items: mockOptions });
      });

      it('should throw an error when array of selections is provided', () => {
        expect(() => {
          buildWrapper({
            selected: [mockOptions[1].value, mockOptions[2].value],
            items: mockOptions,
          });
        }).toThrow('To allow multi-selection, please, set "multiple" property to "true"');
        expect(wrapper).toHaveLoggedVueErrors();
      });

      it('should render item as selected when `selected` provided', () => {
        expect(findListboxItems().at(1).props('isSelected')).toBe(true);
      });

      it('should deselect previously selected and select a new item', async () => {
        findListboxItems().at(2).vm.$emit('select', true);
        await nextTick();
        expect(wrapper.emitted('select')[0][0]).toEqual(mockOptions[2].value);
      });
    });

    describe('with groups', () => {
      const selected = mockGroups[1].options[1].value;

      beforeEach(() => {
        buildWrapper({ selected, items: mockGroups });
      });

      it('should render item as selected when `selected` provided', () => {
        expect(findListboxItems().at(3).props('isSelected')).toBe(true);
      });

      it('should deselect previously selected and select a new item', async () => {
        findListboxItems().at(0).vm.$emit('select', true);
        await nextTick();
        expect(wrapper.emitted('select')[0][0]).toEqual(mockGroups[0].options[0].value);
      });
    });
  });

  describe('onShow', () => {
    let focusSpy;

    const showDropdown = async ({ searchable = false } = {}) => {
      buildWrapper({
        multiple: true,
        items: mockOptions,
        selected: [mockOptions[2].value, mockOptions[1].value],
        searchable,
      });
      if (searchable) {
        focusSpy = jest.spyOn(wrapper.vm.$refs.searchBox, 'focusInput');
      }
      findBaseDropdown().vm.$emit(GL_DROPDOWN_SHOWN);
      await nextTick();
    };

    it('should re-emit the event', async () => {
      await showDropdown();
      expect(wrapper.emitted(GL_DROPDOWN_SHOWN)).toHaveLength(1);
    });

    it('should focus the first selected item', async () => {
      await showDropdown();
      expect(findListboxItems().at(1).find(ITEM_SELECTOR).element).toHaveFocus();
    });

    it('should focus the search input when search is enabled', async () => {
      await showDropdown({ searchable: true });
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('onHide', () => {
    beforeEach(() => {
      buildWrapper();
      findBaseDropdown().vm.$emit(GL_DROPDOWN_HIDDEN);
    });

    it('should re-emit the event', () => {
      expect(wrapper.emitted(GL_DROPDOWN_HIDDEN)).toHaveLength(1);
    });
  });

  describe('navigating the items', () => {
    let firstItem;
    let secondItem;
    let thirdItem;

    beforeEach(() => {
      // These tests are more easily written with a small list of items.
      buildWrapper({ items: mockOptions.slice(0, 3) });
      findBaseDropdown().vm.$emit(GL_DROPDOWN_SHOWN);
      firstItem = findListItem(0);
      secondItem = findListItem(1);
      thirdItem = findListItem(2);
    });

    it('should move the focus down the list of items on `ARROW_DOWN` and stop on the last item', async () => {
      expect(firstItem.element).toHaveFocus();
      await firstItem.trigger('keydown', { code: ARROW_DOWN });
      expect(secondItem.element).toHaveFocus();
      await secondItem.trigger('keydown', { code: ARROW_DOWN });
      expect(thirdItem.element).toHaveFocus();
      await thirdItem.trigger('keydown', { code: ARROW_DOWN });
      expect(thirdItem.element).toHaveFocus();
    });

    it('should move the focus up the list of items on `ARROW_UP` and stop on the first item', async () => {
      await firstItem.trigger('keydown', { code: ARROW_DOWN });
      await secondItem.trigger('keydown', { code: ARROW_DOWN });
      expect(thirdItem.element).toHaveFocus();
      await thirdItem.trigger('keydown', { code: ARROW_UP });
      expect(secondItem.element).toHaveFocus();
      await secondItem.trigger('keydown', { code: ARROW_UP });
      expect(firstItem.element).toHaveFocus();
      await firstItem.trigger('keydown', { code: ARROW_UP });
      expect(firstItem.element).toHaveFocus();
    });

    it('should move focus to the last item on `END` keydown', async () => {
      expect(firstItem.element).toHaveFocus();
      await firstItem.trigger('keydown', { code: END });
      expect(thirdItem.element).toHaveFocus();
      await thirdItem.trigger('keydown', { code: END });
      expect(thirdItem.element).toHaveFocus();
    });

    it('should move focus to the first item on `HOME` keydown', async () => {
      await firstItem.trigger('keydown', { code: ARROW_DOWN });
      await secondItem.trigger('keydown', { code: ARROW_DOWN });
      expect(thirdItem.element).toHaveFocus();
      await thirdItem.trigger('keydown', { code: HOME });
      expect(firstItem.element).toHaveFocus();
      await thirdItem.trigger('keydown', { code: HOME });
      expect(firstItem.element).toHaveFocus();
    });

    describe('when `searchable` is enabled', () => {
      it('should move focus to the first item on search input `ARROW_DOWN`', async () => {
        buildWrapper({ items: mockOptions, searchable: true });
        findBaseDropdown().vm.$emit(GL_DROPDOWN_SHOWN);
        findSearchBox().trigger('keydown', { code: ARROW_DOWN });
        expect(firstItem.element).toHaveFocus();
      });

      it('should move focus to the search input on first item `ARROW_UP', async () => {
        buildWrapper({ items: mockOptions, searchable: true });
        findBaseDropdown().vm.$emit(GL_DROPDOWN_SHOWN);
        const focusSpy = jest.spyOn(wrapper.vm.$refs.searchBox, 'focusInput');
        await firstItem.trigger('keydown', { code: ARROW_UP });
        expect(focusSpy).toHaveBeenCalled();
      });
    });
  });

  describe('when the header slot content is provided', () => {
    const headerContent = 'Header Content';
    const slots = { header: headerContent };

    it('renders it', () => {
      buildWrapper({}, slots);
      expect(wrapper.text()).toContain(headerContent);
    });
  });

  describe('when the footer slot content is provided', () => {
    const footerContent = 'Footer Content';
    const slots = { footer: footerContent };

    it('renders it', () => {
      buildWrapper({}, slots);
      expect(wrapper.text()).toContain(footerContent);
    });
  });

  describe('with groups', () => {
    it('renders groups of items', () => {
      buildWrapper({ items: mockGroups });

      const groups = findListboxGroups();

      expect(groups.length).toBe(mockGroups.length);

      const expectedNameProps = mockGroups.map((group) => group.text);
      const actualNameProps = groups.wrappers.map((group) => group.props('name'));

      expect(actualNameProps).toEqual(expectedNameProps);

      mockGroups.forEach((group, i) => {
        expect(findListboxItems(groups.at(i))).toHaveLength(group.options.length);
      });
    });
  });

  describe('when `searchable` is enabled', () => {
    it('should render the search box', () => {
      buildWrapper({ items: mockOptions, searchable: true });

      expect(findSearchBox().exists()).toBe(true);
    });

    it('should emit the search value when typing in the search box', async () => {
      buildWrapper({ items: mockOptions, searchable: true });

      const searchStr = 'search  value';
      findSearchBox().vm.$emit('input', searchStr);
      await nextTick();
      expect(wrapper.emitted('search')[0][0]).toEqual(searchStr);
    });

    it('should not render the loading icon and render the list if NOT searching', () => {
      buildWrapper({ items: mockOptions, searchable: true });

      expect(findLoadingIcon().exists()).toBe(false);
      expect(findListContainer().exists()).toBe(true);
    });

    it('should render the loading icon and NOT render the list when searching', () => {
      buildWrapper({ items: mockOptions, searchable: true, searching: true });

      expect(findLoadingIcon().exists()).toBe(true);
      expect(findListContainer().exists()).toBe(false);
    });

    it('should display `noResultText` if no items found', () => {
      const noResultsText = 'Nothing found';
      buildWrapper({ items: [], searchable: true, searching: false, noResultsText });

      expect(findLoadingIcon().exists()).toBe(false);
      expect(findListContainer().exists()).toBe(false);
      expect(findNoResultsText().text()).toBe(noResultsText);
    });

    describe('Screen reader text with number of search results', () => {
      it('when the #search-summary-sr-only slot content is provided', () => {
        const searchResultsContent = 'Found 5 results';
        const slots = { 'search-summary-sr-only': searchResultsContent };
        buildWrapper({ items: mockOptions, searchable: true, searching: false }, slots);
        expect(findSRNumberOfResultsText().text()).toBe(searchResultsContent);
      });

      it('should not display SR text when no matching results', () => {
        buildWrapper({ items: [], searchable: true, searching: false });
        expect(findSRNumberOfResultsText().exists()).toBe(false);
      });
    });
  });
});
