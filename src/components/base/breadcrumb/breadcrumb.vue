<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BBreadcrumb } from 'bootstrap-vue';
import debounce from 'lodash/debounce';
import { translate } from '../../../utils/i18n';
import GlAvatar from '../avatar/avatar.vue';
import GlDisclosureDropdown from '../new_dropdowns/disclosure/disclosure_dropdown.vue';
import { GlTooltipDirective } from '../../../directives/tooltip';
import GlBreadcrumbItem from './breadcrumb_item.vue';

export default {
  name: 'GlBreadcrumb',
  components: {
    BBreadcrumb,
    GlBreadcrumbItem,
    GlAvatar,
    GlDisclosureDropdown,
  },
  directives: {
    GlTooltip: GlTooltipDirective,
  },
  inheritAttrs: false,
  props: {
    /**
     * The breadcrumb items to be displayed as links.
     */
    items: {
      type: Array,
      required: true,
      default: () => [{ text: '', href: '' }],
      validator: (items) => {
        return items.every((item) => {
          const keys = Object.keys(item);
          return keys.includes('text') && (keys.includes('href') || keys.includes('to'));
        });
      },
    },
    ariaLabel: {
      type: String,
      required: false,
      default: 'Breadcrumb',
    },
    /**
     * The label for the collapsed dropdown toggle. Screen-reader only.
     */
    showMoreLabel: {
      type: String,
      required: false,
      default: () => translate('GlBreadcrumb.showMoreLabel', 'Show more breadcrumbs'),
    },
    /**
     * Allows to disable auto-resize behavior. Items will then overflow their container instead of being collapsed into a dropdown.
     */
    autoResize: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      fittingItems: [...this.items], // array of items that fit on the screen
      overflowingItems: [], // array of items that didn't fit and were put in a dropdown instead
      totalBreadcrumbsWidth: 0, // the total width of all breadcrumb items combined
      widthPerItem: [], // array with the indivudal widths of each breadcrumb item
      resizeDone: false, // to apply some CSS only during/after resizing
    };
  },
  computed: {
    hasCollapsible() {
      return this.overflowingItems.length > 0;
    },
    breadcrumbStyle() {
      return this.resizeDone ? {} : { opacity: 0 };
    },
    itemStyle() {
      /**
       * If the last/only item, which is always visible, has a very long title,
       * it could overflow the breadcrumb component. This CSS makes sure it
       * shows an ellipsis instead.
       * But this CSS cannot be active while we do the size calculation, as that
       * would then not take the real unshrunk width of that item into account.
       */
      if (this.resizeDone && this.fittingItems.length === 1) {
        return {
          'flex-shrink': 1,
          'text-overflow': 'ellipsis',
          'overflow-x': 'hidden',
          'text-wrap': 'nowrap',
        };
      }
      return {};
    },
  },
  watch: {
    items: {
      handler: 'measureAndMakeBreadcrumbsFit',
      deep: true,
    },
    autoResize(newValue) {
      if (newValue) this.enableAutoResize();
      else this.disableAutoResize();
    },
  },
  created() {
    this.debounceMakeBreadcrumbsFit = debounce(this.makeBreadcrumbsFit, 25);
  },
  mounted() {
    if (this.autoResize) {
      this.enableAutoResize();
    } else {
      this.resizeDone = true;
    }
  },
  beforeDestroy() {
    this.disableAutoResize();
  },
  methods: {
    resetItems() {
      this.fittingItems = [...this.items];
      this.overflowingItems = [];
    },
    async measureAndMakeBreadcrumbsFit() {
      this.resizeDone = false;
      this.resetItems();

      // Wait for DOM update so all items get rendered and can be measured.
      await this.$nextTick();

      this.totalBreadcrumbsWidth = 0;
      this.$refs.breadcrumbs.forEach((b, index) => {
        const width = b.$el.clientWidth;
        this.totalBreadcrumbsWidth += width;
        this.widthPerItem[index] = width;
      });

      this.makeBreadcrumbsFit();
    },
    makeBreadcrumbsFit() {
      this.resizeDone = false;
      this.resetItems();

      const containerWidth = this.$el.clientWidth;
      const buttonWidth = 40; // px

      if (this.totalBreadcrumbsWidth > containerWidth) {
        // Not all breadcrumb items fit. Start moving items over to the dropdown.
        const startSlicingAt = 0;

        // The last item will never be moved into the dropdown.
        const stopSlicingAt = this.items.length - 1;

        let widthNeeded = this.totalBreadcrumbsWidth;
        for (let index = startSlicingAt; index < stopSlicingAt; index += 1) {
          // Move one breadcrumb item into the dropdown
          this.overflowingItems.push(this.fittingItems[startSlicingAt]);
          this.fittingItems.splice(startSlicingAt, 1);

          widthNeeded -= this.widthPerItem[index];

          // Does it fit now? Then stop.
          if (widthNeeded + buttonWidth < containerWidth) break;
        }
      }

      this.resizeDone = true;
    },
    isLastItem(index) {
      return index === this.fittingItems.length - 1;
    },
    getAriaCurrentAttr(index) {
      return this.isLastItem(index) ? 'page' : false;
    },
    enableAutoResize() {
      this.resizeObserver ||= new ResizeObserver(this.debounceMakeBreadcrumbsFit);
      this.resizeObserver.observe(this.$el);
      this.measureAndMakeBreadcrumbsFit();
    },
    disableAutoResize() {
      if (this.resizeObserver) {
        this.resizeObserver.unobserve(this.$el);
        this.resizeObserver = null;
      }
      this.resetItems();
    },
  },
};
</script>
<template>
  <nav class="gl-breadcrumbs" :aria-label="ariaLabel" :style="breadcrumbStyle">
    <b-breadcrumb class="gl-breadcrumb-list" v-bind="$attrs" v-on="$listeners">
      <li v-if="hasCollapsible" class="gl-breadcrumb-item">
        <gl-disclosure-dropdown
          :items="overflowingItems"
          :toggle-text="showMoreLabel"
          fluid-width
          text-sr-only
          no-caret
          icon="ellipsis_h"
          size="small"
          style="height: 16px"
        />
      </li>

      <!-- eslint-disable-next-line vue/valid-v-for (for @vue/compat) -->
      <gl-breadcrumb-item
        v-for="(item, index) in fittingItems"
        ref="breadcrumbs"
        :text="item.text"
        :href="item.href"
        :style="itemStyle"
        :to="item.to"
        :aria-current="getAriaCurrentAttr(index)"
        ><gl-avatar
          v-if="item.avatarPath"
          :src="item.avatarPath"
          :size="16"
          aria-hidden="true"
          class="gl-breadcrumb-avatar-tile gl-border gl-mr-2 gl-rounded-base!"
          shape="rect"
          data-testid="avatar"
        /><span>{{ item.text }}</span>
      </gl-breadcrumb-item>
    </b-breadcrumb>
  </nav>
</template>
