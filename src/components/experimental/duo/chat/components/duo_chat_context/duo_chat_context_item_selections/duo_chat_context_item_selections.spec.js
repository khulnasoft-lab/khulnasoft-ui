import { shallowMount } from '@vue/test-utils';
import GlIcon from '../../../../../../base/icon/icon.vue';
import GlToken from '../../../../../../base/token/token.vue';
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';
import {
  getMockContextItems,
  MOCK_CONTEXT_ITEM_FILE,
  MOCK_CONTEXT_ITEM_ISSUE,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
} from '../mock_context_data';
import GlDuoChatContextItemSelections from './duo_chat_context_item_selections.vue';

describe('GlDuoChatContextItemSelections', () => {
  let wrapper;
  let mockSelections;

  const createComponent = (props = {}) => {
    mockSelections = getMockContextItems().slice(0, 3);
    wrapper = shallowMount(GlDuoChatContextItemSelections, {
      propsData: {
        selections: mockSelections,
        title: 'Test Title',
        defaultCollapsed: true,
        showClose: true,
        ...props,
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

    it('renders the default icon for unknown types', () => {
      const unknownItem = { ...MOCK_CONTEXT_ITEM_FILE, type: 'unknown' };
      createComponent({ selections: [unknownItem] });

      expect(findTokensIcons().at(0).props('name')).toBe('document');
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
  });
});
