import { shallowMount } from '@vue/test-utils';
import {
  getMockCategory,
  MOCK_CONTEXT_ITEM_FILE,
  MOCK_CONTEXT_ITEM_ISSUE,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
} from '../mock_context_data';
import {
  CONTEXT_ITEM_CATEGORY_ISSUE,
  CONTEXT_ITEM_CATEGORY_MERGE_REQUEST,
  CONTEXT_ITEM_CATEGORY_FILE,
} from '../constants';
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';
import GlDuoChatContextItemMenuSearchItem from './duo_chat_context_item_menu_search_item.vue';

describe('GlDuoChatContextItemMenuContextSearchItem', () => {
  let wrapper;

  const createWrapper = (props) => {
    wrapper = shallowMount(GlDuoChatContextItemMenuSearchItem, {
      propsData: {
        ...props,
      },
    });
  };

  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);
  const findCategoryIcon = () => findByTestId('category-icon');
  const findContextItemPopover = () => wrapper.findComponent(GlDuoChatContextItemPopover);

  describe.each([
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_FILE),
      contextItem: MOCK_CONTEXT_ITEM_FILE,
    },
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_ISSUE),
      contextItem: MOCK_CONTEXT_ITEM_ISSUE,
    },
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_MERGE_REQUEST),
      contextItem: MOCK_CONTEXT_ITEM_MERGE_REQUEST,
    },
  ])('for "$category"', ({ category, contextItem }) => {
    beforeEach(() => createWrapper({ category, contextItem }));

    it('renders the category icon', () => {
      expect(findCategoryIcon().props('name')).toBe(category.icon);
    });

    it('renders the context item popover', () => {
      expect(findContextItemPopover().props()).toEqual(
        expect.objectContaining({
          contextItem,
          target: `info-icon-${contextItem.id}`,
        })
      );
    });

    it('renders the default context item title', () => {
      expect(wrapper.text()).toContain(contextItem.metadata.title);
    });
  });
});
