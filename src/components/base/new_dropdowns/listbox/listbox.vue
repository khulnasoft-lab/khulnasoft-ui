<!-- eslint-disable vue/multi-word-component-names -->
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
import GlListboxGroup from './listbox_group.vue';
import { isOption, itemsValidator, flattenedOptions } from './utils';

export const ITEM_SELECTOR = '[role="option"]';
const GROUP_TOP_BORDER_CLASSES = ['gl-border-t', 'gl-pt-3', 'gl-mt-3'];

export default {
  events: {
    GL_DROPDOWN_SHOWN,
    GL_DROPDOWN_HIDDEN,
  },
  components: {
    GlBaseDropdown,
    GlListboxItem,
    GlListboxGroup,
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
      validator: itemsValidator,
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
     * Center selected item checkmark
     */
    isCheckCentered: {
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
    listboxTag() {
      if (this.items.length === 0 || isOption(this.items[0])) return 'ul';
      return 'div';
    },
    flattenedOptions() {
      return flattenedOptions(this.items);
    },
    listboxToggleText() {
      if (!this.toggleText) {
        if (!this.multiple && this.selectedValues.length) {
          return this.flattenedOptions.find(({ value }) => value === this.selectedValues[0])?.text;
        }
        return '';
      }

      return this.toggleText;
    },
    selectedIndices() {
      return this.selectedValues
        .map((selected) => this.flattenedOptions.findIndex(({ value }) => value === selected))
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
    groupClasses(index) {
      return index === 0 ? null : GROUP_TOP_BORDER_CLASSES;
    },
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
    isFocused(item) {
      return this.nextFocusedItemIndex === this.flattenedOptions.indexOf(item);
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
    isOption,
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

    <component
      :is="listboxTag"
      ref="list"
      :aria-labelledby="toggleId"
      role="listbox"
      class="gl-new-dropdown-contents gl-list-style-none gl-pl-0 gl-mb-0"
      tabindex="-1"
      @keydown="onKeydown"
    >
      <template v-for="(item, index) in items">
        <template v-if="isOption(item)">
          <gl-listbox-item
            :key="item.value"
            :is-selected="isSelected(item)"
            :is-focused="isFocused(item)"
            :is-check-centered="isCheckCentered"
            @select="onSelect(item, $event)"
          >
            <!-- @slot Custom template of the listbox item -->
            <slot name="list-item" :item="item">
              {{ item.text }}
            </slot>
          </gl-listbox-item>
        </template>

        <template v-else>
          <gl-listbox-group :key="item.text" :name="item.text" :class="groupClasses(index)">
            <template v-if="$scopedSlots['group-label']" #group-label>
              <!-- @slot Custom template for group names -->
              <slot name="group-label" :group="item"></slot>
            </template>

            <gl-listbox-item
              v-for="option in item.options"
              :key="option.value"
              :is-selected="isSelected(option)"
              :is-focused="isFocused(option)"
              :is-check-centered="isCheckCentered"
              @select="onSelect(option, $event)"
            >
              <!-- @slot Custom template of the listbox item -->
              <slot name="list-item" :item="option">
                {{ option.text }}
              </slot>
            </gl-listbox-item>
          </gl-listbox-group>
        </template>
      </template>
    </component>
    <!-- @slot Content to display in dropdown footer -->
    <slot name="footer"></slot>
  </gl-base-dropdown>
</template>
