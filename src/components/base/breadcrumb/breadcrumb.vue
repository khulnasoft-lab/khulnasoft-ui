<script>
import { BBreadcrumb, BBreadcrumbItem } from 'bootstrap-vue';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    GlIcon,
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
      validator: (links) => {
        return links.every((link) => {
          const keys = Object.keys(link);
          return keys.includes('text') && (keys.includes('href') || keys.includes('to'));
        });
      },
    },
  },
  methods: {
    isLastItem(items, index) {
      return index === items.length - 1;
    },
  },
};
</script>
<template>
  <nav class="gl-breadcrumbs" aria-label="Breadcrumb">
    <!-- @slot The avatar to display. -->
    <slot name="avatar"></slot>
    <b-breadcrumb class="gl-breadcrumb-list" v-bind="$attrs" v-on="$listeners">
      <template v-for="(item, index) in items">
        <b-breadcrumb-item
          :key="index"
          class="gl-breadcrumb-item"
          :text="item.text"
          :href="item.href"
          :to="item.to"
        >
          <span>{{ item.text }}</span>
          <span
            v-if="!isLastItem(items, index)"
            :key="`${index} ${item.text}`"
            class="gl-breadcrumb-separator"
            data-testid="separator"
          >
            <!-- @slot The separator to display. -->
            <slot name="separator">
              <gl-icon name="chevron-right" />
            </slot>
          </span>
        </b-breadcrumb-item>
      </template>
    </b-breadcrumb>
  </nav>
</template>
