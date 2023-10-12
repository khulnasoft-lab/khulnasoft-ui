<script>
import GlDuoUserFeedback from '../../../user_feedback/user_feedback.vue';
import { SafeHtmlDirective as SafeHtml } from '../../../../../../directives/safe_html/safe_html';
import { MESSAGE_MODEL_ROLES } from '../../constants';
import DocumentationSources from '../duo_chat_message_sources/duo_chat_message_sources.vue';

const concatIndicesUntilEmpty = (arr) => {
  const start = arr.findIndex((el) => el);
  if (start === -1 || start !== 1) return ''; // If there are no non-empty elements

  const end = arr.slice(start).findIndex((el) => !el);
  return end > 0 ? arr.slice(start, end).join('') : arr.slice(start).join('');
};

export default {
  name: 'GlDuoChatMessage',
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
    content() {
      return (
        this.message.contentHtml ||
        this.renderMarkdown(this.message.content || this.message.errors.join('; '))
      );
    },
  },
  watch: {
    message: {
      handler() {
        const { chunkId, content } = this.message;
        if (!chunkId) {
          this.messageChunks = [];
          this.messageContent = this.content;
          this.renderGFM(this.$refs.content);
        } else {
          this.messageChunks[chunkId] = content;
          this.messageContent = this.renderMarkdown(concatIndicesUntilEmpty(this.messageChunks));
        }
      },
      deep: true,
    },
  },
  beforeCreate() {
    /**
     * Keeps cache of previous chunks used for rerendering the AI response when streaming.
     * Is intentionally non-reactive
     */
    this.messageChunks = [];
  },
  mounted() {
    this.messageContent = this.content;
    if (this.message.chunkId) {
      this.messageChunks[this.message.chunkId] = this.message.content;
    }
    this.renderGFM(this.$refs.content);
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
    <div ref="content" v-safe-html="messageContent"></div>

    <template v-if="isAssistantMessage">
      <documentation-sources v-if="sources" :sources="sources" />

      <div class="gl-display-flex gl-align-items-flex-end gl-mt-4">
        <gl-duo-user-feedback @feedback="$emit('track-feedback', $event)" />
      </div>
    </template>
  </div>
</template>
