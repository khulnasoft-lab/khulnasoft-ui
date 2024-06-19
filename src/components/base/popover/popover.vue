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
    hasTitle() {
      return this.$scopedSlots.title || this.title;
    },
    customClass() {
      return [
        'gl-popover',
        this.hasTitle && 'has-title',
        this.showCloseButton && 'has-close-button',
        ...this.cssClasses,
      ]
        .filter(Boolean)
        .join(' ');
    },
    shouldShowTitle() {
      return this.hasTitle || this.showCloseButton;
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
      <div v-if="showCloseButton" class="gl-mt-n2 gl-mr-n3 gl-ml-3 gl-h-0">
        <close-button
          :class="{ 'gl-float-right gl-mt-2': !hasTitle }"
          data-testid="close-button"
          @click="close"
        />
      </div>
    </template>
    <slot></slot>
  </b-popover>
</template>
