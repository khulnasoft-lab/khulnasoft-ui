import {
  MOCK_RESPONSE_MESSAGE,
  MOCK_USER_PROMPT_MESSAGE,
  renderGFM,
  renderMarkdown,
} from '../../mock_data';
import GlDuoChatMessage from './duo_chat_message.vue';
import readme from './duo_chat_message.md';

const generateProps = ({ message = MOCK_RESPONSE_MESSAGE } = {}) => ({
  message,
});

const Template = (args, { argTypes }) => ({
  components: { GlDuoChatMessage },
  props: Object.keys(argTypes),
  provide: {
    renderMarkdown,
    renderGFM,
  },
  template: `
    <gl-duo-chat-message :message="message" />
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
