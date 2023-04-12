<script>
const sizes = [
  'sm', // -> 16px
  'md', // -> 24px
  'lg', // -> 32px
  'xl', // -> 64px
];
const colors = {
  dark: 'dark',
  light: 'light',
};
const defaultColor = colors.dark;

const baseCssClass = 'gl-spinner';

export default {
  name: 'GlLoadingIcon',
  props: {
    /**
     * Aria-label.
     */
    label: {
      type: String,
      required: false,
      default: 'Loading',
    },
    size: {
      type: String,
      required: false,
      default: 'sm',
      validator(value) {
        return sizes.indexOf(value) !== -1;
      },
    },
    color: {
      type: String,
      required: false,
      default: defaultColor,
      validator(value) {
        return Object.keys(colors).includes(value);
      },
    },
    /**
     * Wrap in a span or div.
     */
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    rootElementType() {
      return this.inline ? 'span' : 'div';
    },
    cssClasses() {
      return [
        baseCssClass,
        `${baseCssClass}-${colors[this.color]}`,
        `${baseCssClass}-${this.size}`,
      ];
    },
  },
};
</script>
<template>
  <component :is="rootElementType" class="gl-spinner-container" role="status">
    <span :class="cssClasses" class="gl-vertical-align-text-bottom!" :aria-label="label"></span>
  </component>
</template>
