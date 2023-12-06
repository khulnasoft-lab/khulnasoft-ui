<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { labelColorOptions } from '../../../utils/constants';
import { colorFromBackground } from '../../../utils/utils';
import CloseButton from '../../shared_components/close_button/close_button.vue';
import GlLink from '../link/link.vue';
import GlTooltip from '../tooltip/tooltip.vue';

const linkRegex = /(https?:\/\/[^\s]+[^\s.,?;:])/gi;
export default {
  name: 'GlLabel',
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
    labelComponent() {
      return this.target ? GlLink : 'span';
    },
    tooltipTarget() {
      return this.target ? this.$refs.labelTitle.$el : this.$refs.labelTitle;
    },
    descriptionWithLinks() {
      if (this.description?.length > 0) {
        const descriptionSeparatedByLinks = this.description.split(linkRegex);
        const textFragmentData = descriptionSeparatedByLinks.map((text) => {
          const isLink = linkRegex.test(text);
          return {
            text,
            class: isLink ? 'gl-reset-color! gl-text-decoration-underline' : undefined,
            href: isLink ? text : undefined,
            is: isLink ? GlLink : 'span',
          };
        });
        return textFragmentData;
      }
      return this.description;
    },
    displayTitle() {
      return this.scoped ? `${this.scopedKey}::${this.scopedValue}` : this.title;
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
      :target="() => tooltipTarget"
      :placement="tooltipPlacement"
      boundary="viewport"
    >
      <span class="gl-label-tooltip-title">{{ displayTitle }}</span>
      <component
        :is="fragment.is"
        v-for="fragment in descriptionWithLinks"
        :key="fragment.text"
        :href="fragment.href"
        :class="fragment.class"
        >{{ fragment.text }}</component
      >
    </gl-tooltip>
  </span>
</template>
