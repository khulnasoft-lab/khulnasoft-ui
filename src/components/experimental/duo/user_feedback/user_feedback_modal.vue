<script>
import GlModal from '../../../base/modal/modal.vue';
import GlFormGroup from '../../../base/form/form_group/form_group.vue';
import GlFormTextarea from '../../../base/form/form_textarea/form_textarea.vue';
import GlFormCheckboxGroup from '../../../base/form/form_checkbox/form_checkbox_group.vue';

export const i18n = {
  MODAL_TITLE: 'Give feedback on AI content',
  MODAL_DESCRIPTION:
    'To help improve the quality of the content, send your feedback to GitLab team members.',
  MODAL_OPTIONS_LABEL: 'How was the AI content?',
  MODAL_MORE_LABEL: 'More information',
  MODAL_MORE_PLACEHOLDER: 'How could the content be improved?',
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
    GlFormCheckboxGroup,
    GlFormGroup,
    GlFormTextarea,
  },
  data() {
    return {
      selectedFeedbackOptions: [],
      extendedFeedback: '',
    };
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
        });
      }
    },
    onFeedbackCanceled() {
      this.$refs.feedbackModal.hide();
    },
  },
  actions: {
    primary: {
      text: i18n.MODAL_ACTIONS.submit,
    },
    cancel: {
      text: i18n.MODAL_ACTIONS.cancel,
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
    :action-primary="$options.actions.primary"
    :action-cancel="$options.actions.cancel"
    :visible="false"
    size="sm"
    @primary="onFeedbackSubmit"
    @canceled="onFeedbackCanceled"
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

    <!-- @slot The addition Feedback form fields. -->
    <slot name="feedback-extra-fields">
      <gl-form-group :label="$options.i18n.MODAL_MORE_LABEL" optional>
        <gl-form-textarea
          v-model="extendedFeedback"
          :placeholder="$options.i18n.MODAL_MORE_PLACEHOLDER"
        />
      </gl-form-group>
    </slot>
  </gl-modal>
</template>
