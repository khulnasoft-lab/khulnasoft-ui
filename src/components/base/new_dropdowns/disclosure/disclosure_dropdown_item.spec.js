import { mount } from '@vue/test-utils';
import { ENTER, SPACE } from '../constants';
import { mockItems } from './mock_data';

import GlDisclosureDropdownItem from './disclosure_dropdown_item.vue';
import GlDisclosureDropdownContent from './disclosure_dropdown_content.vue';

describe('GlDisclosureDropdownItem', () => {
  let wrapper;

  const clone = (i) => JSON.parse(JSON.stringify(i));

  const buildWrapper = (propsData, slots = {}) => {
    wrapper = mount(GlDisclosureDropdownItem, {
      propsData,
      slots,
    });
  };
  const findItem = () => wrapper.find('[data-testid="disclosure-dropdown-item"]');

  describe('Content', () => {
    const item = clone(mockItems[1]);

    describe('when default slot content provided', () => {
      const content = 'This is an item';
      const slots = { default: content };

      beforeEach(() => {
        buildWrapper({ item }, slots);
      });

      it('renders it', () => {
        expect(wrapper.text()).toContain(content);
      });
    });

    describe('otherwise', () => {
      beforeEach(() => {
        buildWrapper({ item });
      });

      it('renders content wrapper component', () => {
        const contentEl = wrapper.findComponent(GlDisclosureDropdownContent);
        expect(contentEl.exists()).toBe(true);
        expect(contentEl.props('item')).toEqual(item);
      });
    });

    it('should apply the default classes to the item wrapper', () => {
      expect(findItem().classes()).toEqual(['gl-new-dropdown-item']);
    });

    describe('when item has wrapperClass', () => {
      const TEST_CLASS = 'just-a-test-class';
      beforeEach(() => {
        buildWrapper({
          item: {
            ...mockItems[0],
            wrapperClass: TEST_CLASS,
          },
        });
      });

      it('should add the extra class to the item wrapper', () => {
        expect(findItem().classes()).toContain(TEST_CLASS);
      });
    });
  });

  describe('Item listeners', () => {
    const item = clone(mockItems[1]);

    beforeEach(() => {
      buildWrapper({ item });
    });

    it.each`
      trigger                                                 | event
      ${() => findItem().trigger('click')}                    | ${'click'}
      ${() => findItem().trigger('keydown', { code: ENTER })} | ${'ENTER'}
      ${() => findItem().trigger('keydown', { code: SPACE })} | ${'SPACE'}
    `(`$event should emit 'action' event`, ({ trigger }) => {
      trigger();
      expect(wrapper.emitted('action')).toEqual([[item]]);
    });

    it('should apply the default classes to the item wrapper', () => {
      expect(findItem().classes()).toEqual(['gl-new-dropdown-item']);
    });

    describe('when item has wrapperClass', () => {
      const TEST_CLASS = 'just-a-test-class';
      beforeEach(() => {
        buildWrapper({
          item: {
            ...mockItems[1],
            wrapperClass: TEST_CLASS,
          },
        });
      });

      it('should add the extra class to the item wrapper', () => {
        expect(findItem().classes()).toContain(TEST_CLASS);
      });
    });
  });
});
