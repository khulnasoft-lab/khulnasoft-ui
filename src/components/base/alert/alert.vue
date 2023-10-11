<!-- eslint-disable vue/multi-word-component-names -->
<script>
import {
  alertVariantOptions,
  alertVariantIconMap,
  buttonCategoryOptions,
} from '../../../utils/constants';
import CloseButton from '../../shared_components/close_button/close_button.vue';
import GlButton from '../button/button.vue';
import GlIcon from '../icon/icon.vue';

export default {
  name: 'GlAlert',
  components: {
    GlIcon,
    CloseButton,
    GlButton,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Controls the dismiss button's visibility.
     */
    dismissible: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * Shows icon based on variant.
     */
    showIcon: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * Dismiss button's aria-label.
     */
    dismissLabel: {
      type: String,
      required: false,
      default: 'Dismiss',
    },
    variant: {
      type: String,
      required: false,
      default: alertVariantOptions.info,
      validator: (value) => Object.keys(alertVariantOptions).includes(value),
    },
    /**
     * If provided, renders the primary button as a link.
     */
    primaryButtonLink: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * If provided, renders a primary action button.
     */
    primaryButtonText: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * If provided, renders the secondary button as a link.
     */
    secondaryButtonLink: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * If provided, renders a secondary action button.
     */
    secondaryButtonText: {
      type: String,
      required: false,
      default: '',
    },
    sticky: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ariaLive() {
      if ([alertVariantOptions.danger, alertVariantOptions.warning].includes(this.variant)) {
        return 'assertive';
      }

      return 'polite';
    },
    role() {
      if (
        [
          alertVariantOptions.danger,
          alertVariantOptions.warning,
          alertVariantOptions.success,
        ].includes(this.variant)
      ) {
        return 'alert';
      }

      return 'status';
    },
    iconName() {
      return alertVariantIconMap[this.variant];
    },
    shouldRenderActions() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.$slots.actions || this.actionButtons.length);
    },
    actionButtons() {
      return [
        {
          text: this.primaryButtonText,
          attrs: {
            href: this.primaryButtonLink,
            variant: 'confirm',
            category: buttonCategoryOptions.primary,
          },
          listeners: {
            click: this.primaryButtonClicked,
          },
        },
        {
          text: this.secondaryButtonText,
          attrs: {
            href: this.secondaryButtonLink,
            variant: 'default',
            category: buttonCategoryOptions.secondary,
          },
          listeners: {
            click: this.secondaryButtonClicked,
          },
        },
      ].reduce((acc, actionButton) => {
        if (!actionButton.text) return acc;

        const attrs = { ...actionButton.attrs };
        if (!attrs.href) {
          delete attrs.href;
        }

        acc.push({ ...actionButton, attrs });
        return acc;
      }, []);
    },
    variantClass() {
      return `gl-alert-${this.variant}`;
    },
  },
  methods: {
    primaryButtonClicked(event) {
      /**
       * Emitted when the primary action button is clicked.
       *
       * @event primaryAction
       * @type {object}
       */
      this.$emit('primaryAction', event);
    },
    secondaryButtonClicked(event) {
      /**
       * Emitted when the secondary action button is clicked.
       *
       * @event secondaryAction
       * @type {object}
       */
      this.$emit('secondaryAction', event);
    },
    onDismiss() {
      /**
       * Emitted when the dismiss button is clicked.
       *
       * @event dismiss
       * @type {object}
       */
      this.$emit('dismiss');
    },
  },
};
</script>

<template>
  <div
    :class="[
      'gl-alert',
      { 'gl-alert-sticky': sticky },
      { 'gl-alert-not-dismissible': !dismissible },
      { 'gl-alert-no-icon': !showIcon },
      { 'gl-alert-has-title': !!title },
      variantClass,
    ]"
  >
    <div v-if="showIcon" class="gl-alert-icon-container">
      <gl-icon :name="iconName" class="gl-alert-icon" />
    </div>
    <div class="gl-alert-content" :role="role" :aria-live="ariaLive">
      <h2 v-if="title" class="gl-alert-title">{{ title }}</h2>

      <div class="gl-alert-body">
        <!-- @slot The alert message to display. -->
        <slot></slot>
      </div>

      <div v-if="shouldRenderActions" class="gl-alert-actions">
        <!-- @slot If the primary/secondary action buttons aren't flexible enough, place arbitrary content here. -->
        <slot name="actions">
          <gl-button
            v-for="(actionButton, index) in actionButtons"
            :key="index"
            class="gl-alert-action"
            v-bind="actionButton.attrs"
            v-on="actionButton.listeners"
          >
            {{ actionButton.text }}
          </gl-button>
        </slot>
      </div>
    </div>

    <close-button
      v-if="dismissible"
      ref="dismiss"
      class="gl-dismiss-btn"
      :label="dismissLabel"
      @click="onDismiss"
    />
  </div>
</template>
