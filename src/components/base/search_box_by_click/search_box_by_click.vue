<script>
import { GlTooltipDirective } from '../../../directives/tooltip';
import GlClearIconButton from '../../shared_components/clear_icon_button/clear_icon_button.vue';
import GlButton from '../button/button.vue';
import GlDisclosureDropdown from '../new_dropdowns/disclosure/disclosure_dropdown.vue';
import GlDisclosureDropdownItem from '../new_dropdowns/disclosure/disclosure_dropdown_item.vue';
import GlFormInput from '../form/form_input/form_input.vue';
import GlFormInputGroup from '../form/form_input_group/form_input_group.vue';

export default {
  name: 'GlSearchboxByClick',
  components: {
    GlClearIconButton,
    GlButton,
    GlFormInput,
    GlDisclosureDropdown,
    GlDisclosureDropdownItem,
    GlFormInputGroup,
  },
  directives: {
    GlTooltip: GlTooltipDirective,
  },
  props: {
    /**
     * If provided, used as value of search input
     */
    value: {
      required: false,
      default: '',
      // SearchBoxByClick could serve as a container for complex fields (see GlFilteredSearch)
      // so we should not force any specific type for value here
      validator: () => true,
    },
    /**
     * If provided, used as history items for this component
     */
    historyItems: {
      type: Array,
      required: false,
      default: null,
    },
    /**
     * If provided, used as a placeholder for this component
     */
    placeholder: {
      type: String,
      required: false,
      default: 'Search',
    },
    clearable: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * If provided and true, disables the input and controls
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * i18n for recent searches title within history dropdown
     */
    recentSearchesHeader: {
      type: String,
      required: false,
      default: 'Recent searches',
    },
    /**
     * i18n for clear button title
     */
    clearButtonTitle: {
      type: String,
      required: false,
      default: 'Clear',
    },
    /**
     * i18n for close button title within history dropdown
     */
    closeButtonTitle: {
      type: String,
      required: false,
      default: 'Close',
    },
    /**
     * i18n for recent searches clear text
     */
    clearRecentSearchesText: {
      type: String,
      required: false,
      default: 'Clear recent searches',
    },
    noRecentSearchesText: {
      type: String,
      required: false,
      default: "You don't have any recent searches",
    },
    /**
     * Container for tooltip. Valid values: DOM node, selector string or `false` for default
     */
    tooltipContainer: {
      required: false,
      default: false,
      validator: (value) =>
        value === false || typeof value === 'string' || value instanceof HTMLElement,
    },
    /**
     * HTML attributes to add to the search button
     */
    searchButtonAttributes: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    /**
     * Display search button to perform a search.
     *
     * Note: it is required to ensure accessibility for WCAG 2.1 3.2.2: On Input.
     * If the search button is hidden, a separate button should be provided for the same context.
     */
    showSearchButton: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      currentValue: null,
      isFocused: false,
    };
  },
  computed: {
    inputAttributes() {
      const attributes = {
        type: 'search',
        placeholder: this.placeholder,
        ...this.$attrs,
      };

      if (!attributes['aria-label']) {
        attributes['aria-label'] = attributes.placeholder;
      }

      return attributes;
    },
    hasValue() {
      return Boolean(this.currentValue);
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.currentValue = newValue;
      },
      immediate: true,
    },
    currentValue(newValue) {
      if (newValue === this.value) return;
      this.$emit('input', newValue);
    },
  },
  methods: {
    search(value) {
      /**
       * Emitted when search is submitted
       * @property {*} value Search value
       */
      this.$emit('submit', value);
    },
    selectHistoryItem(item) {
      this.currentValue = item;

      /**
       * Emitted when item from history is selected
       * @property {*} item History item
       */
      this.$emit('history-item-selected', item);
      setTimeout(() => {
        document.activeElement.blur();
      });
    },
    clearInput() {
      this.currentValue = '';
      /**
       * Emitted when search is cleared
       */
      this.$emit('clear');
      if (this.$refs.input) {
        this.$refs.input.$el.focus();
      }
    },
    emitClearHistory() {
      /**
       * Emitted when clear history button is clicked
       */
      this.$emit('clear-history');
    },
  },
};
</script>

<template>
  <gl-form-input-group
    class="gl-search-box-by-click"
    :class="{ 'gl-search-box-by-click-with-search-button': showSearchButton }"
  >
    <template v-if="historyItems" #prepend>
      <gl-disclosure-dropdown
        ref="historyDropdown"
        class="gl-search-box-by-click-history"
        icon="history"
        toggle-text="Toggle history"
        text-sr-only
        fluid-width
        :disabled="disabled"
      >
        <template #header>
          <div
            class="gl-search-box-by-click-history-header gl-display-flex gl-align-items-center gl-p-4! gl-min-h-8 gl-border-b-1 gl-border-b-solid gl-border-b-gray-200 gl-flex-grow-1 gl-font-weight-bold gl-font-sm"
          >
            {{ recentSearchesHeader }}
          </div>
        </template>

        <template v-if="historyItems.length">
          <gl-disclosure-dropdown-item
            v-for="(item, idx) in historyItems"
            :key="idx"
            class="gl-search-box-by-click-history-item"
            @action="selectHistoryItem(item)"
          >
            <template #list-item>
              <!-- @slot Slot to customize history item in history dropdown. Used only with history-items prop -->
              <slot name="history-item" :history-item="item">{{ item }}</slot>
            </template>
          </gl-disclosure-dropdown-item>
        </template>
        <div v-else class="gl-font-sm gl-text-secondary gl-py-2 gl-px-4">
          {{ noRecentSearchesText }}
        </div>

        <template v-if="historyItems.length" #footer>
          <div
            class="gl-border-t-solid gl-border-t-1 gl-border-t-gray-200 gl-display-flex gl-flex-direction-column gl-p-2"
          >
            <gl-button
              ref="clearHistory"
              category="tertiary"
              class="gl-justify-content-start!"
              @click="emitClearHistory"
            >
              {{ clearRecentSearchesText }}
            </gl-button>
          </div>
        </template>
      </gl-disclosure-dropdown>
    </template>
    <slot name="input">
      <gl-form-input
        ref="input"
        v-model="currentValue"
        class="gl-search-box-by-click-input"
        :class="{ 'gl-rounded-base!': !showSearchButton }"
        v-bind="inputAttributes"
        :disabled="disabled"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keydown.enter.native="search(currentValue)"
      />
    </slot>
    <gl-clear-icon-button
      v-if="clearable && hasValue && !disabled"
      :title="clearButtonTitle"
      :tooltip-container="tooltipContainer"
      class="gl-search-box-by-click-icon-button gl-search-box-by-click-clear-button gl-clear-icon-button"
      data-testid="filtered-search-clear-button"
      @click="clearInput"
    />

    <template v-if="showSearchButton" #append>
      <gl-button
        v-bind="searchButtonAttributes"
        ref="searchButton"
        class="gl-search-box-by-click-search-button"
        icon="search"
        :disabled="disabled"
        aria-label="Search"
        data-testid="search-button"
        @click="search(currentValue)"
      />
    </template>
  </gl-form-input-group>
</template>
