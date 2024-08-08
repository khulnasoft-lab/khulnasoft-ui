import GlButton from '../../../base/button/button.vue';
import GlAlert from '../../../base/alert/alert.vue';
import { makeContainer } from '../../../../utils/story_decorators/container';
import { select } from '../../../../vendor/bootstrap-vue/src/utils/dom';
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

let selectedIncludesCopy = []

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
      selectedIncludes: [],
    };
  },
  methods: {
    onSendChatPrompt(prompt) {
      selectedIncludesCopy =  [...this.selectedIncludes]
      const newPrompt = {
        ...MOCK_USER_PROMPT_MESSAGE,
        contentHtml: '',
        content: prompt,
        requestId: this.requestId,
        extras: { selectedIncludes: selectedIncludesCopy },
      };
      this.loggerInfo += `New prompt: ${JSON.stringify(newPrompt)}\n\n`;
      if ([CHAT_CLEAN_MESSAGE, CHAT_CLEAR_MESSAGE].includes(prompt)) {
        this.msgs = [];
      } else {
        this.msgs.push(newPrompt);
        this.promptInFlight = true;
      }
      this.selectedIncludes = []; // Clear selected includes after sending
    },

    onAddSelectedItem(item) {
      console.log('added item', item);
      console.log(this.selectedIncludes, 'selectedIncludes');
      this.selectedIncludes = [...this.selectedIncludes, item];
      this.loggerInfo += `Added selected item: ${JSON.stringify(item)}\n\n`;
    },

    onRemoveSelectedItem(item) {
      this.selectedIncludes = this.selectedIncludes.filter((i) => i.id !== item.id);
      this.loggerInfo += `Removed selected item: ${JSON.stringify(item)}\n\n`;
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
        newResponse.extras.selectedIncludes = selectedIncludesCopy;
        console.log(newResponse)
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

    async handleMockSearch(category, query) {
      console.log('handling Search', category, query);

      const mockData = [
        {
          id: 'https://gitlab.com/gitlab-org/gitlab/issues/42',
          name: 'Bug in login form',
          isEnabled: true,
          info: { project: 'gitlab-org/gitlab', iid: 42 },
          type: 'issue',
        },
        {
          id: 'https://gitlab.com/gitlab-org/gitlab-runner/issues/43',
          name: 'Improve performance',
          isEnabled: true,
          info: { project: 'gitlab-org/gitlab-runner', iid: 43 },
          type: 'issue',
        },
        {
          id: 'https://gitlab.com/gitlab-org/charts/gitlab/issues/44',
          name: 'Update dependencies',
          isEnabled: false,
          info: {
            iid: 44,
            project: 'gitlab-org/charts/gitlab',
            disabledReason: 'Duo is not enabled for this project',
          },
          type: 'issue',
        },
        {
          id: 'https://gitlab.com/gitlab-org/gitlab/merge_requests/10',
          name: 'Add new feature',
          isEnabled: true,
          info: { project: 'gitlab-org/gitlab', iid: 10 },
          type: 'merge_request',
        },
        {
          id: 'https://gitlab.com/gitlab-org/gitlab-runner/merge_requests/11',
          name: 'Fix typo in README',
          isEnabled: true,
          info: {
            iid: 11,
            project: 'gitlab-org/gitlab-runner',
          },
          type: 'merge_request',
        },
        {
          id: 'https://gitlab.com/gitlab-org/charts/gitlab/merge_requests/12',
          name: 'Refactor authentication',
          isEnabled: false,
          info: {
            project: 'gitlab-org/charts/gitlab',
            disabledReason: 'Duo is not enabled for this project',
            iid: 12,
          },
          type: 'merge_request',
        },
        {
          id: 'file:///Users/gitlab/gitlab/app/src/index.js',
          name: 'index.js',
          isEnabled: true,
          info: { project: 'gitlab-org/gitlab', relFilePath: '/src/index.js' },
          type: 'file',
        },
        {
          id: 'file:///Users/gitlab/gitlab-runner/app/src/app.vue',
          name: 'app.vue',
          isEnabled: true,
          info: { project: 'gitlab-org/gitlab-runner', relFilePath: '/src/app.vue' },
          type: 'file',
        },
        {
          id: 'file:///Users/gitlab/charts/gitlab/app/src/styles.css',
          name: 'styles.css',
          isEnabled: false,
          info: {
            project: 'gitlab-org/charts/gitlab',
            disabledReason: 'Duo is not enabled for this project',
            relFilePath: '/src/styles.css',
          },
          type: 'file',
        },
      ];

      const filteredResults = mockData.filter(
        (item) => item.type === category && item.name.toLowerCase().includes(query.toLowerCase())
      );
      this.loggerInfo += `Search results for ${category} - "${query}": ${JSON.stringify(filteredResults)}\n\n`;

      // Simulate an async operation
      await new Promise((resolve) => setTimeout(resolve, 100));

      return filteredResults;
    },
  },
  template: `
    <div style="height: 800px">
    <gl-button v-if="promptInFlight" @click="onResponseRequested">Mock the response</gl-button>
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
        :handle-search="handleMockSearch"
        :selected-array="selectedIncludes"
        class="gl-drawer-default"
        @send-chat-prompt="onSendChatPrompt"
        @chat-hidden="onChatHidden"
        @chat-cancel="onChatCancel"
        @add-selected-item="onAddSelectedItem"
        @remove-selected-item="onRemoveSelectedItem"
      />
    </div>
  `,
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
