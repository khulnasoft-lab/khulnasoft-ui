<script>
import GlLink from '../../link/link.vue';
import { ENTER, SPACE } from '../constants';
import { stopEvent } from '../../../../utils/utils';
import { dropdownItemVariantOptions } from '../../../../utils/constants';
import { isItem } from './utils';
import { DISCLOSURE_DROPDOWN_ITEM_NAME } from './constants';

export const ITEM_CLASS = 'gl-new-dropdown-item';

export default {
  name: DISCLOSURE_DROPDOWN_ITEM_NAME,
  ITEM_CLASS,
  components: { GlLink },
  props: {
    item: {
      type: Object,
      required: false,
      default: null,
      validator: isItem,
    },
    /**
     * The variant of the dropdown item.
     */
    variant: {
      type: String,
      default: null,
      validator(value) {
        return dropdownItemVariantOptions[value] !== undefined;
      },
      required: false,
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
          is: GlLink,
          attrs: {
            href: item.href,
            to: item.to,
            variant: 'unstyled',
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
    itemVariant() {
      return this.variant || this.item?.variant;
    },
    classes() {
      return [
        this.$options.ITEM_CLASS,
        this.item?.wrapperClass ?? '',
        // This isn't a Tailwind class, so this lint rule isn't relevant.
        // It just so happens this class has the same prefix `gl-`.
        this.itemVariant && this.itemVariant !== 'default'
          ? // eslint-disable-next-line @gitlab/tailwind-no-interpolation
            `gl-new-dropdown-item-${this.itemVariant}`
          : '',
      ];
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
    :class="classes"
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
