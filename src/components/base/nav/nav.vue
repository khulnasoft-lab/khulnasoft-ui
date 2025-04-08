<script>
export default {
  name: 'GlNav',
  props: {
    /**
     * Align the nav items in the nav: 'start' (or 'left'), 'center', 'end' (or 'right')
     */
    align: { type: String, required: false, default: '' },
    /**
     * Set this prop when the nav is placed inside a card header
     */
    cardHeader: { type: Boolean, required: false, default: false },
    /**
     * Proportionately fills all horizontal space with nav items.
     * All horizontal space is occupied, but not every nav item has the same width
     */
    fill: { type: Boolean, required: false, default: false },
    /**
     * Fills all horizontal space with nav items, but unlike 'fill', every nav item will be the same width
     */
    justified: { type: Boolean, required: false, default: false },
    /**
     * Renders the nav items with the appearance of pill buttons
     */
    pills: { type: Boolean, required: false, default: false },
    /**
     * Makes the nav smaller
     */
    small: { type: Boolean, required: false, default: false },
    /**
     * Renders the nav items with the appearance of tabs
     */
    tabs: { type: Boolean, required: false, default: false },
    /**
     * Specify the HTML tag to render instead of the default tag
     */
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
