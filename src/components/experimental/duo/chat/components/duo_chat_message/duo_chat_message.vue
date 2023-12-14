<script>
import GlDuoUserFeedback from '../../../user_feedback/user_feedback.vue';
import { SafeHtmlDirective as SafeHtml } from '../../../../../../directives/safe_html/safe_html';
import { MESSAGE_MODEL_ROLES } from '../../constants';
import DocumentationSources from '../duo_chat_message_sources/duo_chat_message_sources.vue';
import { CopyCodeElement } from './copy_code_element';

const concatUntilEmpty = (arr) => {
  if (!arr) return '';

  let end = arr.findIndex((el) => !el);

  if (end < 0) end = arr.length;

  return arr.slice(0, end).join('');
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
    messageContent() {
      if (this.message.errors.length > 0)
        return this.renderMarkdown(this.message.errors.join('; '));

      if (this.message.contentHtml) {
        return this.message.contentHtml;
      }

      return this.renderMarkdown(this.message.content || concatUntilEmpty(this.message.chunks));
    },
  },
  beforeCreate() {
    if (!customElements.get('copy-code')) {
      customElements.define('copy-code', CopyCodeElement);
    }
  },
  mounted() {
    this.$nextTick(this.hydrateContentWithGFM);
  },
  updated() {
    this.$nextTick(this.hydrateContentWithGFM);
  },
  methods: {
    async hydrateContentWithGFM() {
      if (this.message.contentHtml) {
        this.renderGFM(this.$refs.content);
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
