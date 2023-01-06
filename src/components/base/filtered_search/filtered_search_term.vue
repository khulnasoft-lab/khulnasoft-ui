<script>
import GlToken from '../token/token.vue';
import GlFilteredSearchTokenSegment from './filtered_search_token_segment.vue';
import {
  INTENT_ACTIVATE_PREVIOUS,
  TERM_TOKEN_TYPE,
  termTokenDefinition,
} from './filtered_search_utils';

// TODO: extract these to constants file
const TOKEN_CLOSE_SELECTOR = '.gl-token-close';

export default {
  name: 'GlFilteredSearchTerm',
  components: {
    GlFilteredSearchTokenSegment,
    GlToken,
  },
  inheritAttrs: false,
  props: {
    /**
     * Tokens available for this filtered search instance.
     */
    availableTokens: {
      type: Array,
      required: true,
    },
    /**
     * Determines if the term is being edited or not.
     */
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Whether any token is active.
     */
    anyActive: {
      type: Boolean,
      required: true,
    },
    /**
     * Current term value.
     */
    value: {
      type: Object,
      required: false,
      default: () => ({ data: '' }),
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * HTML attributes to add to the search input.
     */
    searchInputAttributes: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    /**
     * If this is the last token.
     */
    isLastToken: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * The current `value` (tokens) of the ancestor GlFilteredSearch component.
     */
    currentValue: {
      type: Array,
      required: false,
      default: () => [],
    },
    cursorPosition: {
      type: String,
      required: false,
      default: 'end',
      validator: (value) => ['start', 'end'].includes(value),
    },
    viewOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    showInput() {
      const ret = !this.anyActive && this.isEmptyLastToken;
      return ret;
    },
    showToken() {
      const ret = !this.active && !this.isLastToken;
      return ret;
    },
    isEmptyLastToken() {
      return this.isLastToken && this.value.data.trim() === '';
    },
    suggestedTokens() {
      const tokens = [...this.availableTokens];
      if (this.value.data) tokens.push(termTokenDefinition);

      return tokens.map((token) => ({
        icon: token.icon,
        title: token.title,
        value: token.type,
      }));
    },
    internalValue: {
      get() {
        return this.value.data;
      },
      set(data) {
        /**
         * Emitted when the token changes its value.
         *
         * @event input
         * @type {object} dataObj Object containing the update value.
         */
        this.$emit('input', { data });
      },
    },
    eventListeners() {
      return this.viewOnly ? {} : { mousedown: this.destroyByClose };
    },
  },
  methods: {
    onBackspace() {
      /**
       * Emitted when token value is empty and backspace is pressed.
       * Includes user intent to activate previous token.
       *
       * @event destroy
       * @type {object} details The user intent
       */
      this.$emit('destroy', { intent: INTENT_ACTIVATE_PREVIOUS });
    },
    destroyByClose(event) {
      if (event.target.closest(TOKEN_CLOSE_SELECTOR)) {
        event.preventDefault();
        event.stopPropagation();
        this.$emit('destroy');
      }
    },
    onComplete(type) {
      if (type !== TERM_TOKEN_TYPE) {
        // We're changing the current token type
        this.$emit('replace', { type });
      } else {
        // We've completed this term token
        this.$emit('complete');
      }
    },
  },
};
</script>

<template>
  <div class="gl-h-auto gl-filtered-search-term" data-testid="filtered-search-term">
    <!--
      Emitted when this term token is clicked.
      @event activate
    -->

    <!--
      Emitted when this term token will lose its focus.
      @event deactivate
    -->

    <!--
      Emitted when autocomplete entry is selected.
      @event replace
      @property {object} token Replacement token configuration.
    -->

    <!--
      Emitted when the token is submitted.
      @event submit
    -->

    <gl-filtered-search-token-segment
      ref="segment"
      v-model="internalValue"
      class="gl-filtered-search-term-token"
      :active="active"
      :cursor-position="cursorPosition"
      :search-input-attributes="searchInputAttributes"
      :is-last-token="isLastToken"
      :current-value="currentValue"
      :view-only="viewOnly"
      :options="suggestedTokens"
      option-text-field="title"
      @activate="$emit('activate')"
      @deactivate="$emit('deactivate')"
      @complete="onComplete"
      @backspace="onBackspace"
      @submit="$emit('submit')"
      @previous="$emit('previous')"
      @next="$emit('next')"
    >
      <template #view>
        <!--
          This input was/is? ONLY displayed when there are no tokens. This should be ditched in favour of relying on Segment's input...
        -->
        <input
          v-if="showInput"
          v-bind="searchInputAttributes"
          class="gl-filtered-search-term-input"
          :class="{ 'gl-bg-gray-10': viewOnly }"
          :placeholder="placeholder"
          :aria-label="placeholder"
          :readonly="viewOnly"
          data-testid="filtered-search-term-input"
          @focusin="$emit('activate')"
        />

        <gl-token
          v-else-if="showToken"
          class="gl-filtered-search-token-data"
          :class="{ 'gl-cursor-pointer': !viewOnly }"
          variant="search-value"
          :view-only="viewOnly"
          v-on="eventListeners"
        >
          <span class="gl-filtered-search-token-data-content">{{ value.data }}</span>
        </gl-token>
      </template>
    </gl-filtered-search-token-segment>
  </div>
</template>
