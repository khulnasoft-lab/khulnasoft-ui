/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import {
  MOCK_RESPONSE_MESSAGE,
  MOCK_USER_PROMPT_MESSAGE,
  renderGFM,
  renderMarkdown,
  generateSeparateChunks,
} from '../../mock_data';
import GlDuoChatMessage from './duo_chat_message.vue';
import readme from './duo_chat_message.md';

const generateProps = ({ message = MOCK_RESPONSE_MESSAGE } = {}) => ({
  message,
  onInsertCode: (event) => {
    // eslint-disable-next-line no-alert
    alert(`Insert code snippet triggered:\n${event.detail.code}`);
  },
  onGetContextItemContent: (event) => {
    // eslint-disable-next-line no-alert
    alert(`Get context item content triggered:\n${JSON.stringify(event.contextItem, null, 4)}`);
  },
});

const Template = (args, { argTypes }) => ({
  components: { GlDuoChatMessage },
  props: Object.keys(argTypes),
  provide: {
    renderMarkdown,
    renderGFM,
  },
  template: `
    <gl-duo-chat-message :message="message" :is-cancelled="false" @insert-code-snippet="onInsertCode" @get-context-item-content="onGetContextItemContent" />
  `,
});

export const User = Template.bind({});
User.args = generateProps({
  message: MOCK_USER_PROMPT_MESSAGE,
});

export const Response = Template.bind({});
Response.args = generateProps({
  message: MOCK_RESPONSE_MESSAGE,
});

export const ErrorResponse = Template.bind({});
ErrorResponse.args = generateProps({
  message: {
    ...MOCK_RESPONSE_MESSAGE,
    extras: {},
    errors: ['Error: Whatever you see is wrong'],
  },
});

export default {
  title: 'experimental/duo/chat/duo-chat-message',
  component: GlDuoChatMessage,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};

const [messageChunk] = generateSeparateChunks(1);
export const LoadingMessageResponse = Template.bind({});
LoadingMessageResponse.args = generateProps({
  message: messageChunk,
});
