<script>
import { BModal } from 'bootstrap-vue';
import {
  COMMA,
  focusableTags,
  modalButtonDefaults,
  modalSizeOptions,
} from '../../../utils/constants';
import { focusFirstFocusableElement } from '../../../utils/utils';
import CloseButton from '../../shared_components/close_button/close_button.vue';
import GlButton from '../button/button.vue';

function validatorHelper(obj) {
  return Object.keys(obj).every((val) => val === 'text' || val === 'attributes');
}

export default {
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
  <b-modal
    :id="modalId"
    ref="modal"
    :title-tag="titleTag"
    :size="size"
    :visible="visible"
    v-bind="$attrs"
    lazy
    :modal-class="['gl-modal', modalClass]"
    v-on="$listeners"
    @shown="setFocus"
    @ok="primary"
    @cancel="canceled"
    @change="$emit('change', $event)"
  >
    <slot></slot>
    <template #modal-header>
      <slot name="modal-header">
        <h4 class="modal-title">
          <slot name="modal-title">{{ title }}</slot>
        </h4>
      </slot>
    </template>
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <slot slot="modal-ok" name="modal-ok"></slot>
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <slot slot="modal-cancel" name="modal-cancel"></slot>
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <slot slot="modal-footer" name="modal-footer">
      <gl-button
        v-if="actionCancel"
        class="js-modal-action-cancel"
        v-bind="buttonBinding(actionCancel, 'actionCancel')"
        @click="cancel"
      >
        {{ actionCancel.text }}
      </gl-button>
      <gl-button
        v-if="actionSecondary"
        class="js-modal-action-secondary"
        v-bind="buttonBinding(actionSecondary, 'actionSecondary')"
        @click="secondary"
      >
        {{ actionSecondary.text }}
      </gl-button>
      <gl-button
        v-if="actionPrimary"
        class="js-modal-action-primary"
        v-bind="buttonBinding(actionPrimary, 'actionPrimary')"
        @click="ok"
      >
        {{ actionPrimary.text }}
      </gl-button>
      <close-button
        ref="close-button"
        class="gl-absolute gl-top-5 gl-right-3 gl-mt-0!"
        :label="dismissLabel"
        @click="close"
      />
    </slot>
  </b-modal>
</template>
