import { nextTick } from 'vue';
import { mount, shallowMount } from '@vue/test-utils';
import GlIcon from '../../../../../../base/icon/icon.vue';
import GlToken from '../../../../../../base/token/token.vue';
import GlDuoChatContextItemDetails from '../duo_chat_content_item_details/duo_chat_content_item_details.vue';
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';

import {
  getMockContextItems,
  MOCK_CONTEXT_ITEM_FILE,
  MOCK_CONTEXT_ITEM_GIT_COMMIT,
  MOCK_CONTEXT_ITEM_GIT_DIFF,
  MOCK_CONTEXT_ITEM_ISSUE,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
} from '../mock_context_data';
import GlDuoChatContextItemSelections from './duo_chat_context_item_selections.vue';

describe('GlDuoChatContextItemSelections', () => {
  let wrapper;
  let mockSelections;

  const createComponent = (props = {}, mountFn = shallowMount) => {
    mockSelections = getMockContextItems().slice(0, 3);
    wrapper = mountFn(GlDuoChatContextItemSelections, {
      propsData: {
        selections: mockSelections,
        title: 'Test Title',
        defaultCollapsed: true,
        showClose: true,
        ...props,
      },
      stubs: {
        GlSkeletonLoader: { name: 'GlSkeletonLoaderStub', template: '<div></div>' },
      },
    });
  };

  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);

  const findTitle = () => findByTestId('chat-context-selections-title');
  const findTokensWrapper = () => findByTestId('chat-context-tokens-wrapper');
  const findTokens = () => wrapper.findAllComponents(GlToken);
  const findTokensIcons = () => findTokensWrapper().findAllComponents(GlIcon);
  const findPopovers = () => wrapper.findAllComponents(GlDuoChatContextItemPopover);
  const findCollapseIcon = () => findByTestId('chat-context-collapse-icon');
  const findItemDetailsModal = () => wrapper.findComponent(GlDuoChatContextItemDetails);

  describe('component rendering', () => {
    it('renders the component when selections are provided', () => {
      createComponent();

      expect(wrapper.exists()).toBe(true);
    });

    it('renders the correct title', () => {
      createComponent();

      expect(findTitle().text()).toBe('Test Title');
    });

    it('renders tokens for each selection', () => {
      createComponent();

      expect(findTokens()).toHaveLength(3);
    });

    it('renders icons for each selection', () => {
      createComponent();

      expect(findTokensIcons()).toHaveLength(3);
    });

    it('renders popovers for each selection', () => {
      createComponent();

      expect(findPopovers()).toHaveLength(3);
    });
  });

  describe('collapsable behavior', () => {
    it('renders collapse indicator when collapsed', () => {
      createComponent({ defaultCollapsed: true });

      expect(findCollapseIcon().props('name')).toEqual('chevron-right');
    });

    it('renders expanded indicator when expanded', () => {
      createComponent({ defaultCollapsed: false });

      expect(findCollapseIcon().props('name')).toEqual('chevron-down');
    });

    it('toggles collapse state when title is clicked and collapsable is true', async () => {
      createComponent({ defaultCollapsed: true });

      await findTitle().trigger('click');

      expect(findTokensWrapper().isVisible()).toBe(true);

      await findTitle().trigger('click');

      expect(findTokensWrapper().isVisible()).toBe(false);
    });

    it('does not toggle collapse state when title is clicked and collapsable is false', async () => {
      createComponent({ collapsable: false });

      await findTitle().trigger('click');

      expect(findTokensWrapper().isVisible()).toBe(true);
    });
  });

  describe('icon rendering', () => {
    it('renders the correct icon for file type', () => {
      createComponent({ selections: [MOCK_CONTEXT_ITEM_FILE] });

      expect(findTokensIcons().at(0).props('name')).toBe('document');
    });

    it('renders the correct icon for issue type', () => {
      createComponent({ selections: [MOCK_CONTEXT_ITEM_ISSUE] });

      expect(findTokensIcons().at(0).props('name')).toBe('issues');
    });

    it('renders the correct icon for merge request type', () => {
      createComponent({ selections: [MOCK_CONTEXT_ITEM_MERGE_REQUEST] });

      expect(findTokensIcons().at(0).props('name')).toBe('merge-request');
    });

    it('renders the correct icon for git diff type', () => {
      createComponent({ selections: [MOCK_CONTEXT_ITEM_GIT_DIFF] });

      expect(findTokensIcons().at(0).props('name')).toBe('comparison');
    });

    it('renders the correct icon for git commit type', () => {
      createComponent({ selections: [MOCK_CONTEXT_ITEM_GIT_COMMIT] });

      expect(findTokensIcons().at(0).props('name')).toBe('commit');
    });

    it('does not render an icon for unknown types', () => {
      const unknownItem = { ...MOCK_CONTEXT_ITEM_FILE, category: 'unknown' };
      createComponent({ selections: [unknownItem] });

      expect(findTokensIcons()).toHaveLength(0);
    });
  });

  describe('popover rendering', () => {
    it('passes correct props to the popover component', () => {
      createComponent();

      const index = 0;
      const contextItem = mockSelections.at(index);
      const popover = findPopovers().at(index);

      expect(popover.props('contextItem')).toEqual(contextItem);
      expect(popover.props('target')).toMatch(
        /^context-item-123e4567-e89b-12d3-a456-426614174000-\d+-token$/
      );
      expect(popover.props('placement')).toBe('bottom');
    });
  });

  describe('removable items', () => {
    describe('when items cannot be removed', () => {
      beforeEach(() => createComponent({ removable: false }));

      it('renders view-only tokens', () => {
        findTokens().wrappers.forEach((token) => {
          expect(token.props('viewOnly')).toBe(true);
        });
      });
    });

    describe('when items can be removed', () => {
      beforeEach(() => createComponent({ removable: true }));

      it('renders removable tokens', () => {
        findTokens().wrappers.forEach((token) => {
          expect(token.props('viewOnly')).toBe(false);
        });
      });

      it('emits remove event when token is closed', async () => {
        await findTokens().at(0).vm.$emit('close');
        expect(wrapper.emitted('remove')).toHaveLength(1);
        expect(wrapper.emitted('remove')[0]).toEqual([MOCK_CONTEXT_ITEM_FILE]);
      });
    });

    describe('when opening context items', () => {
      describe.each([{ item: MOCK_CONTEXT_ITEM_FILE }, { item: MOCK_CONTEXT_ITEM_GIT_DIFF }])(
        'and the item is a "$item.category"',
        ({ item }) => {
          beforeEach(() => createComponent({ selections: [item] }, mount));

          describe.each(['click', 'keydown.enter', 'keydown.space'])(
            'when opening by "$eventType"',
            (eventType) => {
              beforeEach(() => findTokens().at(0).trigger(eventType));

              it('should display the details view', () => {
                expect(findItemDetailsModal().props('contextItem')).toEqual(item);
              });

              it('should emit a "get-content" event to hydrate the item', () => {
                expect(wrapper.emitted('get-content')).toHaveLength(1);
                expect(wrapper.emitted('get-content').at(0)).toEqual([item]);
              });

              it('should close the details view when modal emits "close" event', async () => {
                findItemDetailsModal().vm.$emit('close');
                await nextTick();

                expect(findItemDetailsModal().exists()).toBe(false);
              });
            }
          );
        }
      );

      describe.each([{ item: MOCK_CONTEXT_ITEM_MERGE_REQUEST }, { item: MOCK_CONTEXT_ITEM_ISSUE }])(
        'and the item is a "$item.category"',
        ({ item }) => {
          beforeEach(() => {
            createComponent({ selections: [item] });
            return findTokens().at(0).vm.$emit('click');
          });

          it('should not display any details view', () => {
            expect(findItemDetailsModal().exists()).toBe(false);
          });

          it('should not emit any "get-content" event', () => {
            expect(wrapper.emitted('get-content')).toBe(undefined);
          });
        }
      );
    });
  });
});
