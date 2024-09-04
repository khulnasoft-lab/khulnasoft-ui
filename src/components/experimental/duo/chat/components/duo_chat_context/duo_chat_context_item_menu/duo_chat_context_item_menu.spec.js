import { shallowMount } from '@vue/test-utils';
import { getMockContextItems, MOCK_CATEGORIES } from '../mock_context_data';
import {
  CONTEXT_ITEM_TYPE_ISSUE,
  CONTEXT_ITEM_TYPE_MERGE_REQUEST,
  CONTEXT_ITEM_TYPE_PROJECT_FILE,
} from '../constants';
import GlDuoChatContextItemSelections from '../duo_chat_context_item_selections/duo_chat_context_item_selections.vue';
import GlDuoChatContextItemMenuCategoryItems from './duo_chat_context_item_menu_category_items.vue';
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

  const findMenu = () => findByTestId('context-item-menu');
  const findContextItemSelections = () => wrapper.findComponent(GlDuoChatContextItemSelections);
  const findCategoryItems = () => wrapper.findComponent(GlDuoChatContextItemMenuCategoryItems);
  const findResultItems = () => findByTestId('context-menu-search-items');

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
    });

    describe.each([
      CONTEXT_ITEM_TYPE_ISSUE,
      CONTEXT_ITEM_TYPE_MERGE_REQUEST,
      CONTEXT_ITEM_TYPE_PROJECT_FILE,
    ])('when a "%s" category has been selected', (categoryValue) => {
      let category;
      let results;
      beforeEach(() => {
        category = MOCK_CATEGORIES.find((cat) => cat.value === categoryValue);
        results = getMockContextItems()
          .filter((item) => item.type === categoryValue)
          .map((item, index) => ({
            ...item,
            isEnabled: index % 2 === 0, // disable odd indexed items
          }));

        createComponent({
          results,
        });

        return findCategoryItems().vm.$emit('select', category);
      });

      it('shows search result items', () => {
        expect(findResultItems().exists()).toBe(true);
      });

      it('selects the item when clicked', async () => {
        await findResultItems().find('li').trigger('click');
        expect(wrapper.emitted('select').at(0)).toEqual([results.at(0)]);
      });

      it('emits "close" event when selecting an item', async () => {
        await findResultItems().find('li').trigger('click');
        expect(wrapper.emitted('close')).toHaveLength(1);
      });

      it('does not select a disabled item when clicked', async () => {
        const item = findResultItems()
          .findAll('li')
          .wrappers.find((i) => i.text().includes(results.at(1).metadata.name));
        await item.trigger('click');

        expect(wrapper.emitted('select')).toBeUndefined();
      });

      describe('when searching', () => {
        beforeEach(async () => {
          await wrapper.setProps({
            loading: true,
          });
        });

        it('shows loading state', async () => {
          expect(wrapper.text()).toContain('Loading...');
        });

        describe('when there is an error', () => {
          beforeEach(async () => {
            await wrapper.setProps({
              loading: false,
              error: 'oh no',
            });
          });

          it('shows error state', async () => {
            expect(wrapper.text()).toContain('Error: oh no');
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
            expect(findResultItems().findAll('li')).toHaveLength(1);
            expect(findResultItems().text()).toContain(matchingResult.metadata.name);
          });
        });
      });
    });
  });
});
