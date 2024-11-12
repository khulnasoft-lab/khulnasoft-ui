/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

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
