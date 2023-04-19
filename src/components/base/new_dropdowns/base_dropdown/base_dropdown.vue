<script>
import uniqueId from 'lodash/uniqueId';
import { computePosition, autoUpdate, offset } from '@floating-ui/dom';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownPlacements,
  dropdownVariantOptions,
} from '../../../../utils/constants';
import {
  GL_DROPDOWN_SHOWN,
  GL_DROPDOWN_HIDDEN,
  GL_DROPDOWN_FOCUS_CONTENT,
  ENTER,
  SPACE,
  ARROW_DOWN,
} from '../constants';
import { logWarning, isElementTabbable, isElementFocusable } from '../../../../utils/utils';

import GlButton from '../../button/button.vue';
import GlIcon from '../../icon/icon.vue';
import { OutsideDirective } from '../../../../directives/outside/outside';
import { DEFAULT_OFFSET, FIXED_WIDTH_CLASS } from './constants';

export default {
  name: 'BaseDropdown',
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
    /**
     * Custom value to be passed to the offset middleware.
     * https://floating-ui.com/docs/offset
     */
    offset: {
      type: [Number, Object],
      required: false,
      default: () => ({ mainAxis: DEFAULT_OFFSET }),
    },
    fluidWidth: {
      type: Boolean,
      required: false,
      default: false,
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
            keydown: (event) => this.onKeydown(event),
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
    panelClasses() {
      return {
        'gl-display-block!': this.visible,
        [FIXED_WIDTH_CLASS]: !this.fluidWidth,
      };
    },
    floatingUIConfig() {
      return {
        placement: dropdownPlacements[this.placement],
        middleware: [offset(this.offset)],
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
    this.stopAutoUpdate = autoUpdate(this.toggleElement, this.$refs.content, async () => {
      const { x, y } = await computePosition(
        this.toggleElement,
        this.$refs.content,
        this.floatingUIConfig
      );

      /**
       * Due to the asynchronous nature of computePosition, it's technically possible for the
       * component to have been destroyed by the time the promise resolves. In such case, we exit
       * early to prevent a TypeError.
       */
      if (!this.$refs.content) return;

      Object.assign(this.$refs.content.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
    this.checkToggleFocusable();
  },
  beforeDestroy() {
    this.stopAutoUpdate();
  },
  methods: {
    checkToggleFocusable() {
      if (!isElementFocusable(this.toggleElement) && !isElementTabbable(this.toggleElement)) {
        logWarning(
          `GlDisclosureDropdown/GlCollapsibleListbox: Toggle is missing a 'tabindex' and cannot be focused.
          Use 'a' or 'button' element instead or make sure to add 'role="button"' along with 'tabindex' otherwise.`,
          this.$el
        );
      }
    },
    async toggle() {
      this.visible = !this.visible;

      if (this.visible) {
        /**
         * We need to delay the `GL_DROPDOWN_SHOWN` event's emission by one tick to ensure that the
         * floating element actually is visible. Otherwise, logic that depends on the panel being
         * visible in the parent might not work properly (i.e. `GlListbox`'s auto-focus behavior').
         */
        await this.$nextTick();
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
      const {
        code,
        target: { tagName },
      } = event;

      let toggleOnEnter = true;
      let toggleOnSpace = true;

      if (tagName === 'BUTTON') {
        toggleOnEnter = false;
        toggleOnSpace = false;
      } else if (tagName === 'A') {
        toggleOnEnter = false;
      }

      if ((code === ENTER && toggleOnEnter) || (code === SPACE && toggleOnSpace)) {
        this.toggle();
      }

      if (code === ARROW_DOWN) {
        this.$emit(GL_DROPDOWN_FOCUS_CONTENT, event);
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
      :class="panelClasses"
      @keydown.esc.stop.prevent="closeAndFocus"
    >
      <div class="gl-new-dropdown-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
