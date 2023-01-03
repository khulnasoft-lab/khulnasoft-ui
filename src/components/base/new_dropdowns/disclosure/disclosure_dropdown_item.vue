<script>
import { ENTER, SPACE } from '../constants';
import { stopEvent } from '../../../../utils/utils';
import { isItem } from './utils';

export const ITEM_CLASS = 'gl-dropdown-item';

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
    isActionItem() {
      return this.item?.action;
    },
    isCustomContent() {
      return Boolean(this.$scopedSlots.default);
    },
    itemComponent() {
      if (this.isActionItem)
        return {
          is: 'button',
          attrs: {
            ...this.item.extraAttrs,
          },
          listeners: {
            click: () => this.item.action(),
          },
        };
      return {
        is: 'a',
        attrs: {
          href: this.item.href,
          ...this.item.extraAttrs,
        },
        listeners: {},
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
    class="gl-dropdown-item gl-focusable-dropdown-item"
    data-testid="disclosure-dropdown-item"
    @click="action"
    @keydown="onKeydown"
  >
    <div v-if="isCustomContent" class="dropdown-item">
      <div class="gl-dropdown-item-text-wrapper">
        <slot></slot>
      </div>
    </div>

    <template v-else>
      <component
        :is="itemComponent.is"
        v-bind="itemComponent.attrs"
        ref="item"
        class="dropdown-item"
        tabindex="-1"
        v-on="itemComponent.listeners"
      >
        <span class="gl-dropdown-item-text-wrapper">
          {{ item.text }}
        </span>
      </component>
    </template>
  </li>
</template>
