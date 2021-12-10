<script>
import { labelColorOptions } from '../../../utils/constants';
import { colorFromBackground } from '../../../utils/utils';
import CloseButton from '../../shared_components/close_button/close_button.vue';
import GlLink from '../link/link.vue';
import GlTooltip from '../tooltip/tooltip.vue';

export default {
  components: {
    GlLink,
    GlTooltip,
    CloseButton,
  },
  props: {
    backgroundColor: {
      type: String,
      required: true,
      validator: (value) => /^(#|rgb|rgba)/.test(value),
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: String,
      required: false,
      default: '',
    },
    tooltipPlacement: {
      type: String,
      required: false,
      default: 'top',
    },
    target: {
      type: String,
      required: false,
      default: '#',
    },
    scoped: {
      type: Boolean,
      required: false,
      default: false,
    },
    showCloseButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      splitScopedLabelIndex: this.title.lastIndexOf('::'),
    };
  },
  computed: {
    cssClasses() {
      const textColorVariant = colorFromBackground(this.backgroundColor);
      return {
        'gl-label-sm': this.size === 'sm',
        'gl-label-scoped': this.scoped,
        'gl-label-text-dark': textColorVariant === labelColorOptions.dark,
        'gl-label-text-light': textColorVariant === labelColorOptions.light,
      };
    },
    cssVariables() {
      return {
        '--label-background-color': this.backgroundColor,
        '--label-inset-border': `inset 0 0 0 ${this.size === 'sm' ? '1px' : '2px'} ${
          this.backgroundColor
        }`,
      };
    },
    scopedKey() {
      return this.scoped ? this.title.slice(0, this.splitScopedLabelIndex) : this.title;
    },
    scopedValue() {
      return this.title.slice(this.splitScopedLabelIndex + 2);
    },
    closeIconSize() {
      return this.size === 'sm' ? 12 : 16;
    },
  },
  watch: {
    title() {
      this.splitScopedLabelIndex = this.title.lastIndexOf('::');
    },
  },
  methods: {
    onClick(e) {
      /**
       * Emitted when label is clicked
       *
       * @event click
       * @type {object}
       */
      this.$emit('click', e);
    },
    onClose(e) {
      /**
       * Emitted when x is clicked
       *
       * @event close
       * @type {object}
       */
      this.$emit('close', e);
    },
  },
};
</script>

<template>
  <span
    ref="labelTitle"
    class="gl-label"
    :class="cssClasses"
    :style="cssVariables"
    v-bind="$attrs"
    @click="onClick"
  >
    <gl-link :href="target" class="gl-label-link">
      <span class="gl-label-text">
        {{ scopedKey }}
      </span>
      <span v-if="scoped && scopedValue" class="gl-label-text-scoped">
        {{ scopedValue }}
      </span>
    </gl-link>
    <close-button
      v-if="showCloseButton"
      class="gl-label-close gl-p-0!"
      label="Remove label"
      variant="reset"
      :disabled="disabled"
      @click="onClose"
    />
    <gl-tooltip
      v-if="description"
      :target="() => $refs.labelTitle"
      :placement="tooltipPlacement"
      boundary="viewport"
    >
      <span v-if="scoped" class="gl-label-tooltip-title">Scoped label</span>
      {{ description }}
    </gl-tooltip>
  </span>
</template>
