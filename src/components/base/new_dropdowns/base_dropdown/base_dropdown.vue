<script>
import { createPopper } from '@popperjs/core';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownVariantOptions,
} from '../../../../utils/constants';
import { POPPER_CONFIG, GL_DROPDOWN_SHOWN, GL_DROPDOWN_HIDDEN } from '../constants';

import GlButton from '../../button/button.vue';
import GlIcon from '../../icon/icon.vue';
import { OutsideDirective } from '../../../../directives/outside/outside';

export default {
  components: {
    GlButton,
    GlIcon,
  },
  directives: { Outside: OutsideDirective },
  props: {
    toggleText: {
      type: String,
      required: false,
      default: '',
    },
    textSrOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    category: {
      type: String,
      required: false,
      default: buttonCategoryOptions.primary,
      validator: (value) => Object.keys(buttonCategoryOptions).includes(value),
    },
    variant: {
      type: String,
      required: false,
      default: dropdownVariantOptions.default,
      validator: (value) => Object.keys(dropdownVariantOptions).includes(value),
    },
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator: (value) => Object.keys(buttonSizeOptions).includes(value),
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    toggleClass: {
      type: [String, Array, Object],
      required: false,
      default: null,
    },
    noCaret: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Right align dropdown menu with respect to the toggle button
     */
    right: {
      type: Boolean,
      required: false,
      default: false,
    },
    // ARIA props
    ariaHaspopup: {
      type: [String, Boolean],
      required: false,
      default: false,
      validator: (value) => {
        return ['menu', 'listbox', 'tree', 'grid', 'dialog', true, false].includes(value);
      },
    },
    /**
     * Id that will be referenced by `aria-labelledby` attribute of the dropdown content`
     */
    toggleId: {
      type: String,
      required: true,
    },
    /**
     * The `aria-labelledby` attribute value for the  toggle `button`
     */
    ariaLabelledby: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    isIconOnly() {
      return Boolean(this.icon && (!this.toggleText?.length || this.textSrOnly));
    },
    isIconWithText() {
      return Boolean(this.icon && this.toggleText?.length && !this.textSrOnly);
    },
    toggleButtonClasses() {
      return [
        this.toggleClass,
        {
          'gl-dropdown-toggle': true,
          'dropdown-toggle': true,
          'dropdown-icon-only': this.isIconOnly,
          'dropdown-icon-text': this.isIconWithText,
          'dropdown-toggle-no-caret': this.noCaret,
        },
      ];
    },
    toggleLabelledBy() {
      return this.ariaLabelledby ? `${this.ariaLabelledby} ${this.toggleId}` : this.toggleId;
    },
    popperConfig() {
      return {
        placement: this.right ? 'bottom-end' : 'bottom-start',
        ...POPPER_CONFIG,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.popper = createPopper(this.$refs.toggle.$el, this.$refs.content, this.popperConfig);
    });
  },
  beforeDestroy() {
    this.popper.destroy();
  },
  methods: {
    async toggle() {
      this.visible = !this.visible;

      if (this.visible) {
        /* Initially dropdown is hidden with `display="none"`.
          When `visible` prop is toggled ON, with the `nextTick` we wait for the DOM update -
          dropdown's `display="block"` is set (adding CSS class `show`).
          After that we can recalculate its position (calling `popper.update()`).
          https://github.com/floating-ui/floating-ui/issues/630:
          "Unfortunately there's not any way to compute the position of an element not rendered in the document".
          Then we `await` while the new dropdown position is calculated and DOM updated accordingly.
          After we can  emit the `GL_DROPDOWN_SHOWN` event to the parent which might interact with updated  dropdown,
          e.g. set focus..
         */
        await this.$nextTick();
        await this.popper?.update();
        this.$emit(GL_DROPDOWN_SHOWN);
      } else {
        this.$emit(GL_DROPDOWN_HIDDEN);
      }
    },
    open() {
      if (this.visible) {
        return;
      }
      this.toggle();
    },
    close() {
      if (!this.visible) {
        return;
      }
      this.toggle();
    },
    closeAndFocus() {
      if (!this.visible) {
        return;
      }
      this.toggle();
      this.focusToggle();
    },
    focusToggle() {
      this.$refs.toggle.$el.focus();
    },
  },
};
</script>

<template>
  <div v-outside="close" class="gl-dropdown dropdown btn-group">
    <gl-button
      :id="toggleId"
      ref="toggle"
      data-testid="base-dropdown-toggle"
      :icon="icon"
      :category="category"
      :variant="variant"
      :size="size"
      :disabled="disabled"
      :loading="loading"
      :class="toggleButtonClasses"
      :aria-haspopup="ariaHaspopup"
      :aria-expanded="visible"
      :aria-labelledby="toggleLabelledBy"
      @click="toggle"
    >
      <span class="gl-dropdown-button-text" :class="{ 'gl-sr-only': textSrOnly }">
        {{ toggleText }}
      </span>
      <gl-icon v-if="!noCaret" class="gl-button-icon dropdown-chevron" name="chevron-down" />
    </gl-button>

    <div
      ref="content"
      data-testid="base-dropdown-menu"
      class="dropdown-menu"
      :class="{ show: visible }"
      @keydown.esc.stop.prevent="closeAndFocus"
    >
      <div class="gl-dropdown-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
