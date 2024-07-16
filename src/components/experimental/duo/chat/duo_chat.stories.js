import GlButton from '../../../base/button/button.vue';
import GlAlert from '../../../base/alert/alert.vue';
import { makeContainer } from '../../../../utils/story_decorators/container';
import GlDuoChat from './duo_chat.vue';
import readme from './duo_chat.md';
import { CHAT_CLEAN_MESSAGE, CHAT_CLEAR_MESSAGE } from './constants';
import {
  MOCK_RESPONSE_MESSAGE,
  MOCK_USER_PROMPT_MESSAGE,
  SLASH_COMMANDS as slashCommands,
  generateMockResponseChunks,
  renderGFM,
} from './mock_data';

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
  enableCodeInsertion = defaultValue('enableCodeInsertion'),
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
  enableCodeInsertion,
});

export const Default = (args, { argTypes }) => ({
  components: { GlDuoChat },
  props: Object.keys(argTypes),
  provide: {
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
      :enable-code-insertion="enableCodeInsertion"
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
      canceledMessageRequestIds: [],
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
      if ([CHAT_CLEAN_MESSAGE, CHAT_CLEAR_MESSAGE].includes(prompt)) {
        this.msgs = [];
      } else {
        this.msgs.push(newPrompt);
        this.promptInFlight = true;
      }
    },
    onChatHidden() {
      this.isHidden = true;
      this.loggerInfo += `Chat closed\n\n`;
    },
    onChatCancel() {
      this.canceledMessageRequestIds.push(this.requestId);
      this.requestId += 1;
      this.promptInFlight = false;
    },
    showChat() {
      this.isHidden = false;
      this.loggerInfo += `Chat opened\n\n`;
    },
    async onResponseRequested() {
      this.timeout = null;
      await this.mockResponseFromAi();
      this.requestId += 1;
    },
    async mockResponseFromAi() {
      const generator = generateMockResponseChunks(this.requestId);

      for await (const newResponse of generator) {
        if (!this.canceledMessageRequestIds.includes(newResponse.requestId)) {
          const existingMessageIndex = this.msgs.findIndex(
            (msg) => msg.requestId === newResponse.requestId && msg.role === newResponse.role
          );
          const existingMessage = this.msgs[existingMessageIndex];
          if (existingMessage) {
            this.updateExistingMessage(newResponse, existingMessageIndex);
          } else {
            this.addNewMessage(newResponse);
          }
        }
      }
    },
    addNewMessage(msg) {
      this.promptInFlight = false;
      this.$set(this.msgs, this.msgs.length, msg);
    },
    updateExistingMessage(newResponse, existingMessageIndex) {
      const existingMessage = this.msgs[existingMessageIndex];
      this.$set(this.msgs, existingMessageIndex, {
        ...existingMessage,
        ...newResponse,
      });
    },
  },
  template: `
  <div style="height: 800px">
    <div id="logger" class="gl-w-1/2">
      <pre class="gl-text-sm" style="text-wrap: wrap">
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
      :canceled-request-ids="canceledMessageRequestIds"
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
      :slash-commands="slashCommands"
      class="gl-drawer-default"
      @send-chat-prompt="onSendChatPrompt"
      @chat-hidden="onChatHidden"
      @chat-cancel="onChatCancel"
    />
  </div>`,
});
Interactive.args = generateProps({});

export const Slots = (args, { argTypes }) => ({
  components: { GlDuoChat, GlAlert },
  props: Object.keys(argTypes),
  provide: {
    renderMarkdown: (md) => `THIS IS ALTERED MARKDOWN: ${md}`,
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
            class="gl-border-t"
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
Slots.args = generateProps();
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
