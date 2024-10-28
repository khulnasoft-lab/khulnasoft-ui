<script>
import throttle from 'lodash/throttle';
import GlIcon from '../../../../../base/icon/icon.vue';
import GlLoadingIcon from '../../../../../base/loading_icon/loading_icon.vue';
import { GlTooltipDirective } from '../../../../../../directives/tooltip';
import GlDuoChatContextItemSelections from '../duo_chat_context/duo_chat_context_item_selections/duo_chat_context_item_selections.vue';
import GlDuoUserFeedback from '../../../user_feedback/user_feedback.vue';
import GlFormGroup from '../../../../../base/form/form_group/form_group.vue';
import GlFormTextarea from '../../../../../base/form/form_textarea/form_textarea.vue';
import { SafeHtmlDirective as SafeHtml } from '../../../../../../directives/safe_html/safe_html';
import { MESSAGE_MODEL_ROLES, SELECTED_CONTEXT_ITEMS_DEFAULT_COLLAPSED } from '../../constants';
import { sprintf, translate, translatePlural } from '../../../../../../utils/i18n';
import DocumentationSources from '../duo_chat_message_sources/duo_chat_message_sources.vue';
// eslint-disable-next-line no-restricted-imports
import { renderDuoChatMarkdownPreview } from '../../markdown_renderer';
import { CopyCodeElement } from './copy_code_element';
import { InsertCodeSnippetElement } from './insert_code_snippet_element';
import { concatUntilEmpty } from './utils';
import {
  DUO_CODE_SCRIM_BOTTOM_CLASS,
  DUO_CODE_SCRIM_OFFSET,
  DUO_CODE_SCRIM_TOP_CLASS,
} from './constants';

export const i18n = {
  MODAL: {
    TITLE: translate('GlDuoChatMessage.modalTitle', 'Give feedback on GitLab Duo Chat'),
    ALERT_TEXT: translate(
      'GlDuoChatMessage.modalAlertText',
      'GitLab team members cannot view your conversation. Please be as descriptive as possible.'
    ),
    DID_WHAT: translate('GlDuoChatMessage.modalDidWhat', 'What were you doing?'),
    INTERACTION: translate(
      'GlDuoChatMessage.modalInteraction',
      'The situation in which you interacted with GitLab Duo Chat.'
    ),
    IMPROVE_WHAT: translate(
      'GlDuoChatMessage.modalImproveWhat',
      'How could the response be improved?'
    ),
    BETTER_RESPONSE: translate(
      'GlDuoChatMessage.modalBetterResponse',
      'How the response might better meet your needs.'
    ),
    MESSAGE_ERROR: translate('GlDuoChatMessage.modalMessageError', 'Error sending the message'),
  },
};

export default {
  name: 'GlDuoChatMessage',
  i18n,
  safeHtmlConfigExtension: {
    ADD_TAGS: ['copy-code', 'insert-code-snippet'],
  },
  components: {
    DocumentationSources,
    GlDuoChatContextItemSelections,
    GlDuoUserFeedback,
    GlFormGroup,
    GlFormTextarea,
    GlIcon,
    GlLoadingIcon,
  },
  directives: {
    SafeHtml,
    GlTooltip: GlTooltipDirective,
  },
  provide() {
    return {
      modalTitle: i18n.MODAL.TITLE,
      modalAlertText: i18n.MODAL.ALERT_TEXT,
    };
  },
  inject: {
    // Note, we likely might move away from Provide/Inject for this
    // and only ship the versions that are currently in the default
    // See https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/3953#note_1762834219
    // for more context.
    renderGFM: {
      from: 'renderGFM',
      default: () => (element) => {
        element.classList.add('duo-chat-markdown', 'duo-chat-compact-markdown');
      },
    },
    renderMarkdown: {
      from: 'renderMarkdown',
      default: () => renderDuoChatMarkdownPreview,
    },
  },
  props: {
    /**
     * A message object
     */
    message: {
      type: Object,
      required: true,
    },
    isCancelled: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      didWhat: '',
      improveWhat: '',
      messageWatcher: null, // imperatively set up watcher on message
      messageChunks: [],
      selectedContextItemsDefaultCollapsed: SELECTED_CONTEXT_ITEMS_DEFAULT_COLLAPSED,
    };
  },
  computed: {
    isChunk() {
      return typeof this.message.chunkId === 'number';
    },
    isNotChunkOrCancelled() {
      return !this.isChunk || this.isCancelled;
    },
    isChunkAndNotCancelled() {
      return this.isChunk && !this.isCancelled;
    },
    isAssistantMessage() {
      return this.message.role.toLowerCase() === MESSAGE_MODEL_ROLES.assistant;
    },
    isUserMessage() {
      return this.message.role.toLowerCase() === MESSAGE_MODEL_ROLES.user;
    },
    sources() {
      return this.message.extras?.sources;
    },
    hasFeedback() {
      return this.message.extras?.hasFeedback;
    },
    defaultContent() {
      if (this.message.contentHtml) {
        return this.message.contentHtml;
      }

      return this.renderMarkdown(this.message.content);
    },
    messageContent() {
      if (this.isAssistantMessage && this.isChunk) {
        return this.renderMarkdown(concatUntilEmpty(this.messageChunks));
      }

      return this.defaultContent || this.renderMarkdown(concatUntilEmpty(this.message.chunks));
    },
    renderedError() {
      return this.renderMarkdown(this.message.errors?.join('; ') || '');
    },
    error() {
      return Boolean(this.message?.errors?.length) && this.message.errors.join('; ');
    },
    selectedContextItems() {
      return this.message.extras?.contextItems || [];
    },
    displaySelectedContextItems() {
      return Boolean(this.selectedContextItems.length);
    },
    selectedContextItemsTitle() {
      if (!this.displaySelectedContextItems) return '';

      const count = this.selectedContextItems.length;

      if (this.isUserMessage) {
        return translatePlural(
          'GlDuoChatMessage.SelectedContextItemsTitleUserMessage',
          'Included reference',
          'Included references'
        )(count);
      }

      return sprintf(
        translatePlural(
          'GlDuoChatMessage.SelectedContextItemsTitleAssistantMessage',
          'Used %{count} included reference',
          'Used %{count} included references'
        )(count),
        {
          count,
        }
      );
    },
  },
  beforeCreate() {
    if (!customElements.get('copy-code')) {
      customElements.define('copy-code', CopyCodeElement);
    }
    if (!customElements.get('insert-code-snippet')) {
      customElements.define('insert-code-snippet', InsertCodeSnippetElement);
    }
  },
  mounted() {
    if (this.isAssistantMessage) {
      // The watcher has to be created imperatively here
      // to give an opportunity to remove it after
      // the complete message has arrived
      this.messageWatcher = this.$watch('message', this.manageMessageUpdate);
    }
    this.setChunks();
    this.hydrateContentWithGFM();
  },
  updated() {
    this.hydrateContentWithGFM();
  },
  methods: {
    setChunks() {
      if (this.isChunk) {
        const { chunkId, content } = this.message;
        this.$set(this.messageChunks, chunkId - 1, content);
      } else {
        this.messageChunks = [];
      }
    },
    stopWatchingMessage() {
      if (this.messageWatcher) {
        this.messageWatcher(); // Stop watching the message prop
        this.messageWatcher = null; // Ensure the watcher can't be stopped multiple times
      }
    },
    hydrateContentWithGFM() {
      if (!this.isChunk && this.$refs.content) {
        this.$nextTick(this.renderGFM(this.$refs.content));
      }
      this.detectScrollableCodeBlocks();
    },
    logEvent(e) {
      this.$emit('track-feedback', {
        ...e,
        didWhat: this.didWhat,
        improveWhat: this.improveWhat,
        message: this.message,
      });
    },
    manageMessageUpdate() {
      this.setChunks();
      if (!this.isChunk) {
        this.stopWatchingMessage();
      }
    },
    onInsertCodeSnippet(e) {
      this.$emit('insert-code-snippet', e);
    },
    onGetContextItemContent(contextItem) {
      this.$emit('get-context-item-content', {
        messageId: this.message.id,
        contextItem,
      });
    },
    detectScrollableCodeBlocks() {
      const codeBlocks = document.querySelectorAll('.duo-chat-message pre');
      codeBlocks.forEach((e) => {
        if (e.scrollHeight > e.offsetHeight) {
          e.classList.add(DUO_CODE_SCRIM_BOTTOM_CLASS);
          e.addEventListener(
            'scroll',
            throttle(() => this.toggleScrolling(e), 200)
          );
        }
      });
    },
    toggleScrolling(e) {
      if (e.scrollHeight - e.scrollTop <= e.offsetHeight + DUO_CODE_SCRIM_OFFSET) {
        e.classList.remove(DUO_CODE_SCRIM_BOTTOM_CLASS);
      } else {
        e.classList.add(DUO_CODE_SCRIM_BOTTOM_CLASS);
      }
      if (e.scrollTop > DUO_CODE_SCRIM_OFFSET) {
        e.classList.add(DUO_CODE_SCRIM_TOP_CLASS);
      } else {
        e.classList.remove(DUO_CODE_SCRIM_TOP_CLASS);
      }
    },
  },
};
</script>
<template>
  <div
    class="duo-chat-message gl-mb-4 gl-rounded-lg gl-p-4 gl-leading-20 gl-break-anywhere"
    :class="{
      'gl-ml-auto gl-rounded-br-none gl-bg-blue-100 gl-text-blue-900': isUserMessage,
      'gl-rounded-bl-none gl-border-1 gl-border-solid gl-border-gray-50 gl-text-gray-900':
        isAssistantMessage,
      'gl-bg-white': isAssistantMessage && !error,
      'duo-chat-message-with-error !gl-border-none gl-bg-red-50': error,
    }"
    @insert-code-snippet="onInsertCodeSnippet"
  >
    <gl-icon
      v-if="error"
      :aria-label="$options.i18n.MESSAGE_ERROR"
      name="status_warning_borderless"
      :size="16"
      class="error-icon gl-border gl-mr-3 gl-shrink-0 gl-rounded-full gl-border-red-500 gl-text-red-600"
      data-testid="error"
    />
    <div ref="content-wrapper" :class="{ 'has-error': error }">
      <gl-duo-chat-context-item-selections
        v-if="displaySelectedContextItems && isAssistantMessage"
        :selections="selectedContextItems"
        :title="selectedContextItemsTitle"
        :default-collapsed="selectedContextItemsDefaultCollapsed"
        variant="assistant"
        @get-content="onGetContextItemContent"
      />
      <div
        v-if="error"
        ref="error-message"
        v-safe-html:[$options.safeHtmlConfigExtension]="renderedError"
      ></div>
      <div v-else>
        <div ref="content" v-safe-html:[$options.safeHtmlConfigExtension]="messageContent"></div>

        <template v-if="isAssistantMessage">
          <documentation-sources v-if="sources" :sources="sources" />

          <div class="duo-chat-message-feedback gl-mt-4 gl-flex gl-items-end">
            <gl-loading-icon v-if="isChunkAndNotCancelled" class="gl-pt-4" variant="dots" inline />
            <gl-duo-user-feedback
              v-if="isNotChunkOrCancelled"
              :feedback-received="hasFeedback"
              :modal-title="$options.i18n.MODAL.TITLE"
              :modal-alert="$options.i18n.MODAL.ALERT_TEXT"
              @feedback="logEvent"
            >
              <template #feedback-extra-fields>
                <gl-form-group :label="$options.i18n.MODAL.DID_WHAT" optional>
                  <gl-form-textarea
                    v-model="didWhat"
                    :placeholder="$options.i18n.MODAL.INTERACTION"
                  />
                </gl-form-group>
                <gl-form-group :label="$options.i18n.MODAL.IMPROVE_WHAT" optional>
                  <gl-form-textarea
                    v-model="improveWhat"
                    :placeholder="$options.i18n.MODAL.BETTER_RESPONSE"
                  />
                </gl-form-group>
              </template>
            </gl-duo-user-feedback>
          </div>
        </template>
      </div>
      <gl-duo-chat-context-item-selections
        v-if="displaySelectedContextItems && isUserMessage"
        :selections="selectedContextItems"
        :title="selectedContextItemsTitle"
        :default-collapsed="selectedContextItemsDefaultCollapsed"
        variant="user"
        @get-content="onGetContextItemContent"
      />
    </div>
  </div>
</template>
