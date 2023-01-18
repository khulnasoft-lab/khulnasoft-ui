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
  dropdownPlacements,
  dropdownVariantOptions,
} from '../../../../utils/constants';
import GlButton from '../../button/button.vue';
import GlLoadingIcon from '../../loading_icon/loading_icon.vue';
import GlIntersectionObserver from '../../../utilities/intersection_observer/intersection_observer.vue';
import GlSearchBoxByType from '../../search_box_by_type/search_box_by_type.vue';
import GlBaseDropdown from '../base_dropdown/base_dropdown.vue';
import GlListboxItem from './listbox_item.vue';
import GlListboxSearchInput from './listbox_search_input.vue';
import GlListboxGroup from './listbox_group.vue';
import { isOption, itemsValidator, flattenedOptions } from './utils';

export const ITEM_SELECTOR = '[role="option"]';
const HEADER_ITEMS_BORDER_CLASSES = ['gl-border-b-1', 'gl-border-b-solid', 'gl-border-b-gray-200'];
const GROUP_TOP_BORDER_CLASSES = ['gl-border-t', 'gl-pt-1', 'gl-mt-2'];
export const SEARCH_INPUT_SELECTOR = '.gl-listbox-search-input';

export default {
  HEADER_ITEMS_BORDER_CLASSES,
  events: {
    GL_DROPDOWN_SHOWN,
    GL_DROPDOWN_HIDDEN,
  },
  components: {
    GlBaseDropdown,
    GlListboxItem,
    GlListboxGroup,
    GlButton,
    GlSearchBoxByType,
    GlListboxSearchInput,
    GlLoadingIcon,
    GlIntersectionObserver,
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
     * Array of selected items values for multi-select and selected item value for single-select
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
    /** The header text */
    headerText: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Styling option - dropdown's toggle category
     */
    category: {
      type: String,
      required: false,
      default: buttonCategoryOptions.primary,
      validator: (value) => value in buttonCategoryOptions,
    },
    /**
     * Styling option - dropdown's toggle variant
     */
    variant: {
      type: String,
      required: false,
      default: dropdownVariantOptions.default,
      validator: (value) => value in dropdownVariantOptions,
    },
    /**
     * The size of the dropdown toggle
     */
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator: (value) => value in buttonSizeOptions,
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
     * It will render a small loader in the dropdown toggle and make it disabled
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
     * Align listbox menu with respect to the toggle button
     */
    placement: {
      type: String,
      required: false,
      default: 'left',
      validator: (value) => Object.keys(dropdownPlacements).includes(value),
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
     * Provide the string of ids seperated by space
     */
    toggleAriaLabelledBy: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The `aria-labelledby` attribute value for the list of options
     * Provide the string of ids seperated by space
     */
    listAriaLabelledBy: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Enable search
     */
    searchable: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Set to "true" when items search is in progress.
     * It will display loading icon below the search input
     */
    searching: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Enables infinite scroll.
     * When set to `true`, the `@bottom-reached` event will be fired when
     * the bottom of the listbox is scrolled to.
     * Does not support groups.
     */
    infiniteScroll: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * This prop is used for infinite scroll.
     * It represents the total number of items that exist,
     * even if they have not yet been loaded.
     * Do not set this prop if the total number of items is unknown.
     */
    totalItems: {
      type: Number,
      required: false,
      default: null,
    },
    /**
     * This prop is used for infinite scroll.
     * Set to `true` when more items are being loaded.
     */
    infiniteScrollLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Message to be displayed when filtering produced no results
     */
    noResultsText: {
      type: String,
      required: false,
      default: 'No results found',
    },
    /**
     * Search input placeholder text and aria-label
     */
    searchPlaceholder: {
      type: String,
      required: false,
      default: 'Search',
    },
    /**
     * The reset button's label, to be rendered in the header. If this is omitted, the button is not
     * rendered.
     * The reset button requires a header to be set, so this prop should be used in conjunction with
     * headerText.
     */
    resetButtonLabel: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Render the toggle button as a block element
     */
    block: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      selectedValues: [],
      toggleId: uniqueId('dropdown-toggle-btn-'),
      listboxId: uniqueId('listbox-'),
      nextFocusedItemIndex: null,
      searchStr: '',
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
    showList() {
      return this.flattenedOptions.length && !this.searching;
    },
    showNoResultsText() {
      return !this.flattenedOptions.length && !this.searching;
    },
    announceSRSearchResults() {
      return (
        this.searchable && !this.showNoResultsText && this.$scopedSlots['search-summary-sr-only']
      );
    },
    headerId() {
      return this.headerText && uniqueId('listbox-header-');
    },
    showResetButton() {
      if (!this.resetButtonLabel) {
        return false;
      }
      if (this.multiple) {
        return this.selected.length > 0;
      }
      return Boolean(this.selected);
    },
    showIntersectionObserver() {
      return this.infiniteScroll && !this.infiniteScrollLoading && !this.loading && !this.searching;
    },
    hasCustomToggle() {
      return Boolean(this.$scopedSlots.toggle);
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
    resetButtonLabel: {
      immediate: true,
      handler(newResetButtonLabel) {
        if (process.env.NODE_ENV !== 'production' && newResetButtonLabel && !this.headerText) {
          throw new Error(
            'The reset button cannot be rendered without a header. Either provide a header via the headerText prop, or do not provide the resetButtonLabel prop.'
          );
        }
      },
    },
  },
  created() {
    if (
      process.env.NODE_ENV !== 'production' &&
      this.infiniteScroll &&
      this.items.some((item) => !isOption(item))
    ) {
      throw new Error(
        'Infinite scroll does not support groups. Please set the "infiniteScroll" prop to "false"'
      );
    }
  },
  methods: {
    open() {
      this.$refs.baseDropdown.open();
    },
    close() {
      this.$refs.baseDropdown.close();
    },
    groupClasses(index) {
      return index === 0 ? null : GROUP_TOP_BORDER_CLASSES;
    },
    onShow() {
      if (this.searchable) {
        this.focusSearchInput();
      } else {
        this.focusItem(this.selectedIndices[0] ?? 0, this.getFocusableListItemElements());
      }
      /**
       * Emitted when dropdown is shown
       *
       * @event shown
       */
      this.$emit(GL_DROPDOWN_SHOWN);
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
      const { code, target } = event;
      const elements = this.getFocusableListItemElements();

      if (elements.length < 1) return;

      let stop = true;
      const isSearchInput = target.matches(SEARCH_INPUT_SELECTOR);

      if (code === HOME) {
        this.focusItem(0, elements);
      } else if (code === END) {
        this.focusItem(elements.length - 1, elements);
      } else if (code === ARROW_UP) {
        if (isSearchInput) {
          return;
        }
        if (this.searchable && elements.indexOf(target) === 0) {
          this.focusSearchInput();
        } else {
          this.focusNextItem(event, elements, -1);
        }
      } else if (code === ARROW_DOWN) {
        if (isSearchInput) {
          this.focusItem(0, elements);
        } else {
          this.focusNextItem(event, elements, 1);
        }
      } else {
        stop = false;
      }

      if (stop) {
        stopEvent(event);
      }
    },
    getFocusableListItemElements() {
      const items = this.$refs.list?.querySelectorAll(ITEM_SELECTOR);
      return Array.from(items || []);
    },
    focusNextItem(event, elements, offset) {
      const { target } = event;
      const currentIndex = elements.indexOf(target);
      const nextIndex = clamp(currentIndex + offset, 0, elements.length - 1);

      this.focusItem(nextIndex, elements);
    },
    focusItem(index, elements) {
      this.nextFocusedItemIndex = index;

      elements[index]?.focus();
    },
    focusSearchInput() {
      this.$refs.searchBox.focusInput();
    },
    onSelect(item, isSelected) {
      if (this.multiple) {
        this.onMultiSelect(item.value, isSelected);
      } else {
        this.onSingleSelect(item.value, isSelected);
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

      this.closeAndFocus();
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
    search(searchTerm) {
      /**
       * Emitted when the search query string is changed
       *
       * @event search
       * @type {string}
       */
      this.$emit('search', searchTerm);
    },
    onResetButtonClicked() {
      /**
       * Emitted when the reset button is clicked
       *
       * @event reset
       */
      this.$emit('reset');
      this.closeAndFocus();
    },
    closeAndFocus() {
      this.$refs.baseDropdown.closeAndFocus();
    },
    onIntersectionObserverAppear() {
      /**
       * Emitted when bottom of listbox has been scrolled to.
       * Used for infinite scroll.
       *
       * @event bottom-reached
       */
      this.$emit('bottom-reached');
    },
    listboxItemMoreItemsAriaAttributes(index) {
      if (this.totalItems === null) {
        return {};
      }

      return {
        'aria-setsize': this.totalItems,
        'aria-posinset': index + 1,
      };
    },
    isOption,
  },
};
</script>

<template>
  <gl-base-dropdown
    ref="baseDropdown"
    aria-haspopup="listbox"
    :aria-labelledby="toggleAriaLabelledBy"
    :block="block"
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
    :placement="placement"
    @[$options.events.GL_DROPDOWN_SHOWN]="onShow"
    @[$options.events.GL_DROPDOWN_HIDDEN]="onHide"
  >
    <template v-if="hasCustomToggle" #toggle>
      <!-- @slot Custom toggle content -->
      <slot name="toggle"></slot>
    </template>

    <div
      v-if="headerText"
      class="gl-display-flex gl-align-items-center gl-p-4! gl-min-h-8"
      :class="$options.HEADER_ITEMS_BORDER_CLASSES"
    >
      <div
        :id="headerId"
        class="gl-flex-grow-1 gl-font-weight-bold gl-font-sm gl-pr-2"
        data-testid="listbox-header-text"
      >
        {{ headerText }}
      </div>
      <gl-button
        v-if="showResetButton"
        category="tertiary"
        class="gl-focus-inset-border-2-blue-400! gl-flex-shrink-0 gl-font-sm! gl-px-2! gl-py-2!"
        data-testid="listbox-reset-button"
        @click="onResetButtonClicked"
      >
        {{ resetButtonLabel }}
      </gl-button>
    </div>

    <div v-if="searchable" :class="$options.HEADER_ITEMS_BORDER_CLASSES">
      <gl-listbox-search-input
        ref="searchBox"
        v-model="searchStr"
        :aria-owns="listboxId"
        data-testid="listbox-search-input"
        :placeholder="searchPlaceholder"
        @input="search"
        @keydown="onKeydown"
      />
      <gl-loading-icon
        v-if="searching"
        data-testid="listbox-search-loader"
        size="md"
        class="gl-my-3"
      />
    </div>

    <component
      :is="listboxTag"
      v-if="showList"
      :id="listboxId"
      ref="list"
      :aria-labelledby="listAriaLabelledBy || headerId || toggleId"
      role="listbox"
      class="gl-new-dropdown-contents"
      tabindex="-1"
      @keydown="onKeydown"
    >
      <template v-for="(item, index) in items">
        <template v-if="isOption(item)">
          <gl-listbox-item
            :key="item.value"
            :data-testid="`listbox-item-${item.value}`"
            :is-selected="isSelected(item)"
            :is-focused="isFocused(item)"
            :is-check-centered="isCheckCentered"
            v-bind="listboxItemMoreItemsAriaAttributes(index)"
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
              :data-testid="`listbox-item-${option.value}`"
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
      <component :is="listboxTag === 'ul' ? 'li' : 'div'" v-if="infiniteScrollLoading">
        <gl-loading-icon data-testid="listbox-infinite-scroll-loader" size="md" class="gl-my-3" />
      </component>
      <gl-intersection-observer
        v-if="showIntersectionObserver"
        @appear="onIntersectionObserverAppear"
      />
    </component>
    <span
      v-if="announceSRSearchResults"
      data-testid="listbox-number-of-results"
      class="gl-sr-only"
      aria-live="assertive"
    >
      <!-- @slot Text read by screen reader announcing a number of search results -->
      <slot name="search-summary-sr-only"></slot>
    </span>

    <div
      v-else-if="showNoResultsText"
      aria-live="assertive"
      class="gl-pl-7 gl-pr-5 gl-py-3 gl-font-base gl-text-gray-600"
      data-testid="listbox-no-results-text"
    >
      {{ noResultsText }}
    </div>
    <!-- @slot Content to display in dropdown footer -->
    <slot name="footer"></slot>
  </gl-base-dropdown>
</template>
