import { shallowMount } from '@vue/test-utils';
import { MOCK_USER_PROMPT_MESSAGE, MOCK_RESPONSE_MESSAGE } from '../../mock_data';
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
  });
});
