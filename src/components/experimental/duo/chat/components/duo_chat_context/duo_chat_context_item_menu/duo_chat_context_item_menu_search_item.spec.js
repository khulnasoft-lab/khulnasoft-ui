import { shallowMount } from '@vue/test-utils';
import GlTruncate from '../../../../../../utilities/truncate/truncate.vue';
import {
  getMockCategory,
  MOCK_CONTEXT_ITEM_DEPENDENCY,
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
  CONTEXT_ITEM_CATEGORY_DEPENDENCY,
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
      expectedSecondaryText: `example/garden - src/plants/strawberry.ts`,
    },
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_ISSUE),
      contextItem: MOCK_CONTEXT_ITEM_ISSUE,
      expectedIcon: 'issues',
      expectedSecondaryText: `example/garden - #1234`,
    },
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_MERGE_REQUEST),
      contextItem: MOCK_CONTEXT_ITEM_MERGE_REQUEST,
      expectedIcon: 'merge-request',
      expectedSecondaryText: `example/garden - !1122`,
    },
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_LOCAL_GIT),
      contextItem: MOCK_CONTEXT_ITEM_GIT_COMMIT,
      expectedIcon: 'commit',
      expectedSecondaryText: `example/garden - 20f8caf94cb8f5e5f9dbd1a9ac32702321de201b`,
    },
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_LOCAL_GIT),
      contextItem: MOCK_CONTEXT_ITEM_GIT_DIFF,
      expectedIcon: 'comparison',
      expectedSecondaryText: `example/garden - main`,
    },
    {
      category: getMockCategory(CONTEXT_ITEM_CATEGORY_DEPENDENCY),
      contextItem: MOCK_CONTEXT_ITEM_DEPENDENCY,
      expectedIcon: 'package',
      expectedSecondaryText: `package.json`,
    },
  ])(
    'for category "$contextItem.category" and type "$contextItem.metadata.gitType"',
    ({ category, contextItem, expectedIcon, expectedSecondaryText }) => {
      beforeEach(() => createWrapper({ category, contextItem }));

      it('renders the expected icon', () => {
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

      it('renders expected secondary text', () => {
        const secondaryText = findItemSecondaryText();
        const truncated = secondaryText.findComponent(GlTruncate);

        expect(truncated.props('text')).toEqual(expectedSecondaryText);
      });
    }
  );
});
