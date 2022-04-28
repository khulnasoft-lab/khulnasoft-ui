<script>
import { clamp, uniqueId } from 'lodash';
import { stopEvent } from '../../../../utils/utils';
import {
  GL_DROPDOWN_SHOWN,
  GL_DROPDOWN_HIDDEN,
  HOME,
  END,
  ARROW_DOWN,
  ARROW_UP,
} from '../constants';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownVariantOptions,
} from '../../../../utils/constants';
import GlBaseDropdown from '../base_dropdown/base_dropdown.vue';
import GlListboxItem from './listbox_item.vue';

export const ITEM_SELECTOR = '[role="option"]';

export default {
  events: {
    GL_DROPDOWN_SHOWN,
    GL_DROPDOWN_HIDDEN,
  },
  components: {
    GlBaseDropdown,
    GlListboxItem,
  },
  model: {
    prop: 'selected',
    event: 'select',
  },
  props: {
    /**
     * Items to display in the dropdown
     */
    items: {
      type: Array,
      required: false,
      default: () => [],
      validator: (items) => {
        return items.every(({ value }) => typeof value === 'string');
      },
    },
    /**
     * array of selected items values for multi-select and selected item value for single-select
     */
    selected: {
      type: [Array, String, Number],
      required: false,
      default: () => [],
    },
    /**
     * Allow multi-selection
     */
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Toggle button text
     */
    toggleText: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Toggle text to be read by screen readers only
     */
    textSrOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Styling option - dropdown's toggle category
     */
    category: {
      type: String,
      required: false,
      default: buttonCategoryOptions.primary,
      validator: (value) => Object.keys(buttonCategoryOptions).includes(value),
    },
    /**
     * Styling option - dropdown's toggle variant
     */
    variant: {
      type: String,
      required: false,
      default: dropdownVariantOptions.default,
      validator: (value) => Object.keys(dropdownVariantOptions).includes(value),
    },
    /**
     * The size of the dropdown toggle
     */
    size: {
      type: String,
      required: false,
      default: buttonSizeOptions.medium,
      validator: (value) => Object.keys(buttonSizeOptions).includes(value),
    },
    /**
     * Icon name that will be rendered in the toggle button
     */
    icon: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Set to "true" to disable the dropdown
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Set to "true" when dropdown content (items) is loading
     */
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Additional CSS classes to customize toggle appearance
     */
    toggleClass: {
      type: [String, Array, Object],
      required: false,
      default: null,
    },
    /**
     * Set to "true" to hide the caret
     */
    noCaret: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Right align listbox menu with respect to the toggle button
     */
    right: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * The `aria-labelledby` attribute value for the toggle button
     */
    ariaLabelledby: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      selectedValues: [],
      toggleId: uniqueId('dropdown-toggle-btn-'),
      nextFocusedItemIndex: null,
    };
  },
  computed: {
    listboxToggleText() {
      if (!this.toggleText) {
        if (!this.multiple && this.selectedValues.length) {
          return this.items.find(({ value }) => value === this.selectedValues[0])?.text;
        }
        return '';
      }

      return this.toggleText;
    },
    selectedIndices() {
      return this.selectedValues
        .map((selected) => this.items.findIndex(({ value }) => value === selected))
        .sort();
    },
  },
  watch: {
    selected: {
      immediate: true,
      handler(newSelected) {
        if (Array.isArray(newSelected)) {
          if (!this.multiple && newSelected.length) {
            throw new Error('To allow multi-selection, please, set "multiple" property to "true"');
          }
          this.selectedValues = [...newSelected];
        } else {
          this.selectedValues = [newSelected];
        }
      },
    },
  },
  methods: {
    onShow() {
      this.$nextTick(() => {
        this.focusItem(this.selectedIndices[0] ?? 0, this.getFocusableListItemElements());
        /**
         * Emitted when dropdown is shown
         *
         * @event shown
         */
        this.$emit(GL_DROPDOWN_SHOWN);
      });
    },
    onHide() {
      /**
       * Emitted when dropdown is hidden
       *
       * @event hidden
       */
      this.$emit(GL_DROPDOWN_HIDDEN);
      this.nextFocusedItemIndex = null;
    },
    onKeydown(event) {
      const { code } = event;
      const elements = this.getFocusableListItemElements();

      if (elements.length < 1) return;

      let stop = true;

      if (code === HOME) {
        this.focusItem(0, elements);
      } else if (code === END) {
        this.focusItem(elements.length - 1, elements);
      } else if (code === ARROW_UP) {
        this.focusNextItem(event, elements, -1);
      } else if (code === ARROW_DOWN) {
        this.focusNextItem(event, elements, 1);
      } else {
        stop = false;
      }

      if (stop) {
        stopEvent(event);
      }
    },
    getFocusableListItemElements() {
      const items = this.$refs.list.querySelectorAll(ITEM_SELECTOR);
      return Array.from(items);
    },
    focusNextItem(event, elements, offset) {
      const { target } = event;
      const currentIndex = elements.indexOf(target);
      const nextIndex = clamp(currentIndex + offset, 0, elements.length - 1);

      this.focusItem(nextIndex, elements);
    },
    focusItem(index, elements) {
      this.nextFocusedItemIndex = index;

      this.$nextTick(() => {
        elements[index]?.focus();
      });
    },
    onSelect({ value }, isSelected) {
      if (this.multiple) {
        this.onMultiSelect(value, isSelected);
      } else {
        this.onSingleSelect(value, isSelected);
      }
    },
    isSelected(item) {
      return this.selectedValues.some((value) => value === item.value);
    },
    onSingleSelect(value, isSelected) {
      if (isSelected) {
        /**
         * Emitted when selection is changed
         *
         * @event select
         */
        this.$emit('select', value);
      }

      this.$refs.baseDropdown.closeAndFocus();
    },
    onMultiSelect(value, isSelected) {
      if (isSelected) {
        this.$emit('select', [...this.selectedValues, value]);
      } else {
        this.$emit(
          'select',
          this.selectedValues.filter((selectedValue) => selectedValue !== value)
        );
      }
    },
  },
};
</script>

<template>
  <gl-base-dropdown
    ref="baseDropdown"
    aria-haspopup="listbox"
    :aria-labelledby="ariaLabelledby"
    :toggle-id="toggleId"
    :toggle-text="listboxToggleText"
    :toggle-class="toggleClass"
    :text-sr-only="textSrOnly"
    :category="category"
    :variant="variant"
    :size="size"
    :icon="icon"
    :disabled="disabled"
    :loading="loading"
    :no-caret="noCaret"
    :right="right"
    @[$options.events.GL_DROPDOWN_SHOWN]="onShow"
    @[$options.events.GL_DROPDOWN_HIDDEN]="onHide"
  >
    <!-- @slot Content to display in dropdown header -->
    <slot name="header"></slot>

    <ul
      ref="list"
      :aria-labelledby="toggleId"
      role="listbox"
      class="gl-new-dropdown-contents gl-list-style-none gl-pl-0 gl-mb-0"
      tabindex="-1"
      @keydown="onKeydown"
    >
      <gl-listbox-item
        v-for="(item, index) in items"
        :key="item.value"
        :is-selected="isSelected(item)"
        :is-focused="nextFocusedItemIndex === index"
        @select="onSelect(item, $event)"
      >
        <!-- @slot Custom template of the listbox item -->
        <slot name="list-item" :item="item">
          {{ item.text }}
        </slot>
      </gl-listbox-item>
    </ul>
    <!-- @slot Content to display in dropdown footer -->
    <slot name="footer"></slot>
  </gl-base-dropdown>
</template>
