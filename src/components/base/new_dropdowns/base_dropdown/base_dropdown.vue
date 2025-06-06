<script>
import uniqueId from 'lodash/uniqueId';
import {
  arrow,
  computePosition,
  autoUpdate,
  offset,
  size,
  autoPlacement,
  shift,
} from '@floating-ui/dom';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownPlacements,
  dropdownAllowedAutoPlacements,
  dropdownVariantOptions,
} from '../../../../utils/constants';
import {
  GL_DROPDOWN_SHOWN,
  GL_DROPDOWN_HIDDEN,
  GL_DROPDOWN_BEFORE_CLOSE,
  GL_DROPDOWN_FOCUS_CONTENT,
  ENTER,
  SPACE,
  ARROW_DOWN,
  GL_DROPDOWN_CONTENTS_CLASS,
  POSITION_ABSOLUTE,
  POSITION_FIXED,
} from '../constants';
import { logWarning, isElementTabbable, isElementFocusable } from '../../../../utils/utils';
import { OutsideDirective } from '../../../../directives/outside/outside';
import GlButton from '../../button/button.vue';
import GlIcon from '../../icon/icon.vue';
import { ARROW_X_MINIMUM, DEFAULT_OFFSET, FIXED_WIDTH_CLASS } from './constants';

export const BASE_DROPDOWN_CLASS = 'gl-new-dropdown';

export default {
  name: 'BaseDropdown',
  BASE_DROPDOWN_CLASS,
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
      default: 'bottom-start',
      validator: (value) => {
        if (['left', 'center', 'right'].includes(value)) {
          logWarning(
            `GlDisclosureDropdown/GlCollapsibleListbox: "${value}" placement is deprecated.
            Use ${dropdownPlacements[value]} instead.`
          );
        }

        return Object.keys(dropdownPlacements).includes(value);
      },
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
    /**
     * Strategy to be applied by computePosition. If this is set to fixed, the dropdown's position
     * needs to be set to fixed in CSS as well.
     * https://floating-ui.com/docs/computePosition#strategy
     */
    positioningStrategy: {
      type: String,
      required: false,
      default: POSITION_ABSOLUTE,
      validator: (strategy) => [POSITION_ABSOLUTE, POSITION_FIXED].includes(strategy),
    },
  },
  data() {
    return {
      openedYet: false,
      visible: false,
      baseDropdownId: uniqueId('base-dropdown-'),
    };
  },
  computed: {
    hasNoVisibleToggleText() {
      return !this.toggleText?.length || this.textSrOnly;
    },
    isIconOnly() {
      return Boolean(this.icon && this.hasNoVisibleToggleText);
    },
    isEllipsisButton() {
      return this.isIconOnly && this.icon === 'ellipsis_h';
    },
    isCaretOnly() {
      return !this.noCaret && !this.icon && this.hasNoVisibleToggleText;
    },
    ariaAttributes() {
      return {
        'aria-haspopup': this.ariaHaspopup,
        'aria-expanded': String(this.visible),
        'aria-controls': this.baseDropdownId,
        'aria-labelledby': this.toggleLabelledBy,
      };
    },
    toggleButtonClasses() {
      return [
        this.toggleClass,
        {
          'gl-new-dropdown-toggle': true,
          'button-ellipsis-horizontal': this.isEllipsisButton,
          'gl-new-dropdown-icon-only btn-icon': this.isIconOnly && !this.isEllipsisButton,
          'gl-new-dropdown-toggle-no-caret': this.noCaret,
          'gl-new-dropdown-caret-only btn-icon': this.isCaretOnly,
        },
      ];
    },
    toggleButtonTextClasses() {
      return this.block ? 'gl-w-full' : '';
    },
    toggleLabelledBy() {
      return this.ariaLabelledby ? `${this.ariaLabelledby} ${this.toggleId}` : undefined;
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
            click: (event) => this.toggle(event),
          },
        };
      }

      return {
        is: 'div',
        class: 'gl-new-dropdown-custom-toggle',
        listeners: {
          keydown: (event) => this.onKeydown(event),
          click: (event) => this.toggle(event),
        },
      };
    },
    toggleListeners() {
      return this.toggleOptions.listeners;
    },

    toggleAttributes() {
      const { listeners, is, ...attributes } = this.toggleOptions;

      return attributes;
    },
    toggleComponent() {
      return this.toggleOptions.is;
    },
    toggleElement() {
      return this.$refs.toggle.$el || this.$refs.toggle?.firstElementChild;
    },
    panelClasses() {
      return {
        '!gl-block': this.visible,
        [FIXED_WIDTH_CLASS]: !this.fluidWidth,
        'gl-fixed': this.openedYet && this.isFixed,
        'gl-absolute': this.openedYet && !this.isFixed,
      };
    },
    isFixed() {
      return this.positioningStrategy === POSITION_FIXED;
    },
    floatingUIConfig() {
      const placement = dropdownPlacements[this.placement];
      const [, alignment] = placement.split('-');
      return {
        placement,
        strategy: this.positioningStrategy,
        middleware: [
          offset(this.offset),
          autoPlacement({
            alignment,
            allowedPlacements: dropdownAllowedAutoPlacements[this.placement],
          }),
          shift(),
          arrow({ element: this.$refs.dropdownArrow }),
          size({
            apply: ({ availableWidth, availableHeight, elements }) => {
              const contentsEl = elements.floating.querySelector(`.${GL_DROPDOWN_CONTENTS_CLASS}`);
              if (!contentsEl) return;

              const contentsAvailableHeight =
                availableHeight - (this.nonScrollableContentHeight ?? 0) - DEFAULT_OFFSET;

              const maxWidth = this.fluidWidth
                ? {
                    maxWidth: `${Math.max(0, availableWidth)}px`,
                  }
                : {};

              Object.assign(
                contentsEl.style,
                {
                  maxHeight: `${Math.max(contentsAvailableHeight, 0)}px`,
                },
                maxWidth
              );
            },
          }),
        ],
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
    this.checkToggleFocusable();
  },
  beforeDestroy() {
    this.stopFloating();
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
    getArrowOffsets(actualPlacement) {
      // Try to extract the base direction (top, bottom, left, right) from the placement
      const direction = actualPlacement?.split('-')[0];

      const offsetConfigs = {
        top: {
          staticSide: 'bottom',
          rotation: '225deg',
        },
        bottom: {
          staticSide: 'top',
          rotation: '45deg',
        },
        left: {
          staticSide: 'right',
          rotation: '135deg',
        },
        right: {
          staticSide: 'left',
          rotation: '315deg',
        },
      };

      return offsetConfigs[direction] || offsetConfigs.bottom;
    },

    async startFloating() {
      this.calculateNonScrollableAreaHeight();
      this.observer = new MutationObserver(this.calculateNonScrollableAreaHeight);
      this.observer.observe(this.$refs.content, { childList: true, subtree: true });

      this.stopAutoUpdate = autoUpdate(this.toggleElement, this.$refs.content, async () => {
        const result = await computePosition(
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

        const { x, y, middlewareData, placement } = result;

        // Get offsets based on actual placement, not requested placement
        const { rotation, staticSide } = this.getArrowOffsets(placement);

        // Assign dropdown window position
        Object.assign(this.$refs.content.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        // Assign arrow position
        if (middlewareData && middlewareData.arrow) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;

          /**
           * Clamp arrow X position to a minimum of 24px from the edge of the dropdown.
           * This prevents wide toggles from pushing the arrow to the very edge of the dropdown.
           */
          const toggleRect = this.toggleElement.getBoundingClientRect();
          const contentRect = this.$refs.content.getBoundingClientRect();
          const clampedArrowX =
            toggleRect.width > contentRect.width
              ? Math.min(Math.max(arrowX, ARROW_X_MINIMUM), contentRect.width - ARROW_X_MINIMUM)
              : arrowX;

          Object.assign(this.$refs.dropdownArrow.style, {
            left: arrowX != null ? `${clampedArrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
            transform: `rotate(${rotation})`,
          });
        }
      });
    },
    stopFloating() {
      this.observer?.disconnect();
      this.stopAutoUpdate?.();
    },
    async toggle(event) {
      if (event && this.visible) {
        let prevented = false;
        this.$emit(GL_DROPDOWN_BEFORE_CLOSE, {
          originalEvent: event,
          preventDefault() {
            prevented = true;
          },
        });
        if (prevented) return false;
      }
      this.visible = !this.visible;

      if (this.visible) {
        // The dropdown needs to be actually visible before we compute its position with Floating UI.
        await this.$nextTick();
        this.openedYet = true;
        /**
         * We wait until the dropdown's position has been computed before emitting the `shown` event.
         * This ensures that, if the parent component attempts to focus an inner element, the dropdown
         * is already properly placed in the page. Otherwise, the page would scroll back to the top.
         */
        this.startFloating();

        this.$emit(GL_DROPDOWN_SHOWN);
      } else {
        this.stopFloating();
        this.$emit(GL_DROPDOWN_HIDDEN);
      }

      // this is to check whether `toggle` was prevented or not
      return true;
    },
    open() {
      if (this.visible) {
        return;
      }
      this.toggle();
    },
    close(event) {
      if (!this.visible) {
        return;
      }
      this.toggle(event);
    },
    /**
     * Closes the dropdown and returns the focus to the toggle unless it has has moved outside
     * of the dropdown, meaning that the consumer needed to put some other element in focus.
     *
     * @param {KeyboardEvent?} event The keyboard event that caused the dropdown to close.
     */
    async closeAndFocus(event) {
      if (!this.visible) {
        return;
      }

      const hadFocusWithin = this.$el.contains(document.activeElement);
      const hasToggled = await this.toggle(event);

      if (!hadFocusWithin) {
        return;
      }

      if (hasToggled) {
        this.focusToggle();
      }
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
        this.toggle(event);
      }

      if (code === ARROW_DOWN) {
        this.$emit(GL_DROPDOWN_FOCUS_CONTENT, event);
      }
    },
    calculateNonScrollableAreaHeight() {
      const scrollableArea = this.$refs.content?.querySelector(`.${GL_DROPDOWN_CONTENTS_CLASS}`);
      if (!scrollableArea) return;

      const floatingElementBoundingBox = this.$refs.content.getBoundingClientRect();
      const scrollableAreaBoundingBox = scrollableArea.getBoundingClientRect();
      this.nonScrollableContentHeight =
        floatingElementBoundingBox.height - scrollableAreaBoundingBox.height;
    },
  },
};
</script>

<template>
  <div
    v-outside.click.focusin="close"
    :class="[$options.BASE_DROPDOWN_CLASS, { '!gl-block': block }]"
  >
    <component
      :is="toggleComponent"
      v-bind="toggleAttributes"
      :id="toggleId"
      ref="toggle"
      data-testid="base-dropdown-toggle"
      v-on="toggleListeners"
      @keydown.esc.stop.prevent="close"
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
      <div ref="dropdownArrow" class="gl-new-dropdown-arrow"></div>
      <div class="gl-new-dropdown-inner">
        <slot :visible="visible"></slot>
      </div>
    </div>
  </div>
</template>
