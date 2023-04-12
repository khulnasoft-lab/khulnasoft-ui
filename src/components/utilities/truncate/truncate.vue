<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { GlTooltipDirective } from '../../../directives/tooltip';
import { GlResizeObserverDirective } from '../../../directives/resize_observer/resize_observer';
import { POSITION } from './constants';

export default {
  name: 'GlTruncate',
  POSITION,
  directives: {
    GlTooltip: GlTooltipDirective,
    GlResizeObserver: GlResizeObserverDirective,
  },
  props: {
    /**
     * Text to be ellipsized
     */
    text: {
      type: String,
      required: true,
    },
    /**
     * Ellipsis position
     */
    position: {
      type: String,
      required: false,
      default: POSITION.END,
      validator: (value) => Object.values(POSITION).includes(value),
    },
    /**
     * Display the full text in a tooltip only if it is being truncated
     */
    withTooltip: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isTruncated: false,
    };
  },
  computed: {
    middleIndex() {
      return Math.floor(this.text.length / 2);
    },

    first() {
      return this.text.slice(0, this.middleIndex);
    },
    last() {
      return this.text.slice(this.middleIndex);
    },
    isTooltipDisabled() {
      return !this.withTooltip || !this.isTruncated;
    },
  },
  watch: {
    withTooltip(withTooltip) {
      if (withTooltip) {
        this.checkTruncationState();
      }
    },
  },
  methods: {
    checkTruncationState() {
      if (this.withTooltip) {
        this.isTruncated = this.$refs.text.scrollWidth > this.$refs.text.offsetWidth;
      }
    },
  },
};
</script>

<template>
  <span
    v-if="position === $options.POSITION.START"
    v-gl-tooltip="{ disabled: isTooltipDisabled }"
    v-gl-resize-observer:[withTooltip]="checkTruncationState"
    class="gl-truncate"
    :title="text"
  >
    <span ref="text" class="gl-truncate-start gl-text-overflow-ellipsis!"
      >&lrm;{{ text }}&lrm;</span
    >
  </span>

  <span
    v-else-if="position === $options.POSITION.MIDDLE"
    v-gl-tooltip="{ disabled: isTooltipDisabled }"
    v-gl-resize-observer:[withTooltip]="checkTruncationState"
    class="gl-truncate"
    :title="text"
  >
    <span ref="text" class="gl-truncate-end">{{ first }}</span
    ><span class="gl-truncate-start">&lrm;{{ last }}&lrm;</span>
  </span>

  <span
    v-else
    v-gl-tooltip="{ disabled: isTooltipDisabled }"
    v-gl-resize-observer:[withTooltip]="checkTruncationState"
    class="gl-truncate"
    data-testid="truncate-end-container"
    :title="text"
  >
    <span ref="text" class="gl-truncate-end">{{ text }}</span>
  </span>
</template>
