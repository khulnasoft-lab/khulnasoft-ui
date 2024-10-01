import { shallowMount } from '@vue/test-utils';
import GlTruncate from '../../../../../../utilities/truncate/truncate.vue';
import {
  getMockCategory,
  MOCK_CONTEXT_ITEM_FILE,
  MOCK_CONTEXT_ITEM_GIT_COMMIT,
  MOCK_CONTEXT_ITEM_GIT_DIFF,
  MOCK_CONTEXT_ITEM_ISSUE,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
} from '../mock_context_data';
import {
  CONTEXT_ITEM_CATEGORY_ISSUE,
  CONTEXT_ITEM_CATEGORY_MERGE_REQUEST,
  CONTEXT_ITEM_CATEGORY_FILE,
  CONTEXT_ITEM_CATEGORY_LOCAL_GIT,
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
      stubs: {
        GlTruncate,
      },
    });
  };

  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);
  const findCategoryIcon = () => findByTestId('category-icon');
  const findContextItemPopover = () => wrapper.findComponent(GlDuoChatContextItemPopover);
  const findItemTitle = () => findByTestId('item-title');
  const findItemSecondaryText = () => findByTestId('item-secondary-text');

  describe.each([
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_FILE),
      contextItem: MOCK_CONTEXT_ITEM_FILE,
      expectedIcon: 'document',
    },
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_ISSUE),
      contextItem: MOCK_CONTEXT_ITEM_ISSUE,
      expectedIcon: 'issues',
    },
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_MERGE_REQUEST),
      contextItem: MOCK_CONTEXT_ITEM_MERGE_REQUEST,
      expectedIcon: 'merge-request',
    },
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_LOCAL_GIT),
      contextItem: MOCK_CONTEXT_ITEM_GIT_COMMIT,
      expectedIcon: 'commit',
    },
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_LOCAL_GIT),
      contextItem: MOCK_CONTEXT_ITEM_GIT_DIFF,
      expectedIcon: 'comparison',
    },
  ])('for "$category"', ({ category, contextItem, expectedIcon }) => {
    beforeEach(() => createWrapper({ category, contextItem }));

    it('renders the category icon', () => {
      expect(findCategoryIcon().props('name')).toBe(expectedIcon);
    });

    it('renders the item title', () => {
      const title = findItemTitle();

      expect(title.props('text')).toEqual(contextItem.metadata.title);
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

  describe('for local git category', () => {
    describe.each([
      { contextItem: MOCK_CONTEXT_ITEM_GIT_COMMIT },
      { contextItem: MOCK_CONTEXT_ITEM_GIT_DIFF },
    ])('for git type "$contextItem.metadata.gitType"', ({ contextItem }) => {
      beforeEach(() =>
        createWrapper({ category: getMockCategory(CONTEXT_ITEM_CATEGORY_LOCAL_GIT), contextItem })
      );

      it('renders expected secondary text', () => {
        const expectedText = `${contextItem.metadata.repositoryName} - ${contextItem.metadata.commitId}`;
        const secondaryText = findItemSecondaryText();
        const truncated = secondaryText.findComponent(GlTruncate);

        expect(truncated.props('text')).toEqual(expectedText);
      });
    });
  });
});
