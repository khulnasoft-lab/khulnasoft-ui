<script>
import { BLink } from 'bootstrap-vue';
import { ENTER, SPACE } from '../constants';
import { stopEvent } from '../../../../utils/utils';
import { isItem } from './utils';
import { DISCLOSURE_DROPDOWN_ITEM_NAME } from './constants';

export const ITEM_CLASS = 'gl-new-dropdown-item';

export default {
  name: DISCLOSURE_DROPDOWN_ITEM_NAME,
  ITEM_CLASS,
  components: { BLink },
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
      return typeof this.item?.href === 'string' || typeof this.item?.to === 'string';
    },
    isCustomContent() {
      return Boolean(this.$scopedSlots.default);
    },
    itemComponent() {
      const { item } = this;

      if (this.isLink)
        return {
          is: BLink,
          attrs: {
            href: item.href,
            to: item.to,
            ...item.extraAttrs,
          },
          listeners: {
            click: this.action,
          },
        };

      return {
        is: 'button',
        attrs: {
          ...item?.extraAttrs,
          type: 'button',
        },
        listeners: {
          click: () => {
            item?.action?.call(undefined, item);
            this.action();
          },
        },
      };
    },
    listIndex() {
      return this.item?.extraAttrs?.disabled ? null : 0;
    },
    componentIndex() {
      return this.item?.extraAttrs?.disabled ? null : -1;
    },
    wrapperClass() {
      return this.item?.wrapperClass ?? '';
    },
    wrapperListeners() {
      const listeners = {
        keydown: this.onKeydown,
      };
      if (this.isCustomContent) {
        listeners.click = this.action;
      }
      return listeners;
    },
  },
  methods: {
    onKeydown(event) {
      const { code } = event;

      if (code === ENTER || code === SPACE) {
        if (this.isCustomContent) {
          this.action();
        } else {
          stopEvent(event);
          /** Instead of simply navigating or calling the action, we want
           * the `a/button` to be the target of the event as it might have additional attributes.
           * E.g. `a` might have `target` attribute.
           */
          const e = new MouseEvent('click', { bubbles: true, cancelable: true });
          if (this.isLink) {
            this.$refs.item.$el.dispatchEvent(e);
          } else {
            this.$refs.item?.dispatchEvent(e);
          }
        }
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
    :tabindex="listIndex"
    :class="[$options.ITEM_CLASS, wrapperClass]"
    data-testid="disclosure-dropdown-item"
    v-on="wrapperListeners"
  >
    <slot>
      <component
        :is="itemComponent.is"
        v-bind="itemComponent.attrs"
        ref="item"
        class="gl-new-dropdown-item-content"
        :tabindex="componentIndex"
        v-on="itemComponent.listeners"
      >
        <span class="gl-new-dropdown-item-text-wrapper">
          <slot name="list-item">
            {{ item.text }}
          </slot>
        </span>
      </component>
    </slot>
  </li>
</template>
