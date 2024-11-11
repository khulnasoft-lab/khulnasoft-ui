/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */
import { shallowMount } from '@vue/test-utils';
import GlIcon from '../../../../../../base/icon/icon.vue';
import GlPopover from '../../../../../../base/popover/popover.vue';
import GlTruncate from '../../../../../../utilities/truncate/truncate.vue';
import {
  MOCK_CONTEXT_ITEM_FILE,
  MOCK_CONTEXT_ITEM_FILE_DISABLED,
  MOCK_CONTEXT_ITEM_GIT_COMMIT,
  MOCK_CONTEXT_ITEM_GIT_DIFF,
  MOCK_CONTEXT_ITEM_ISSUE,
  MOCK_CONTEXT_ITEM_ISSUE_DISABLED,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
} from '../mock_context_data';
import GlDuoChatContextItemPopover from './duo_chat_context_item_popover.vue';

describe('GlDuoChatContextItemPopover', () => {
  let wrapper;

  const createComponent = (props = {}, options = {}) => {
    wrapper = shallowMount(GlDuoChatContextItemPopover, {
      propsData: {
        contextItem: MOCK_CONTEXT_ITEM_FILE,
        target: 'test-target',
        placement: 'top',
        ...props,
      },
      stubs: {
        GlTruncate,
      },
      ...options,
    });
  };

  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);
  const findPopover = () => wrapper.findComponent(GlPopover);
  const findPopoverTitle = () => findByTestId('chat-context-popover-title');
  const findDisabledMessage = () => findByTestId('chat-context-popover-disabled');
  const findIcon = () => wrapper.findComponent(GlIcon);

  it('renders the popover component', () => {
    createComponent();

    expect(findPopover().exists()).toBe(true);
  });

  it('passes the correct props to the popover', () => {
    createComponent();

    const popover = findPopover();

    expect(popover.attributes('target')).toBe('test-target');
    expect(popover.props('triggers')).toBe('hover focus');
    expect(popover.props('placement')).toBe('top');
    expect(popover.props('title')).toBe(MOCK_CONTEXT_ITEM_FILE.metadata.title);
  });

  describe.each([
    { contextItem: MOCK_CONTEXT_ITEM_FILE },
    { contextItem: MOCK_CONTEXT_ITEM_ISSUE },
    { contextItem: MOCK_CONTEXT_ITEM_MERGE_REQUEST },
    { contextItem: MOCK_CONTEXT_ITEM_GIT_COMMIT },
    { contextItem: MOCK_CONTEXT_ITEM_GIT_DIFF },
  ])('$contextItem.category', ({ contextItem }) => {
    it('renders the item name in the title slot', () => {
      createComponent(
        {
          contextItem,
        },
        {
          stubs: {
            GlTruncate,
            GlPopover: {
              name: 'GlPopover',
              template: '<div><slot name="title"></slot></div>',
            },
          },
        }
      );

      expect(findPopoverTitle().text()).toBe(contextItem.metadata.title);
    });

    it('renders the icon', () => {
      createComponent({ contextItem });

      expect(findIcon().props('name')).toBe(contextItem.metadata.icon);
    });

    it('renders the secondary text', () => {
      createComponent({ contextItem });

      const content = findPopover().text();
      expect(content).toContain(contextItem.metadata.secondaryText);
    });
  });

  describe('disabled items', () => {
    it('renders disabled message', () => {
      createComponent({ contextItem: MOCK_CONTEXT_ITEM_ISSUE_DISABLED });

      expect(findDisabledMessage().text()).toContain(
        'This foo is not available to bar, Lorem something something wow?'
      );
    });

    it('renders default disabled message when no specific reasons are provided', () => {
      const itemWithoutReasons = {
        ...MOCK_CONTEXT_ITEM_FILE_DISABLED,
        metadata: { ...MOCK_CONTEXT_ITEM_FILE_DISABLED.metadata, disabledReasons: undefined },
      };
      createComponent({ contextItem: itemWithoutReasons });

      expect(findDisabledMessage().text()).toContain('This item is disabled');
    });
  });
});
