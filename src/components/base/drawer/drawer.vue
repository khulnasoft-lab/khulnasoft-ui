<!-- eslint-disable vue/multi-word-component-names -->
<script>
import isEmpty from 'lodash/isEmpty';
import { maxZIndex, drawerVariants } from '../../../utils/constants';
import GlButton from '../button/button.vue';

export default {
  name: 'GlDrawer',
  components: {
    GlButton,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    headerHeight: {
      type: String,
      required: false,
      default: '',
    },
    headerSticky: {
      type: Boolean,
      required: false,
      default: false,
    },
    zIndex: {
      type: Number,
      required: false,
      default: maxZIndex,
    },
    variant: {
      type: String,
      required: false,
      default: drawerVariants.default,
      validator: (value) => Object.keys(drawerVariants).includes(value),
    },
  },
  computed: {
    positionFromTop() {
      return !isEmpty(this.headerHeight) ? this.headerHeight : 0;
    },
    drawerStyles() {
      const styles = {
        top: this.positionFromTop,
        zIndex: this.zIndex,
      };

      if (this.positionFromTop) {
        styles.maxHeight = `calc(100vh - ${this.positionFromTop})`;
      }

      return styles;
    },
    drawerHeaderStyles() {
      return {
        zIndex: this.headerSticky ? maxZIndex : null,
      };
    },
    shouldRenderFooter() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.$slots.footer);
    },
    variantClass() {
      return `gl-drawer-${this.variant}`;
    },
  },
  watch: {
    open: {
      immediate: true,
      handler(open) {
        if (open) {
          document.addEventListener('keydown', this.handleEscape);
        } else {
          document.removeEventListener('keydown', this.handleEscape);
        }
      },
    },
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleEscape);
  },
  methods: {
    emitOpened() {
      /**
       * Emits when the opening animation has finished.
       * @event opened
       */
      this.$emit('opened');
    },
    handleEscape(e) {
      const ESC = 27;

      if (this.open && e.keyCode === ESC) {
        this.$emit('close');
      }
    },
  },
};
</script>
<template>
  <transition name="gl-drawer" @after-enter="emitOpened">
    <aside v-if="open" :style="drawerStyles" class="gl-drawer" :class="variantClass">
      <div
        class="gl-drawer-header"
        :style="drawerHeaderStyles"
        :class="{ 'gl-drawer-header-sticky': headerSticky }"
      >
        <div class="gl-drawer-title">
          <slot name="title"></slot>
          <gl-button
            category="tertiary"
            size="small"
            icon="close"
            class="gl-drawer-close-button"
            aria-label="Close drawer"
            @click="$emit('close')"
          />
        </div>
        <slot name="header"></slot>
      </div>
      <div class="gl-drawer-body" :class="{ 'gl-drawer-body-scrim': !shouldRenderFooter }">
        <slot></slot>
      </div>
      <div
        v-if="shouldRenderFooter"
        class="gl-drawer-footer gl-drawer-footer-sticky"
        :class="{ 'gl-drawer-body-scrim-on-footer': shouldRenderFooter }"
        :style="{ zIndex }"
      >
        <slot name="footer"></slot>
      </div>
    </aside>
  </transition>
</template>
