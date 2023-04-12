<script>
import debounce from 'lodash/debounce';
import { GlResizeObserverDirective } from '../../../../directives/resize_observer/resize_observer';
import GlIcon from '../../icon/icon.vue';
import GlTabs from './tabs.vue';

const NAV_CLASS = 'gl-scrollable-tabs-nav';

export default {
  name: 'GlScrollableTabs',
  components: {
    GlTabs,
    GlIcon,
  },
  directives: {
    GlResizeObserverDirective,
  },
  inheritAttrs: false,
  data() {
    return {
      width: 0,
      // This is a reactive value of a child element's scrollLeft. It is not two-way bound.
      // Do not set manually outside of "scroll" callback.
      scrollLeft: 0,
      navScrollWidth: 0,
    };
  },
  computed: {
    navClass() {
      const attrsNavClass = this.$attrs.navClass;

      if (!attrsNavClass) {
        return [NAV_CLASS];
      }
      if (Array.isArray(attrsNavClass)) {
        return [NAV_CLASS, ...attrsNavClass];
      }

      return [NAV_CLASS, attrsNavClass];
    },
    displayScrollLeft() {
      // if we have scrolled && there's overflow
      return this.scrollLeft && this.width < this.navScrollWidth;
    },

    displayScrollRight() {
      // if there's more overflow to the right
      return this.scrollLeft + this.width < this.navScrollWidth;
    },
    passthroughAttrs() {
      return Object.keys(this.$attrs)
        .filter((key) => !key.startsWith('action'))
        .reduce((acc, key) => Object.assign(acc, { [key]: this.$attrs[key] }), {});
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.navScrollWidth = this.getScrollWidth();
    });

    this.handleNavScroll = debounce((e) => {
      this.scrollLeft = e.target.scrollLeft;
    }, 100);

    this.getNavContainer().addEventListener('scroll', this.handleNavScroll);
  },
  beforeDestroy() {
    this.getNavContainer().removeEventListener('scroll', this.handleNavScroll);
  },
  updated() {
    // Whenever tabs are added or removed we need to recalculate the reactive scrollWidth
    this.$nextTick(() => {
      this.navScrollWidth = this.getScrollWidth();
    });
  },
  methods: {
    handleResize({ contentRect: { width } }) {
      this.width = width;
      this.navScrollWidth = this.getScrollWidth();
    },
    scrollTabsLeft() {
      const scrollTo = this.scrollLeft - this.width;
      this.scrollTabs(Math.max(scrollTo, 0));
    },
    scrollTabsRight() {
      const scrollTo = this.scrollLeft + this.width;
      this.scrollTabs(Math.min(scrollTo, this.getScrollWidth() - this.width));
    },
    scrollTabs(scrollTo) {
      this.getNavContainer().scrollTo({ left: scrollTo, behavior: 'smooth' });
      this.scrollLeft = scrollTo;
    },
    getScrollWidth() {
      return this.getNavContainer()?.scrollWidth || 0;
    },
    getNavContainer() {
      return this.$el?.querySelector(`.${NAV_CLASS}`);
    },
  },
  NAV_CLASS,
};
</script>

<template>
  <gl-tabs
    v-gl-resize-observer-directive="handleResize"
    :nav-class="navClass"
    v-bind="passthroughAttrs"
    v-on="$listeners"
  >
    <!-- eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots -->
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
    <template #tabs-start>
      <li v-show="displayScrollLeft" class="gl-tabs-fade gl-tabs-fade-left">
        <button
          class="gl-tabs-fade-icon-button"
          aria-label="Scroll left"
          tabindex="-1"
          @click="scrollTabsLeft"
        >
          <gl-icon :size="16" name="chevron-lg-left" />
        </button>
      </li>
    </template>
    <template #tabs-end>
      <li v-show="displayScrollRight" class="gl-tabs-fade gl-tabs-fade-right">
        <button
          class="gl-tabs-fade-icon-button"
          aria-label="Scroll right"
          tabindex="-1"
          @click="scrollTabsRight"
        >
          <gl-icon :size="16" name="chevron-lg-right" />
        </button>
      </li>
    </template>
  </gl-tabs>
</template>
