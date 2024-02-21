<script>
import GlModal from '../../../base/modal/modal.vue';
import GlAlert from '../../../base/alert/alert.vue';
import GlFormGroup from '../../../base/form/form_group/form_group.vue';
import GlFormTextarea from '../../../base/form/form_textarea/form_textarea.vue';
import GlFormCheckboxGroup from '../../../base/form/form_checkbox/form_checkbox_group.vue';
import GlButton from '../../../base/button/button.vue';

export const i18n = {
  MODAL_TITLE: 'Give feedback on AI content',
  MODAL_DESCRIPTION:
    'To help improve the quality of the content, send your feedback to GitLab team members.',
  MODAL_OPTIONS_LABEL: 'How was the AI content?*',
  MODAL_MORE_LABEL: 'More information',
  MODAL_MORE_PLACEHOLDER: 'How could the content be improved?',
  MODAL_ALERT:
    'GitLab team members cannot view your conversation. Please be as descriptive as possible.',
  MODAL_SITUATION_DESCRIPTION_LABEL: 'What were you doing?',
  MODAL_SITUATION_DESCRIPTION_PLACEHOLDER:
    'The Situation in which you interacted with GitLab Duo Chat.',
  MODAL_IMPROVEMENT_SUGGESTION_LABEL: 'How could the response be improved?',
  MODAL_IMPROVEMENT_SUGGESTION_PLACEHOLDER: 'How the response might better meet your needs.',
  MODAL_FEEDBACK_OPTIONS: {
    helpful: 'Helpful',
    unhelpful: 'Unhelpful or irrelevant',
    incorrect: 'Factually incorrect',
    long: 'Too long',
    abuse: 'Abusive or offensive',
    other: 'Something else',
  },
  MODAL_ACTIONS: {
    submit: 'Submit',
    cancel: 'Cancel',
  },
};

export const feedbackOptions = [
  {
    text: i18n.MODAL_FEEDBACK_OPTIONS.helpful,
    value: 'helpful',
  },
  {
    text: i18n.MODAL_FEEDBACK_OPTIONS.unhelpful,
    value: 'unhelpful',
  },
  {
    text: i18n.MODAL_FEEDBACK_OPTIONS.incorrect,
    value: 'incorrect',
  },
  {
    text: i18n.MODAL_FEEDBACK_OPTIONS.long,
    value: 'long',
  },
  {
    text: i18n.MODAL_FEEDBACK_OPTIONS.abuse,
    value: 'abuse',
  },
  {
    text: i18n.MODAL_FEEDBACK_OPTIONS.other,
    value: 'other',
  },
];

export default {
  name: 'DuoChatFeedbackModal',
  components: {
    GlModal,
    GlAlert,
    GlButton,
    GlFormCheckboxGroup,
    GlFormGroup,
    GlFormTextarea,
  },
  data() {
    return {
      submitDisabled: true,
      selectedFeedbackOptions: [],
      extendedFeedback: '',
      improvementSuggestion: '',
    };
  },
  computed: {
    isSubmitDisabled() {
      return this.selectedFeedbackOptions.length === 0;
    },
  },
  methods: {
    show() {
      this.$refs.feedbackModal.show();
    },
    onFeedbackSubmit() {
      if (this.selectedFeedbackOptions.length) {
        this.$emit('feedback-submitted', {
          feedbackChoices: this.selectedFeedbackOptions,
          extendedTextFeedback: this.extendedFeedback,
          improvementSuggestion: this.improvementSuggestion,
        });
      }
    },
    onFeedbackCanceled() {
      this.$refs.feedbackModal.hide();
    },
    onFeedbackSubmit() {
      this.$emit('feedback-submitted', {
        feedbackChoices: this.selectedFeedbackOptions,
        situationDescription: this.situationDescription,
        improvementSuggestion: this.improvementSuggestion,
      });
    },
    close() {
      this.$refs.feedbackModal.hide();
    },
  },
  feedbackOptions,
  i18n,
};
</script>
<template>
  <gl-modal
    ref="feedbackModal"
    modal-id="feedbackModal"
    :title="$options.i18n.MODAL_TITLE"
    :visible="false"
    size="sm"
  >
    <p>{{ $options.i18n.MODAL_DESCRIPTION }}</p>
    <gl-form-group
      :label="$options.i18n.MODAL_OPTIONS_LABEL"
      :optional="false"
      data-testid="feedback-options"
    >
      <gl-form-checkbox-group
        v-model="selectedFeedbackOptions"
        :options="$options.feedbackOptions"
      />
    </gl-form-group>
    <gl-alert class="gl-mb-5" :dismissible="false">{{ $options.i18n.MODAL_ALERT }}</gl-alert>
    <!-- @slot The addition Feedback form fields. -->
    <slot name="feedback-extra-fields">
      <gl-form-group :label="$options.i18n.MODAL_SITUATION_DESCRIPTION_LABEL" optional>
        <gl-form-textarea
          v-model="extendedFeedback"
          data-testid="extended-text-feedback-textarea"
          :placeholder="$options.i18n.MODAL_SITUATION_DESCRIPTION_PLACEHOLDER"
        />
      </gl-form-group>
      <gl-form-group :label="$options.i18n.MODAL_IMPROVEMENT_SUGGESTION_LABEL" optional>
        <gl-form-textarea
          v-model="improvementSuggestion"
          data-testid="improvement-suggestion-textarea"
          :placeholder="$options.i18n.MODAL_IMPROVEMENT_SUGGESTION_PLACEHOLDER"
        />
      </gl-form-group>
    </slot>
    <template #modal-footer>
      <gl-button data-testid="cancel-button" @click="close">
        {{ $options.i18n.MODAL_ACTIONS.cancel }}
      </gl-button>

      <gl-button
        data-testid="submit-button"
        category="primary"
        variant="confirm"
        @click="onFeedbackSubmit"
        :disabled="isSubmitDisabled"
      >
        {{ $options.i18n.MODAL_ACTIONS.submit }}
      </gl-button>
    </template>
  </gl-modal>
</template>
