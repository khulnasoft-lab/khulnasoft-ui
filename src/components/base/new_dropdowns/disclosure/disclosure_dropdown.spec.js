import { mount } from '@vue/test-utils';
import GlBaseDropdown from '../base_dropdown/base_dropdown.vue';
import {
  GL_DROPDOWN_SHOWN,
  GL_DROPDOWN_HIDDEN,
  ARROW_DOWN,
  ARROW_UP,
  HOME,
  END,
} from '../constants';
import GlDisclosureDropdown from './disclosure_dropdown.vue';
import GlDisclosureDropdownItem from './disclosure_dropdown_item.vue';
import GlDisclosureDropdownGroup from './disclosure_dropdown_group.vue';
import { mockItems, mockGroups } from './mock_data';

const ITEM_SELECTOR = '[data-testid="disclosure-dropdown-item"]';

describe('GlDisclosureDropdown', () => {
  let wrapper;

  const buildWrapper = (propsData, slots = {}) => {
    wrapper = mount(GlDisclosureDropdown, {
      propsData,
      slots,
      attachTo: document.body,
    });
  };

  const findBaseDropdown = () => wrapper.findComponent(GlBaseDropdown);
  const findDisclosureContent = () => wrapper.find('[data-testid="disclosure-content"]');
  const findDisclosureItems = (root = wrapper) => root.findAllComponents(GlDisclosureDropdownItem);
  const findDisclosureGroups = () => wrapper.findAllComponents(GlDisclosureDropdownGroup);
  const findListItem = (index) => findDisclosureItems().at(index).findComponent(ITEM_SELECTOR);

  describe('toggle text', () => {
    it('should pass toggle text to base dropdown', () => {
      const toggleText = 'Merge requests';
      buildWrapper({ items: mockItems, toggleText });
      expect(findBaseDropdown().props('toggleText')).toBe(toggleText);
    });
  });

  describe('ARIA attributes', () => {
    it('should provide `toggleId` to the base dropdown and reference it in`aria-labelledby` attribute of the list container`', async () => {
      await buildWrapper({ items: mockItems });
      expect(findBaseDropdown().props('toggleId')).toBe(
        findDisclosureContent().attributes('aria-labelledby')
      );
    });

    it('should reference `listAriaLabelledby`', async () => {
      const listAriaLabelledBy = 'first-label-id second-label-id';
      await buildWrapper({ items: mockItems, listAriaLabelledBy });
      expect(findDisclosureContent().attributes('aria-labelledby')).toBe(listAriaLabelledBy);
    });
  });

  describe('onShow', () => {
    const showDropdown = () => {
      buildWrapper({
        items: mockItems,
      });
      findBaseDropdown().vm.$emit(GL_DROPDOWN_SHOWN);
    };

    beforeEach(() => {
      showDropdown();
    });

    it('should re-emit the event', () => {
      expect(wrapper.emitted(GL_DROPDOWN_SHOWN)).toHaveLength(1);
    });

    it('should focus the first item', () => {
      expect(findDisclosureItems().at(0).find(ITEM_SELECTOR).element).toHaveFocus();
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
      buildWrapper({ items: mockItems });
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
  });

  describe('slot content', () => {
    const headerContent = 'Header Content';
    const footerContent = 'Footer Content';
    const toggleContent = 'Toggle Content';
    const defaultContent = 'Toggle Content';
    const slots = {
      header: headerContent,
      footer: footerContent,
      toggle: toggleContent,
      default: defaultContent,
    };

    it('renders all slot content', () => {
      buildWrapper({}, slots);
      expect(wrapper.text()).toContain(headerContent);
      expect(wrapper.text()).toContain(footerContent);
      expect(wrapper.text()).toContain(toggleContent);
      expect(wrapper.text()).toContain(defaultContent);
    });
  });

  describe('with groups', () => {
    it('renders groups of items', () => {
      buildWrapper({ items: mockGroups });

      const groups = findDisclosureGroups();

      expect(groups.length).toBe(mockGroups.length);

      mockGroups.forEach((group, i) => {
        expect(findDisclosureItems(groups.at(i))).toHaveLength(group.items.length);
      });
    });
  });

  describe('action', () => {
    it('should re-emit the `action` event when it is emitted on the item for custom handling', () => {
      buildWrapper({
        items: mockItems,
      });

      findListItem(0).vm.$emit('action', mockItems[0]);
      expect(wrapper.emitted('action')).toHaveLength(1);
      expect(wrapper.emitted('action')[0][0]).toEqual(mockItems[0]);
    });
  });

  describe('disclosure options', () => {
    it('should render the `ul` as content tag and not add `role` attribute when it is a list of items only', () => {
      buildWrapper({ items: mockItems });
      expect(findDisclosureContent().element.tagName).toBe('UL');
      expect(findDisclosureContent().attributes('role')).toBeUndefined();
    });

    it('should render the `div` as content tag and add `role` attribute when it is a list of groups', () => {
      buildWrapper({ items: mockGroups });
      expect(findDisclosureContent().element.tagName).toBe('DIV');
      expect(findDisclosureContent().attributes('role')).toBe('group');
    });

    it('should render the `div` as content tag and NOT add `role` otherwise', () => {
      buildWrapper({ items: null }, { default: 'Some other content' });
      expect(findDisclosureContent().element.tagName).toBe('DIV');
      expect(findDisclosureContent().attributes('role')).toBeUndefined();
    });
  });
});
