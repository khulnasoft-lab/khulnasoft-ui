<script>
import uniqueId from 'lodash/uniqueId';
import { createPopper } from '@popperjs/core';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownPlacements,
  dropdownVariantOptions,
} from '../../../../utils/constants';
import { POPPER_CONFIG, GL_DROPDOWN_SHOWN, GL_DROPDOWN_HIDDEN, ENTER, SPACE } from '../constants';
import { logWarning, isElementTabbable, isElementFocusable } from '../../../../utils/utils';

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
    block: {
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
    placement: {
      type: String,
      required: false,
      default: 'left',
      validator: (value) => Object.keys(dropdownPlacements).includes(value),
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
      baseDropdownId: uniqueId('base-dropdown-'),
    };
  },
  computed: {
    isIconOnly() {
      return Boolean(this.icon && (!this.toggleText?.length || this.textSrOnly));
    },
    ariaAttributes() {
      return {
        'aria-haspopup': this.ariaHaspopup,
        'aria-expanded': this.visible,
        'aria-controls': this.baseDropdownId,
        'aria-labelledby': this.toggleLabelledBy,
      };
    },
    toggleButtonClasses() {
      return [
        this.toggleClass,
        {
          'gl-new-dropdown-toggle': true,
          'gl-new-dropdown-icon-only': this.isIconOnly,
          'gl-new-dropdown-toggle-no-caret': this.noCaret,
        },
      ];
    },
    toggleButtonTextClasses() {
      return this.block ? 'gl-w-full' : '';
    },
    toggleLabelledBy() {
      return this.ariaLabelledby ? `${this.ariaLabelledby} ${this.toggleId}` : this.toggleId;
    },
    isDefaultToggle() {
      return !this.$scopedSlots.toggle;
    },
    toggleOptions() {
      if (this.isDefaultToggle) {
        return {
          is: GlButton,
          icon: this.icon,
          block: this.block,
          buttonTextClasses: this.toggleButtonTextClasses,
          category: this.category,
          variant: this.variant,
          size: this.size,
          disabled: this.disabled,
          loading: this.loading,
          class: this.toggleButtonClasses,
          ...this.ariaAttributes,
          listeners: {
            click: () => this.toggle(),
          },
        };
      }

      return {
        is: 'div',
        class: 'gl-new-dropdown-custom-toggle',
        listeners: {
          keydown: (event) => this.onKeydown(event),
          click: () => this.toggle(),
        },
      };
    },
    toggleElement() {
      return this.$refs.toggle.$el || this.$refs.toggle?.firstElementChild;
    },
    popperConfig() {
      return {
        placement: dropdownPlacements[this.placement],
        ...POPPER_CONFIG,
      };
    },
  },
  watch: {
    ariaAttributes: {
      deep: true,
      handler(ariaAttributes) {
        if (this.$scopedSlots.toggle) {
          Object.keys(ariaAttributes).forEach((key) => {
            this.toggleElement.setAttribute(key, ariaAttributes[key]);
          });
        }
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.popper = createPopper(this.toggleElement, this.$refs.content, this.popperConfig);
    });
    this.checkToggleFocusable();
  },
  beforeDestroy() {
    this.popper.destroy();
  },
  methods: {
    checkToggleFocusable() {
      if (!isElementFocusable(this.toggleElement) && !isElementTabbable(this.toggleElement)) {
        logWarning(
          `GlDisclosureDropdown/GlCollapsibleListbox: Toggle is missing a 'tabindex' and cannot be focused.
          Use 'a' or 'button' element instead or make sure to add 'role="button"' along with 'tabindex' otherwise.`
        );
      }
    },
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
          e.g. set focus.
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
      this.toggleElement.focus();
    },
    onKeydown(event) {
      const { code } = event;

      if (code === ENTER || code === SPACE) {
        this.toggle();
      }
    },
  },
};
</script>

<template>
  <div v-outside="close" class="gl-new-dropdown" :class="{ 'gl-display-block!': block }">
    <component
      :is="toggleOptions.is"
      v-bind="toggleOptions"
      :id="toggleId"
      ref="toggle"
      data-testid="base-dropdown-toggle"
      v-on="toggleOptions.listeners"
    >
      <!-- @slot Custom toggle button content -->
      <slot name="toggle">
        <span class="gl-new-dropdown-button-text" :class="{ 'gl-sr-only': textSrOnly }">
          {{ toggleText }}
        </span>
        <gl-icon
          v-if="!noCaret"
          class="gl-button-icon gl-new-dropdown-chevron"
          name="chevron-down"
        />
      </slot>
    </component>

    <div
      :id="baseDropdownId"
      ref="content"
      data-testid="base-dropdown-menu"
      class="gl-new-dropdown-panel"
      :class="{ 'gl-display-block!': visible }"
      @keydown.esc.stop.prevent="closeAndFocus"
    >
      <div class="gl-new-dropdown-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
