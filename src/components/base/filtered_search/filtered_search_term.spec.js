import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import FilteredSearchTerm from './filtered_search_term.vue';
import { INTENT_ACTIVATE_PREVIOUS } from './filtered_search_utils';

const availableTokens = [
  { type: 'foo', title: 'test1-foo', token: 'stub', icon: 'eye' },
  { type: 'bar', title: 'test2-bar', token: 'stub', icon: 'eye' },
  { type: 'baz', title: 'test1-baz', token: 'stub', icon: 'eye' },
];

describe('Filtered search term', () => {
  let wrapper;

  const searchInputAttributes = { 'data-qa-selector': 'foo-bar' };

  const defaultProps = {
    availableTokens: [],
    cursorPosition: 'end',
  };

  const segmentStub = {
    name: 'gl-filtered-search-token-segment-stub',
    template: '<div><slot name="view"></slot><slot name="suggestions"></slot></div>',
    props: ['searchInputAttributes', 'isLastToken', 'currentValue', 'viewOnly', 'options'],
  };

  const createComponent = (props) => {
    wrapper = shallowMount(FilteredSearchTerm, {
      propsData: { ...defaultProps, ...props },
      provide: {
        termsAsTokens: () => false,
      },
      stubs: {
        'gl-filtered-search-token-segment': segmentStub,
      },
    });
  };

  const findSearchInput = () => wrapper.find('input');
  const findTokenSegmentComponent = () => wrapper.findComponent(segmentStub);

  it('renders value in inactive mode', () => {
    createComponent({ value: { data: 'test-value' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders input with value in active mode', () => {
    createComponent({ value: { data: 'test-value' }, active: true });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders input with placeholder if placeholder prop is provided', () => {
    createComponent({ placeholder: 'placeholder-stub' });
    expect(findSearchInput().attributes('placeholder')).toBe('placeholder-stub');
  });

  it('filters suggestions by input', async () => {
    createComponent({ availableTokens, active: true, value: { data: 'test1' } });

    await nextTick();

    expect(findTokenSegmentComponent().props('options')).toHaveLength(2);
  });

  it.each`
    originalEvent   | emittedEvent    | payload
    ${'activate'}   | ${'activate'}   | ${undefined}
    ${'deactivate'} | ${'deactivate'} | ${undefined}
    ${'split'}      | ${'split'}      | ${undefined}
    ${'submit'}     | ${'submit'}     | ${undefined}
    ${'complete'}   | ${'replace'}    | ${{ type: undefined }}
    ${'backspace'}  | ${'destroy'}    | ${{ intent: INTENT_ACTIVATE_PREVIOUS }}
  `(
    'emits $emittedEvent when token segment emits $originalEvent',
    async ({ originalEvent, emittedEvent, payload }) => {
      createComponent({ active: true, value: { data: 'something' } });

      findTokenSegmentComponent().vm.$emit(originalEvent);

      await nextTick();

      expect(wrapper.emitted(emittedEvent)).toHaveLength(1);

      if (payload !== undefined) {
        expect(wrapper.emitted(emittedEvent)[0][0]).toEqual(payload);
      }
    }
  );

  it('passes `searchInputAttributes`, `isLastToken`, `currentValue` & `viewOnly` props to `GlFilteredSearchTokenSegment`', () => {
    const isLastToken = true;
    const viewOnly = true;
    const currentValue = [
      { type: 'filtered-search-term', value: { data: 'something' } },
      { type: 'filtered-search-term', value: { data: '' } },
    ];

    createComponent({
      value: { data: 'something' },
      searchInputAttributes,
      isLastToken,
      currentValue,
      viewOnly,
    });

    expect(findTokenSegmentComponent().props()).toEqual(
      expect.objectContaining({
        searchInputAttributes,
        isLastToken,
        currentValue,
        viewOnly,
      })
    );
  });

  it('by default sets `viewOnly` to false on `GlFilteredSearchTokenSegment`', () => {
    createComponent();

    expect(findTokenSegmentComponent().props('viewOnly')).toBe(false);
  });

  it('adds `searchInputAttributes` prop to search term input', () => {
    createComponent({
      placeholder: 'placeholder-stub',
      searchInputAttributes,
    });

    expect(findSearchInput().attributes('data-qa-selector')).toBe(
      searchInputAttributes['data-qa-selector']
    );
  });

  it('activates and deactivates when the input is focused/blurred', async () => {
    createComponent({ placeholder: 'placeholder-stub' });
    await nextTick();

    expect(wrapper.emitted()).toEqual({});

    await findSearchInput().trigger('focusin');

    expect(wrapper.emitted()).toEqual({ activate: [[]] });

    await findSearchInput().trigger('focusout');

    expect(wrapper.emitted()).toEqual({ activate: [[]], deactivate: [[]] });
  });

  describe.each([true, false])('when `viewOnly` is %s', (viewOnly) => {
    beforeEach(() => {
      createComponent({ viewOnly, searchInputAttributes, placeholder: 'placeholder-stub' });
    });

    it(`${viewOnly ? 'adds' : 'does not add'} \`gl-bg-gray-10\` class to search term input`, () => {
      expect(findSearchInput().classes('gl-bg-gray-10')).toBe(viewOnly);
    });
  });
});
