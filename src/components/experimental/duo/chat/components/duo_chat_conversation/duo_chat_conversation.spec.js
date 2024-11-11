/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import { shallowMount } from '@vue/test-utils';
import { MOCK_USER_PROMPT_MESSAGE, MOCK_RESPONSE_MESSAGE } from '../../mock_data';
import { MOCK_CONTEXT_ITEM_FILE } from '../duo_chat_context/mock_context_data';
import GlDuoChatMessage from '../duo_chat_message/duo_chat_message.vue';
import GlDuoChatConversation from './duo_chat_conversation.vue';

describe('GlDuoChatConversation', () => {
  let wrapper;

  const findChatMessages = () => wrapper.findAllComponents(GlDuoChatMessage);
  const findDelimiter = () => wrapper.find('[data-testid="conversation-delimiter"]');
  const findInsertCodeHiddenClass = () => wrapper.find('.insert-code-hidden');

  const messages = [MOCK_USER_PROMPT_MESSAGE, MOCK_RESPONSE_MESSAGE];

  const defaultProps = {
    messages,
    canceledRequestIds: [],
    enableCodeInsertion: true,
  };

  const createComponent = (overrides) => {
    wrapper = shallowMount(GlDuoChatConversation, {
      propsData: { ...defaultProps, ...overrides },
    });
  };

  describe('rendering', () => {
    describe('default state', () => {
      it('does not render messages by default', () => {
        createComponent({ messages: [] });
        expect(findChatMessages().length).toBe(0);
      });

      it('does render the delimiter', () => {
        createComponent();
        expect(findDelimiter().exists()).toBe(true);
      });
    });

    it('does render insert-code-hidden class when enableCodeInsertion is true', () => {
      createComponent();
      expect(findInsertCodeHiddenClass().exists()).toBe(false);
    });

    it('does not render insert-code-hidden class when enableCodeInsertion is false', () => {
      createComponent({
        enableCodeInsertion: false,
      });
      expect(findInsertCodeHiddenClass().exists()).toBe(true);
    });

    it('renders messages when messages are passed', () => {
      createComponent();
      expect(findChatMessages().length).toBe(2);
    });

    it('does not render delimiter when showDelimiter = false', () => {
      createComponent({
        showDelimiter: false,
      });
      expect(findDelimiter().exists()).toBe(false);
    });

    it('passes correct boolean to message when request is canceled', () => {
      const canceledRequestIds = [MOCK_USER_PROMPT_MESSAGE.requestId];

      createComponent({
        canceledRequestIds,
      });

      const chatMessages = findChatMessages();
      expect(chatMessages.at(0).props('isCancelled')).toBe(true);
    });

    it('passes correct boolean to message when request is not canceled', () => {
      createComponent();

      const chatMessages = findChatMessages();
      expect(chatMessages.at(0).props('isCancelled')).toBe(false);
    });

    it('emits "get-context-item-content" when a message requests hydrated context item', () => {
      const contextItem = MOCK_CONTEXT_ITEM_FILE;
      createComponent();
      const message = findChatMessages().at(0);
      message.vm.$emit('get-context-item-content', contextItem);

      expect(wrapper.emitted('get-context-item-content')).toHaveLength(1);
      expect(wrapper.emitted('get-context-item-content').at(0)).toEqual([contextItem]);
    });
  });
});
