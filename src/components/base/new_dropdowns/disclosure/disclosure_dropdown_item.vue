<script>
import { ENTER, SPACE } from '../constants';
import { stopEvent } from '../../../../utils/utils';
import { isItem } from './utils';
import GlDisclosureDropdownContent from './disclosure_dropdown_content.vue';

export const ITEM_CLASS = 'gl-new-dropdown-item';
export const ITEM_CONTENT_CLASS = 'gl-new-dropdown-item-content';

export default {
  ITEM_CLASS,
  components: {
    GlDisclosureDropdownContent,
  },
  props: {
    item: {
      type: Object,
      required: false,
      default: null,
      validator: isItem,
    },
  },
  computed: {
    itemContentEl() {
      return this.$el.querySelector(`.${ITEM_CONTENT_CLASS}`);
    },
    itemClass() {
      return [this.$options.ITEM_CLASS, this.item?.wrapperClass];
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
        this.itemContentEl?.dispatchEvent(
          new MouseEvent('click', { bubbles: true, cancelable: true })
        );
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
    :class="itemClass"
    data-testid="disclosure-dropdown-item"
    v-on="$listeners"
    @click="action"
    @keydown="onKeydown"
  >
    <slot>
      <gl-disclosure-dropdown-content :item="item" />
    </slot>
  </li>
</template>
