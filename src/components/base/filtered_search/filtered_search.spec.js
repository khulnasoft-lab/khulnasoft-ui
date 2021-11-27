import Vue from 'vue';
import { shallowMount, mount } from '@vue/test-utils';
import GlFilteredSearch from './filtered_search.vue';
import GlFilteredSearchSuggestion from './filtered_search_suggestion.vue';
import GlFilteredSearchSuggestionList from './filtered_search_suggestion_list.vue';
import GlFilteredSearchTerm from './filtered_search_term.vue';
import GlFilteredSearchToken from './filtered_search_token.vue';
import { TERM_TOKEN_TYPE } from './filtered_search_utils';

jest.mock('~/directives/tooltip');

const FakeToken = {
  props: ['active'],
  inheritAttrs: false,
  render: (h) => h('div'),
};

Vue.directive('GlTooltip', () => {});

let wrapper;
describe('Filtered search', () => {
  const defaultProps = {
    availableTokens: [{ type: 'faketoken', token: FakeToken }],
  };

  const findSearchBox = () => wrapper.findComponent({ name: 'GlSearchBoxByClickStub' });

  const createComponent = (props) => {
    wrapper = shallowMount(GlFilteredSearch, {
      propsData: { ...defaultProps, ...props },
      stubs: {
        GlSearchBoxByClick: {
          name: 'GlSearchBoxByClickStub',
          props: ['clearable'],
          template: '<div><slot name="input"></slot></div>',
        },
      },
    });
  };

  describe('value manipulation', () => {
    it('creates term when empty', () => {
      createComponent();
      expect(wrapper.emitted().input[0][0]).toStrictEqual([
        { type: TERM_TOKEN_TYPE, value: { data: '' } },
      ]);
    });

    it('passes clearable false when empty', () => {
      createComponent();
      expect(findSearchBox().props('clearable')).toBe(false);
    });

    it('adds empty term to the end when not empty', () => {
      createComponent({
        value: [{ type: 'faketoken', value: { data: '' } }],
      });

      expect(wrapper.emitted().input[0][0].pop()).toStrictEqual({
        type: TERM_TOKEN_TYPE,
        value: { data: '' },
      });
    });

    it('passes clearable true when not empty', async () => {
      createComponent({
        value: [{ type: 'faketoken', value: { data: '' } }],
      });
      await wrapper.vm.$nextTick();

      expect(findSearchBox().props('clearable')).toBe(true);
    });

    it('denormalizes strings if needed', async () => {
      createComponent({
        value: ['one', 'two'],
      });
      await wrapper.vm.$nextTick();

      const inputEventArgs = wrapper.emitted().input[1][0];
      expect(inputEventArgs.every((t) => t.type === TERM_TOKEN_TYPE)).toBe(true);
      expect(inputEventArgs.map((t) => t.value.data)).toStrictEqual(['one', 'two', '']);
    });

    it('splits strings if needed', async () => {
      createComponent({
        value: ['one two'],
      });
      await wrapper.vm.$nextTick();

      const inputEventArgs = wrapper.emitted().input[1][0];
      expect(inputEventArgs.every((t) => t.type === TERM_TOKEN_TYPE)).toBe(true);
      expect(inputEventArgs.map((t) => t.value.data)).toStrictEqual(['one', 'two', '']);
    });
  });

  describe('event handling', () => {
    it.each`
      eventName                  | payload
      ${'submit'}                | ${[[]]}
      ${'clear'}                 | ${[]}
      ${'history-item-selected'} | ${['item']}
      ${'clear-history'}         | ${[]}
    `('passes through $eventName', async ({ eventName, payload }) => {
      createComponent();
      findSearchBox().vm.$emit(eventName, payload[0]);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()[eventName][0]).toStrictEqual(payload);
    });

    it('activates token when requested', async () => {
      createComponent({
        value: [{ type: 'faketoken', value: '' }],
      });
      await wrapper.vm.$nextTick();

      wrapper.findComponent(FakeToken).vm.$emit('activate');

      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(FakeToken).props('active')).toBe(true);
    });

    it('deactivates token when requested', async () => {
      createComponent({
        value: [{ type: 'faketoken', value: '' }],
      });
      await wrapper.vm.$nextTick();

      wrapper.findComponent(FakeToken).vm.$emit('activate');
      wrapper.findComponent(FakeToken).vm.$emit('deactivate');

      await wrapper.vm.$nextTick();

      expect(
        wrapper.findAllComponents({ ref: 'tokens' }).filter((w) => w.props('active') === true)
      ).toHaveLength(0);
    });

    it('ignores deactivate requests from non-active tokens', async () => {
      createComponent({
        value: [
          { type: 'faketoken', value: { data: '1' } },
          { type: 'faketoken', value: { data: '2' } },
        ],
      });
      await wrapper.vm.$nextTick();

      wrapper.findComponent(FakeToken).vm.$emit('activate');
      wrapper.findAllComponents(FakeToken).at(1).vm.$emit('deactivate');

      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(FakeToken).props('active')).toBe(true);
    });

    it('removes empty term tokens on deactivate', async () => {
      const findSecondTerm = () => wrapper.findAllComponents(GlFilteredSearchTerm).at(1);
      createComponent({
        value: [{ type: 'faketoken', value: { data: '' } }, 'one', 'two', 'three'],
      });

      await wrapper.vm.$nextTick();

      findSecondTerm().vm.$emit('activate');
      findSecondTerm().vm.$emit('input', { data: '' });

      await wrapper.vm.$nextTick();

      findSecondTerm().vm.$emit('deactivate');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
        { type: 'faketoken', value: { data: '' } },
        { type: TERM_TOKEN_TYPE, value: { data: 'one' } },
        { type: TERM_TOKEN_TYPE, value: { data: 'three' } },
        { type: TERM_TOKEN_TYPE, value: { data: '' } },
      ]);
    });

    it('destroys token if requested', async () => {
      createComponent({
        value: [{ type: 'faketoken', value: '' }, 'one'],
      });
      await wrapper.vm.$nextTick();

      wrapper.findComponent(FakeToken).vm.$emit('destroy');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
        { type: TERM_TOKEN_TYPE, value: { data: 'one' } },
        { type: TERM_TOKEN_TYPE, value: { data: '' } },
      ]);
    });

    it('brings focus to previous token if current is destroyed', async () => {
      createComponent({
        value: ['one', { type: 'faketoken', value: '' }, 'two'],
      });
      await wrapper.vm.$nextTick();

      wrapper.findComponent(FakeToken).vm.$emit('destroy');

      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(GlFilteredSearchTerm).props('active')).toBe(true);
    });

    it('does not destroy last token', async () => {
      createComponent();
      wrapper.findComponent(GlFilteredSearchTerm).vm.$emit('destroy');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
        { type: TERM_TOKEN_TYPE, value: { data: '' } },
      ]);
    });

    it('replaces token when requested', async () => {
      createComponent();
      wrapper
        .findComponent(GlFilteredSearchTerm)
        .vm.$emit('replace', { type: 'faketoken', value: { data: 'test' } });

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
        { type: 'faketoken', value: { data: 'test' } },
        { type: TERM_TOKEN_TYPE, value: { data: '' } },
      ]);
    });

    it('replaces token after clear when requested', async () => {
      createComponent({
        value: ['one', { type: 'faketoken', value: '' }, 'two'],
      });

      findSearchBox().vm.$emit('input', '');

      await wrapper.vm.$nextTick();

      wrapper
        .findComponent(GlFilteredSearchTerm)
        .vm.$emit('replace', { type: 'faketoken', value: { data: 'test' } });

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
        { type: 'faketoken', value: { data: 'test' } },
        { type: TERM_TOKEN_TYPE, value: { data: '' } },
      ]);
    });

    it('inserts single token when requested', async () => {
      createComponent({ value: ['one'] });
      wrapper.findComponent(GlFilteredSearchTerm).vm.$emit('activate');
      wrapper.findComponent(GlFilteredSearchTerm).vm.$emit('split');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
        { type: TERM_TOKEN_TYPE, value: { data: 'one' } },
        { type: TERM_TOKEN_TYPE, value: { data: '' } },
      ]);
    });

    it('jumps to last token when insert of empty term requested', async () => {
      createComponent({ value: ['one', 'two'] });
      await wrapper.vm.$nextTick();

      wrapper.findComponent(GlFilteredSearchTerm).vm.$emit('activate');
      wrapper.findComponent(GlFilteredSearchTerm).vm.$emit('split');

      await wrapper.vm.$nextTick();

      expect(wrapper.findAllComponents(GlFilteredSearchTerm).at(2).props('active')).toBe(true);
      expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
        { type: TERM_TOKEN_TYPE, value: { data: 'one' } },
        { type: TERM_TOKEN_TYPE, value: { data: 'two' } },
        { type: TERM_TOKEN_TYPE, value: { data: '' } },
      ]);
    });

    it('inserts multiple tokens when requested', async () => {
      createComponent({ value: ['one'] });
      wrapper.findComponent(GlFilteredSearchTerm).vm.$emit('activate');

      await wrapper.vm.$nextTick();

      wrapper.findComponent(GlFilteredSearchTerm).vm.$emit('split', ['foo', 'bar']);

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().input.pop()[0]).toStrictEqual([
        { type: TERM_TOKEN_TYPE, value: { data: 'one' } },
        { type: TERM_TOKEN_TYPE, value: { data: 'foo' } },
        { type: TERM_TOKEN_TYPE, value: { data: 'bar' } },
        { type: TERM_TOKEN_TYPE, value: { data: '' } },
      ]);
    });

    it('submits entire search when submit is requested', () => {
      createComponent();
      wrapper.findComponent(GlFilteredSearchTerm).vm.$emit('submit');
      expect(wrapper.emitted().submit).toBeDefined();
    });
  });

  it('normalizes term tokens to strings on submit', () => {
    createComponent({
      value: ['one'],
    });
    wrapper.findComponent(GlFilteredSearchTerm).vm.$emit('submit');
    expect(wrapper.emitted().submit).toBeDefined();
    expect(wrapper.emitted().submit[0][0]).toStrictEqual(['one']);
  });

  it('concatenates strings on submit', () => {
    createComponent({
      value: ['one', 'two', { type: 'faketoken', value: { data: 'smth' } }, 'four', 'five'],
    });
    wrapper.findComponent(GlFilteredSearchTerm).vm.$emit('submit');
    expect(wrapper.emitted().submit).toBeDefined();
    expect(wrapper.emitted().submit[0][0]).toStrictEqual([
      'one two',
      { type: 'faketoken', value: { data: 'smth' } },
      'four five',
    ]);
  });

  it('passes required props to tokens', async () => {
    createComponent({
      value: [{ type: 'faketoken', value: '' }],
    });
    await wrapper.vm.$nextTick();

    const fakeTokenInstance = wrapper.findComponent(FakeToken);
    expect(fakeTokenInstance.exists()).toBe(true);
    expect(Object.keys(fakeTokenInstance.attributes())).toEqual(
      expect.arrayContaining(['current-value', 'index', 'config', 'value'])
    );
  });
});

describe('Filtered search integration tests', () => {
  const testTokens = [
    {
      type: 'static',
      icon: 'label',
      token: GlFilteredSearchToken,
      title: 'Static-token',
      options: [
        { title: 'first', value: 'one' },
        { title: 'second', value: 'two' },
        { title: 'third', value: 'three' },
      ],
    },
    { type: 'dynamic!token', icon: 'rocket', title: 'Fake-token', token: FakeToken },
    {
      type: 'unique',
      unique: true,
      icon: 'document',
      token: GlFilteredSearchToken,
      title: 'Unique-token',
      options: [
        { title: 'first', value: 'one' },
        { title: 'second', value: 'two' },
      ],
    },
    {
      type: 'disabled',
      icon: 'document',
      title: 'Disabled-token',
      token: FakeToken,
      disabled: true,
    },
  ];

  const mountComponent = (props) => {
    wrapper = mount(GlFilteredSearch, {
      propsData: {
        availableTokens: testTokens,
        ...props,
      },
      attachTo: document.body,
    });
  };

  const activate = (idx) =>
    wrapper
      .findAllComponents(GlFilteredSearchTerm)
      .at(idx)
      .find('div.gl-filtered-search-token-segment')
      .trigger('mousedown');

  const findInput = () =>
    wrapper
      .findAllComponents(GlFilteredSearchTerm)
      .filter((t) => t.props().active)
      .at(0)
      .find('input');

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

  describe('when first term is clicked', () => {
    beforeEach(async () => {
      mountComponent();
      activate(0);
      await wrapper.vm.$nextTick();
    });

    it('brings focus to term element input', () => {
      const input = findInput();
      expect(input.exists()).toBe(true);
      expect(document.activeElement).toBe(input.element);
    });

    it('displays suggestions list', () => {
      const suggestions = wrapper.findComponent(GlFilteredSearchSuggestionList);
      expect(suggestions.exists()).toBe(true);
      expect(suggestions.findAllComponents(GlFilteredSearchSuggestion)).toHaveLength(
        testTokens.filter((t) => !t.disabled).length
      );
    });

    it('updates suggestions list as you type', async () => {
      const input = findInput();
      input.setValue('sta'); // partial of "static"

      await wrapper.vm.$nextTick();

      const suggestions = wrapper.findComponent(GlFilteredSearchSuggestionList);
      expect(suggestions.exists()).toBe(true);
      expect(suggestions.findAllComponents(GlFilteredSearchSuggestion)).toHaveLength(1);
    });

    it('resets suggestions list as you press Space', async () => {
      const input = findInput();
      input.setValue('--wrong-- ');

      await wrapper.vm.$nextTick();

      const suggestions = wrapper.findComponent(GlFilteredSearchSuggestionList);
      expect(suggestions.exists()).toBe(true);
      expect(suggestions.findAllComponents(GlFilteredSearchSuggestion)).toHaveLength(3);
    });

    it('does not render suggestions list if there are no suggestions available', async () => {
      const input = findInput();
      input.setValue('--wrong--');

      await wrapper.vm.$nextTick();

      const suggestions = wrapper.findComponent(GlFilteredSearchSuggestionList);
      expect(suggestions.exists()).toBe(false);
    });

    it('replaces term with token when suggestion is selected', async () => {
      const input = findInput();
      input.trigger('keydown', { key: 'ArrowDown' });

      await wrapper.vm.$nextTick();

      input.trigger('keydown', { key: 'Enter' });

      await wrapper.vm.$nextTick();

      const token = wrapper.findComponent(GlFilteredSearchToken);
      expect(token.exists()).toBe(true);
    });

    it('does not mutate the `value` prop when the search input changes', async () => {
      const initialValue = [...wrapper.props('value')];

      const input = findInput();
      input.trigger('keydown', { key: 'ArrowDown' });
      await wrapper.vm.$nextTick();
      input.trigger('keydown', { key: 'Enter' });
      await wrapper.vm.$nextTick();

      expect(wrapper.props('value')).toEqual(initialValue);
    });

    it('calls alignSuggestion for new tokens', async () => {
      const input = findInput();
      input.trigger('keydown', { key: 'ArrowDown' });
      const alignSuggestionsSpy = jest.spyOn(wrapper.vm, 'alignSuggestions');

      await wrapper.vm.$nextTick();

      input.trigger('keydown', { key: 'Enter' });

      await wrapper.vm.$nextTick();

      expect(alignSuggestionsSpy).toHaveBeenCalled();
    });
  });

  it('does not render unique token in suggestions list if it is already present', async () => {
    mountComponent({ value: ['token', { type: 'unique', value: { data: 'something' } }] });
    activate(0);

    await wrapper.vm.$nextTick();

    const suggestions = wrapper.findComponent(GlFilteredSearchSuggestionList);
    expect(suggestions.exists()).toBe(true);
    expect(suggestions.findAllComponents(GlFilteredSearchSuggestion)).toHaveLength(2);
  });

  it('correctly handles switching from one token to another', async () => {
    mountComponent({ value: ['one two'] });
    activate(0);

    await wrapper.vm.$nextTick();

    activate(1);

    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents(GlFilteredSearchTerm).at(1).find('input').exists()).toBe(true);
  });

  it('correctly switches focus on token destroy', async () => {
    mountComponent({ value: ['one t three'] });
    await wrapper.vm.$nextTick();

    activate(1);

    await wrapper.vm.$nextTick();

    // Unfortunately backspace is not working in JSDOM
    wrapper.findAllComponents(GlFilteredSearchTerm).at(1).vm.$emit('destroy');

    await wrapper.vm.$nextTick();

    expect(document.activeElement).toBe(
      wrapper.findComponent(GlFilteredSearchTerm).find('input').element
    );
  });

  it('clicking clear button clears component input', async () => {
    mountComponent({ value: ['one two three'] });
    await wrapper.vm.$nextTick();

    wrapper
      .findAll('button')
      .filter((b) => b.attributes('name') === 'clear')
      .trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents(GlFilteredSearchTerm)).toHaveLength(1);
  });
});
