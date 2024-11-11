/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import GlDuoChatLoader from './duo_chat_loader.vue';
import readme from './duo_chat_loader.md';

const defaultValue = (prop) => GlDuoChatLoader.props[prop].default;

const generateProps = ({ toolName = defaultValue('toolName') } = {}) => ({
  toolName,
});

const Template = (args, { argTypes }) => ({
  components: { GlDuoChatLoader },
  props: Object.keys(argTypes),
  template: `
    <gl-duo-chat-loader :tool-name="toolName" />
  `,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'experimental/duo/chat/duo_chat_loader',
  component: GlDuoChatLoader,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
