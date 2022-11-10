<script>
import { colorThemes } from '../../../utils/constants';
import CloseButton from '../../shared_components/close_button/close_button.vue';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    CloseButton,
    GlIcon,
  },
  props: {
    /**
     * The icon to show next to the text.
     */
    iconName: {
      type: String,
      required: false,
      default: 'bullhorn',
    },
    /**
     * The dismiss button's label, it is visible in mobile viewports and used for the button's aria-label attribute.
     */
    dismissLabel: {
      type: String,
      required: false,
      default: 'Dismiss',
    },
    /**
     * The theme's name to use, this should correspond to the user's selected theme in GitLab.
     */
    theme: {
      type: String,
      required: false,
      default: Object.keys(colorThemes)[0],
      validator: (value) => Object.keys(colorThemes).includes(value),
    },
  },
  methods: {
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
  <div class="gl-broadcast-message" :class="theme" role="alert">
    <div class="gl-broadcast-message-content">
      <div class="gl-broadcast-message-icon gl-line-height-normal">
        <gl-icon :name="iconName" />
      </div>
      <div class="gl-broadcast-message-text gl-my-n1">
        <!-- @slot The broadcast message's text -->
        <slot></slot>
      </div>
    </div>
    <close-button
      ref="dismiss"
      class="gl-close-btn-color-inherit gl-broadcast-message-dismiss"
      :label="dismissLabel"
      @click="onDismiss"
    />
  </div>
</template>
