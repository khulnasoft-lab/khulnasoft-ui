import { mount } from '@vue/test-utils';
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
  });

  describe('when item has a `href`', () => {
    const item = mockItems[0];

    beforeEach(() => {
      buildWrapper({ item });
    });

    const findLink = () => wrapper.find('a.gl-new-dropdown-item-content');

    it('should render a link', () => {
      expect(findLink().exists()).toBe(true);
    });

    it('should set correct attributes', () => {
      expect(findLink().attributes('href')).toBe(item.href);
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
  });

  describe('when item has an `action`', () => {
    const item = mockItems[1];
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
