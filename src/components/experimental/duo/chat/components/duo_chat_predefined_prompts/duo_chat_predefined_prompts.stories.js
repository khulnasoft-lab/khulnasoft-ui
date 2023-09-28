import GlDuoChatPredefinedPrompts from './duo_chat_predefined_prompts.vue';
import readme from './duo_chat_predefined_prompts.md';

const generateProps = ({ prompts = [] } = {}) => ({
  prompts,
});

const Template = (args, { argTypes }) => ({
  components: { GlDuoChatPredefinedPrompts },
  props: Object.keys(argTypes),
  template: `
    <gl-duo-chat-predefined-prompts :prompts="prompts" />
  `,
});

export const Default = Template.bind({});
Default.args = generateProps({
  prompts: [
    'How do I change my password in GitLab?',
    'How do I fork a project?',
    'How do I clone a repository?',
    'How do I create a template?',
  ],
});

export default {
  title: 'experimental/duo/chat/duo_chat_predefined_prompts',
  component: GlDuoChatPredefinedPrompts,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
