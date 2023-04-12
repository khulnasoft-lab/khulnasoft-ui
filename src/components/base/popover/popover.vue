<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BPopover } from 'bootstrap-vue';
import tooltipMixin from '../../mixins/tooltip_mixin';
import CloseButton from '../../shared_components/close_button/close_button.vue';
import { popoverPlacements } from '../../../utils/constants';

const popoverRefName = 'bPopover';

export default {
  name: 'GlPopover',
  components: {
    BPopover,
    CloseButton,
  },
  mixins: [tooltipMixin(popoverRefName)],
  inheritAttrs: false,
  props: {
    cssClasses: {
      type: Array,
      required: false,
      default: () => [],
    },
    /**
     * Space-separated triggers for the popover.
     *
     * @values click, hover, focus, manual
     */
    triggers: {
      type: String,
      required: false,
      default: 'hover focus',
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    showCloseButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    placement: {
      type: String,
      required: false,
      default: popoverPlacements.top,
    },
    boundaryPadding: {
      type: [Number, String],
      required: false,
      default: 5,
    },
  },
  computed: {
    customClass() {
      return ['gl-popover', ...this.cssClasses].join(' ');
    },
    shouldShowTitle() {
      return this.$scopedSlots.title || this.title || this.showCloseButton;
    },
  },
  methods: {
    close(e) {
      this.$refs[popoverRefName].doClose();
      /**
       * Emitted when the close button is clicked (requires showCloseButton to be `true`).
       */
      this.$emit('close-button-clicked', e);
    },
  },
  popoverRefName,
};
</script>

<template>
  <b-popover
    :ref="$options.popoverRefName"
    :custom-class="customClass"
    :triggers="triggers"
    :title="title"
    :placement="placement"
    :boundary-padding="boundaryPadding"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-if="shouldShowTitle" #title>
      <slot name="title">
        {{ title }}
      </slot>
      <close-button
        v-if="showCloseButton"
        class="gl-float-right gl-mt-n2 gl-mr-n3"
        data-testid="close-button"
        @click="close"
      />
    </template>
    <slot></slot>
  </b-popover>
</template>
