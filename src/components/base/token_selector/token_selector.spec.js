import { mount, shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';

import GlDropdownItem from '../dropdown/dropdown_item.vue';
import GlToken from '../token/token.vue';
import GlTokenContainer from './token_container.vue';
import GlTokenSelector from './token_selector.vue';
import GlTokenSelectorDropdown from './token_selector_dropdown.vue';

describe('GlTokenSelector', () => {
  const tokens = [
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

  const placeholderText = 'Test placeholder';

  let wrapper;

  const defaultProps = { selectedTokens: [] };

  const createComponent = (options, shallow = false) => {
    const mountFunction = shallow ? shallowMount : mount;

    wrapper = mountFunction(GlTokenSelector, {
      ...options,
      propsData: {
        ...defaultProps,
        ...(options?.propsData || {}),
      },
      attachTo: shallow ? null : document.body,
    });
  };

  const findTokenByName = (name) => {
    const tokenWrappers = wrapper.findAllComponents(GlToken);

    return tokenWrappers.wrappers.find((tokenWrapper) => tokenWrapper.text() === name);
  };

  const findDropdownItemByName = (name) => {
    const dropdownItemWrappers = wrapper.findAllComponents(GlDropdownItem);

    return dropdownItemWrappers.wrappers.find(
      (dropdownItemWrapper) => dropdownItemWrapper.text() === name
    );
  };

  const findTextInput = () => wrapper.findComponent({ ref: 'textInput' });

  const findDropdownMenu = () =>
    wrapper.findComponent(GlTokenSelectorDropdown).findComponent({ ref: 'dropdownMenu' });

  const findContainer = () => wrapper.findComponent({ ref: 'container' });

  const findTokenContainer = () => wrapper.findComponent(GlTokenContainer);

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
    describe('dropdownItems', () => {
      it('renders dropdown items', () => {
        createComponent({
          propsData: { dropdownItems },
          data() {
            return {
              dropdownIsOpen: true,
            };
          },
        });

        expect(wrapper.findAllComponents(GlDropdownItem).length).toBe(4);
      });
    });

    describe('allowUserDefinedTokens', () => {
      it('passes prop to `gl-token-selector-dropdown` component', () => {
        createComponent({ propsData: { allowUserDefinedTokens: true } });

        expect(
          wrapper.findComponent(GlTokenSelectorDropdown).vm.$props.allowUserDefinedTokens
        ).toBe(true);
      });
    });

    describe('loading', () => {
      it('passes prop to `gl-token-selector-dropdown` component', () => {
        createComponent({ propsData: { loading: true } });

        expect(wrapper.findComponent(GlTokenSelectorDropdown).vm.$props.loading).toBe(true);
      });
    });

    describe('hideDropdownWithNoItems', () => {
      it('hides dropdown with no items', () => {
        createComponent({ propsData: { hideDropdownWithNoItems: true } });

        const textInput = findTextInput();
        textInput.trigger('focus');

        expect(findDropdownMenu().classes()).not.toContain('show');
      });
    });

    describe('viewOnly', () => {
      beforeEach(() => {
        createComponent({ propsData: { viewOnly: true } });
      });

      it('passes `viewOnly` prop to GlTokenContainer', () => {
        expect(findTokenContainer().props('viewOnly')).toBe(true);
      });

      it('disables input field if viewOnly is true', () => {
        findTextInput().trigger('focus');

        expect(findTextInput().attributes('disabled')).toBe('disabled');
      });
    });

    describe('when there are tokens and `allowClearAll` is true', () => {
      beforeEach(() => {
        createComponent({ propsData: { allowClearAll: true, selectedTokens: tokens } });
      });

      it('passes `showClearAllButton` prop as `true` to token-container', () => {
        expect(findTokenContainer().props('showClearAllButton')).toBe(true);
      });
    });

    describe('containerClass', () => {
      it('renders passed CSS classes', () => {
        createComponent({
          propsData: {
            containerClass: 'gl-h-auto',
          },
        });

        expect(findContainer().classes()).toContain('gl-h-auto');
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

    describe('token category class', () => {
      it('renders token with correct CSS classes based on category props', () => {
        createComponent({
          propsData: {
            selectedTokens: [
              ...tokens,
              {
                id: 5,
                name: 'Im blue, da ba dee da ba daa',
                class: 'gl-text-white gl-bg-data-viz-blue-500',
              },
            ],
          },
        });

        expect(wrapper.findAllComponents(GlToken).at(0).classes()).not.toContain(
          'gl-bg-data-viz-blue-500'
        );
        expect(wrapper.findAllComponents(GlToken).at(4).classes()).toEqual(
          expect.arrayContaining([
            'gl-cursor-default',
            'gl-token',
            'gl-token-default-variant',
            'gl-text-white',
            'gl-bg-data-viz-blue-500',
          ])
        );
      });
    });

    describe('text input attributes', () => {
      it.each`
        attribute            | value
        ${'autocomplete'}    | ${'on'}
        ${'placeholder'}     | ${'foo bar'}
        ${'aria-labelledby'} | ${'input-label'}
      `('renders `$attribute` on text input', ({ attribute, value }) => {
        createComponent({
          propsData: {
            [attribute]: value,
          },
        });

        const textInput = findTextInput();

        expect(textInput.attributes(attribute)).toBe(value);
      });
    });

    describe('textInputAttrs', () => {
      it('renders passed HTML attributes on text input', () => {
        createComponent({
          propsData: {
            textInputAttrs: {
              'data-prop': 'foo_bar',
            },
          },
        });

        expect(findTextInput().attributes('data-prop')).toBe('foo_bar');
      });
    });

    describe('state', () => {
      describe.each`
        value    | expectedClasses
        ${true}  | ${['is-valid', 'gl-inset-border-1-gray-400!']}
        ${false} | ${['is-invalid', 'gl-inset-border-1-red-500!']}
        ${null}  | ${['gl-inset-border-1-gray-400!']}
      `('when `state` is `$value`', ({ value, expectedClasses }) => {
        it(`adds \`${expectedClasses}\` to CSS classes`, () => {
          createComponent({
            propsData: {
              state: value,
            },
          });

          expect(findContainer().classes()).toEqual(expect.arrayContaining(expectedClasses));
        });
      });

      describe('when `state` is `null`', () => {
        it('does not add `is-valid` or `is-invalid` CSS classes', () => {
          createComponent({
            propsData: {
              state: null,
            },
          });

          expect(findContainer().classes()).not.toContain('is-valid');
          expect(findContainer().classes()).not.toContain('is-invalid');
        });
      });
    });

    it('passes prop to `token-container` component', () => {
      createComponent({
        propsData: {
          state: true,
        },
      });

      expect(findTokenContainer().props('state')).toBe(true);
    });
  });

  describe('custom v-model', () => {
    it('renders tokens in bound data', () => {
      createComponent({
        propsData: {
          selectedTokens: tokens,
        },
      });

      expect(wrapper.findAllComponents(GlToken).length).toBe(4);
    });
  });

  describe('slots', () => {
    it.each`
      slot                            | component                  | componentName
      ${'token-content'}              | ${GlTokenContainer}        | ${'GlTokenContainer'}
      ${'loading-content'}            | ${GlTokenSelectorDropdown} | ${'GlTokenSelectorDropdown'}
      ${'user-defined-token-content'} | ${GlTokenSelectorDropdown} | ${'GlTokenSelectorDropdown'}
      ${'no-results-content'}         | ${GlTokenSelectorDropdown} | ${'GlTokenSelectorDropdown'}
      ${'dropdown-item-content'}      | ${GlTokenSelectorDropdown} | ${'GlTokenSelectorDropdown'}
      ${'dropdown-footer'}            | ${GlTokenSelectorDropdown} | ${'GlTokenSelectorDropdown'}
    `('passes `$slot` to `$componentName`', ({ slot, component }) => {
      createComponent({ propsData: { dropdownItems, selectedTokens: tokens } });

      expect(wrapper.findComponent(component).vm.$scopedSlots).toHaveProperty(slot);
    });

    it('renders empty-placeholder slot if tokens list is empty and input is not focused', () => {
      createComponent({
        propsData: {
          selectedTokens: [],
        },
        slots: {
          'empty-placeholder': placeholderText,
        },
      });

      expect(wrapper.text()).toContain(placeholderText);
    });

    it('does not render empty-placeholder slot if token list is not empty', () => {
      createComponent({
        propsData: {
          selectedTokens: tokens,
        },
        slots: {
          'empty-placeholder': placeholderText,
        },
      });

      expect(wrapper.text()).not.toContain(placeholderText);
    });

    it('hides empty-placeholder slot if input is focused', async () => {
      createComponent({
        propsData: {
          selectedTokens: [],
        },
        slots: {
          'empty-placeholder': placeholderText,
        },
      });

      expect(wrapper.text()).toContain(placeholderText);

      await findTextInput().trigger('focus');
      expect(wrapper.text()).not.toContain(placeholderText);
    });
  });

  describe('text input events', () => {
    describe('when input is focused', () => {
      let textInput;

      beforeEach(() => {
        createComponent();

        textInput = findTextInput();
        textInput.trigger('focus');
      });

      it('opens dropdown', () => {
        expect(findDropdownMenu().classes()).toContain('show');
      });

      it('adds focus class to main container', () => {
        expect(wrapper.find('.gl-token-selector').classes()).toContain(
          'gl-token-selector-focus-glow'
        );
      });

      it('fires `focus` event', () => {
        expect(wrapper.emitted('focus')).toHaveLength(1);
      });
    });

    describe('when input is blurred', () => {
      let textInput;

      beforeEach(() => {
        createComponent();

        textInput = findTextInput();
        textInput.trigger('focus');
        textInput.trigger('blur');
      });

      it('fires `blur` event', () => {
        expect(wrapper.emitted('blur')).toHaveLength(1);
      });

      it('removes focus class from main container', () => {
        expect(wrapper.find('.gl-token-selector').classes()).not.toContain(
          'gl-token-selector-focus-glow'
        );
      });

      it('closes dropdown', () => {
        expect(findDropdownMenu().classes()).not.toContain('show');
      });
    });

    describe('when escape key is pressed', () => {
      let textInput;

      beforeEach(() => {
        createComponent();

        textInput = findTextInput();
        textInput.trigger('focus');
      });

      it('clears text input', async () => {
        textInput.setValue('foo bar');
        await textInput.trigger('keydown.esc');

        expect(textInput.element.value).toBe('');
      });

      it('closes dropdown', async () => {
        await textInput.trigger('keydown.esc');

        expect(findDropdownMenu().classes()).not.toContain('show');
      });
    });

    describe('when delete key is pressed', () => {
      let textInput;

      beforeEach(() => {
        createComponent({ propsData: { selectedTokens: tokens } });

        textInput = findTextInput();
        textInput.trigger('focus');
      });

      it('does nothing if text input has value', async () => {
        textInput.setValue('foo bar');
        await textInput.trigger('keydown.delete');

        wrapper.findAllComponents(GlToken).wrappers.forEach((tokenWrapper) => {
          expect(tokenWrapper.element).not.toHaveFocus();
        });
      });

      it('focuses on last token if text input does not have a value', async () => {
        await textInput.trigger('keydown.delete');

        expect(findTokenByName(tokens[3].name).element.parentNode).toHaveFocus();
      });
    });

    describe('arrow keys', () => {
      const dropdownEventHandlers = {
        handleUpArrow: jest.fn(),
        handleDownArrow: jest.fn(),
        handleHomeKey: jest.fn(),
        handleEndKey: jest.fn(),
      };
      let textInput;

      beforeEach(() => {
        createComponent(
          {
            data() {
              return { dropdownEventHandlers };
            },
            stubs: { 'gl-token-container': GlTokenContainer },
          },
          true
        );

        textInput = findTextInput();
      });

      describe.each`
        key       | expectedHandler
        ${'up'}   | ${dropdownEventHandlers.handleUpArrow}
        ${'down'} | ${dropdownEventHandlers.handleDownArrow}
        ${'home'} | ${dropdownEventHandlers.handleHomeKey}
        ${'end'}  | ${dropdownEventHandlers.handleEndKey}
      `('when $key is pressed', ({ key, expectedHandler }) => {
        it('calls dropdown event handler', () => {
          textInput.trigger(`keydown.${key}`);

          expect(expectedHandler).toHaveBeenCalled();
        });
      });
    });

    describe('when input is clicked', () => {
      it('opens dropdown if input is focused and does not have a value', async () => {
        createComponent();

        const textInput = findTextInput();
        textInput.element.closest = () => null;
        textInput.trigger('focus');
        await textInput.trigger('click');

        expect(findDropdownMenu().classes()).toContain('show');
      });
    });

    describe('when `enter` key is pressed', () => {
      it('adds focused dropdown item as a token', async () => {
        createComponent({
          propsData: { dropdownItems },
        });

        const textInput = findTextInput();

        textInput.trigger('focus');
        await textInput.trigger('keydown.enter');

        expect(wrapper.emitted('input')[0]).toEqual([[dropdownItems[0]]]);
      });

      it('adds a user defined token', async () => {
        createComponent({
          propsData: { allowUserDefinedTokens: true },
        });

        const textInput = findTextInput();

        textInput.trigger('focus');
        textInput.setValue('foo bar');
        await textInput.trigger('keydown.enter');

        expect(wrapper.emitted('input')[0][0][0].name).toBe('foo bar');
      });
    });

    describe('when `keydown` event is triggered', () => {
      it('emits `keydown` event', () => {
        createComponent();

        const textInput = findTextInput();

        textInput.trigger('keydown');

        expect(wrapper.emitted('keydown')).toHaveLength(1);
      });
    });
  });

  describe('adding tokens when clicking dropdown item', () => {
    const item = dropdownItems[0];

    beforeEach(async () => {
      createComponent({
        propsData: { dropdownItems },
      });

      wrapper.findComponent(GlTokenSelectorDropdown).vm.$emit('dropdown-item-click', item);

      await nextTick();
    });

    it('fires `input` event', () => {
      expect(wrapper.emitted('input')[0]).toEqual([[item]]);
    });

    it('fires `token-add` event', () => {
      expect(wrapper.emitted('token-add')[0]).toEqual([item]);
    });
  });

  describe('removing tokens', () => {
    const token = tokens[0];

    beforeEach(async () => {
      createComponent({
        propsData: { selectedTokens: [token] },
      });

      findTokenContainer().vm.$emit('token-remove', token);

      await nextTick();
    });

    it('fires `input` event', () => {
      expect(wrapper.emitted('input')[0]).toEqual([[]]);
    });

    it('fires `token-remove` event', () => {
      expect(wrapper.emitted('token-remove')[0]).toEqual([token]);
    });
  });

  describe('when component container is clicked', () => {
    it('focuses on the text input', async () => {
      createComponent();

      const container = wrapper.findComponent({ ref: 'container' });
      container.element.closest = () => null;

      container.trigger('click');

      expect(wrapper.emitted('focus')).toHaveLength(1);
    });
  });

  describe('filtering dropdown items', () => {
    it('removes selected tokens from the dropdown items', () => {
      createComponent({
        propsData: { dropdownItems, selectedTokens: [tokens[0]] },
      });
      expect(findDropdownItemByName(dropdownItems[0].name)).toBeUndefined();
    });
  });

  describe('when `GlTokenContainer` fires `cancel-focus`', () => {
    it('focuses on the text input', async () => {
      createComponent({
        selectedTokens: tokens,
      });

      findTokenContainer().vm.$emit('cancel-focus');

      await nextTick();

      expect(findTextInput().element).toHaveFocus();
    });
  });
});
