<script>
/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import GlDuoWorkflowPanel from '../duo_workflow_panel/duo_workflow_panel.vue';
import GlButton from '../../../../../base/button/button.vue';
import GlFormGroup from '../../../../../base/form/form_group/form_group.vue';
import GlFormTextarea from '../../../../../base/form/form_textarea/form_textarea.vue';
import GlFormInput from '../../../../../base/form/form_input/form_input.vue';
import { translate } from '../../../../../../utils/i18n';

export default {
  name: 'GlDuoWorkflowPrompt',
  components: {
    GlDuoWorkflowPanel,
    GlButton,
    GlFormGroup,
    GlFormInput,
    GlFormTextarea,
  },
  props: {
    /**
     * The prompt the user has entered
     */
    prompt: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * The image to run the workflow in
     */
    image: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * The text for the title of the panel
     */
    title: {
      type: String,
      required: false,
      default: translate('GlDuoWorkflowPrompt.title', 'Goal'),
    },
    /**
     * The summary of the ongoing workflow plan
     */
    summary: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Whether or not the panel is loading
     */
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * The label of the prompt text area
     *
     * See `GlFormGroup` for text placement.
     */
    promptLabel: {
      type: String,
      required: false,
      default: translate('GlDuoWorkflowPrompt.promptLabel', 'Description'),
    },
    /**
     * The label description of the prompt text area
     *
     * See `GlFormGroup` for text placement.
     */
    promptLabelDescription: {
      type: String,
      required: false,
      default: translate(
        'GlDuoWorkflowPrompt.promptLabelDescription',
        'What would you like to do and how.'
      ),
    },
    /**
     * The description of the prompt text area
     *
     * See `GlFormGroup` for text placement.
     */
    promptDescription: {
      type: String,
      required: false,
      default: translate(
        'GlDuoWorkflowPrompt.promptDescription',
        'Be specific and include any requirements.'
      ),
    },

    /**
     * The HTML ID of the textarea for the prompt
     */
    promptId: {
      type: String,
      required: false,
      default: 'duo-workflow-prompt',
    },
    /**
     * The label of the image input
     */
    imageLabel: {
      type: String,
      required: false,
      default: translate('GlDuoWorkflowPrompt.imageLabel', 'Image'),
    },
    /**
     * The label description of the image input
     *
     * See `GlFormGroup` for text placement.
     */
    imageLabelDescription: {
      type: String,
      required: false,
      default: translate(
        'GlDuoWorkflowPrompt.imageLabelDescription',
        'The container image to run the workflow in.'
      ),
    },
    /**
     * The description of the image input
     *
     * See `GlFormGroup` for text placement.
     */
    imageDescription: {
      type: String,
      required: false,
      default: translate(
        'GlDuoWorkflowPrompt.imageDescription',
        'It should have any tools necessary for the workflow installed.'
      ),
    },
    /**
     * The ID of the image input
     */
    imageId: {
      type: String,
      required: false,
      default: 'duo-workflow-image',
    },
    /**
     * The text for the confirmation button. This button emits a `confirm` event.
     */
    confirmButtonText: {
      type: String,
      required: false,
      default: translate('GlDuoWorkflowPrompt.confirmButtonText', 'Generate plan'),
    },
    /**
     * The text for the cancellation button. This button emits a `cancel` event.
     */
    cancelButtonText: {
      type: String,
      required: false,
      default: translate('GlDuoWorkflowPrompt.cancelButtonText', 'Cancel'),
    },
    /**
     * The text used as the title and aria-label for the button when the collapse is collapsed
     *
     * See `GlDuoWorkflowPanel`
     */
    expandPanelButtonTitle: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * The text used as the title and aria-label for the button when the collapse is expanded
     *
     * See `GlDuoWorkflowPanel`
     */
    collapsePanelButtonTitle: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    emitChange(prompt) {
      /**
       * Notify listeners about prompt change
       * @param {string} prompt The newly entered prompt
       */
      this.$emit('update:prompt', prompt);
    },
    emitImage(image) {
      /**
       * Notify listeners about image change
       * @param {string} image The newly entered image
       */
      this.$emit('update:image', image);
    },
    clickConfirm(event) {
      /**
       * Notify listeners about prompt submission
       * @param {*} event A click event
       */
      this.$emit('confirm', event);
    },
    clickCancel(event) {
      /**
       * Notify listeners about prompt submission cancellation.
       * @param {*} event A click event
       */
      this.$emit('cancel', event);
    },
  },
};
</script>

<template>
  <gl-duo-workflow-panel
    header-icon="issue-type-objective"
    :expand-panel-button-title="expandPanelButtonTitle"
    :collapse-panel-button-title="collapsePanelButtonTitle"
  >
    <template #title>{{ title }}</template>
    <template #subtitle>{{ summary }}</template>
    <template #content>
      <gl-form-group
        :label="promptLabel"
        :label-for="promptId"
        :label-description="promptLabelDescription"
        :description="promptDescription"
      >
        <gl-form-textarea
          :id="promptId"
          :value="prompt"
          :disable="loading"
          :no-resize="false"
          @input="emitChange"
        />
      </gl-form-group>
      <gl-form-group
        :label="imageLabel"
        :label-for="imageId"
        :label-description="imageLabelDescription"
        :description="imageDescription"
      >
        <gl-form-input :id="imageId" :value="image" :disable="loading" @input="emitImage" />
      </gl-form-group>
      <div class="gl-flex gl-gap-3">
        <gl-button
          variant="confirm"
          data-test-id="duo-workflow-prompt-confirm"
          :loading="loading"
          @click="clickConfirm"
          >{{ confirmButtonText }}</gl-button
        >
        <gl-button data-test-id="duo-workflow-prompt-cancel" @click="clickCancel">{{
          cancelButtonText
        }}</gl-button>
      </div>
    </template>
  </gl-duo-workflow-panel>
</template>
