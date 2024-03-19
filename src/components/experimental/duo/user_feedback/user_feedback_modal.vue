<script>
import GlModal from '../../../base/modal/modal.vue';
import GlAlert from '../../../base/alert/alert.vue';
import GlFormGroup from '../../../base/form/form_group/form_group.vue';
import GlFormTextarea from '../../../base/form/form_textarea/form_textarea.vue';
import GlFormCheckboxGroup from '../../../base/form/form_checkbox/form_checkbox_group.vue';

export const i18n = {
  MODAL: {
    TITLE: 'Give feedback on GitLab Duo',
    DESCRIPTION: 'To help improve GitLab Duo, send your feeback to GitLab team members.',
    ALERT: 'GitLab team members cannot see the AI content. Please be as descriptive as possible.',
    OPTIONS_LABEL: 'How could the AI content be improved?',
    SITUATION_DESCRIPTION_LABEL: 'What were you doing?',
    SITUATION_DESCRIPTION_PLACEHOLDER:
      'The situation in which you interacted with GitLab Duo Chat.',
    IMPROVEMENT_SUGGESTION_LABEL: 'How could the response be improved?',
    IMPROVEMENT_SUGGESTION_PLACEHOLDER: 'How the response might better meet your needs.',
    MORE_LABEL: 'More information',
    MORE_PLACEHOLDER: 'How could the content be improved?',
    REQUIRED_VALIDATION_ERROR: 'Select at least one option.',
    FEEDBACK_OPTIONS: {
      helpful: 'Helpful',
      unhelpful: 'Unhelpful or irrelevant',
      incorrect: 'Factually incorrect',
      long: 'Too long',
      abuse: 'Abusive or offensive',
      other: 'Something else',
    },
    ACTIONS: {
      submit: 'Submit',
      cancel: 'Cancel',
    },
  },
};

export const feedbackOptions = [
  {
    text: i18n.MODAL.FEEDBACK_OPTIONS.helpful,
    value: 'helpful',
  },
  {
    text: i18n.MODAL.FEEDBACK_OPTIONS.unhelpful,
    value: 'unhelpful',
  },
  {
    text: i18n.MODAL.FEEDBACK_OPTIONS.incorrect,
    value: 'incorrect',
  },
  {
    text: i18n.MODAL.FEEDBACK_OPTIONS.long,
    value: 'long',
  },
  {
    text: i18n.MODAL.FEEDBACK_OPTIONS.abuse,
    value: 'abuse',
  },
  {
    text: i18n.MODAL.FEEDBACK_OPTIONS.other,
    value: 'other',
  },
];

export default {
  name: 'DuoChatFeedbackModal',
  components: {
    GlModal,
    GlAlert,
    GlFormCheckboxGroup,
    GlFormGroup,
    GlFormTextarea,
  },
  inject: {
    modalTitle: {
      default: i18n.MODAL.TITLE,
    },
    modalAlert: {
      default: i18n.MODAL.ALERT,
    },
  },
  data() {
    return {
      selectedFeedbackOptions: [],
      extendedFeedback: '',
      isValid: null,
    };
  },
  watch: {
    selectedFeedbackOptions(options) {
      this.isValid = options.length > 0;
    },
  },
  methods: {
    close() {
      this.$refs.feedbackModal.hide();
    },
    show() {
      this.$refs.feedbackModal.show();
    },
    onFeedbackSubmit(e) {
      if (this.selectedFeedbackOptions.length) {
        this.$emit('feedback-submitted', {
          feedbackChoices: this.selectedFeedbackOptions,
          extendedTextFeedback: this.extendedFeedback,
        });
        this.close();
        this.isValid = null;
      } else {
        e?.preventDefault();
        this.isValid = false;
      }
    },
  },
  actions: {
    primary: {
      text: i18n.MODAL.ACTIONS.submit,
    },
    cancel: {
      text: i18n.MODAL.ACTIONS.cancel,
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
    :title="modalTitle"
    :action-primary="$options.actions.primary"
    :action-cancel="$options.actions.cancel"
    :visible="false"
    size="sm"
    @primary="onFeedbackSubmit"
    @canceled="close"
  >
    <p>{{ $options.i18n.MODAL.DESCRIPTION }}</p>
    <gl-form-group
      :invalid-feedback="$options.i18n.MODAL.REQUIRED_VALIDATION_ERROR"
      :state="isValid"
      :label="$options.i18n.MODAL.OPTIONS_LABEL"
      data-testid="feedback-options"
    >
      <gl-form-checkbox-group
        v-model="selectedFeedbackOptions"
        :options="$options.feedbackOptions"
      />
    </gl-form-group>
    <gl-alert class="gl-mb-5" :dismissible="false">{{ modalAlert }}</gl-alert>
    <!-- @slot The addition Feedback form fields. -->
    <slot name="feedback-extra-fields">
      <gl-form-group :label="$options.i18n.MODAL.MORE_LABEL" optional>
        <gl-form-textarea
          v-model="extendedFeedback"
          :placeholder="$options.i18n.MODAL.MORE_PLACEHOLDER"
        />
      </gl-form-group>
    </slot>
  </gl-modal>
</template>
