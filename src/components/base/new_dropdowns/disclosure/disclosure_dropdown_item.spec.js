import { mount } from '@vue/test-utils';
import { ENTER, SPACE } from '../constants';
import { mockItems } from './mock_data';

import GlDisclosureDropdownItem from './disclosure_dropdown_item.vue';

describe('GlDisclosureDropdownItem', () => {
  let wrapper;

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
    beforeEach(() => {
      buildWrapper({}, slots);
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
      expect(wrapper.emitted('action')).toHaveLength(1);
    });
  });

  describe('when item has an `href`', () => {
    beforeEach(() => {
      buildWrapper({ item: mockItems[0] });
    });

    const findLink = () => wrapper.find('a.dropdown-item');

    it('should render a link', () => {
      expect(findLink().exists()).toBe(true);
    });

    it('should set correct attributes', () => {
      expect(findLink().attributes('href')).toBe(mockItems[0].href);
      expect(findLink().attributes()).toMatchObject(mockItems[0].extraAttrs);
    });
  });

  describe('when item has an `action`', () => {
    const action = jest.spyOn(mockItems[1], 'action');

    beforeEach(() => {
      buildWrapper({ item: mockItems[1] });
      action.mockClear();
    });

    const findButton = () => wrapper.find('button[type="button"].dropdown-item');

    it('should render a button', () => {
      expect(findButton().exists()).toBe(true);
    });

    it('should set correct attributes', () => {
      const attrs = { ...mockItems[1].extraAttrs };
      delete attrs.class;
      expect(findButton().classes()).toContain(mockItems[1].extraAttrs.class);
      expect(findButton().attributes()).toMatchObject(attrs);
    });

    it('should call `action` on `click`', () => {
      findButton().trigger('click');
      expect(action).toHaveBeenCalled();
      expect(wrapper.emitted('action')).toHaveLength(1);
    });

    it.each`
      trigger                                                 | event
      ${() => findItem().trigger('click')}                    | ${'click'}
      ${() => findItem().trigger('keydown', { code: ENTER })} | ${'ENTER'}
      ${() => findItem().trigger('keydown', { code: SPACE })} | ${'SPACE'}
    `(`$event will execute action and emit 'action' event`, ({ trigger }) => {
      trigger();
      expect(wrapper.emitted('action')).toHaveLength(1);
    });
  });
});
