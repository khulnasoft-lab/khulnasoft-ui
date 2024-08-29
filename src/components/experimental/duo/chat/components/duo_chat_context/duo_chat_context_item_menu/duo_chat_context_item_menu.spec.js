import { shallowMount } from '@vue/test-utils';
import { getMockContextItems, MOCK_CATEGORIES } from '../mock_context_data';
import {
  CONTEXT_ITEM_TYPE_ISSUE,
  CONTEXT_ITEM_TYPE_MERGE_REQUEST,
  CONTEXT_ITEM_TYPE_PROJECT_FILE,
} from '../constants';
import GlDuoChatContextItemSelections from '../duo_chat_context_item_selections/duo_chat_context_item_selections.vue';
import GlDuoChatContextItemMenu from './duo_chat_context_item_menu.vue';

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

describe('GlDuoChatContextItemMenu', () => {
  let wrapper;

  const createComponent = (props = {}, options = {}) => {
    wrapper = shallowMount(GlDuoChatContextItemMenu, {
      propsData: {
        open: true,
        categories: MOCK_CATEGORIES,
        selections: [],
        loading: false,
        error: null,
        results: [],
        ...props,
      },
      ...options,
    });
  };

  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);
  const findAllByTestId = (testId) => wrapper.findAll(`[data-testid="${testId}"]`);

  const findMenu = () => findByTestId('context-item-menu');
  const findContextItemSelections = () => wrapper.findComponent(GlDuoChatContextItemSelections);
  const findCategoryItems = () => findAllByTestId('category-item');
  const findCategory = (category) =>
    findCategoryItems().wrappers.find((item) => item.text().includes(category));
  const findSearchInput = () => findByTestId('context-menu-search-input');
  const findResultItems = () => findAllByTestId('search-result-item');
  const findActiveItem = () => wrapper.find('.active-command');
  const findLoadingIndicator = () => findByTestId('search-results-loading');
  const findLoadingError = () => findByTestId('search-results-error');
  const findEmptyState = () => findByTestId('search-results-empty-state');
  const findActiveItemText = () => findActiveItem().text().trim();

  // Keyboard events are passed by $ref from the parent GlDuoChat component, simulate that here
  const triggerKeyUp = async (key) => wrapper.vm.handleKeyUp({ key, preventDefault: jest.fn() });

  describe('context item selection', () => {
    describe('and there are selections', () => {
      it('renders context item selections', () => {
        const selections = getMockContextItems().slice(0, 2);
        createComponent({ open: false, selections });

        expect(findContextItemSelections().props('removable')).toBe(true);
        expect(findContextItemSelections().props('defaultCollapsed')).toBe(false);
        expect(findContextItemSelections().props('title')).toBe('Included references');
      });

      it('emits "remove" event when an item is removed', () => {
        const selections = getMockContextItems().slice(0, 2);
        createComponent({ open: false, selections });

        const removed = selections.at(0);
        findContextItemSelections().vm.$emit('remove', removed);

        expect(wrapper.emitted('remove').at(0)).toEqual([removed]);
      });
    });

    describe('and there are no selections', () => {
      it('does not render selections', () => {
        createComponent({ open: false, selections: [] });

        expect(findContextItemSelections().exists()).toBe(false);
      });
    });
  });

  describe('when the menu is closed', () => {
    it('does not render any menu', () => {
      createComponent({ open: false });

      expect(findMenu().exists()).toBe(false);
    });
  });

  describe('when the menu is open', () => {
    describe('when a category has not been selected', () => {
      beforeEach(() => {
        createComponent();
      });

      it('shows categories', () => {
        const items = findCategoryItems().wrappers.map((item) => item.text());

        expect(items).toEqual(expect.arrayContaining(['Files', 'Issues', 'Merge Requests']));
      });

      it('cycles through the categories when the arrow keys are pressed', async () => {
        expect(findActiveItem().text()).toBe('Files');
        await triggerKeyUp('ArrowDown');
        expect(findActiveItem().text()).toBe('Issues');
        await triggerKeyUp('ArrowDown');
        expect(findActiveItem().text()).toBe('Merge Requests');
        await triggerKeyUp('ArrowUp');
        expect(findActiveItem().text()).toBe('Issues');
      });

      it('emits "close" event when escape is pressed', async () => {
        await triggerKeyUp('Escape');

        expect(wrapper.emitted('close')).toHaveLength(1);
      });

      it('selects the category when enter is pressed', async () => {
        await triggerKeyUp('Enter');

        expect(wrapper.emitted('search').at(0)).toEqual([
          {
            category: MOCK_CATEGORIES[0].value,
            query: '',
          },
        ]);
      });

      it('selects the category when clicked', async () => {
        await findActiveItem().vm.$emit('click');

        expect(wrapper.emitted('search').at(0)).toEqual([
          {
            category: MOCK_CATEGORIES[0].value,
            query: '',
          },
        ]);
      });
    });

    describe.each([
      CONTEXT_ITEM_TYPE_ISSUE,
      CONTEXT_ITEM_TYPE_MERGE_REQUEST,
      CONTEXT_ITEM_TYPE_PROJECT_FILE,
    ])('when a "%s" category has been selected', (category) => {
      let results;
      beforeEach(() => {
        const selectedCategory = MOCK_CATEGORIES.find((c) => c.value === category);
        results = getMockContextItems()
          .filter((item) => item.type === category)
          .map((item, index) => ({
            ...item,
            isEnabled: index % 2 === 0,
          }));

        createComponent({
          results,
        });

        return findCategory(selectedCategory.label).vm.$emit('click');
      });

      it('shows item search input', () => {
        expect(findSearchInput().exists()).toBe(true);
      });

      it('shows search result items', () => {
        const items = findResultItems().wrappers.map((item) => item.text().trim());

        expect(items).toEqual(
          expect.arrayContaining(
            results.map((result) => expect.stringContaining(result.metadata.name))
          )
        );
      });

      it('cycles through the items when the arrow keys are pressed', async () => {
        await triggerKeyUp('ArrowDown');
        expect(findActiveItemText()).toEqual(expect.stringContaining(results.at(2).metadata.name));
        await triggerKeyUp('ArrowUp');
        expect(findActiveItemText()).toEqual(expect.stringContaining(results.at(0).metadata.name));
      });

      it('does not cycle to the next item if it is disabled', async () => {
        await triggerKeyUp('ArrowDown');
        expect(findActiveItemText()).toEqual(expect.stringContaining(results.at(2).metadata.name));
        await triggerKeyUp('ArrowDown');
        expect(findActiveItemText()).not.toEqual(
          expect.stringContaining(results.at(1).metadata.name) // disabled
        );
        expect(findActiveItemText()).toEqual(expect.stringContaining(results.at(0).metadata.name)); // cycles back to first result
        await triggerKeyUp('ArrowDown');
        expect(findActiveItemText()).toEqual(expect.stringContaining(results.at(2).metadata.name));
      });

      it('clears category selection when escape is pressed', async () => {
        await triggerKeyUp('Escape');
        expect(findCategoryItems()).toHaveLength(3);
        expect(findResultItems()).toHaveLength(0);
      });

      it('selects the item when enter is pressed', async () => {
        await triggerKeyUp('Enter');
        expect(wrapper.emitted('select').at(0)).toEqual([results.at(0)]);
      });

      it('selects the item when clicked', async () => {
        await findActiveItem().vm.$emit('click');
        expect(wrapper.emitted('select').at(0)).toEqual([results.at(0)]);
      });

      it('emits "close" event when selecting an item', async () => {
        await findActiveItem().vm.$emit('click');
        expect(wrapper.emitted('close')).toHaveLength(1);
      });

      it('does not select a disabled item when clicked', async () => {
        await findResultItems().at(1).vm.$emit('click');
        expect(wrapper.emitted('select')).toBeUndefined();
      });

      describe('when searching', () => {
        const query = 'e';
        beforeEach(async () => {
          await findSearchInput().vm.$emit('input', query);

          await wrapper.setProps({
            loading: true,
          });
        });

        it('emits search event', async () => {
          expect(wrapper.emitted('search').at(1)).toEqual([
            {
              category,
              query,
            },
          ]);
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
        });

        describe('when there are no results', () => {
          beforeEach(async () => {
            await wrapper.setProps({
              loading: false,
              results: [],
            });
          });

          it('shows empty state', async () => {
            expect(findEmptyState().text()).toBe('No results found');
          });
        });

        describe('when there are results', () => {
          let matchingResult;

          beforeEach(async () => {
            matchingResult = results.at(0);
            await wrapper.setProps({
              loading: false,
              results: [matchingResult],
            });
          });

          it('shows matching results', async () => {
            expect(findResultItems()).toHaveLength(1);
            expect(findActiveItemText()).toContain(matchingResult.metadata.name);
          });
        });
      });
    });
  });
});
