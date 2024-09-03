import { shallowMount } from '@vue/test-utils';
import {
  MOCK_CATEGORIES,
  MOCK_CONTEXT_ITEM_FILE,
  MOCK_CONTEXT_ITEM_ISSUE,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
} from '../mock_context_data';
import {
  CONTEXT_ITEM_TYPE_ISSUE,
  CONTEXT_ITEM_TYPE_MERGE_REQUEST,
  CONTEXT_ITEM_TYPE_PROJECT_FILE,
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
      category: MOCK_CATEGORIES.find((cat) => cat.value === CONTEXT_ITEM_TYPE_PROJECT_FILE),
      item: MOCK_CONTEXT_ITEM_FILE,
    },
    {
      category: MOCK_CATEGORIES.find((cat) => cat.value === CONTEXT_ITEM_TYPE_ISSUE),
      item: MOCK_CONTEXT_ITEM_ISSUE,
    },
    {
      category: MOCK_CATEGORIES.find((cat) => cat.value === CONTEXT_ITEM_TYPE_MERGE_REQUEST),
      item: MOCK_CONTEXT_ITEM_MERGE_REQUEST,
    },
  ])('for "$category"', ({ category, item }) => {
    beforeEach(() => createWrapper({ category, item }));

    it('renders the category icon', () => {
      expect(findCategoryIcon().props('name')).toBe(category.icon);
    });

    it('renders the context item popover', () => {
      expect(findContextItemPopover().props()).toEqual(
        expect.objectContaining({
          item,
          target: `info-icon-${item.id}`,
        })
      );
    });

    it('renders the default context item title', () => {
      expect(wrapper.text()).toContain(item.metadata.name);
    });
  });
});
