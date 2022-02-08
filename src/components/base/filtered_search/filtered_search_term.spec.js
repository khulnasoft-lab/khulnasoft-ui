import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import GlFilteredSearchSuggestion from './filtered_search_suggestion.vue';
import FilteredSearchTerm from './filtered_search_term.vue';

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
  };

  const segmentStub = {
    name: 'gl-filtered-search-token-segment-stub',
    template: '<div><slot name="view"></slot><slot name="suggestions"></slot></div>',
    props: ['searchInputAttributes', 'isLastToken'],
  };

  const createComponent = (props) => {
    wrapper = shallowMount(FilteredSearchTerm, {
      propsData: { ...defaultProps, ...props },
      stubs: {
        'gl-filtered-search-token-segment': segmentStub,
      },
    });
  };

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
    expect(wrapper.find('input').attributes('placeholder')).toBe('placeholder-stub');
  });

  it('filters suggestions by input', async () => {
    createComponent({ availableTokens, active: true, value: { data: 'test1' } });

    await nextTick();

    expect(wrapper.findAllComponents(GlFilteredSearchSuggestion)).toHaveLength(2);
  });

  it.each`
    originalEvent   | emittedEvent
    ${'activate'}   | ${'activate'}
    ${'deactivate'} | ${'deactivate'}
    ${'split'}      | ${'split'}
    ${'submit'}     | ${'submit'}
    ${'complete'}   | ${'replace'}
    ${'backspace'}  | ${'destroy'}
  `(
    'emits $emittedEvent when token segment emits $originalEvent',
    async ({ originalEvent, emittedEvent }) => {
      createComponent({ active: true, value: { data: 'something' } });

      findTokenSegmentComponent().vm.$emit(originalEvent);

      await nextTick();

      expect(wrapper.emitted()[emittedEvent]).toHaveLength(1);
    }
  );

  it('passes `searchInputAttributes` and `isLastToken` prop to `GlFilteredSearchTokenSegment`', () => {
    const isLastToken = true;

    createComponent({
      value: { data: 'something' },
      searchInputAttributes,
      isLastToken,
    });

    expect(findTokenSegmentComponent().props()).toEqual({
      searchInputAttributes,
      isLastToken,
    });
  });

  it('adds `searchInputAttributes` prop to search term input', () => {
    createComponent({
      placeholder: 'placeholder-stub',
      searchInputAttributes,
    });

    expect(wrapper.find('input').attributes('data-qa-selector')).toBe(
      searchInputAttributes['data-qa-selector']
    );
  });
});
