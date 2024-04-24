<script>
import GlIcon from '../../../../../base/icon/icon.vue';
import { GlTooltipDirective } from '../../../../../../directives/tooltip';
import GlDuoUserFeedback from '../../../user_feedback/user_feedback.vue';
import GlFormGroup from '../../../../../base/form/form_group/form_group.vue';
import GlFormTextarea from '../../../../../base/form/form_textarea/form_textarea.vue';
import { SafeHtmlDirective as SafeHtml } from '../../../../../../directives/safe_html/safe_html';
import { MESSAGE_MODEL_ROLES } from '../../constants';
import DocumentationSources from '../duo_chat_message_sources/duo_chat_message_sources.vue';
// eslint-disable-next-line no-restricted-imports
import { renderDuoChatMarkdownPreview } from '../../markdown_renderer';
import { CopyCodeElement } from './copy_code_element';
import { concatUntilEmpty } from './utils';

export const i18n = {
  MODAL: {
    TITLE: 'Give feedback on GitLab Duo Chat',
    ALERT_TEXT:
      'GitLab team members cannot view your conversation. Please be as descriptive as possible.',
    DID_WHAT: 'What were you doing?',
    INTERACTION: 'The situation in which you interacted with GitLab Duo Chat.',
    IMPROVE_WHAT: 'How could the response be improved?',
    BETTER_RESPONSE: 'How the response might better meet your needs.',
    MESSAGE_ERROR: 'Error sending the message',
  },
};

export default {
  name: 'GlDuoChatMessage',
  i18n,
  safeHtmlConfigExtension: {
    ADD_TAGS: ['copy-code'],
  },
  components: {
    DocumentationSources,
    GlDuoUserFeedback,
    GlFormGroup,
    GlFormTextarea,
    GlIcon,
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
        element.classList.add('gl-markdown', 'gl-compact-markdown');
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
  },
  data() {
    return {
      didWhat: '',
      improveWhat: '',
      messageWatcher: null, // imperatively set up watcher on message
      messageChunks: [],
    };
  },
  computed: {
    isChunk() {
      return typeof this.message.chunkId === 'number';
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

    error() {
      return Boolean(this.message?.errors?.length) && this.message.errors.join('; ');
    },
  },
  beforeCreate() {
    if (!customElements.get('copy-code')) {
      customElements.define('copy-code', CopyCodeElement);
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
  },
};
</script>
<template>
  <div
    class="gl-p-4 gl-mb-4 gl-rounded-lg gl-line-height-20 gl-word-break-word duo-chat-message"
    :class="{
      'gl-ml-auto gl-bg-blue-100 gl-text-blue-900 gl-rounded-bottom-right-none': isUserMessage,
      'gl-rounded-bottom-left-none gl-text-gray-900 gl-bg-white gl-border-1 gl-border-solid gl-border-gray-50':
        isAssistantMessage,
      'gl-bg-red-50 gl-border-none!': error,
    }"
  >
    <gl-icon
      v-if="error"
      :aria-label="$options.i18n.MESSAGE_ERROR"
      name="status_warning_borderless"
      :size="16"
      class="gl-text-red-600 gl-border gl-border-red-500 gl-rounded-full gl-mr-3 gl-flex-shrink-0 error-icon"
      data-testid="error"
    />
    <div ref="content-wrapper" :class="{ 'has-error': error }">
      <div v-if="error" ref="error-message" class="error-message">{{ error }}</div>
      <div v-else>
        <div ref="content" v-safe-html:[$options.safeHtmlConfigExtension]="messageContent"></div>

        <template v-if="isAssistantMessage">
          <documentation-sources v-if="sources" :sources="sources" />

          <div class="gl-display-flex gl-align-items-flex-end gl-mt-4 duo-chat-message-feedback">
            <gl-duo-user-feedback
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
    </div>
  </div>
</template>
