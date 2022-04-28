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

const mockItems = [
  {
    value: 'eng',
    text: 'Engineering',
  },
  {
    value: 'sales',
    text: 'Sales',
  },
  {
    value: 'marketing',
    text: 'Marketing',
  },
];

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
  const findListboxItems = () => wrapper.findAllComponents(GlListboxItem);
  const findListItem = (index) => findListboxItems().at(index).find(ITEM_SELECTOR);

  describe('toggle text', () => {
    describe.each`
      toggleText          | multiple | selected                | expectedToggleText
      ${'Toggle caption'} | ${true}  | ${[mockItems[0].value]} | ${'Toggle caption'}
      ${''}               | ${true}  | ${[mockItems[0]].value} | ${''}
      ${''}               | ${false} | ${mockItems[0].value}   | ${mockItems[0].text}
      ${''}               | ${false} | ${''}                   | ${''}
    `('when listbox', ({ toggleText, multiple, selected, expectedToggleText }) => {
      beforeEach(() => {
        buildWrapper({ items: mockItems, toggleText, multiple, selected });
      });

      it(`is ${multiple ? 'multi' : 'single'}-select, toggleText is ${
        toggleText.length ? '' : 'not '
      }provided and ${selected ? 'has' : 'does not have'} selected`, () => {
        expect(findBaseDropdown().props('toggleText')).toBe(expectedToggleText);
      });
    });
  });

  describe('ARIA attributes', () => {
    it('should provide `toggleId` to the base dropdown and reference it in`aria-labelledby` attribute of the list container` ', async () => {
      await buildWrapper();
      expect(findBaseDropdown().props('toggleId')).toBe(
        findListContainer().attributes('aria-labelledby')
      );
    });
  });

  describe('selecting items', () => {
    describe('multi-select', () => {
      beforeEach(() => {
        buildWrapper({
          multiple: true,
          selected: [mockItems[1].value, mockItems[2].value],
          items: mockItems,
        });
      });

      it('should render items as selected when `selected` provided ', () => {
        expect(findListboxItems().at(1).props('isSelected')).toBe(true);
        expect(findListboxItems().at(2).props('isSelected')).toBe(true);
      });

      it('should deselect previously selected', async () => {
        findListboxItems().at(1).vm.$emit('select', false);
        await nextTick();
        expect(wrapper.emitted('select')[0][0]).toEqual([mockItems[2].value]);
      });

      it('should add to selection', async () => {
        findListboxItems().at(0).vm.$emit('select', true);
        await nextTick();
        expect(wrapper.emitted('select')[0][0]).toEqual(
          expect.arrayContaining(mockItems.map(({ value }) => value))
        );
      });
    });

    describe('single-select', () => {
      beforeEach(() => {
        buildWrapper({ selected: mockItems[1].value, items: mockItems });
      });

      it('should throw an error when array of selections is provided', () => {
        expect(() => {
          buildWrapper({
            selected: [mockItems[1].value, mockItems[2].value],
            items: mockItems,
          });
        }).toThrowError('To allow multi-selection, please, set "multiple" property to "true"');
        expect(wrapper).toHaveLoggedVueErrors();
      });

      it('should render item as selected when `selected` provided ', () => {
        expect(findListboxItems().at(1).props('isSelected')).toBe(true);
      });

      it('should deselect previously selected and select a new item', async () => {
        findListboxItems().at(2).vm.$emit('select', true);
        await nextTick();
        expect(wrapper.emitted('select')[0][0]).toEqual(mockItems[2].value);
      });
    });
  });

  describe('onShow', () => {
    beforeEach(async () => {
      buildWrapper({
        multiple: true,
        items: mockItems,
        selected: [mockItems[2].value, mockItems[1].value],
      });
      findBaseDropdown().vm.$emit(GL_DROPDOWN_SHOWN);
      await nextTick();
    });

    it('should re-emit the event', () => {
      expect(wrapper.emitted(GL_DROPDOWN_SHOWN)).toHaveLength(1);
    });

    it('should focus the first selected item', () => {
      expect(findListboxItems().at(1).find(ITEM_SELECTOR).element).toHaveFocus();
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

    it('should move the focus down the list of items on `arrow down` and stop on the last item', async () => {
      expect(firstItem.element).toHaveFocus();
      await firstItem.trigger('keydown', { code: ARROW_DOWN });
      expect(secondItem.element).toHaveFocus();
      await secondItem.trigger('keydown', { code: ARROW_DOWN });
      expect(thirdItem.element).toHaveFocus();
      await thirdItem.trigger('keydown', { code: ARROW_DOWN });
      expect(thirdItem.element).toHaveFocus();
    });

    it('should move the focus up the list of items on `arrow up` and stop on the first item', async () => {
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
});
