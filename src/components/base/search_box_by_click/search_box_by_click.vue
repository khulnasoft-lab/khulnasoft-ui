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
    value: {
      required: false,
      default: '',
      // SearchBoxByClick could serve as a container for complex fields (see GlFilteredSearch)
      // so we should not force any specific type for value here
      validator: () => true,
    },
    historyItems: {
      type: Array,
      required: false,
      default: null,
    },
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
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    recentSearchesHeader: {
      type: String,
      required: false,
      default: 'Recent searches',
    },
    clearButtonTitle: {
      type: String,
      required: false,
      default: 'Clear',
    },
    closeButtonTitle: {
      type: String,
      required: false,
      default: 'Close',
    },
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
    tooltipContainer: {
      required: false,
      default: false,
      validator: (value) =>
        value === false || typeof value === 'string' || value instanceof HTMLElement,
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
      this.$emit('input', newValue);
    },
  },
  methods: {
    closeHistoryDropdown() {
      this.$refs.historyDropdown.hide();
    },
    search(value) {
      this.$emit('submit', value);
    },
    selectHistoryItem(item) {
      this.currentValue = item;
      this.$emit('history-item-selected', item);
      setTimeout(() => {
        document.activeElement.blur();
      });
    },
    clearInput() {
      this.currentValue = '';
      this.$emit('clear');
      if (this.$refs.input) {
        this.$refs.input.$el.focus();
      }
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
            <slot name="history-item" :historyItem="item">{{ item }}</slot>
          </gl-dropdown-item>
          <gl-dropdown-divider />
          <gl-dropdown-item ref="clearHistory" @click="$emit('clear-history')">{{
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
        @keydown.enter="search(currentValue)"
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
    <template #append class="gl-search-box-by-click-input-group-control">
      <gl-button
        ref="searchButton"
        class="gl-search-box-by-click-search-button"
        icon="search"
        :disabled="disabled"
        aria-label="Search"
        @click="search(currentValue)"
      />
    </template>
  </gl-form-input-group>
</template>
