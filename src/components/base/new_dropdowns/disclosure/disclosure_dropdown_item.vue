<script>
import { ENTER, SPACE } from '../constants';
import { stopEvent } from '../../../../utils/utils';
import { isItem } from './utils';
import { DISCLOSURE_DROPDOWN_ITEM_NAME } from './constants';
import { newDropdownVariantOptions } from '../../../../utils/constants';

export const ITEM_CLASS = 'gl-new-dropdown-item';

export default {
  name: DISCLOSURE_DROPDOWN_ITEM_NAME,
  ITEM_CLASS,
  props: {
    item: {
      type: Object,
      required: false,
      default: null,
      validator: isItem,
    },
    variant: {
      type: String,
      default: newDropdownVariantOptions.default,
      validator(value) {
        return newDropdownVariantOptions[value] !== undefined;
      },
      required: false,
    },
  },
  computed: {
    isLink() {
      return typeof this.item?.href === 'string';
    },
    isCustomContent() {
      return Boolean(this.$scopedSlots.default);
    },
    isDanger() {
      return this.variant === newDropdownVariantOptions.danger;
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
          this.$refs.item?.dispatchEvent(
            new MouseEvent('click', { bubbles: true, cancelable: true })
          );
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
    :class="{ 'gl-danger': isDanger }"
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
