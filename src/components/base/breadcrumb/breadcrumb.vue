<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BBreadcrumb } from 'bootstrap-vue';
import GlButton from '../button/button.vue';
import GlAvatar from '../avatar/avatar.vue';
import { GlTooltipDirective } from '../../../directives/tooltip';
import GlBreadcrumbItem from './breadcrumb_item.vue';

export const COLLAPSE_AT_SIZE = 4;

export default {
  name: 'GlBreadcrumb',
  components: {
    BBreadcrumb,
    GlButton,
    GlBreadcrumbItem,
    GlAvatar,
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
  },
  data() {
    return {
      isListCollapsed: true,
    };
  },
  computed: {
    breadcrumbsSize() {
      return this.items.length;
    },
    hasCollapsible() {
      return this.breadcrumbsSize > COLLAPSE_AT_SIZE;
    },
    nonCollapsibleIndices() {
      return [0, this.breadcrumbsSize - 1, this.breadcrumbsSize - 2];
    },
  },
  methods: {
    isFirstItem(index) {
      return index === 0;
    },
    isLastItem(index) {
      return index === this.breadcrumbsSize - 1;
    },
    expandBreadcrumbs() {
      this.isListCollapsed = false;

      try {
        this.$refs.firstItem[0].querySelector('a').focus();
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error(`Failed to set focus on the first breadcrumb item.`);
      }
    },
    showCollapsedBreadcrumbsExpander(index) {
      return index === 0 && this.hasCollapsible && this.isListCollapsed;
    },
    isItemCollapsed(index) {
      return (
        this.hasCollapsible && this.isListCollapsed && !this.nonCollapsibleIndices.includes(index)
      );
    },
    getAriaCurrentAttr(index) {
      return this.isLastItem(index) ? 'page' : false;
    },
  },
};
</script>
<template>
  <nav class="gl-breadcrumbs" aria-label="Breadcrumb">
    <b-breadcrumb class="gl-breadcrumb-list" v-bind="$attrs" v-on="$listeners">
      <template v-for="(item, index) in items">
        <!-- eslint-disable-next-line vue/valid-v-for (for @vue/compat) -->
        <gl-breadcrumb-item
          v-show="!isItemCollapsed(index)"
          :ref="isFirstItem(index) ? 'firstItem' : null"
          :text="item.text"
          :href="item.href"
          :to="item.to"
          :aria-current="getAriaCurrentAttr(index)"
          ><gl-avatar
            v-if="item.avatarPath"
            :src="item.avatarPath"
            :size="16"
            aria-hidden="true"
            class="gl-breadcrumb-avatar-tile gl-border gl-ml-n1 gl-rounded-base!"
            shape="rect"
            data-testid="avatar"
          /><span>{{ item.text }}</span>
        </gl-breadcrumb-item>

        <template v-if="showCollapsedBreadcrumbsExpander(index)">
          <!-- eslint-disable-next-line vue/require-v-for-key (for @vue/compat) -->
          <li class="gl-breadcrumb-item">
            <gl-button
              v-gl-tooltip.hover="'Show all breadcrumbs'"
              aria-label="Show all breadcrumbs"
              data-testid="collapsed-expander"
              icon="ellipsis_h"
              category="primary"
              @click="expandBreadcrumbs"
            />
          </li>
        </template>
      </template>
    </b-breadcrumb>
  </nav>
</template>
