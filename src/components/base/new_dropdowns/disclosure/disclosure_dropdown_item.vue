<script>
import { ENTER, SPACE } from '../constants';
import { stopEvent } from '../../../../utils/utils';
import { isItem } from './utils';

export const ITEM_CLASS = 'gl-new-dropdown-item';

export default {
  ITEM_CLASS,
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
    isCustomContent() {
      return Boolean(this.$scopedSlots.default);
    },
    itemComponent() {
      const { item } = this;

      if (this.isLink)
        return {
          is: 'a',
          attrs: {
            href: item.href,
            ...item.extraAttrs,
          },
          listeners: {},
        };

      return {
        is: 'button',
        attrs: {
          ...item.extraAttrs,
          type: 'button',
        },
        listeners: {
          click: () => item.action?.call(undefined, item),
        },
      };
    },
  },
  methods: {
    onKeydown(event) {
      const { code } = event;

      if (code === ENTER || code === SPACE) {
        stopEvent(event);
        /** Instead of simply navigating or calling the action, we want
         * the `a/button` to be the target of the event as it might have additional attributes.
         * E.g. `a` might have `target` attribute.
         * `bubbles` is set to `true` as the parent `li` item has this event listener and thus we'll get a loop.
         */
        this.$refs.item?.dispatchEvent(new MouseEvent('click', { bubbles: false }));
        this.action();
      }
    },
    action() {
      this.$emit('action', this.item);
    },
  },
};
</script>

<template>
  <li
    tabindex="0"
    :class="$options.ITEM_CLASS"
    class="gl-new-dropdown-item"
    data-testid="disclosure-dropdown-item"
    @click="action"
    @keydown="onKeydown"
  >
    <div v-if="isCustomContent" class="gl-new-dropdown-item-content">
      <div class="gl-new-dropdown-item-text-wrapper">
        <slot></slot>
      </div>
    </div>

    <template v-else>
      <component
        :is="itemComponent.is"
        v-bind="itemComponent.attrs"
        ref="item"
        class="gl-new-dropdown-item-content"
        tabindex="-1"
        v-on="itemComponent.listeners"
      >
        <span class="gl-new-dropdown-item-text-wrapper">
          {{ item.text }}
        </span>
      </component>
    </template>
  </li>
</template>
