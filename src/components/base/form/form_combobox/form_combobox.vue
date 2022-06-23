<script>
import { uniqueId } from 'lodash';

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
      return this.value.length > 0 && this.totalItems.length > 0;
    },
    displayedValue() {
      return this.matchValueToAttr && this.value[this.matchValueToAttr]
        ? this.value[this.matchValueToAttr]
        : this.value;
    },
    tokenNumber() {
      return this.results.length;
    },
    totalItems() {
      return [...this.results, ...this.actionList];
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
    onArrowDown() {
      const newCount = this.arrowCounter + 1;

      if (newCount >= this.totalItems.length) {
        this.arrowCounter = 0;
        return;
      }

      this.arrowCounter = newCount;
    },
    onArrowUp() {
      const newCount = this.arrowCounter - 1;

      if (newCount < 0) {
        this.arrowCounter = this.totalItems.length - 1;
        return;
      }

      this.arrowCounter = newCount;
    },
    onEnter() {
      const currentToken = this.totalItems[this.arrowCounter] || this.value;
      if (currentToken.function) {
        this.selectAction(currentToken);
      } else {
        this.selectToken(currentToken);
      }
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
    selectAction(value) {
      value.function();
      this.$emit('input', this.value);
      this.closeSuggestions();
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
      class="dropdown-menu dropdown-full-width show-dropdown gl-list-style-none gl-pl-0 gl-mb-0 gl-display-flex gl-flex-direction-column"
    >
      <div class="gl-overflow-y-auto show-dropdown">
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
      </div>
      <gl-dropdown-divider v-if="tokenNumber > 0 && actionList.length > 0" />
      <gl-dropdown-item
        v-for="(action, i) in actionList"
        :key="i + tokenNumber"
        role="option"
        :class="{ 'highlight-dropdown': i + tokenNumber === arrowCounter }"
        :aria-selected="i + tokenNumber === arrowCounter"
        tabindex="-1"
        data-testid="combobox-action"
        @click="selectAction(action)"
      >
        <slot name="action" :item="action">{{ action.label }}</slot>
      </gl-dropdown-item>
    </ul>
  </div>
</template>
