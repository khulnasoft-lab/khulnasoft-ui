import { mount } from '@vue/test-utils';
import { mockItems } from './mock_data';

import GlDisclosureDropdownContent from './disclosure_dropdown_content.vue';

describe('GlDisclosureDropdownItemContent', () => {
  let wrapper;

  const clone = (i) => JSON.parse(JSON.stringify(i));

  const buildWrapper = (propsData, slots = {}) => {
    wrapper = mount(GlDisclosureDropdownContent, {
      propsData,
      slots,
    });
  };

  describe('when default slot content provided', () => {
    const content = 'This is an item content';
    const slots = { default: content };
    const item = clone(mockItems[1]);

    beforeEach(() => {
      buildWrapper({ item }, slots);
    });

    it('renders it', () => {
      expect(wrapper.text()).toContain(content);
    });
  });

  describe('when item has a `href`', () => {
    beforeEach(() => {
      buildWrapper({ item: clone(mockItems[0]) });
    });

    const findLink = () => wrapper.find('a.gl-new-dropdown-item-content');

    it('should render a link', () => {
      expect(findLink().exists()).toBe(true);
    });

    it('should set correct attributes', () => {
      expect(findLink().attributes('href')).toBe(mockItems[0].href);
      expect(findLink().attributes()).toMatchObject(mockItems[0].extraAttrs);
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

    it('should call `action` on `click`', () => {
      findButton().trigger('click');
      expect(action).toHaveBeenCalledTimes(1);

      const actionThisArg = action.mock.contexts[0];
      expect(actionThisArg).toBe(undefined);

      const actionArgs = action.mock.calls[0];
      expect(actionArgs).toEqual([item]);
    });
  });
});
