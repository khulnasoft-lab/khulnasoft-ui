import { shallowMount, mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import GlDropdownItem from '../dropdown/dropdown_item.vue';
import GlTokenSelectorDropdown from './token_selector_dropdown.vue';

describe('GlTokenSelectorDropdown', () => {
  const dropdownItems = [
    {
      id: 1,
      name: 'Vue.js',
    },
    {
      id: 2,
      name: 'Ruby On Rails',
    },
    {
      id: 3,
      name: 'GraphQL',
    },
    {
      id: 4,
      name: 'Redis',
    },
  ];

  const mockRegisterDropdownEventHandlers = jest.fn();
  const mockRegisterResetFocusedDropdownItem = jest.fn();

  const defaultProps = {
    show: false,
    dropdownItems,
    inputText: '',
    allowUserDefinedTokens: true,
    componentId: 'token-selector1',
    registerDropdownEventHandlers: mockRegisterDropdownEventHandlers,
    registerResetFocusedDropdownItem: mockRegisterResetFocusedDropdownItem,
  };

  let wrapper;

  const createComponent = (options, shallow = true) => {
    const mountFunction = shallow ? shallowMount : mount;

    wrapper = mountFunction(GlTokenSelectorDropdown, {
      ...options,
      propsData: {
        ...defaultProps,
        ...(options?.propsData || {}),
      },
    });
  };

  const findDropdownMenu = () => wrapper.findComponent({ ref: 'dropdownMenu' });

  const findDropdownItemByName = (name, findButton = true) => {
    const dropdownItemWrappers = wrapper.findAllComponents(GlDropdownItem);

    const dropdownItem = dropdownItemWrappers.wrappers.find(
      (dropdownItemWrapper) => dropdownItemWrapper.text() === name
    );

    return findButton ? dropdownItem.find('button') : dropdownItem;
  };

  beforeAll(() => {
    if (!HTMLElement.prototype.scrollIntoView) {
      HTMLElement.prototype.scrollIntoView = jest.fn();
    }
  });

  afterAll(() => {
    if (HTMLElement.prototype.scrollIntoView.mock) {
      delete HTMLElement.prototype.scrollIntoView;
    }
  });

  describe('props', () => {
    describe('show', () => {
      it('displays dropdown when `true`', () => {
        createComponent({
          propsData: { show: true },
        });

        expect(wrapper.classes()).toContain('show');
        expect(findDropdownMenu().classes()).toContain('show');
      });
    });

    describe('menuClass', () => {
      describe.each`
        menuClass
        ${'foo-bar-baz'}
        ${['foo-bar-baz']}
        ${{ 'foo-bar-baz': true }}
      `('when `menuClass` is $menuClass', ({ menuClass }) => {
        it('adds `foo-bar-baz` to CSS classes', () => {
          createComponent({
            propsData: { menuClass },
          });

          expect(findDropdownMenu().classes()).toContain('foo-bar-baz');
        });
      });
    });

    describe('loading', () => {
      it('displays loading message when `true`', () => {
        createComponent({
          propsData: { show: true, loading: true },
        });

        expect(wrapper.findComponent(GlDropdownItem).text()).toBe('Searching...');
      });
    });

    describe('dropdownItems', () => {
      describe('when dropdown items are provided', () => {
        it('displays passed dropdown items', () => {
          createComponent();

          expect(wrapper.findAllComponents(GlDropdownItem).length).toBe(4);
        });
      });

      describe('when dropdown items are not provided', () => {
        it('displays add user defined token message when `allowUserDefinedTokens` is `true` and `inputText` is not empty', () => {
          createComponent({
            propsData: {
              allowUserDefinedTokens: true,
              inputText: 'foo bar',
              dropdownItems: [],
            },
          });

          expect(wrapper.findComponent(GlDropdownItem).text()).toBe('Add "foo bar"');
        });

        it('displays no results message when `allowUserDefinedTokens` is `false`', () => {
          createComponent({
            propsData: {
              allowUserDefinedTokens: false,
              inputText: 'foo bar',
              dropdownItems: [],
            },
          });

          expect(wrapper.findComponent(GlDropdownItem).text()).toBe('No matches found');
        });

        it('displays no results message when `inputText` is empty', () => {
          createComponent({
            propsData: {
              allowUserDefinedTokens: true,
              inputText: '',
              dropdownItems: [],
            },
          });

          expect(wrapper.findComponent(GlDropdownItem).text()).toBe('No matches found');
        });
      });
    });

    describe('registerDropdownEventHandlers', () => {
      it('calls passed method', () => {
        createComponent();

        expect(mockRegisterDropdownEventHandlers).toHaveBeenCalled();
      });
    });

    describe('registerResetFocusedDropdownItem', () => {
      it('calls passed method', () => {
        createComponent();

        expect(mockRegisterResetFocusedDropdownItem).toHaveBeenCalled();
      });
    });
  });

  describe('slots', () => {
    it('renders `loading-content` slot', () => {
      createComponent({
        propsData: {
          loading: true,
        },
        slots: {
          'loading-content': '<span id="custom-loading-content">Loading</span>',
        },
      });

      expect(wrapper.find('#custom-loading-content').exists()).toBe(true);
    });

    it('renders `dropdown-item-content` slot', () => {
      createComponent({
        scopedSlots: {
          'dropdown-item-content': '<span>Dropdown item id: {{ props.dropdownItem.id }}</span>',
        },
      });

      const dropdownItemWrappers = wrapper.findAllComponents(GlDropdownItem);

      expect(
        dropdownItemWrappers.wrappers.every(
          (dropdownItem, index) =>
            `Dropdown item id: ${dropdownItems[index].id}` === dropdownItem.text()
        )
      ).toBe(true);
    });

    it('renders `user-defined-token-content` slot', () => {
      createComponent({
        propsData: {
          allowUserDefinedTokens: true,
          inputText: 'example.com',
          dropdownItems: [],
        },
        scopedSlots: {
          'user-defined-token-content':
            '<span id="custom-user-defined-token-content">Add "{{ props.inputText }}" to domain allowlist</span>',
        },
      });

      expect(wrapper.find('#custom-user-defined-token-content').text()).toBe(
        'Add "example.com" to domain allowlist'
      );
    });

    it('renders `no-results-content` slot', () => {
      createComponent({
        propsData: {
          allowUserDefinedTokens: false,
          inputText: 'foo bar',
          dropdownItems: [],
        },
        slots: {
          'no-results-content': '<span id="custom-no-results-content">No results found</span>',
        },
      });

      expect(wrapper.find('#custom-no-results-content').exists()).toBe(true);
    });

    it('renders `dropdown-footer` slot', () => {
      createComponent({
        slots: {
          'dropdown-footer': '<span id="loading-text">Loading more results</span>',
        },
      });

      expect(wrapper.find('#loading-text').exists()).toBe(true);
    });
  });

  describe('keyboard navigation', () => {
    let dropdownEventHandlers = {
      handleUpArrow: () => {},
      handleDownArrow: () => {},
      handleHomeKey: () => {},
      handleEndKey: () => {},
    };

    const registerDropdownEventHandlers = (handlers) => {
      dropdownEventHandlers = handlers;
    };

    const setup = async (focusedDropdownItemIndex, handler, handlerArgs = null) => {
      wrapper.setData({ focusedDropdownItemIndex });

      dropdownEventHandlers[handler](handlerArgs);

      await nextTick();
    };

    beforeEach(() => {
      createComponent({ propsData: { registerDropdownEventHandlers, show: true } }, false);
    });

    describe('when up arrow is pressed', () => {
      it.each`
        focusedDropdownItemIndex | expectedFocusedDropdownItemIndex | testName
        ${3}                     | ${2}                             | ${'focuses on previous dropdown item'}
        ${0}                     | ${0}                             | ${'does not change focus if there is no previous dropdown item'}
      `('$testName', async ({ focusedDropdownItemIndex, expectedFocusedDropdownItemIndex }) => {
        await setup(focusedDropdownItemIndex, 'handleUpArrow');

        const expectedFocusedDropdownItem = findDropdownItemByName(
          dropdownItems[expectedFocusedDropdownItemIndex].name
        );

        expect(expectedFocusedDropdownItem.classes()).toContain('is-focused');
      });
    });

    describe('when down arrow is pressed', () => {
      it.each`
        focusedDropdownItemIndex | expectedFocusedDropdownItemIndex | testName
        ${0}                     | ${1}                             | ${'focuses on next dropdown item'}
        ${3}                     | ${3}                             | ${'does not change focus if there is no next dropdown item'}
      `('$testName', async ({ focusedDropdownItemIndex, expectedFocusedDropdownItemIndex }) => {
        await setup(focusedDropdownItemIndex, 'handleDownArrow');

        const expectedFocusedDropdownItem = findDropdownItemByName(
          dropdownItems[expectedFocusedDropdownItemIndex].name
        );

        expect(expectedFocusedDropdownItem.classes()).toContain('is-focused');
      });

      it('fires `open` event if `show` prop is `false`', () => {
        createComponent({ propsData: { registerDropdownEventHandlers, show: false } });

        dropdownEventHandlers.handleDownArrow();

        expect(wrapper.emitted('show')).toHaveLength(1);
      });
    });

    it('focuses on the first token when home key is pressed', async () => {
      await setup(3, 'handleHomeKey', { preventDefault: () => {} });

      const expectedFocusedDropdownItem = findDropdownItemByName(dropdownItems[0].name);

      expect(expectedFocusedDropdownItem.classes()).toContain('is-focused');
    });

    it('focuses on the last token when end key is pressed', async () => {
      await setup(0, 'handleEndKey', { preventDefault: () => {} });

      const expectedFocusedDropdownItem = findDropdownItemByName(dropdownItems[3].name);

      expect(expectedFocusedDropdownItem.classes()).toContain('is-focused');
    });

    it('scrolls focused dropdown item into view', async () => {
      createComponent();

      await setup(0, 'handleEndKey', { preventDefault: () => {} });

      const expectedFocusedDropdownItem = findDropdownItemByName(dropdownItems[3].name, false);

      expect(expectedFocusedDropdownItem.vm.$el.scrollIntoView).toHaveBeenCalled();
    });
  });
});
