/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import {
  MOCK_USER_PROMPT_MESSAGE,
  MOCK_RESPONSE_MESSAGE,
  renderGFM,
  renderMarkdown,
} from '../../mock_data';
import GlDuoChatConversation from './duo_chat_conversation.vue';
import readme from './duo_chat_conversation.md';

const defaultValue = (prop) => GlDuoChatConversation.props[prop].default;

const generateProps = ({ messages = [], showDelimiter = defaultValue('showDelimiter') } = {}) => ({
  messages,
  showDelimiter,
});

const Template = (args, { argTypes }) => ({
  components: { GlDuoChatConversation },
  props: Object.keys(argTypes),
  provide: {
    renderGFM,
    renderMarkdown,
  },
  template: `
    <gl-duo-chat-conversation :enableCodeInsertion="true" :canceledRequestIds=[] :messages="messages" :show-delimiter="showDelimiter" />
  `,
});

export const Default = Template.bind({});
Default.args = generateProps({
  messages: [MOCK_USER_PROMPT_MESSAGE, MOCK_RESPONSE_MESSAGE],
});

export const MultipleConversations = (args, { argTypes }) => ({
  components: { GlDuoChatConversation },
  props: Object.keys(argTypes),
  provide: {
    renderGFM,
    renderMarkdown,
  },
  template: `
    <div>
      <gl-duo-chat-conversation :enableCodeInsertion="true" :canceledRequestIds=[] :messages="messages" :show-delimiter="false" />
      <gl-duo-chat-conversation :enableCodeInsertion="true" :canceledRequestIds=[] :messages="messages" :show-delimiter="true" />
    </div>
  `,
});
MultipleConversations.args = generateProps({
  messages: [MOCK_USER_PROMPT_MESSAGE, MOCK_RESPONSE_MESSAGE],
});

export default {
  title: 'experimental/duo/chat/duo-chat-conversation',
  component: GlDuoChatConversation,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
