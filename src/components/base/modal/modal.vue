<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BModal } from 'bootstrap-vue';
import {
  COMMA,
  focusableTags,
  modalButtonDefaults,
  modalSizeOptions,
} from '../../../utils/constants';
import { focusFirstFocusableElement, logWarning } from '../../../utils/utils';
import CloseButton from '../../shared_components/close_button/close_button.vue';
import GlButton from '../button/button.vue';

function validatorHelper(obj) {
  return Object.keys(obj).every((val) => val === 'text' || val === 'attributes');
}

export default {
  name: 'GlModal',
  components: {
    BModal,
    GlButton,
    CloseButton,
  },
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    modalId: {
      type: String,
      required: true,
    },
    titleTag: {
      type: String,
      required: false,
      default: 'h4',
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    modalClass: {
      type: String,
      required: false,
      default: '',
    },
    actionPrimary: {
      type: Object,
      required: false,
      default: null,
      validator: (obj) => validatorHelper(obj),
    },
    actionSecondary: {
      type: Object,
      required: false,
      default: null,
      validator: (obj) => validatorHelper(obj),
    },
    actionCancel: {
      type: Object,
      required: false,
      default: null,
      validator: (obj) => validatorHelper(obj),
    },
    size: {
      type: String,
      required: false,
      default: modalSizeOptions.md,
      validator: (val) => Object.keys(modalSizeOptions).includes(val),
    },
    dismissLabel: {
      type: String,
      required: false,
      default: 'Close',
    },
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
    ariaLabel: {
      type: String,
      required: false,
      default: '',
    },
    noFocusOnShow: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    shouldRenderModalOk() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.$slots['modal-ok']);
    },
    shouldRenderModalCancel() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.$slots['modal-cancel']);
    },
    shouldRenderModalFooter() {
      return Boolean(
        this.actionCancel ||
          this.actionSecondary ||
          this.actionPrimary ||
          // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
          this.$slots['modal-footer']
      );
    },
  },
  mounted() {
    if (!this.ariaLabel && !this.title) {
      logWarning(
        '[gl-modal]: Accessible name for modal missing. Please add title prop or aria-label.',
        this.$el
      );
    }
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
    hide() {
      this.$refs.modal.hide();
    },
    toggle() {
      this.$refs.modal.toggle();
    },
    ok() {
      this.$refs.modal.onOk();
    },
    cancel() {
      this.$refs.modal.onCancel();
    },
    close() {
      this.$refs.modal.onClose();
    },
    primary(event) {
      this.$emit('primary', event);
    },
    canceled(event) {
      this.$emit('canceled', event);
    },
    secondary(event) {
      this.$emit('secondary', event);
      if (!event?.defaultPrevented) {
        this.close();
      }
    },
    // set default variant button styling
    buttonBinding(prop, name) {
      if (!prop.attributes) {
        return modalButtonDefaults[name];
      }
      return prop.attributes;
    },
    setFocus() {
      if (this.noFocusOnShow) return;

      const btnElts = [...this.$refs.modal.$refs.modal.querySelectorAll('button')];
      const modalElts = [
        ...this.$refs.modal.$refs.body.querySelectorAll(focusableTags.join(COMMA)),
      ];

      // Iterate over the array and if you find the close button,
      // move it to the end
      const closeBtnIndex = btnElts.findIndex((elt) => elt === this.$refs['close-button']?.$el);
      if (closeBtnIndex > -1) {
        btnElts.push(...btnElts.splice(closeBtnIndex, 1));
      }

      // ModalElts are the first choice, the btnElts are a backup
      focusFirstFocusableElement([...modalElts, ...btnElts]);
    },
  },
};
</script>

<template>
  <!--
  Emitted when the modal visibility changes
  @event change
  -->
  <b-modal
    :id="modalId"
    ref="modal"
    :title-tag="titleTag"
    :size="size"
    :visible="visible"
    :aria-label="ariaLabel || title"
    v-bind="$attrs"
    lazy
    :modal-class="['gl-modal', modalClass]"
    v-on="$listeners"
    @shown="setFocus"
    @ok="primary"
    @cancel="canceled"
    @change="$emit('change', $event)"
  >
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #modal-header>
      <!-- @slot Entire modal header container contents (including the close button on the top right corner) -->
      <slot name="modal-header">
        <h2 class="modal-title">
          <!-- @slot Modal title. If modal-header slot is used, this slot will not be shown. -->
          <slot name="modal-title">{{ title }}</slot>
        </h2>
      </slot>
      <!-- @slot Content of Modal header close button. If modal-header slot is used, this slot will not be shown. -->
      <close-button ref="close-button" :label="dismissLabel" @click="close" />
    </template>
    <template v-if="shouldRenderModalOk" #modal-ok>
      <slot name="modal-ok"></slot>
    </template>
    <template v-if="shouldRenderModalCancel" #modal-cancel>
      <slot name="modal-cancel"></slot>
    </template>
    <!-- @slot Populated via props: modal-action-primary, modal-action-cancel and modal-action-secondary. -->
    <template v-if="shouldRenderModalFooter" #modal-footer>
      <slot name="modal-footer">
        <!--
        Emitted when clicked on modal-action-cancel
        @event canceled
        -->
        <gl-button
          v-if="actionCancel"
          class="js-modal-action-cancel"
          v-bind="buttonBinding(actionCancel, 'actionCancel')"
          @click="cancel"
        >
          {{ actionCancel.text }}
        </gl-button>
        <!--
        Emitted when clicked on modal-action-secondary
        @event secondary
        -->
        <gl-button
          v-if="actionSecondary"
          class="js-modal-action-secondary"
          v-bind="buttonBinding(actionSecondary, 'actionSecondary')"
          @click="secondary"
        >
          {{ actionSecondary.text }}
        </gl-button>
        <!--
        Emitted when clicked on modal-action-primary
        @event primary
        -->
        <gl-button
          v-if="actionPrimary"
          class="js-modal-action-primary"
          v-bind="buttonBinding(actionPrimary, 'actionPrimary')"
          @click="ok"
        >
          {{ actionPrimary.text }}
        </gl-button>
      </slot>
    </template>
  </b-modal>
</template>
