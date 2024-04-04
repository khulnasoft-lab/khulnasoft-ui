<!-- eslint-disable vue/multi-word-component-names -->
<script>
import clamp from 'lodash/clamp';
import uniqueId from 'lodash/uniqueId';
import isNil from 'lodash/isNil';
import { stopEvent } from '../../../../utils/utils';
import {
  GL_DROPDOWN_SHOWN,
  GL_DROPDOWN_HIDDEN,
  HOME,
  END,
  ARROW_DOWN,
  ARROW_UP,
  GL_DROPDOWN_CONTENTS_CLASS,
  POSITION_ABSOLUTE,
  POSITION_FIXED,
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
import { translate } from '../../../../utils/i18n';
import GlListboxItem from './listbox_item.vue';
import GlListboxSearchInput from './listbox_search_input.vue';
import GlListboxGroup from './listbox_group.vue';
import { isOption, itemsValidator, flattenedOptions } from './utils';

export const ITEM_SELECTOR = '[role="option"]';
const HEADER_ITEMS_BORDER_CLASSES = ['gl-border-b-1', 'gl-border-b-solid', 'gl-border-b-gray-200'];
const GROUP_TOP_BORDER_CLASSES = ['gl-border-t', 'gl-border-t-gray-200', 'gl-pt-1', 'gl-mt-2'];
export const SEARCH_INPUT_SELECTOR = '.gl-listbox-search-input';

export default {
  name: 'GlCollapsibleListbox',
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
      default: 'bottom-start',
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
     * The select all button's label, to be rendered in the header. If this is omitted, the button is not
     * rendered.
     * The select all button requires a header to be set, so this prop should be used in conjunction with
     * headerText.
     */
    showSelectAllButtonLabel: {
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
    /**
     * Custom offset to be applied to Floating UI's offset middleware.
     * https://floating-ui.com/docs/offset
     */
    dropdownOffset: {
      type: [Number, Object],
      required: false,
      default: undefined,
    },
    /**
     * Lets the dropdown extend to match its content's width, up to a maximum width
     * defined by the `$gl-new-dropdown-max-width` variable.
     */
    fluidWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Strategy to be applied by computePosition. If the dropdown's container is too short for it to
     * fit in, setting this to fixed will let it position itself above its container.
     * https://floating-ui.com/docs/computePosition#strategy
     */
    positioningStrategy: {
      type: String,
      required: false,
      default: POSITION_ABSOLUTE,
      validator: (strategy) => [POSITION_ABSOLUTE, POSITION_FIXED].includes(strategy),
    },
    /**
     * Opens dropdown on render
     */
    startOpened: {
      type: Boolean,
      required: false,
      default: false,
    },
    srOnlyResultsLabel: {
      type: Function,
      required: false,
      default: (count) => {
        const fn = translate('GlCollapsibleListbox.srOnlyResultsLabel', 'Results count');
        if (typeof fn === 'function') {
          return fn(count);
        }
        return `${count} result${count > 1 ? 's' : ''}`;
      },
    },
  },
  data() {
    return {
      selectedValues: [],
      toggleId: uniqueId('dropdown-toggle-btn-'),
      listboxId: uniqueId('listbox-'),
      nextFocusedItemIndex: null,
      searchStr: '',
      topBoundaryVisible: true,
      bottomBoundaryVisible: true,
    };
  },
  computed: {
    listboxTag() {
      if (!this.hasItems || isOption(this.items[0])) return 'ul';
      return 'div';
    },
    listboxClasses() {
      return {
        'top-scrim-visible': !this.topBoundaryVisible,
        'bottom-scrim-visible': !this.bottomBoundaryVisible,
        [GL_DROPDOWN_CONTENTS_CLASS]: true,
      };
    },
    itemTag() {
      return this.listboxTag === 'ul' ? 'li' : 'div';
    },
    flattenedOptions() {
      return flattenedOptions(this.items);
    },
    hasItems() {
      return this.items.length > 0;
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
      return this.searchable && !this.showNoResultsText;
    },
    headerId() {
      return this.headerText && uniqueId('listbox-header-');
    },
    showResetButton() {
      if (!this.resetButtonLabel) {
        return false;
      }

      /**
       * if dropdown has no items
       * reset all should be hidden
       */
      if (!this.hasItems) {
        return false;
      }

      // hide if no selection
      if (!this.selected || this.selected.length === 0) {
        return false;
      }

      // only show reset button if show all button is not there
      return !this.showSelectAllButton;
    },
    showSelectAllButton() {
      if (!this.showSelectAllButtonLabel) {
        return false;
      }

      if (!this.multiple) {
        return false;
      }

      /**
       * if dropdown has no items
       * select all should be hidden
       */
      if (!this.hasItems) {
        return false;
      }

      return this.selected.length !== this.flattenedOptions.length;
    },
    showIntersectionObserver() {
      return this.infiniteScroll && !this.infiniteScrollLoading && !this.loading && !this.searching;
    },
    hasCustomToggle() {
      return Boolean(this.$scopedSlots.toggle);
    },
    hasSelection() {
      return Boolean(this.selectedValues.length);
    },
    toggleButtonClasses() {
      const toggleClasses = [this.toggleClass];

      if (!this.hasSelection) {
        toggleClasses.push('gl-text-gray-500!');
      }
      return toggleClasses;
    },
    hasHeader() {
      return this.headerText || this.searchable;
    },
    hasFooter() {
      return Boolean(this.$scopedSlots.footer);
    },
  },
  watch: {
    selected: {
      immediate: true,
      handler(newSelected) {
        if (Array.isArray(newSelected)) {
          if (process.env.NODE_ENV !== 'production' && !this.multiple && newSelected.length) {
            throw new Error('To allow multi-selection, please, set "multiple" property to "true"');
          }
          this.selectedValues = [...newSelected];
        } else {
          this.selectedValues = isNil(newSelected) ? [] : [newSelected];
        }
      },
    },
    items: {
      handler() {
        this.$nextTick(() => {
          /* Every time the list of items changes (on search),
           * the observed elements are recreated, thus we need to start obesrving them again */
          this.observeScroll();
        });
      },
    },
    ...(process.env.NODE_ENV !== 'production'
      ? {
          resetButtonLabel: {
            immediate: true,
            handler(newResetButtonLabel) {
              if (newResetButtonLabel && !this.headerText) {
                throw new Error(
                  'The reset button cannot be rendered without a header. Either provide a header via the headerText prop, or do not provide the resetButtonLabel prop.'
                );
              }
            },
          },
          showSelectAllButtonLabel: {
            immediate: true,
            handler(showSelectAllButtonLabel) {
              if (showSelectAllButtonLabel && !this.headerText) {
                throw new Error(
                  'The select all button cannot be rendered without a header. Either provide a header via the headerText prop, or do not provide the showSelectAllButtonLabel prop.'
                );
              }
            },
          },
          infiniteScroll: {
            immediate: true,
            handler(newValue) {
              if (newValue && this.items.some((item) => !isOption(item))) {
                throw new Error(
                  'Infinite scroll does not support groups. Please set the "infiniteScroll" prop to "false"'
                );
              }
            },
          },
        }
      : {}),
  },
  mounted() {
    if (this.startOpened) {
      this.open();
    }
    this.observeScroll();
  },
  beforeDestroy() {
    this.scrollObserver?.disconnect();
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
        if (isSearchInput) {
          return;
        }
        this.focusItem(0, elements);
      } else if (code === END) {
        if (isSearchInput) {
          return;
        }
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
    },
    onSelectAllButtonClicked() {
      /**
       * Emitted when the select all button is clicked
       *
       * @event select-all
       */
      this.$emit('select-all');
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
    observeScroll() {
      const root = this.$refs.list;

      const options = {
        rootMargin: '8px',
        root,
        threshold: 1.0,
      };

      this.scrollObserver?.disconnect();

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this[entry.target?.$__visibilityProp] = entry.isIntersecting;
        });
      }, options);

      const topBoundary = this.$refs['top-boundary'];
      const bottomBoundary = this.$refs['bottom-boundary'];
      if (topBoundary) {
        topBoundary.$__visibilityProp = 'topBoundaryVisible';
        observer.observe(topBoundary);
      }
      if (bottomBoundary) {
        bottomBoundary.$__visibilityProp = 'bottomBoundaryVisible';
        observer.observe(bottomBoundary);
      }
      this.scrollObserver = observer;
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
    :toggle-class="toggleButtonClasses"
    :text-sr-only="textSrOnly"
    :category="category"
    :variant="variant"
    :size="size"
    :icon="icon"
    :disabled="disabled"
    :loading="loading"
    :no-caret="noCaret"
    :placement="placement"
    :offset="dropdownOffset"
    :fluid-width="fluidWidth"
    :positioning-strategy="positioningStrategy"
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
        class="gl-focus-inset-border-2-blue-400! gl-flex-shrink-0 gl-font-sm! gl-px-2! gl-py-2! gl-w-auto! gl-m-0! gl-max-w-50p gl-text-overflow-ellipsis"
        data-testid="listbox-reset-button"
        @click="onResetButtonClicked"
      >
        {{ resetButtonLabel }}
      </gl-button>
      <gl-button
        v-if="showSelectAllButton"
        category="tertiary"
        class="gl-focus-inset-border-2-blue-400! gl-flex-shrink-0 gl-font-sm! gl-px-2! gl-py-2! gl-w-auto! gl-m-0! gl-max-w-50p gl-text-overflow-ellipsis"
        data-testid="listbox-select-all-button"
        @click="onSelectAllButtonClicked"
      >
        {{ showSelectAllButtonLabel }}
      </gl-button>
    </div>

    <div v-if="searchable" :class="$options.HEADER_ITEMS_BORDER_CLASSES">
      <gl-listbox-search-input
        ref="searchBox"
        v-model="searchStr"
        data-testid="listbox-search-input"
        :placeholder="searchPlaceholder"
        :class="{ 'gl-listbox-topmost': !headerText }"
        @input="search"
        @keydown.enter.prevent
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
      class="gl-new-dropdown-contents gl-new-dropdown-contents-with-scrim-overlay"
      :class="listboxClasses"
      tabindex="0"
      @keydown="onKeydown"
    >
      <component :is="itemTag" class="top-scrim-wrapper" aria-hidden="true" data-testid="top-scrim">
        <div
          class="top-scrim"
          :class="{ 'top-scrim-light': !hasHeader, 'top-scrim-dark': hasHeader }"
        ></div>
      </component>
      <component :is="itemTag" ref="top-boundary" aria-hidden="true" />
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
          <gl-listbox-group
            :key="item.text"
            :name="item.text"
            :text-sr-only="item.textSrOnly"
            :class="groupClasses(index)"
          >
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
      <component :is="itemTag" v-if="infiniteScrollLoading">
        <gl-loading-icon data-testid="listbox-infinite-scroll-loader" size="md" class="gl-my-3" />
      </component>
      <gl-intersection-observer
        v-if="showIntersectionObserver"
        @appear="onIntersectionObserverAppear"
      />
      <component :is="itemTag" ref="bottom-boundary" aria-hidden="true" />
      <component
        :is="itemTag"
        class="bottom-scrim-wrapper"
        aria-hidden="true"
        data-testid="bottom-scrim"
      >
        <div class="bottom-scrim" :class="{ 'gl-rounded-0!': hasFooter }"></div>
      </component>
    </component>
    <span
      v-if="announceSRSearchResults"
      data-testid="listbox-number-of-results"
      class="gl-sr-only"
      aria-live="assertive"
    >
      <!-- @slot Text read by screen reader announcing a number of search results -->
      <slot name="search-summary-sr-only">
        {{ srOnlyResultsLabel(flattenedOptions.length) }}
      </slot>
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
