import { mount } from '@vue/test-utils';
import { autoUpdate } from '@floating-ui/dom';
import { nextTick } from 'vue';
import * as utils from '../../../../utils/utils';
import { useMockIntersectionObserver } from '../../../../utils/use_mock_intersection_observer';
import GlBaseDropdown from '../base_dropdown/base_dropdown.vue';
import {
  GL_DROPDOWN_SHOWN,
  GL_DROPDOWN_HIDDEN,
  GL_DROPDOWN_BEFORE_CLOSE,
  GL_DROPDOWN_FOCUS_CONTENT,
  ARROW_DOWN,
  ARROW_UP,
  HOME,
  END,
  POSITION_ABSOLUTE,
  POSITION_FIXED,
} from '../constants';
import GlCollapsibleListbox from '../listbox/listbox.vue';
import GlDisclosureDropdown from './disclosure_dropdown.vue';
import GlDisclosureDropdownItem from './disclosure_dropdown_item.vue';
import GlDisclosureDropdownGroup from './disclosure_dropdown_group.vue';
import { mockItems, mockGroups } from './mock_data';

jest.mock('@floating-ui/dom');
autoUpdate.mockImplementation(() => {
  return () => {};
});

const ITEM_SELECTOR = '[data-testid="disclosure-dropdown-item"]';

describe('GlDisclosureDropdown', () => {
  let wrapper;

  const buildWrapper = (propsData, slots = {}) => {
    wrapper = mount(GlDisclosureDropdown, {
      propsData,
      components: {
        GlDisclosureDropdown,
        GlDisclosureDropdownItem,
        GlDisclosureDropdownGroup,
        GlCollapsibleListbox,
      },
      slots,
      attachTo: document.body,
    });
  };

  const findBaseDropdown = () => wrapper.findComponent(GlBaseDropdown);
  const findDisclosureContent = () => wrapper.find('[data-testid="disclosure-content"]');
  const findDisclosureItems = (root = wrapper) => root.findAllComponents(GlDisclosureDropdownItem);
  const findDisclosureGroups = () => wrapper.findAllComponents(GlDisclosureDropdownGroup);
  const findListItem = (index, root = wrapper) =>
    findDisclosureItems(root).at(index).findComponent(ITEM_SELECTOR);
  const findDropdownMenu = (root = wrapper) => root.find("[data-testid='base-dropdown-menu']");

  jest.spyOn(utils, 'filterVisible').mockImplementation((items) => items);

  it('passes custom offset to the base dropdown', () => {
    const dropdownOffset = { mainAxis: 10, crossAxis: 40 };
    buildWrapper({ dropdownOffset });

    expect(findBaseDropdown().props('offset')).toEqual(dropdownOffset);
  });

  describe('toggle text', () => {
    it('should pass toggle text to the base dropdown', () => {
      const toggleText = 'Merge requests';
      buildWrapper({ items: mockItems, toggleText });
      expect(findBaseDropdown().props('toggleText')).toBe(toggleText);
    });
  });

  it('passes custom placement to the base dropdown', () => {
    buildWrapper({ placement: 'bottom-end' });

    expect(findBaseDropdown().props('placement')).toEqual('bottom-end');
  });

  describe('custom toggle id', () => {
    it('should pass toggle id to the base dropdown', () => {
      const toggleId = 'custom-toggle';
      buildWrapper({ items: mockItems, toggleId });
      expect(findBaseDropdown().props('toggleId')).toBe(toggleId);
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
  });

  describe('onClose', () => {
    let data;

    beforeEach(() => {
      buildWrapper();
      data = { event: {}, preventDefault() {} };
      findBaseDropdown().vm.$emit(GL_DROPDOWN_BEFORE_CLOSE, data);
    });

    it('should re-emit the event', () => {
      expect(wrapper.emitted(GL_DROPDOWN_BEFORE_CLOSE)).toStrictEqual([[data]]);
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
    let fourthItem;

    beforeEach(() => {
      buildWrapper({ items: mockItems });
      findBaseDropdown().vm.$emit(GL_DROPDOWN_SHOWN);
      firstItem = findListItem(0);
      secondItem = findListItem(1);
      thirdItem = findListItem(2);
      fourthItem = findListItem(3);
    });

    it('should move the focus from toggle and down the list of items on `ARROW_DOWN` and stop on the last item', async () => {
      findBaseDropdown().vm.$emit(
        GL_DROPDOWN_FOCUS_CONTENT,
        new KeyboardEvent('keydown', { code: ARROW_DOWN })
      );
      expect(firstItem.element).toHaveFocus();
      await firstItem.trigger('keydown', { code: ARROW_DOWN });
      expect(secondItem.element).toHaveFocus();
      await secondItem.trigger('keydown', { code: ARROW_DOWN });
      expect(thirdItem.element).toHaveFocus();
      await thirdItem.trigger('keydown', { code: ARROW_DOWN });
      expect(fourthItem.element).toHaveFocus();
      await fourthItem.trigger('keydown', { code: ARROW_DOWN });
      expect(fourthItem.element).toHaveFocus();
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
      findBaseDropdown().vm.$emit(
        GL_DROPDOWN_FOCUS_CONTENT,
        new KeyboardEvent('keydown', { code: ARROW_DOWN })
      );
      expect(firstItem.element).toHaveFocus();
      await firstItem.trigger('keydown', { code: END });
      expect(fourthItem.element).toHaveFocus();
      await fourthItem.trigger('keydown', { code: END });
      expect(fourthItem.element).toHaveFocus();
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

    describe('when an element is hidden', () => {
      beforeEach(() => {
        jest.spyOn(utils, 'filterVisible').mockReturnValue([firstItem.element, thirdItem.element]);
      });

      it('should skip over it', async () => {
        findBaseDropdown().vm.$emit(
          GL_DROPDOWN_FOCUS_CONTENT,
          new KeyboardEvent('keydown', { code: ARROW_DOWN })
        );
        expect(firstItem.element).toHaveFocus();
        await firstItem.trigger('keydown', { code: ARROW_DOWN });

        expect(secondItem.element).not.toHaveFocus();
        expect(thirdItem.element).toHaveFocus();

        await thirdItem.trigger('keydown', { code: ARROW_UP });
        expect(firstItem.element).toHaveFocus();
      });
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

  describe('disclosure tag', () => {
    it('should render `ul` as content tag when items is a list of items', () => {
      buildWrapper({ items: mockItems });
      expect(findDisclosureContent().element.tagName).toBe('UL');
    });

    it('should render `ul` as content tag when items is a list of groups', () => {
      buildWrapper({ items: mockGroups });
      expect(findDisclosureContent().element.tagName).toBe('UL');
    });

    it('should render `ul` as content tag when default slot contains only groups', () => {
      const slots = {
        default: `
          <gl-disclosure-dropdown-group>
            <gl-disclosure-dropdown-item>Item</gl-disclosure-dropdown-item>
            <gl-disclosure-dropdown-item>Item</gl-disclosure-dropdown-item>
          </gl-disclosure-dropdown-group>
          <gl-disclosure-dropdown-group>
            <gl-disclosure-dropdown-item>Item</gl-disclosure-dropdown-item>
          </gl-disclosure-dropdown-group>
        `,
      };

      buildWrapper({}, slots);
      expect(findDisclosureContent().element.tagName).toBe('UL');
    });

    it('should render `ul` as content tag when default slot contains only items', () => {
      const slots = {
        default: `
          <gl-disclosure-dropdown-item>Item</gl-disclosure-dropdown-item>
          <gl-disclosure-dropdown-item>Item</gl-disclosure-dropdown-item>
          <gl-disclosure-dropdown-item>Item</gl-disclosure-dropdown-item>
        `,
      };

      buildWrapper({}, slots);
      expect(findDisclosureContent().element.tagName).toBe('UL');
    });

    it('should render `div` as content tag when default slot does not contain valid list item', () => {
      const slots = {
        default: `
          <div>Item</div>
          <gl-disclosure-dropdown-group>
            <gl-disclosure-dropdown-item>Item</gl-disclosure-dropdown-item>
            <gl-disclosure-dropdown-item>Item</gl-disclosure-dropdown-item>
          </gl-disclosure-dropdown-group>
        `,
      };

      buildWrapper({}, slots);
      expect(findDisclosureContent().element.tagName).toBe('DIV');
    });

    it('should render `div` as content tag when slot is not a list item', () => {
      buildWrapper({}, { default: 'Some other content' });
      expect(findDisclosureContent().element.tagName).toBe('DIV');
    });

    describe('discouraged usage', () => {
      it('should render `ul` as content tag when default slot contains LI tags', () => {
        const slots = {
          default: `
            <li>Item</li>
            <li>Item</li>
            <li>Item</li>
          `,
        };

        buildWrapper({}, slots);
        expect(findDisclosureContent().element.tagName).toBe('UL');
      });
    });
  });

  describe('block prop', () => {
    it('is disabled by default', () => {
      buildWrapper();

      expect(findBaseDropdown().props('block')).toBe(false);
    });

    it('is enabled when `block` is `true`', () => {
      buildWrapper({ block: true });

      expect(findBaseDropdown().props('block')).toBe(true);
    });
  });

  describe('fluid width', () => {
    it('is disabled by default', () => {
      buildWrapper();

      expect(findBaseDropdown().props('fluidWidth')).toBe(false);
    });

    it('is enabled when `fluidWidth` is `true`', () => {
      buildWrapper({ fluidWidth: true });

      expect(findBaseDropdown().props('fluidWidth')).toBe(true);
    });
  });

  describe('auto closing', () => {
    it('closes the dropdown when `autoClose` is set on item click', () => {
      buildWrapper({ items: mockItems });
      const closeSpy = jest.spyOn(wrapper.vm.$refs.baseDropdown, 'closeAndFocus');
      findListItem(0).trigger('click');
      expect(closeSpy).toHaveBeenCalled();
    });

    it('does not close the dropdown  on item click when `autoClose` is set to `false`', () => {
      buildWrapper({ items: mockItems, autoClose: false });
      const closeSpy = jest.spyOn(wrapper.vm.$refs.baseDropdown, 'closeAndFocus');
      findListItem(0).trigger('click');
      expect(closeSpy).not.toHaveBeenCalled();
    });
  });

  describe('positioningStrategy', () => {
    it.each([POSITION_ABSOLUTE, POSITION_FIXED])(
      'passes the %s positioning strategy to the base dropdown',
      (positioningStrategy) => {
        buildWrapper({ positioningStrategy });

        expect(findBaseDropdown().props('positioningStrategy')).toBe(positioningStrategy);
      }
    );
  });
  describe('startOpened', () => {
    it('should open dropdown on render when startOpened is true', async () => {
      buildWrapper({ items: mockItems, startOpened: true });
      await nextTick();
      expect(findDropdownMenu().classes()).toContain('gl-display-block!');
    });

    it('should not open dropdown on render as default', async () => {
      buildWrapper({ items: mockItems });
      await nextTick();
      expect(findDropdownMenu().classes()).not.toContain('gl-display-block!');
    });
  });

  describe('nested dropdowns', () => {
    useMockIntersectionObserver();

    it.each`
      dropdown                    | getClickItem
      ${'gl-disclosure-dropdown'} | ${(nestedWrapper) => findListItem(0, nestedWrapper)}
      ${'gl-collapsible-listbox'} | ${(nestedWrapper) => nestedWrapper.find('[data-testid="listbox-item-1"]')}
    `('should only close the target $dropdown', async ({ dropdown, getClickItem }) => {
      const slots = {
        default: `
          <${dropdown}
            :items="[{ text: 'First', action: () => {}, value: '1' }]"
            start-opened
            data-testid="nested"
          />
        `,
      };
      buildWrapper({ startOpened: true }, slots);
      const isOpened = (root) => findDropdownMenu(root).classes('gl-display-block!');
      const nestedWrapper = wrapper.findComponent("[data-testid='nested']");

      getClickItem(nestedWrapper).trigger('click');
      await nextTick();

      expect(isOpened(wrapper)).toBe(true);
      expect(isOpened(nestedWrapper)).toBe(false);
    });
  });
});
