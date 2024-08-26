<script>
export default {
  name: 'GlBaseAnimatedIcon',
  props: {
    /**
     * Accessible icon name used by screen readers and other assistive technologies.
     * Provide when icon is not merely decorative
     */
    ariaLabel: {
      type: String,
      required: false,
      default: undefined,
    },
    isOn: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    iconStateClass() {
      return this.isOn
        ? 'gl-animated-icon gl-animated-icon-on'
        : 'gl-animated-icon gl-animated-icon-off';
    },
  },
};
</script>
<template>
  <svg
    :class="iconStateClass"
    :aria-label="ariaLabel"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  />
</template>
