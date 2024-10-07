import GlButton from '../../../base/button/button.vue';
import GlAlert from '../../../base/alert/alert.vue';
import { makeContainer } from '../../../../utils/story_decorators/container';
import { setStoryTimeout } from '../../../../utils/test_utils';
import GlDuoChatContextItemMenu from './components/duo_chat_context/duo_chat_context_item_menu/duo_chat_context_item_menu.vue';
import {
  getMockContextItems,
  MOCK_CATEGORIES,
} from './components/duo_chat_context/mock_context_data';
import GlDuoChat from './duo_chat.vue';
import readme from './duo_chat.md';
import { CHAT_CLEAN_MESSAGE, CHAT_CLEAR_MESSAGE } from './constants';
import {
  MOCK_RESPONSE_MESSAGE,
  MOCK_USER_PROMPT_MESSAGE,
  SLASH_COMMANDS as slashCommands,
  INCLUDE_SLASH_COMMAND,
  generateMockResponseChunks,
  renderGFM,
} from './mock_data';

const sampleContextItems = getMockContextItems();

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
  emptyStateSecondaryDescription = defaultValue('emptyStateSecondaryDescription'),
  chatPromptPlaceholder = defaultValue('chatPromptPlaceholder'),
  enableCodeInsertion = defaultValue('enableCodeInsertion'),
  threads = [
    {
      id: '1',
      title: 'First Conversation',
      description: 'A conversation about GitLab features',
      modifiedAt: '2024-02-14T12:00:00Z',
      createdAt: '2024-02-14T12:00:00Z',
      tokens: 1000,
      messages: [
        { role: 'user', content: 'What are the key features of GitLab?' },
        { role: 'assistant', content: 'GitLab offers a complete DevOps platform...' },
      ],
    },
    {
      id: '2',
      title: 'CI/CD Pipeline Help',
      description: 'Troubleshooting CI/CD pipelines',
      modifiedAt: '2024-02-14T12:00:00Z',
      createdAt: '2024-02-14T12:00:00Z',
      tokens: 1000,
      messages: [
        { role: 'assistant', content: 'Hello, how can I help you today?' },
        { role: 'user', content: 'How do I debug a failing CI/CD pipeline?' },
        { role: 'assistant', content: 'To debug a failing CI/CD pipeline, you can start by...' },
      ],
    },
    {
      id: '3',
      title: 'Merge Request Best Practices',
      description: 'Discussion about MR workflows',
      modifiedAt: '2024-02-14T12:00:00Z',
      createdAt: '2024-02-14T12:00:00Z',
      tokens: 1000,
      messages: [
        { role: 'user', content: 'What are some best practices for managing merge requests?' },
        { role: 'assistant', content: 'When it comes to managing merge requests effectively...' },
      ],
    },
  ],
  tools = [
    {
      name: 'Code Analyzer',
      enabled: true,
      description: 'Analyzes code for potential issues and improvements',
    },
    {
      name: 'Language Translator',
      enabled: false,
      description: 'Translates text between different languages',
    },
    {
      name: 'Data Visualizer',
      enabled: true,
      description: 'Creates visual representations of data sets',
    },
  ],
  customTools = [
    { name: 'Custom Tool 1', enabled: true, description: 'Description for Custom Tool 1', path: 'path/to/custom/tool/1', custom: true },
    { name: 'Custom Tool 2', enabled: false, description: 'Description for Custom Tool 2', path: 'path/to/custom/tool/2', custom: true },
  ],

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
  slashCommands: [...slashCommands, INCLUDE_SLASH_COMMAND],
  showHeader,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateSecondaryDescription,
  chatPromptPlaceholder,
  enableCodeInsertion,
  threads,
  tools,
  customTools,
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
      :empty-state-secondary-description="emptyStateSecondaryDescription"
      :chat-prompt-placeholder="chatPromptPlaceholder"
      :enable-code-insertion="enableCodeInsertion"
      :threads="threads"
    />`,
});
Default.args = generateProps({
  messages: [MOCK_USER_PROMPT_MESSAGE, MOCK_RESPONSE_MESSAGE],
});
Default.decorators = [makeContainer({ height: '800px' })];

export const Interactive = (args, { argTypes }) => ({
  components: { GlDuoChat, GlDuoChatContextItemMenu, GlButton },
  props: Object.keys(argTypes),
  provide: {
    renderGFM,
  },
  data() {
    return {
      isHidden: false,
      loggerInfo: '',
      promptInFlight: false,
      chunks: [],
      timeout: null,
      requestId: 1,
      canceledMessageRequestIds: [],
      contextItems: [],
      contextItemsLoading: false,
      contextItemsError: null,
      contextItemsResults: [],
      drawerOpen: false, // Add this line to track drawer state
      msgs: [], // Initialize msgs as an empty array
      currentLoadingMessage: '',
      loadingMessageIndex: 0,
      loadingMessages: [
        '%{tool} is analyzing the request...',
        '%{tool} is searching for relevant information...',
        '%{tool} is formulating a response...',
      ],
      currentThread: null,
    };
  },
  MOCK_CONTEXT_ITEM_CATEGORIES: MOCK_CATEGORIES,
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
      this.simulateLoadingMessages();
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
    onInsertCodeSnippet(codeSnippet) {
      // eslint-disable-next-line no-alert
      alert(`Code snippet inserted: ${codeSnippet}\n\n`);
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
    handleContextItemsSearch({ category, query }) {
      this.contextItemsLoading = true;
      this.contextItemsError = null;
      setStoryTimeout(() => {
        this.contextItemsLoading = false;
        this.contextItemsResults = sampleContextItems
          .filter((item) => item.category === category)
          .filter(
            (item) => !query || item.metadata.title.toLowerCase().includes(query.toLowerCase())
          )
          .filter((item) => !this.contextItems.some((contextItem) => contextItem.id === item.id));
      }, 300);
    },
    handleContextItemSelect(item) {
      if (!this.contextItems.some((i) => i.id === item.id)) {
        this.contextItems.push(item);
      }
    },
    handleContextItemRemove(item) {
      const index = this.contextItems.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        this.contextItems.splice(index, 1);
      }
    },
    onDrawerOpen() {
      this.drawerOpen = true;
      this.loggerInfo += `Drawer opened\n\n`;
    },
    onDrawerClose() {
      this.drawerOpen = false;
      this.loggerInfo += `Drawer closed\n\n`;
    },
    onThreadSelected(threadId) {
      const selectedThread = this.threads[Number(threadId) - 1];
      this.currentThread = selectedThread;
      console.log('selectedThread', selectedThread);
      if (selectedThread && Array.isArray(selectedThread.messages)) {
        this.msgs = [...selectedThread.messages]; // Create a new array to trigger reactivity
      } else {
        console.warn(`Thread with id ${threadId} not found or has no messages`);
        this.msgs = []; // Reset to empty array if thread or messages are not found
      }
      this.loggerInfo += `Thread selected: ${threadId}\n\n`;
    },
    // Add this method to initialize messages when the component is created
    initializeMessages() {
      const firstThreadId = Object.keys(this.threads)[0];
      if (firstThreadId) {
        this.onThreadSelected(firstThreadId);
      }
    },
    simulateLoadingMessages() {
      this.loadingMessageIndex = 0;
      this.updateLoadingMessage();

      const interval = setInterval(() => {
        this.loadingMessageIndex = (this.loadingMessageIndex + 1) % this.loadingMessages.length;
        this.updateLoadingMessage();

        if (this.loadingMessageIndex === 0) {
          clearInterval(interval);
        }
      }, 2000);
    },
    updateLoadingMessage() {
      this.currentLoadingMessage = this.loadingMessages[this.loadingMessageIndex];
    },
    onNewChat() {
      this.drawerOpen = false;
      this.msgs = [];
    },
    onToolUpdated(tool) {
      console.log('tool', tool);
      const isCustomTool = tool.custom;
      if (isCustomTool) {
        this.customTools = this.customTools.map((t) => {
          if (t.name === tool.name) {
            return { ...t, enabled: tool.enabled };
          }
          return t;
        });
      } else {
        this.tools = this.tools.map((t) => {
          if (t.name === tool.name) {
            return { ...t, enabled: tool.enabled };
          }
          return t;
        });
      }
    },
    onAddCustomTool(tool) {
      console.log('add custom tool', tool);
      this.customTools.push(tool);
    },
  },
  created() {
    this.initializeMessages();
  },
  computed: {
    getActiveThread() {
      return this.threads.find((thread) => thread.id === this.currentThread?.id) ?? null;
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
      :empty-state-secondary-description="emptyStateSecondaryDescription"
      :chat-prompt-placeholder="chatPromptPlaceholder"
      :slash-commands="slashCommands"
      :threads="threads"
      :loading-message="currentLoadingMessage"
      :active-thread="getActiveThread"
      :tools="tools"
      :custom-tools="customTools"
      class="gl-drawer-default"
      @send-chat-prompt="onSendChatPrompt"
      @chat-hidden="onChatHidden"
      @chat-cancel="onChatCancel"
      @insert-code-snippet="onInsertCodeSnippet"
      @drawer-open="onDrawerOpen"
      @drawer-close="onDrawerClose"
      @thread-selected="onThreadSelected"
      @new-chat="onNewChat"
      @tool-updated="onToolUpdated"
      @add-custom-tool="onAddCustomTool"
    >
      <template #context-items-menu="{ isOpen, onClose, setRef, focusPrompt }">
        <gl-duo-chat-context-item-menu
          :ref="setRef"
          :open="isOpen"
          :selections="contextItems"
          :categories="$options.MOCK_CONTEXT_ITEM_CATEGORIES"
          :loading="contextItemsLoading"
          :error="contextItemsError"
          :results="contextItemsResults"
          @search="handleContextItemsSearch"
          @select="handleContextItemSelect"
          @remove="handleContextItemRemove"
          @close="onClose"
          @focus-prompt="focusPrompt"
        />
      </template>
    </gl-duo-chat>
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
        :empty-state-secondary-description="emptyStateSecondaryDescription"
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