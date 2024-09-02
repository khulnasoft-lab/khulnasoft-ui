import { shallowMount } from '@vue/test-utils';
import { MOCK_CATEGORIES, getMockContextItems } from '../mock_context_data';
import {
  CONTEXT_ITEM_TYPE_ISSUE,
  CONTEXT_ITEM_TYPE_MERGE_REQUEST,
  CONTEXT_ITEM_TYPE_PROJECT_FILE,
} from '../constants';
import GlDuoChatContextItemMenuContextSearchItemFile from './context_search_items/file.vue';
import GlDuoChatContextItemMenuContextSearchItemIssue from './context_search_items/issue.vue';
import GlDuoChatContextItemMenuContextSearchItemMergeRequest from './context_search_items/merge_request.vue';
import GlDuoChatContextItemMenuContextSearchItems from './duo_chat_context_item_menu_context_search_items.vue';
import GlDuoChatContextItemMenuContextSearchItemsLoading from './context_search_items/context_search_items_loading.vue';

describe('GlDuoChatContextItemMenuContextSearchItems', () => {
  let wrapper;
  let category;
  let results;

  const createWrapper = (props = {}) => {
    category = props.category || MOCK_CATEGORIES.at(0);
    results = props.results || getMockContextItems().filter((item) => item.type === category.value);

    wrapper = shallowMount(GlDuoChatContextItemMenuContextSearchItems, {
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
    wrapper.findComponent(GlDuoChatContextItemMenuContextSearchItemsLoading);
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

    it('emits "keyup" event', async () => {
      const event = new Event('keyup');

      findSearchInput().vm.$emit('keyup', event);

      expect(wrapper.emitted('keyup').at(0)).toEqual([event]);
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

    it('shows loading state', async () => {
      expect(findLoadingIndicator().exists()).toBe(true);
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
        expect(
          wrapper.findComponent(GlDuoChatContextItemMenuContextSearchItemFile).props()
        ).toEqual(
          expect.objectContaining({
            item: matchingResult,
            category,
          })
        );
      });

      it('marks the correct item as active', async () => {
        expect(findActiveItemDetails().props('item')).toBe(results.at(0));

        await wrapper.setProps({
          activeIndex: 1,
        });

        expect(findActiveItemDetails().props('item')).toBe(results.at(1));
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
          expect(disabledItem.classes()).toContain('disabled');
        });
      });
    });
  });

  describe.each([
    {
      testCase: MOCK_CATEGORIES.find((cat) => cat.value === CONTEXT_ITEM_TYPE_PROJECT_FILE),
      expectedPlaceholder: 'Search files...',
      expectedComponent: GlDuoChatContextItemMenuContextSearchItemFile,
    },
    {
      testCase: MOCK_CATEGORIES.find((cat) => cat.value === CONTEXT_ITEM_TYPE_ISSUE),
      expectedPlaceholder: 'Search issues...',
      expectedComponent: GlDuoChatContextItemMenuContextSearchItemIssue,
    },
    {
      testCase: MOCK_CATEGORIES.find((cat) => cat.value === CONTEXT_ITEM_TYPE_MERGE_REQUEST),
      expectedPlaceholder: 'Search merge requests...',
      expectedComponent: GlDuoChatContextItemMenuContextSearchItemMergeRequest,
    },
  ])(
    'when category is "$testCase.label"',
    ({ testCase, expectedPlaceholder, expectedComponent }) => {
      beforeEach(() =>
        createWrapper({
          category: testCase,
        })
      );

      it('renders the expected input placeholder text', () => {
        expect(findSearchInput().attributes('placeholder')).toEqual(expectedPlaceholder);
      });

      it('renders the correct category search item component', () => {
        expect(wrapper.findComponent(expectedComponent).exists()).toBe(true);
      });
    }
  );
});
