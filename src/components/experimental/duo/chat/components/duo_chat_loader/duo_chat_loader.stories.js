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
