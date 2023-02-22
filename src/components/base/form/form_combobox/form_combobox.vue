<script>
import uniqueId from 'lodash/uniqueId';

import GlDropdownItem from '../../dropdown/dropdown_item.vue';
import GlDropdownDivider from '../../dropdown/dropdown_divider.vue';
import GlFormGroup from '../form_group/form_group.vue';
import GlFormInput from '../form_input/form_input.vue';

export default {
  name: 'GlFormCombobox',
  components: {
    GlDropdownItem,
    GlDropdownDivider,
    GlFormGroup,
    GlFormInput,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    labelText: {
      type: String,
      required: true,
    },
    labelSrOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    tokenList: {
      type: Array,
      required: true,
    },
    /**
     * List of action functions to display at the bottom of the dropdown
     */
    actionList: {
      type: Array,
      required: false,
      default: () => [],
    },
    value: {
      type: [String, Object],
      required: true,
    },
    matchValueToAttr: {
      type: String,
      required: false,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Placeholder text for input field
     */
    placeholder: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      results: [],
      arrowCounter: -1,
      userDismissedResults: false,
      suggestionsId: uniqueId('token-suggestions-'),
      inputId: uniqueId('token-input-'),
    };
  },
  computed: {
    ariaExpanded() {
      return this.showSuggestions.toString();
    },
    showAutocomplete() {
      return this.showSuggestions ? 'off' : 'on';
    },
    showSuggestions() {
      return this.value.length > 0 && this.allItems.length > 0;
    },
    displayedValue() {
      return this.matchValueToAttr && this.value[this.matchValueToAttr]
        ? this.value[this.matchValueToAttr]
        : this.value;
    },
    resultsLength() {
      return this.results.length;
    },
    allItems() {
      return [...this.results, ...this.actionList];
    },
  },
  watch: {
    tokenList(newList) {
      if (newList.length) {
        this.openSuggestions(newList);
      } else {
        this.results = [];
        this.arrowCounter = -1;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    closeSuggestions() {
      this.results = [];
      this.arrowCounter = -1;
      this.userDismissedResults = true;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.closeSuggestions();
      }
    },
    focusItem(index) {
      this.$refs.suggestionsMenu
        .querySelectorAll('.gl-dropdown-item')
        [index]?.querySelector('button')
        .focus();
    },
    onArrowDown(e) {
      e.preventDefault();
      let newCount = this.arrowCounter + 1;

      if (newCount >= this.allItems.length) {
        newCount = 0;
      }

      this.arrowCounter = newCount;
      this.focusItem(newCount);
    },
    onArrowUp(e) {
      e.preventDefault();
      let newCount = this.arrowCounter - 1;

      if (newCount < 0) {
        newCount = this.allItems.length - 1;
      }

      this.arrowCounter = newCount;
      this.focusItem(newCount);
    },
    onEsc() {
      if (!this.showSuggestions) {
        this.$emit('input', '');
      }
      this.closeSuggestions();
    },
    onEntry(value) {
      this.$emit('input', value);
      this.userDismissedResults = false;

      // short circuit so that we don't false match on empty string
      if (value.length < 1) {
        this.closeSuggestions();
        return;
      }

      const filteredTokens = this.tokenList.filter((token) => {
        if (this.matchValueToAttr) {
          return token[this.matchValueToAttr].toLowerCase().includes(value.toLowerCase());
        }
        return token.toLowerCase().includes(value.toLowerCase());
      });

      if (filteredTokens.length) {
        this.openSuggestions(filteredTokens);
      } else {
        this.results = [];
        this.arrowCounter = -1;
      }
    },
    openSuggestions(filteredResults) {
      this.results = filteredResults;
    },
    selectToken(value) {
      this.$emit('input', value);
      this.closeSuggestions();
      /**
       * Emitted when a value is selected.
       * @event value-selected
       */
      this.$emit('value-selected', value);
    },
    selectAction(value) {
      value.fn();
      this.$emit('input', this.value);
      this.closeSuggestions();
    },
    resetCounter() {
      this.arrowCounter = -1;
    },
  },
};
</script>
<template>
  <div
    class="gl-form-combobox dropdown"
    role="combobox"
    :aria-owns="suggestionsId"
    :aria-expanded="ariaExpanded"
  >
    <gl-form-group :label="labelText" :label-for="inputId" :label-sr-only="labelSrOnly">
      <gl-form-input
        :id="inputId"
        :value="displayedValue"
        type="text"
        role="searchbox"
        :autocomplete="showAutocomplete"
        aria-autocomplete="list"
        :aria-controls="suggestionsId"
        aria-haspopup="listbox"
        :autofocus="autofocus"
        :placeholder="placeholder"
        @input="onEntry"
        @focus="resetCounter"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.esc.stop="onEsc"
        @keydown.tab="closeSuggestions"
      />
    </gl-form-group>

    <ul
      v-show="showSuggestions && !userDismissedResults"
      :id="suggestionsId"
      ref="suggestionsMenu"
      data-testid="combobox-dropdown"
      class="dropdown-menu gl-w-full gl-form-combobox-inner gl-list-style-none gl-pl-0 gl-mb-0 gl-display-flex gl-flex-direction-column"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.esc.stop="onEsc"
    >
      <li class="gl-overflow-y-auto show-dropdown">
        <ul class="gl-list-style-none gl-pl-0 gl-mb-0">
          <gl-dropdown-item
            v-for="(result, i) in results"
            ref="results"
            :key="i"
            role="option"
            :aria-selected="i === arrowCounter"
            tabindex="-1"
            @click="selectToken(result)"
            @keydown.enter.native="selectToken(result)"
          >
            <!-- @slot The suggestion result item to display. -->
            <slot name="result" :item="result">{{ result }}</slot>
          </gl-dropdown-item>
        </ul>
      </li>
      <gl-dropdown-divider v-if="resultsLength > 0 && actionList.length > 0" />
      <li>
        <ul class="gl-list-style-none gl-pl-0 gl-mb-0">
          <gl-dropdown-item
            v-for="(action, i) in actionList"
            :key="i + resultsLength"
            role="option"
            :aria-selected="i + resultsLength === arrowCounter"
            tabindex="-1"
            data-testid="combobox-action"
            @click="selectAction(action)"
            @keydown.enter.native="selectAction(action)"
          >
            <!-- @slot The action item to display. -->
            <slot name="action" :item="action">{{ action.label }}</slot>
          </gl-dropdown-item>
        </ul>
      </li>
    </ul>
  </div>
</template>
