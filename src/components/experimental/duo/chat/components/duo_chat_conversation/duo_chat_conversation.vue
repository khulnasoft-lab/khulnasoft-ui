<script>
import GlDuoChatMessage from '../duo_chat_message/duo_chat_message.vue';

const i18n = {
  CONVERSATION_NEW_CHAT: 'New chat',
};

const isMessage = (item) => Boolean(item) && item?.role;

// eslint-disable-next-line unicorn/no-array-callback-reference
const itemsValidator = (items) => items.every(isMessage);

export default {
  name: 'GlDuoChatConversation',
  components: {
    GlDuoChatMessage,
  },
  props: {
    /**
     * Messages to display
     */
    messages: {
      type: Array,
      required: false,
      default: () => [],
      validator: itemsValidator,
    },
    /**
     * Whether to show the delimiter before this conversation
     */
    showDelimiter: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    onTrackFeedback(event) {
      /**
       * Notify listeners about the feedback form submission on a response message.
       * @param {*} event An event, containing the feedback choices and the extended feedback text.
       */
      this.$emit('track-feedback', event);
    },
  },
  i18n,
};
</script>
<template>
  <div class="gl-display-flex gl-flex-direction-column gl-justify-content-end">
    <div
      v-if="showDelimiter"
      class="gl-my-5 gl-display-flex gl-align-items-center gl-text-gray-500 gl-gap-4"
      data-testid="conversation-delimiter"
    >
      <hr class="gl-flex-grow-1" />
      <span>{{ $options.i18n.CONVERSATION_NEW_CHAT }}</span>
      <hr class="gl-flex-grow-1" />
    </div>

    <gl-duo-chat-message
      v-for="(msg, index) in messages"
      :key="`${msg.role}-${index}`"
      :message="msg"
      @track-feedback="onTrackFeedback"
    />
  </div>
</template>
