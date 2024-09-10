import { shallowMount } from '@vue/test-utils';
import { MOCK_CATEGORIES, getMockContextItems, getMockCategory } from '../mock_context_data';
import {
  CONTEXT_ITEM_TYPE_ISSUE,
  CONTEXT_ITEM_TYPE_MERGE_REQUEST,
  CONTEXT_ITEM_TYPE_PROJECT_FILE,
} from '../constants';
import GlDuoChatContextItemMenuSearchItems from './duo_chat_context_item_menu_search_items.vue';
import GlDuoChatContextItemMenuSearchItemsLoading from './duo_chat_context_item_menu_search_items_loading.vue';
import GlDuoChatContextItemMenuSearchItem from './duo_chat_context_item_menu_search_item.vue';

describe('GlDuoChatContextItemMenuSearchItems', () => {
  let wrapper;
  let category;
  let results;

  const createWrapper = (props = {}) => {
    category = props.category || MOCK_CATEGORIES.at(0);
    results = props.results || getMockContextItems().filter((item) => item.type === category.value);

    wrapper = shallowMount(GlDuoChatContextItemMenuSearchItems, {
      propsData: {
        activeIndex: 0,
        searchQuery: '',
        category,
        loading: false,
        error: null,
        results,
        ...props,
      },
    });
  };

  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);
  const findAllByTestId = (testId) => wrapper.findAll(`[data-testid="${testId}"]`);

  const findSearchInput = () => findByTestId('context-menu-search-input');
  const findLoadingIndicator = () =>
    wrapper.findComponent(GlDuoChatContextItemMenuSearchItemsLoading);
  const findLoadingError = () => findByTestId('search-results-error');
  const findEmptyState = () => findByTestId('search-results-empty-state');
  const findResultItems = () => findAllByTestId('search-result-item');
  const findActiveItem = () => wrapper.find('.active-command');
  const findActiveItemDetails = () =>
    findActiveItem().find('[data-testid="search-result-item-details"]');

  describe('default rendering', () => {
    beforeEach(() => createWrapper());

    it('renders the search input', () => {
      expect(findSearchInput().exists()).toBe(true);
    });

    it('does not render the loading state', () => {
      expect(findLoadingIndicator().exists()).toBe(false);
    });

    it('does not render the error state', () => {
      expect(findLoadingError().exists()).toBe(false);
    });

    it('does not render the empty state', () => {
      expect(findEmptyState().exists()).toBe(false);
    });
  });

  describe('when searching', () => {
    const query = 'e';
    beforeEach(async () => {
      createWrapper();
      await findSearchInput().vm.$emit('input', query);

      await wrapper.setProps({
        loading: true,
        searchQuery: query,
      });
    });

    it('emits query input', async () => {
      expect(wrapper.emitted('update:searchQuery').at(0)).toEqual([query]);
    });

    describe('when loading', () => {
      it('shows loading state', async () => {
        expect(findLoadingIndicator().exists()).toBe(true);
      });

      describe.each([
        { numResults: 0, expectedRows: 1 },
        { numResults: 1, expectedRows: 1 },
        { numResults: 2, expectedRows: 2 },
        { numResults: 3, expectedRows: 3 },
        { numResults: 4, expectedRows: 4 },
        { numResults: 5, expectedRows: 5 },
      ])('when there are $numResults results', ({ numResults, expectedRows }) => {
        beforeEach(async () => {
          await wrapper.setProps({
            loading: true,
            results: getMockContextItems().slice(0, numResults),
          });
        });

        it(`shows ${expectedRows} loading rows next time when searching`, () => {
          expect(findLoadingIndicator().props('rows')).toBe(expectedRows);
        });
      });
    });

    describe('when there is an error', () => {
      beforeEach(async () => {
        await wrapper.setProps({
          loading: false,
          error: 'oh no',
        });
      });

      it('shows error state', async () => {
        expect(findLoadingError().text()).toBe('oh no');
      });

      it('does not render the loading state', () => {
        expect(findLoadingIndicator().exists()).toBe(false);
      });

      it('does not render the empty state', () => {
        expect(findEmptyState().exists()).toBe(false);
      });
    });

    describe('when there are no results', () => {
      beforeEach(async () => {
        await wrapper.setProps({
          loading: false,
          error: null,
          results: [],
        });
      });

      it('shows empty state', async () => {
        expect(findEmptyState().text()).toBe('No results found');
      });

      it('does not render the loading state', () => {
        expect(findLoadingIndicator().exists()).toBe(false);
      });

      it('does not render the error state', () => {
        expect(findLoadingError().exists()).toBe(false);
      });
    });

    describe('when there are results', () => {
      beforeEach(() =>
        wrapper.setProps({
          loading: false,
        })
      );

      it('shows matching results', async () => {
        const matchingResult = results.at(0);
        await wrapper.setProps({
          results: [matchingResult],
        });

        expect(findResultItems()).toHaveLength(1);
        expect(wrapper.findComponent(GlDuoChatContextItemMenuSearchItem).props()).toEqual(
          expect.objectContaining({
            contextItem: matchingResult,
            category,
          })
        );
      });

      it('marks the correct item as active', async () => {
        expect(findActiveItemDetails().props('contextItem')).toEqual(results.at(0));

        await wrapper.setProps({
          activeIndex: 1,
        });

        expect(findActiveItemDetails().props('contextItem')).toEqual(results.at(1));
      });

      it('emits "active-index-change" event when hovering over an item', async () => {
        const index = 1;
        await findResultItems().wrappers.at(index).find('div').trigger('mouseenter');

        expect(wrapper.emitted('active-index-change').at(0)).toEqual([index]);
      });

      describe('when there are disabled results', () => {
        let disabledItem;
        beforeEach(async () => {
          const disabledIndex = 2;
          await wrapper.setProps({
            results: results.map((result, index) => ({
              ...result,
              isEnabled: index !== disabledIndex,
            })),
          });

          disabledItem = findResultItems().at(disabledIndex);
        });

        it('does not emit "active-index-change" event when hovering over a disabled item', async () => {
          await disabledItem.find('div').trigger('mouseenter');

          expect(wrapper.emitted('active-index-change')).toBeUndefined();
        });

        it('disables the item', () => {
          expect(disabledItem.attributes('tabindex')).toBe('-1');
          expect(disabledItem.classes()).toContain('gl-cursor-not-allowed');
        });
      });
    });
  });

  describe.each([
    {
      testCase: getMockCategory(CONTEXT_ITEM_TYPE_PROJECT_FILE),
      expectedPlaceholder: 'Search files...',
    },
    {
      testCase: getMockCategory(CONTEXT_ITEM_TYPE_ISSUE),
      expectedPlaceholder: 'Search issues...',
    },
    {
      testCase: getMockCategory(CONTEXT_ITEM_TYPE_MERGE_REQUEST),
      expectedPlaceholder: 'Search merge requests...',
    },
  ])('when category is "$testCase.label"', ({ testCase, expectedPlaceholder }) => {
    beforeEach(() =>
      createWrapper({
        category: testCase,
      })
    );

    it('renders the expected input placeholder text', () => {
      expect(findSearchInput().attributes('placeholder')).toEqual(expectedPlaceholder);
    });
  });
});
