<script>
import GlButton from '../../../base/button/button.vue';
import FeedbackModal from './user_feedback_modal.vue';

export const i18n = {
  FEEDBACK_LINK_TEXT: 'Give feedback to improve this answer.',
  FEEDBACK_THANKS: 'Thank you for your feedback.',
};

export default {
  name: 'GlDuoUserFeedback',
  components: {
    GlButton,
    FeedbackModal,
  },
  props: {
    /**
     * Whether the message already has gotten feedback
     */
    feedbackReceived: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * The text to be displayed as the feedback link/button.
     */
    feedbackLinkText: {
      type: String,
      required: false,
      default: i18n.FEEDBACK_LINK_TEXT,
    },
    /**
     * The URL of a page to provide more explanations on the experiment. If provided, clicking
     * the feedback link will open a new tab with the URL instead of showing the feedback modal.
     */
    feedbackLinkUrl: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    shouldRenderModal() {
      return !this.feedbackReceived && !this.feedbackLinkUrl;
    },
  },
  methods: {
    notify(event) {
      /**
       * Notify listeners about the feedback form submission.
       * @param {*} event An event, containing the feedback choices and the extended feedback text.
       */
      this.$emit('feedback', event);
    },
  },
  i18n,
};
</script>

<template>
  <div class="gl-pt-4">
    <div>
      <gl-button
        v-if="!feedbackReceived"
        variant="link"
        target="_blank"
        :href="feedbackLinkUrl"
        button-text-classes="gl-white-space-normal! gl-text-left"
        @click="shouldRenderModal && $refs.feedbackModal.show()"
        >{{ feedbackLinkText }}</gl-button
      >
      <span v-else class="gl-text-gray-500">
        {{ $options.i18n.FEEDBACK_THANKS }}
      </span>
    </div>
    <feedback-modal v-if="shouldRenderModal" ref="feedbackModal" @feedback-submitted="notify">
      <template #feedback-extra-fields>
        <!-- @slot The addition Feedback form fields. -->
        <slot name="feedback-extra-fields"></slot>
      </template>
    </feedback-modal>
  </div>
</template>
