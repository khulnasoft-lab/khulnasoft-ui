<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { labelColorOptions } from '../../../utils/constants';
import { colorFromBackground } from '../../../utils/utils';
import GlButton from '../button/button.vue';
import GlIcon from '../icon/icon.vue';
import GlLink from '../link/link.vue';
import GlTooltip from '../tooltip/tooltip.vue';

export default {
  name: 'GlLabel',
  components: {
    GlButton,
    GlIcon,
    GlLink,
    GlTooltip,
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
    tooltipPlacement: {
      type: String,
      required: false,
      default: 'top',
    },
    target: {
      type: String,
      required: false,
      default: '',
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
        'gl-label-scoped': this.scoped,
        'gl-label-text-dark': textColorVariant === labelColorOptions.dark,
        'gl-label-text-light': textColorVariant === labelColorOptions.light,
      };
    },
    cssVariables() {
      return {
        '--label-background-color': this.backgroundColor,
        '--label-inset-border': `inset 0 0 0 2px ${this.backgroundColor}`,
      };
    },
    scopedKey() {
      return this.scoped ? this.title.slice(0, this.splitScopedLabelIndex) : this.title;
    },
    scopedValue() {
      return this.title.slice(this.splitScopedLabelIndex + 2);
    },
    labelComponent() {
      return this.target ? GlLink : 'span';
    },
    tooltipTarget() {
      return this.target ? this.$refs.labelTitle.$el : this.$refs.labelTitle;
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
  <span class="gl-label" :class="cssClasses" :style="cssVariables" v-bind="$attrs" @click="onClick">
    <component
      :is="labelComponent"
      ref="labelTitle"
      :href="target ? target : false"
      class="gl-label-link"
      tabindex="0"
    >
      <span class="gl-label-text">
        {{ scopedKey }}
      </span>
      <span v-if="scoped && scopedValue" class="gl-label-text-scoped">
        {{ scopedValue }}
      </span>
    </component>
    <gl-button
      v-if="showCloseButton"
      class="gl-label-close gl-p-0!"
      category="tertiary"
      size="small"
      variant="reset"
      aria-label="Remove label"
      :disabled="disabled"
      @click="onClose"
    >
      <gl-icon name="close-xs" :size="12" />
    </gl-button>
    <gl-tooltip
      v-if="description"
      :target="() => tooltipTarget"
      :placement="tooltipPlacement"
      boundary="viewport"
    >
      <span v-if="scoped" class="gl-label-tooltip-title">Scoped label</span>
      {{ description }}
    </gl-tooltip>
  </span>
</template>
