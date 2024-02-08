import GlButton from '../../../base/button/button.vue';
import GlAlert from '../../../base/alert/alert.vue';
import { setStoryTimeout } from '../../../../utils/test_utils';
import { makeContainer } from '../../../../utils/story_decorators/container';
import GlDuoChat from './duo_chat.vue';
import readme from './duo_chat.md';
import {
  MOCK_RESPONSE_MESSAGE,
  MOCK_USER_PROMPT_MESSAGE,
  generateMockResponseChunks,
  renderGFM,
  renderMarkdown,
} from './mock_data';

const slashCommands = [
  {
    name: '/reset',
    shouldSubmit: true,
    description: 'Reset conversation, ignore the previous messages.',
  },
  {
    name: '/tests',
    description: 'Write tests for the selected snippet.',
  },
  {
    name: '/refactor',
    description: 'Refactor the selected snippet.',
  },
  {
    name: '/explain',
    description: 'Explain the selected snippet.',
  },
];

const defaultValue = (prop) =>
  typeof GlDuoChat.props[prop].default === 'function'
    ? GlDuoChat.props[prop].default()
    : GlDuoChat.props[prop].default;

const generateProps = ({
  title = defaultValue('title'),
  messages = defaultValue('messages'),
  error = defaultValue('error'),
  isLoading = defaultValue('isLoading'),
  isChatAvailable = defaultValue('isChatAvailable'),
  predefinedPrompts = defaultValue('predefinedPrompts'),
  badgeHelpPageUrl = defaultValue('badgeHelpPageUrl'),
  badgeType = defaultValue('badgeType'),
  toolName = defaultValue('toolName'),
  showHeader = defaultValue('showHeader'),
  emptyStateTitle = defaultValue('emptyStateTitle'),
  emptyStateDescription = defaultValue('emptyStateDescription'),
  chatPromptPlaceholder = defaultValue('chatPromptPlaceholder'),
} = {}) => ({
  title,
  messages,
  error,
  isLoading,
  isChatAvailable,
  predefinedPrompts,
  badgeHelpPageUrl,
  badgeType,
  toolName,
  slashCommands,
  showHeader,
  emptyStateTitle,
  emptyStateDescription,
  chatPromptPlaceholder,
});

export const Default = (args, { argTypes }) => ({
  components: { GlDuoChat },
  props: Object.keys(argTypes),
  provide: {
    renderMarkdown,
    renderGFM,
  },
  template: `
    <gl-duo-chat
      :title="title"
      :messages="messages"
      :error="error"
      :is-loading="isLoading"
      :is-chat-available="isChatAvailable"
      :predefined-prompts="predefinedPrompts"
      :badge-help-page-url="badgeHelpPageUrl"
      :badge-type="badgeType"
      :tool-name="toolName"
      :show-header="showHeader"
      :empty-state-title="emptyStateTitle"
      :empty-state-description="emptyStateDescription"
      :chat-prompt-placeholder="chatPromptPlaceholder"
    />`,
});
Default.args = generateProps({
  messages: [MOCK_USER_PROMPT_MESSAGE, MOCK_RESPONSE_MESSAGE],
});
Default.decorators = [makeContainer({ height: '800px' })];

export const Interactive = (args, { argTypes }) => ({
  components: { GlDuoChat, GlButton },
  props: Object.keys(argTypes),
  provide: {
    renderMarkdown,
    renderGFM,
  },
  data() {
    return {
      isHidden: false,
      loggerInfo: '',
      promptInFlight: false,
      msgs: args.messages,
      chunks: [],
      timeout: null,
      requestId: 1,
    };
  },
  methods: {
    onSendChatPrompt(prompt) {
      const newPrompt = {
        ...MOCK_USER_PROMPT_MESSAGE,
        contentHtml: '',
        content: prompt,
        requestId: this.requestId,
      };
      this.loggerInfo += `New prompt: ${JSON.stringify(newPrompt)}\n\n`;
      this.msgs.push(newPrompt);
      this.promptInFlight = true;
    },
    onChatHidden() {
      this.isHidden = true;
      this.loggerInfo += `Chat closed\n\n`;
    },
    showChat() {
      this.isHidden = false;
      this.loggerInfo += `Chat opened\n\n`;
    },
    onResponseRequested() {
      this.timeout = null;
      this.chunks = generateMockResponseChunks(this.requestId);
      this.mockResponseFromAi();
      this.requestId += 1;
    },
    mockResponseFromAi() {
      this.promptInFlight = false;
      if (this.chunks.length) {
        const newResponse = this.chunks.shift();
        const existingMessageIndex = this.msgs.findIndex(
          (msg) => msg.requestId === newResponse.requestId && msg.role === newResponse.role
        );
        const existingMessage = this.msgs[existingMessageIndex];
        if (existingMessage) {
          this.msgs.splice(existingMessageIndex, 1, {
            ...existingMessage,
            content: existingMessage.content + newResponse.content,
          });
        } else {
          this.msgs.push(newResponse);
        }
        this.logerInfo += `New response: ${JSON.stringify(newResponse)}\n\n`;
        this.timeout = setStoryTimeout(() => {
          this.mockResponseFromAi();
        }, Math.floor(Math.random() * 251) + 50);
      }
    },
  },
  template: `
  <div style="height: 800px">
    <div id="logger" class="gl-w-half">
      <pre class="gl-font-sm" style="text-wrap: wrap">
<code>{{ loggerInfo }}</code>
      </pre>
      <gl-button v-if="promptInFlight" @click="onResponseRequested">Mock the response</gl-button>
    </div>
    <gl-button v-if="isHidden" @click="showChat">Show chat</gl-button>
    <gl-duo-chat
      v-if="!isHidden"
      :title="title"
      :messages="msgs"
      :error="error"
      :is-loading="promptInFlight"
      :is-chat-available="isChatAvailable"
      :predefined-prompts="predefinedPrompts"
      :badge-help-page-url="badgeHelpPageUrl"
      :badge-type="badgeType"
      :tool-name="toolName"
      :show-header="showHeader"
      :empty-state-title="emptyStateTitle"
      :empty-state-description="emptyStateDescription"
      :chat-prompt-placeholder="chatPromptPlaceholder"
      @send-chat-prompt="onSendChatPrompt"
      @chat-hidden="onChatHidden"
    />
  </div>`,
});
Interactive.args = generateProps({});

export const Slots = (args, { argTypes }) => ({
  components: { GlDuoChat, GlAlert },
  props: Object.keys(argTypes),
  provide: {
    renderMarkdown,
    renderGFM,
  },
  template: `
    <div>
      <gl-duo-chat
        :title="title"
        :messages="messages"
        :error="error"
        :is-loading="isLoading"
        :is-chat-available="isChatAvailable"
        :predefined-prompts="predefinedPrompts"
        :badge-help-page-url="badgeHelpPageUrl"
        :badge-type="badgeType"
        :tool-name="toolName"
        :show-header="showHeader"
        :empty-state-title="emptyStateTitle"
        :empty-state-description="emptyStateDescription"
        :chat-prompt-placeholder="chatPromptPlaceholder">
        <template #subheader>
          <gl-alert
            :dismissible="false"
            variant="warning"
            class="gl-font-sm gl-border-t"
            role="alert"
            data-testid="chat-legal-warning-gitlab-usage"
            primary-button-link="https://internal-handbook.gitlab.io/handbook/product/ai-strategy/ai-integration-effort/legal_restrictions/"
            primary-button-text="Read more"
          >
            <p>
              You are not allowed to copy any part of this output into issues, comments, GitLab source code, commit messages, merge requests or any other user interface in the <code>/gitlab-org</code> or <code>/gitlab-com</code> groups.
            </p>
          </gl-alert>
        </template>
      </gl-duo-chat>
    </div>
    `,
});
Slots.decorators = [makeContainer({ height: '800px' })];

export default {
  title: 'experimental/duo/chat/duo-chat',
  component: GlDuoChat,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
