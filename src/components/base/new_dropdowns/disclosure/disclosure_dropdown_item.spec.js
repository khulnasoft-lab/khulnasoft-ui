import { mount } from '@vue/test-utils';
import { BLink } from 'bootstrap-vue';
import { ENTER, SPACE } from '../constants';
import { mockItems } from './mock_data';

import GlDisclosureDropdownItem from './disclosure_dropdown_item.vue';

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

  describe('when default slot content provided', () => {
    const content = 'This is an item';
    const slots = { default: content };
    const item = clone(mockItems[1]);

    beforeEach(() => {
      buildWrapper({ item }, slots);
    });

    it('renders it', () => {
      expect(wrapper.text()).toContain(content);
    });

    it.each`
      trigger                                                 | event
      ${() => findItem().trigger('click')}                    | ${'click'}
      ${() => findItem().trigger('keydown', { code: ENTER })} | ${'ENTER'}
      ${() => findItem().trigger('keydown', { code: SPACE })} | ${'SPACE'}
    `(`$event should emit 'action' event`, ({ trigger }) => {
      trigger();
      const emittedAction = wrapper.emitted('action');
      expect(emittedAction).toHaveLength(1);
      expect(emittedAction).toEqual([[item]]);
    });

    it('sets tabIndex on li element', () => {
      expect(findItem().attributes('tabindex')).toBe('0');
    });
  });

  describe.each`
    prop      | mockItem
    ${'href'} | ${0}
    ${'to'}   | ${2}
  `('when item has a `$prop`', ({ prop, mockItem }) => {
    const item = mockItems[mockItem];

    beforeEach(() => {
      buildWrapper({ item });
    });

    const findLink = () => wrapper.findComponent(BLink);

    it('should render a link', () => {
      expect(findLink().exists()).toBe(true);
    });

    it('should set correct class', () => {
      expect(findLink().classes()).toContain('gl-new-dropdown-item-content');
    });

    it('should set correct props and attributes', () => {
      expect(findLink().props(prop)).toBe(item[prop]);
      expect(findLink().attributes()).toEqual(expect.objectContaining(item.extraAttrs));
    });

    it('should apply the default classes to the item wrapper', () => {
      expect(findItem().classes()).toEqual(['gl-new-dropdown-item']);
    });

    it('should emit `action` on `click`', () => {
      findLink().trigger('click');
      const emittedAction = wrapper.emitted('action');
      expect(emittedAction).toHaveLength(1);
      expect(emittedAction).toEqual([[item]]);
    });

    it.each`
      trigger                                                 | event
      ${() => findItem().trigger('keydown', { code: ENTER })} | ${'ENTER'}
      ${() => findItem().trigger('keydown', { code: SPACE })} | ${'SPACE'}
    `(`$event on parent will execute 'action' event`, ({ trigger }) => {
      trigger();
      const emittedAction = wrapper.emitted('action');
      expect(emittedAction).toHaveLength(1);
      expect(emittedAction).toEqual([[item]]);
    });

    it('sets tabIndex on link element', () => {
      expect(findLink().attributes('tabindex')).toBe('-1');
    });
  });

  describe('when item has an `action`', () => {
    const item = mockItems[3];
    const action = jest.spyOn(item, 'action');

    beforeEach(() => {
      buildWrapper({ item });
      action.mockClear();
    });

    const findButton = () => wrapper.find('button[type="button"].gl-new-dropdown-item-content');

    it('should render a button', () => {
      expect(findButton().exists()).toBe(true);
    });

    it('should set correct attributes', () => {
      const attrs = { ...item.extraAttrs };
      delete attrs.class;
      expect(findButton().classes()).toContain(item.extraAttrs.class);
      expect(findButton().attributes()).toMatchObject(attrs);
    });

    it('should call `action` on `click` and emit `action` event', () => {
      findButton().trigger('click');
      expect(action).toHaveBeenCalledTimes(1);

      const actionThisArg = action.mock.contexts[0];
      expect(actionThisArg).toBe(undefined);

      const actionArgs = action.mock.calls[0];
      expect(actionArgs).toEqual([item]);

      const emittedAction = wrapper.emitted('action');
      expect(emittedAction).toHaveLength(1);
      expect(emittedAction).toEqual([[item]]);
    });

    it.each`
      trigger                                                 | event
      ${() => findItem().trigger('keydown', { code: ENTER })} | ${'ENTER'}
      ${() => findItem().trigger('keydown', { code: SPACE })} | ${'SPACE'}
    `(`$event on parent will execute action and emit 'action' event`, ({ trigger }) => {
      trigger();
      expect(action).toHaveBeenCalledTimes(1);
      expect(action.mock.calls[0]).toEqual([item]);

      const emittedAction = wrapper.emitted('action');
      expect(emittedAction).toHaveLength(1);
      expect(emittedAction).toEqual([[item]]);
    });

    it('should apply the default classes to the item wrapper', () => {
      expect(findItem().classes()).toEqual(['gl-new-dropdown-item']);
    });

    it('sets tabIndex on link element', () => {
      expect(findButton().attributes('tabindex')).toBe('-1');
    });
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

  describe('when item has disabled attribute', () => {
    const extraAttrs = {
      disabled: true,
    };
    beforeEach(() => {
      buildWrapper({
        item: {
          ...mockItems[3],
          extraAttrs,
        },
      });
    });

    it('should not set tabIndex to elements', () => {
      const findButton = () => wrapper.find('button[type="button"].gl-new-dropdown-item-content');

      expect(findItem().attributes('tabindex')).toBeUndefined();
      expect(findButton().attributes('tabindex')).toBeUndefined();
    });
  });
});
