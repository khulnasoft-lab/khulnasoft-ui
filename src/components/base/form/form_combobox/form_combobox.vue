<script>
import { uniqueId } from 'lodash';

import GlDropdownItem from '../../dropdown/dropdown_item.vue';
import GlFormGroup from '../form_group/form_group.vue';
import GlFormInput from '../form_input/form_input.vue';

export default {
  name: 'GlFormCombobox',
  components: {
    GlDropdownItem,
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
      return this.results.length > 0;
    },
    displayedValue() {
      return this.matchValueToAttr && this.value[this.matchValueToAttr]
        ? this.value[this.matchValueToAttr]
        : this.value;
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
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.closeSuggestions();
      }
    },
    onArrowDown() {
      const newCount = this.arrowCounter + 1;

      if (newCount >= this.results.length) {
        this.arrowCounter = 0;
        return;
      }

      this.arrowCounter = newCount;
    },
    onArrowUp() {
      const newCount = this.arrowCounter - 1;

      if (newCount < 0) {
        this.arrowCounter = this.results.length - 1;
        return;
      }

      this.arrowCounter = newCount;
    },
    onEnter() {
      const currentToken = this.results[this.arrowCounter] || this.value;
      this.selectToken(currentToken);
    },
    onEsc() {
      if (!this.showSuggestions) {
        this.$emit('input', '');
      }
      this.closeSuggestions();
      this.userDismissedResults = true;
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
        this.closeSuggestions();
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
        @input="onEntry"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter.prevent="onEnter"
        @keydown.esc.stop="onEsc"
        @keydown.tab="closeSuggestions"
      />
    </gl-form-group>

    <ul
      v-show="showSuggestions && !userDismissedResults"
      :id="suggestionsId"
      data-testid="combobox-dropdown"
      class="dropdown-menu dropdown-full-width gl-list-style-none gl-pl-0 gl-mb-0 gl-overflow-y-auto"
      :class="{ 'show-dropdown': showSuggestions }"
    >
      <gl-dropdown-item
        v-for="(result, i) in results"
        :key="i"
        role="option"
        :class="{ 'highlight-dropdown': i === arrowCounter }"
        :aria-selected="i === arrowCounter"
        tabindex="-1"
        @click="selectToken(result)"
      >
        <slot name="result" :item="result">{{ result }}</slot>
      </gl-dropdown-item>
    </ul>
  </div>
</template>
