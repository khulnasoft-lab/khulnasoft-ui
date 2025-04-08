<script>
export default {
  name: 'GlNav',
  props: {
    align: { type: String, required: false, default: '' },

    // Set to `true` if placing in a card header
    cardHeader: { type: Boolean, required: false, default: false },

    fill: { type: Boolean, required: false, default: false },
    justified: { type: Boolean, required: false, default: false },
    pills: { type: Boolean, required: false, default: false },
    small: { type: Boolean, required: false, default: false },
    tabs: { type: Boolean, required: false, default: false },
    tag: { type: String, required: false, default: 'ul' },
  },
  computed: {
    justifyContent() {
      if (!this.align) return '';

      const alignMapping = {
        left: 'start',
        right: 'end',
      };

      return `justify-content-${alignMapping[this.align] || this.align}`;
    },
    classes() {
      return {
        'nav-tabs': this.tabs,
        'nav-pills': this.pills && !this.tabs,
        'card-header-tabs': this.cardHeader && this.tabs,
        'card-header-pills': this.cardHeader && this.pills && !this.tabs,
        'nav-fill': this.fill,
        'nav-justified': this.justified,
        [this.justifyContent]: this.align,
        small: this.small,
      };
    },
  },
};
</script>

<template>
  <component :is="tag" class="nav" :class="classes">
    <slot></slot>
  </component>
</template>
