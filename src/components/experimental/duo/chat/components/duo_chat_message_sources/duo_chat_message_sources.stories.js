import { MOCK_RESPONSE_MESSAGE } from '../../mock_data';
import GlDuoChatMessageSources from './duo_chat_message_sources.vue';
import readme from './duo_chat_message_sources.md';

const generateProps = ({ sources = [] } = {}) => ({
  sources,
});

const Template = (args, { argTypes }) => ({
  components: { GlDuoChatMessageSources },
  props: Object.keys(argTypes),
  template: `
    <gl-duo-chat-message-sources :sources="sources" />
  `,
});

export const Default = Template.bind({});
Default.args = generateProps({
  sources: MOCK_RESPONSE_MESSAGE.extras.sources,
});

export default {
  title: 'experimental/duo/chat/duo_chat_message_sources',
  component: GlDuoChatMessageSources,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
