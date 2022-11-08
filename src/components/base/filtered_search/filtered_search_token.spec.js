import { shallowMount, mount } from '@vue/test-utils';
import { observable, nextTick } from 'vue';
import GlFilteredSearchToken from './filtered_search_token.vue';
import GlFilteredSearchTokenSegment from './filtered_search_token_segment.vue';

describe('Filtered search token', () => {
  let wrapper;

  const findTitleSegment = () => wrapper.findAllComponents(GlFilteredSearchTokenSegment).at(0);
  const findOperatorSegment = () => wrapper.findAllComponents(GlFilteredSearchTokenSegment).at(1);
  const findDataSegment = () => wrapper.findAllComponents(GlFilteredSearchTokenSegment).at(2);
  const availableTokens = [
    {
      type: 'compatible1',
      dataType: 'compatible',
      title: 'test1-foo',
      token: 'stub',
      icon: 'eye',
    },
    {
      type: 'complatible2',
      dataType: 'compatible',
      title: 'test2-bar',
      token: 'stub',
      icon: 'eye',
    },
    { type: 'incompatible', title: 'test3-baz', token: 'stub', icon: 'eye' },
  ];

  const defaultProps = {
    config: { title: 'testTitle' },
    availableTokens,
    cursorPosition: 'end',
  };

  const createComponent = (props) => {
    wrapper = shallowMount(GlFilteredSearchToken, {
      propsData: { ...defaultProps, ...props },
    });
  };

  const mountComponent = (props) => {
    wrapper = mount(GlFilteredSearchToken, {
      provide: {
        portalName: 'fake target',
        alignSuggestions: function fakeAlignSuggestions() {},
      },
      stubs: {
        Portal: {
          template: '<div><slot></slot></div>',
        },
        GlFilteredSearchSuggestionList: {
          template: '<div></div>',
          methods: {
            getValue: () => '=',
          },
        },
      },
      propsData: { ...defaultProps, ...props },
    });
  };

  describe('when activated', () => {
    it('emits activate when operator segment is clicked', () => {
      createComponent();
      findOperatorSegment().vm.$emit('activate');

      expect(wrapper.emitted('activate')).toHaveLength(1);
    });

    it('activates operator segment if value is empty', () => {
      createComponent({ active: true });

      expect(findOperatorSegment().props().active).toBe(true);
    });

    it('sets operator if value is empty and there is only one operator', () => {
      createComponent({
        active: true,
        value: { data: '' },
        config: { operators: [{ value: '=', title: 'is' }] },
      });

      expect(findDataSegment().props().active).toBe(true);
      expect(wrapper.emitted('input')[0][0]).toStrictEqual({ data: '', operator: '=' });
    });

    it('activates data segment if value is not empty', () => {
      createComponent({ active: true, value: { operator: '=', data: 'something' } });

      expect(findDataSegment().props().active).toBe(true);
    });
  });

  it('activates operator segment when clicked', async () => {
    createComponent({ active: true, value: { operator: '=', data: 'something' } });

    await findOperatorSegment().vm.$emit('activate');

    expect(findOperatorSegment().props().active).toBe(true);
  });

  it('activates data segment when clicked', async () => {
    createComponent({ active: true, value: { operator: '=', data: 'something' } });

    await findDataSegment().vm.$emit('activate');

    expect(findDataSegment().props().active).toBe(true);
    expect(wrapper.emitted('input')).toBeUndefined();
  });

  it('activates title segment when title is clicked', async () => {
    createComponent({ active: true, value: { operator: '=' } });

    await findTitleSegment().vm.$emit('activate');

    expect(findTitleSegment().props().active).toBe(true);
  });

  it('replaces itself when value is empty and backspace is pressed', () => {
    createComponent({ active: true, value: { operator: '', data: '' } });

    findOperatorSegment().vm.$emit('backspace');

    expect(wrapper.emitted('replace')).toHaveLength(1);
  });

  it('ignores backspace when value is not empty and backspace is pressed', () => {
    createComponent({ active: true, value: { operator: '', data: 'something' } });

    findOperatorSegment().vm.$emit('backspace');

    expect(wrapper.emitted('replace')).toBeUndefined();
  });

  it('jumps to data segment when operator segment is completed', () => {
    createComponent({ active: true, value: { operator: '' } });

    findOperatorSegment().vm.$emit('input', '=');
    findOperatorSegment().vm.$emit('complete');

    expect(findDataSegment().props().active).toBe(true);
  });

  it.each`
    segment       | selector
    ${'operator'} | ${findOperatorSegment}
    ${'data'}     | ${findDataSegment}
  `('deactivates when %segment is deactivated', ({ selector }) => {
    createComponent({ active: true, value: { operator: '=', data: 'something' } });
    selector().vm.$emit('deactivate');

    expect(wrapper.emitted('deactivate')).toHaveLength(1);
  });

  it('emits destroy when deactivated and value is empty', async () => {
    createComponent({ active: true });

    await nextTick();
    await wrapper.setProps({ active: false });

    expect(wrapper.emitted('destroy')).toHaveLength(1);
  });

  it('activates operator segment when backspace is pressed in data segmented', async () => {
    createComponent({ active: true, value: { operator: '=', data: 'something' } });

    await findDataSegment().vm.$emit('backspace');

    expect(findOperatorSegment().props().active).toBe(true);
  });

  it.each(['complete', 'split', 'submit', 'select'])(
    'passes-through %s event when data segment emits it',
    (event) => {
      createComponent({ active: true, value: { operator: '=', data: 'something' } });

      findDataSegment().vm.$emit(event);

      expect(wrapper.emitted(event)).toHaveLength(1);
    }
  );

  it('keeps value when replaced by compatible token', () => {
    const originalValue = { operator: '=', data: 'something' };
    createComponent({
      active: true,
      value: originalValue,
      config: availableTokens[0],
    });

    findTitleSegment().vm.$emit('complete', availableTokens[1].title);

    expect(wrapper.emitted('replace')).toHaveLength(1);
    expect(wrapper.emitted().replace[0][0].value).toStrictEqual(originalValue);
  });

  it('resets value when replaced by incompatible token', () => {
    const originalValue = { operator: '=', data: 'something' };
    createComponent({
      active: true,
      value: originalValue,
      config: availableTokens[0],
    });

    findTitleSegment().vm.$emit('complete', availableTokens[2].title);

    expect(wrapper.emitted('replace')).toHaveLength(1);
    expect(wrapper.emitted().replace[0][0].value).toStrictEqual({ data: '' });
  });

  describe('integration tests', () => {
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

    it('emits close event when data token is closed', () => {
      mountComponent({ value: { operator: '=', data: 'something' } });
      const closeWrapper = wrapper.find('.gl-token-close');
      closeWrapper.element.closest = () => closeWrapper.element;

      const preventDefaultSpy = jest.fn();
      const stopPropagationSpy = jest.fn();
      closeWrapper.trigger('mousedown', {
        preventDefault: preventDefaultSpy,
        stopPropagation: stopPropagationSpy,
      });

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
      expect(wrapper.emitted('destroy')).toHaveLength(1);
    });

    it('jumps to data segment and applies selection if no match is available for key and data is empty', async () => {
      mountComponent({ active: true, value: observable({ operator: '', data: '' }) });

      await wrapper.find('input').trigger('keydown', { key: 'q' });

      expect(wrapper.emitted().input[0][0].operator).toBe('=');
      expect(findDataSegment().props().active).toBe(true);
    });

    it('jumps to data segment and applies selection when space is pressed', async () => {
      mountComponent({ active: true, value: observable({ operator: '!=', data: '' }) });

      await wrapper.find('input').trigger('keydown', { key: ' ' });

      expect(wrapper.emitted().input[0][0].operator).toBe('=');
      expect(findDataSegment().props().active).toBe(true);
    });

    it('does not mutate its value prop', async () => {
      const originalValue = () => ({ operator: '', data: '' });
      const value = observable(originalValue());
      mountComponent({ active: true, value });

      await wrapper.find('input').trigger('keydown', { key: 'q' });

      expect(value).toEqual(originalValue());
    });
  });

  describe('when multi select', () => {
    beforeEach(() => {
      createComponent({
        active: true,
        config: { multiSelect: true },
        multiSelectValues: ['alpha', 'beta'],
        value: { operator: '=', data: 'alpha' },
      });
    });

    it('emits input event when data segment is completed', () => {
      findDataSegment().vm.$emit('complete');

      expect(wrapper.emitted('input')).toEqual([[{ data: 'alpha,beta', operator: '=' }]]);
    });

    it('emits empty input event when data segment is activated, so blank text input shows all suggestions', () => {
      findDataSegment().vm.$emit('activate');

      expect(wrapper.emitted('input')).toEqual([[{ data: '', operator: '=' }]]);
    });

    it('passes down the value prop to the data segment if it changes', async () => {
      createComponent({
        value: { operator: '=', data: 'alpha' },
      });

      await wrapper.setProps({
        value: { operator: '=', data: 'gamma' },
      });

      expect(findDataSegment().props('value')).toEqual('gamma');
    });
  });

  describe('view-only state', () => {
    it('prevents segments from activating when view-only is true', async () => {
      createComponent({
        active: true,
        value: { operator: '=' },
        viewOnly: true,
      });

      await findTitleSegment().vm.$emit('activate');

      expect(findTitleSegment().props().active).toBe(false);
    });

    it('does not add a mousedown listener to the token-data when view-only is true', async () => {
      mountComponent({ value: { operator: '=', data: 'something' }, viewOnly: true });

      const tokenData = wrapper.find('.gl-filtered-search-token-data');
      tokenData.element.closest = jest.fn(() => tokenData.element);

      await tokenData.trigger('mousedown');

      expect(tokenData.element.closest).not.toHaveBeenCalled();
    });

    describe.each`
      viewOnly | hoverClassExists | cursorClassExists | propValue
      ${true}  | ${false}         | ${true}           | ${true}
      ${false} | ${true}          | ${false}          | ${false}
    `(
      'when view-only is $viewOnly',
      ({ viewOnly, hoverClassExists, cursorClassExists, propValue }) => {
        beforeEach(() => {
          createComponent({
            active: true,
            value: { operator: '=' },
            viewOnly,
          });
        });

        it(`${viewOnly ? 'applies' : 'does not apply'} the view-only style classes`, () => {
          expect(wrapper.find('.gl-filtered-search-token-hover').exists()).toBe(hoverClassExists);
          expect(wrapper.find('.gl-cursor-default').exists()).toBe(cursorClassExists);
        });

        it(`sets the view-only prop to ${viewOnly} on the title, data and operator segments`, () => {
          expect(findTitleSegment().props('viewOnly')).toBe(propValue);
          expect(findDataSegment().props('viewOnly')).toBe(propValue);
          expect(findOperatorSegment().props('viewOnly')).toBe(propValue);
        });
      }
    );
  });

  describe('showFriendlyText prop', () => {
    it.each`
      showFriendlyText | operator | text
      ${false}         | ${'='}   | ${'='}
      ${false}         | ${'!='}  | ${'!='}
      ${true}          | ${'='}   | ${'is'}
      ${true}          | ${'!='}  | ${'is not'}
    `(
      'displays "$text" when operator="$operator" and showFriendlyText="$showFriendlyText"',
      ({ showFriendlyText, operator, text }) => {
        mountComponent({ value: { operator }, showFriendlyText });

        expect(findOperatorSegment().text()).toBe(text);
      }
    );
  });
});
