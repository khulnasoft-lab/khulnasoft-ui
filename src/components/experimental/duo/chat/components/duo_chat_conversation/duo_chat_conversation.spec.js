import { shallowMount } from '@vue/test-utils';
import { MOCK_USER_PROMPT_MESSAGE, MOCK_RESPONSE_MESSAGE } from '../../mock_data';
import GlDuoChatMessage from '../duo_chat_message/duo_chat_message.vue';
import GlDuoChatConversation from './duo_chat_conversation.vue';

describe('GlDuoChatConversation', () => {
  let wrapper;

  const findChatMessages = () => wrapper.findAllComponents(GlDuoChatMessage);
  const findDelimiter = () => wrapper.find('[data-testid="conversation-delimiter"]');
  const createComponent = ({ propsData = { canceledRequestIds: [] } } = {}) => {
    wrapper = shallowMount(GlDuoChatConversation, {
      propsData,
    });
  };

  describe('rendering', () => {
    const messages = [MOCK_USER_PROMPT_MESSAGE, MOCK_RESPONSE_MESSAGE];

    describe('default state', () => {
      beforeEach(() => {
        createComponent();
      });

      it('does not render messages by default', () => {
        expect(findChatMessages().length).toBe(0);
      });

      it('does render the delimiter', () => {
        expect(findDelimiter().exists()).toBe(true);
      });
    });

    it('renders messages when messages are passed', () => {
      createComponent({
        propsData: { messages, canceledRequestIds: [] },
      });
      expect(findChatMessages().length).toBe(2);
    });

    it('does not render delimiter when showDelimiter = false', () => {
      createComponent({ propsData: { messages, showDelimiter: false, canceledRequestIds: [] } });
      expect(findDelimiter().exists()).toBe(false);
    });

    it('passes correct boolean to message when request is canceled', () => {
      const canceledRequestIds = [MOCK_USER_PROMPT_MESSAGE.requestId];

      createComponent({
        propsData: { messages, canceledRequestIds },
      });

      const chatMessages = findChatMessages();
      expect(chatMessages.at(0).props('isCancelled')).toBe(true);
    });

    it('passes correct boolean to message when request is not canceled', () => {
      const canceledRequestIds = [];

      createComponent({
        propsData: { messages, canceledRequestIds },
      });

      const chatMessages = findChatMessages();
      expect(chatMessages.at(0).props('isCancelled')).toBe(false);
    });
  });
});
