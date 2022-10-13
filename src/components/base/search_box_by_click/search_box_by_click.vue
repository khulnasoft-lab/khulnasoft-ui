<script>
import { GlTooltipDirective } from '../../../directives/tooltip';
import GlClearIconButton from '../../shared_components/clear_icon_button/clear_icon_button.vue';
import GlButton from '../button/button.vue';
import GlDropdown from '../dropdown/dropdown.vue';
import GlDropdownDivider from '../dropdown/dropdown_divider.vue';
import GlDropdownItem from '../dropdown/dropdown_item.vue';
import GlDropdownText from '../dropdown/dropdown_text.vue';
import GlFormInput from '../form/form_input/form_input.vue';
import GlFormInputGroup from '../form/form_input_group/form_input_group.vue';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    GlClearIconButton,
    GlIcon,
    GlButton,
    GlFormInput,
    GlDropdown,
    GlDropdownText,
    GlDropdownItem,
    GlDropdownDivider,
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
    closeHistoryDropdown() {
      this.$refs.historyDropdown.hide();
    },
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
  <gl-form-input-group class="gl-search-box-by-click">
    <template v-if="historyItems" #prepend>
      <gl-dropdown
        ref="historyDropdown"
        class="gl-search-box-by-click-history"
        menu-class="gl-search-box-by-click-menu"
        category="secondary"
        :disabled="disabled"
      >
        <template #button-content>
          <gl-icon name="history" class="gl-search-box-by-click-history-icon" />
          <gl-icon name="chevron-down" class="gl-search-box-by-click-history-icon-chevron" />
          <span class="gl-sr-only">Toggle history</span>
        </template>
        <gl-dropdown-text class="gl-search-box-by-click-history-header">
          {{ recentSearchesHeader }}
          <gl-button
            ref="closeHistory"
            v-gl-tooltip.hover="{ container: tooltipContainer }"
            :title="closeButtonTitle"
            :aria-label="closeButtonTitle"
            category="tertiary"
            class="gl-search-box-by-click-close-history-button"
            name="close"
            icon="close"
            @click="closeHistoryDropdown"
          />
        </gl-dropdown-text>
        <gl-dropdown-divider />
        <template v-if="historyItems.length">
          <gl-dropdown-item
            v-for="(item, idx) in historyItems"
            :key="idx"
            class="gl-search-box-by-click-history-item"
            @click="selectHistoryItem(item)"
          >
            <!-- @slot Slot to customize history item in history dropdown. Used only with history-items prop -->
            <slot name="history-item" :history-item="item">{{ item }}</slot>
          </gl-dropdown-item>
          <gl-dropdown-divider />
          <gl-dropdown-item ref="clearHistory" @click="emitClearHistory">{{
            clearRecentSearchesText
          }}</gl-dropdown-item>
        </template>
        <gl-dropdown-text v-else class="gl-search-box-by-click-history-no-searches">{{
          noRecentSearchesText
        }}</gl-dropdown-text>
      </gl-dropdown>
    </template>
    <slot name="input">
      <gl-form-input
        ref="input"
        v-model="currentValue"
        class="gl-search-box-by-click-input"
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
    <template #append>
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
