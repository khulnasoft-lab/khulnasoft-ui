<script>
import { isItem } from './utils';

export default {
  props: {
    item: {
      type: Object,
      required: false,
      default: null,
      validator: isItem,
    },
  },
  computed: {
    isLink() {
      return typeof this.item?.href === 'string';
    },
    itemComponent() {
      const { item } = this;

      if (this.isLink) {
        return {
          is: 'a',
          attrs: {
            href: item?.href,
            ...item?.extraAttrs,
          },
          listeners: {},
        };
      }

      return {
        is: 'button',
        attrs: {
          type: 'button',
          ...item?.extraAttrs,
        },
        listeners: {
          click: () => item?.action?.call(undefined, item),
        },
      };
    },
  },
};
</script>

<template>
  <component
    :is="itemComponent.is"
    v-bind="itemComponent.attrs"
    class="gl-new-dropdown-item-content"
    tabindex="-1"
    v-on="itemComponent.listeners"
  >
    <span class="gl-new-dropdown-item-text-wrapper">
      <slot>{{ item.text }}</slot>
    </span>
  </component>
</template>
