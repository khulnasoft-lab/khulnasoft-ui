import { findByTestId } from '../../../../../../../utils/test/test-utils';
import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { getMockCategory, getMockContextItems, MOCK_CATEGORIES } from '../mock_context_data';
import {
  CONTEXT_ITEM_CATEGORY_ISSUE,
  CONTEXT_ITEM_CATEGORY_MERGE_REQUEST,
  CONTEXT_ITEM_CATEGORY_FILE,
} from '../constants';
import GlDuoChatContextItemSelections from '../duo_chat_context_item_selections/duo_chat_context_item_selections.vue';
import GlDuoChatContextItemMenuCategoryItems from './duo_chat_context_item_menu_category_items.vue';
import GlDuoChatContextItemMenuSearchItems from './duo_chat_context_item_menu_search_items.vue';
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

  const findMenu = () => findByTestId('context-item-menu', wrapper);
  const findContextItemSelections = () => wrapper.findComponent(GlDuoChatContextItemSelections);
  const findCategoryItems = () => wrapper.findComponent(GlDuoChatContextItemMenuCategoryItems);
  const findResultItems = () => wrapper.findComponent(GlDuoChatContextItemMenuSearchItems);

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
        expect(findCategoryItems().props()).toEqual({
          activeIndex: 0,
          categories: MOCK_CATEGORIES,
        });
      });

      it('cycles through the categories when the arrow keys are pressed', async () => {
        expect(findCategoryItems().props('activeIndex')).toBe(0);
        await triggerKeyUp('ArrowDown');
        expect(findCategoryItems().props('activeIndex')).toBe(1);
        await triggerKeyUp('ArrowDown');
        expect(findCategoryItems().props('activeIndex')).toBe(2);
        await triggerKeyUp('ArrowUp');
        expect(findCategoryItems().props('activeIndex')).toBe(1);
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
    });

    describe.each([
      CONTEXT_ITEM_CATEGORY_ISSUE,
      CONTEXT_ITEM_CATEGORY_MERGE_REQUEST,
      CONTEXT_ITEM_CATEGORY_FILE,
    ])('when a "%s" category has been selected', (categoryValue) => {
      let category;
      let results;
      beforeEach(() => {
        category = getMockCategory(categoryValue);
        results = getMockContextItems()
          .filter((item) => item.category === categoryValue)
          .map((item, index) => ({
            ...item,
            metadata: {
              ...item.metadata,
              enabled: index % 2 === 0, // disable odd indexed items
            },
          }));

        createComponent({
          results,
        });

        return findCategoryItems().vm.$emit('select', category);
      });

      it('shows search result items', () => {
        expect(findResultItems().props()).toEqual({
          activeIndex: 0,
          category,
          error: null,
          loading: false,
          results,
          searchQuery: '',
        });
      });

      it('cycles through the items when the arrow keys are pressed', async () => {
        expect(findResultItems().props('activeIndex')).toBe(0);
        await triggerKeyUp('ArrowDown');
        expect(findResultItems().props('activeIndex')).toBe(2);
        await triggerKeyUp('ArrowUp');
        expect(findResultItems().props('activeIndex')).toBe(0);
      });

      it('does not cycle to the next item if it is disabled', async () => {
        await triggerKeyUp('ArrowDown');
        expect(findResultItems().props('activeIndex')).toBe(2);
        await triggerKeyUp('ArrowDown');
        expect(findResultItems().props('activeIndex')).not.toBe(1); // odd indexes disabled
        expect(findResultItems().props('activeIndex')).toBe(0); // cycles back to first result
        await triggerKeyUp('ArrowDown');
        expect(findResultItems().props('activeIndex')).toBe(2);
      });

      it('clears category selection when escape is pressed', async () => {
        await triggerKeyUp('Escape');
        expect(findCategoryItems().exists()).toBe(true);
        expect(findResultItems().exists()).toBe(false);
      });

      it('refocuses on parent prompt when clearing category selection', async () => {
        await triggerKeyUp('Escape');
        expect(wrapper.emitted('focus-prompt')).toHaveLength(1);
      });

      it('selects the item when enter is pressed', async () => {
        await triggerKeyUp('Enter');
        expect(wrapper.emitted('select').at(0)).toEqual([results.at(0)]);
      });

      it('selects the item when clicked', async () => {
        await findResultItems().vm.$emit('select', results.at(0));
        expect(wrapper.emitted('select').at(0)).toEqual([results.at(0)]);
      });

      it('emits "close" event when selecting an item', async () => {
        await findResultItems().vm.$emit('select', results.at(0));
        expect(wrapper.emitted('close')).toHaveLength(1);
      });

      it('does not select a disabled item when clicked', async () => {
        await findResultItems().vm.$emit('select', results.at(1));
        expect(wrapper.emitted('select')).toBeUndefined();
      });

      describe('when searching', () => {
        const query = 'e';
        beforeEach(async () => {
          await findResultItems().vm.$emit('update:searchQuery', query);

          await wrapper.setProps({
            loading: true,
          });
        });

        it('emits search event', async () => {
          expect(wrapper.emitted('search').at(1)).toEqual([
            {
              category: categoryValue,
              query,
            },
          ]);
        });

        it('shows loading state', async () => {
          expect(findResultItems().props('loading')).toBe(true);
        });

        describe('when there is an error', () => {
          beforeEach(async () => {
            await wrapper.setProps({
              loading: false,
              error: 'oh no',
            });
          });

          it('shows error state', async () => {
            expect(findResultItems().props('error')).toBe('oh no');
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
            expect(findResultItems().props('results')).toEqual([matchingResult]);
          });

          it('initially marks the first enabled item as active', async () => {
            const firstEnabledIndex = 2;
            await wrapper.setProps({
              results: results.map((result, index) => ({
                ...result,
                metadata: {
                  ...result.metadata,
                  enabled: index === firstEnabledIndex,
                },
              })),
            });
            await nextTick();

            expect(findResultItems().props('activeIndex')).toEqual(firstEnabledIndex);
          });
        });
      });
    });
  });
});