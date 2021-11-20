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

  const defaultProps = {
    availableTokens: [],
  };

  const segmentStub = {
    name: 'gl-filtered-search-token-segment-stub',
    template: '<div><slot name="view"></slot><slot name="suggestions"></slot></div>',
  };

  const createComponent = (props) => {
    wrapper = shallowMount(FilteredSearchTerm, {
      propsData: { ...defaultProps, ...props },
      stubs: {
        'gl-filtered-search-token-segment': segmentStub,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

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

  it('filters suggestions by input', () => {
    createComponent({ availableTokens, active: true, value: { data: 'test1' } });
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.findAllComponents(GlFilteredSearchSuggestion)).toHaveLength(2);
    });
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
    ({ originalEvent, emittedEvent }) => {
      createComponent({ active: true, value: { data: 'something' } });

      wrapper.findComponent(segmentStub).vm.$emit(originalEvent);

      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.emitted()[emittedEvent]).toHaveLength(1);
      });
    }
  );
});
