<script>
import GlDuoUserFeedback from '../../../user_feedback/user_feedback.vue';
import { SafeHtmlDirective as SafeHtml } from '../../../../../../directives/safe_html/safe_html';
import { MESSAGE_MODEL_ROLES } from '../../constants';
import DocumentationSources from '../duo_chat_message_sources/duo_chat_message_sources.vue';
import { CopyCodeElement } from './copy_code_element';

const concatIndicesUntilEmpty = (arr) => {
  const start = arr.findIndex((el) => el);
  const end = arr.findIndex((el) => !el);

  if (start !== 0) return ''; // We don't yet have the first chunk

  return end > 0 ? arr.slice(start, end).join('') : arr.slice(start).join('');
};

export default {
  name: 'GlDuoChatMessage',
  safeHtmlConfigExtension: {
    ADD_TAGS: ['copy-code'],
  },
  components: {
    DocumentationSources,
    GlDuoUserFeedback,
  },
  directives: {
    SafeHtml,
  },
  inject: ['renderGFM', 'renderMarkdown'],
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
      messageContent: '',
      messageWatcher: null,
    };
  },
  computed: {
    isAssistantMessage() {
      return this.message.role.toLowerCase() === MESSAGE_MODEL_ROLES.assistant;
    },
    isUserMessage() {
      return this.message.role.toLowerCase() === MESSAGE_MODEL_ROLES.user;
    },
    sources() {
      return this.message.extras?.sources;
    },
    hasChunks() {
      return this.message.chunks && Array.isArray(this.message.chunks);
    },
    content() {
      if (this.message.chunkId && this.hasChunks) {
        return this.getMessageContentFromChunks();
      }
      return (
        this.message.contentHtml ||
        this.renderMarkdown(this.message.content || this.message.errors.join('; '))
      );
    },
  },
  created() {
    this.messageWatcher = this.$watch('message', this.messageUpdateHandler, { deep: true });
  },
  beforeCreate() {
    if (!customElements.get('copy-code')) {
      customElements.define('copy-code', CopyCodeElement);
    }
  },
  mounted() {
    this.messageContent = this.content;
    this.hydrateContentWithGFM();
  },
  methods: {
    async hydrateContentWithGFM() {
      await this.$nextTick();
      this.renderGFM(this.$refs.content);
    },
    async messageUpdateHandler() {
      const { chunkId } = this.message;
      this.messageContent = this.content;

      if (!chunkId) {
        this.messageWatcher();
        this.hydrateContentWithGFM();
      }
    },
    getMessageContentFromChunks() {
      return this.hasChunks && this.renderMarkdown(concatIndicesUntilEmpty(this.message.chunks));
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
    }"
  >
    <div ref="content" v-safe-html:[$options.safeHtmlConfigExtension]="messageContent"></div>

    <template v-if="isAssistantMessage">
      <documentation-sources v-if="sources" :sources="sources" />

      <div class="gl-display-flex gl-align-items-flex-end gl-mt-4">
        <gl-duo-user-feedback @feedback="$emit('track-feedback', $event)" />
      </div>
    </template>
  </div>
</template>
