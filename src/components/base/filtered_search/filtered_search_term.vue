<script>
import GlFilteredSearchSuggestion from './filtered_search_suggestion.vue';
import GlFilteredSearchTokenSegment from './filtered_search_token_segment.vue';
import { INTENT_ACTIVATE_PREVIOUS } from './filtered_search_utils';

export default {
  name: 'GlFilteredSearchTerm',
  components: {
    GlFilteredSearchTokenSegment,
    GlFilteredSearchSuggestion,
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
    suggestedTokens() {
      return this.availableTokens.filter((item) =>
        item.title.toLowerCase().includes(this.value.data.toLowerCase())
      );
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

    <!--
      Emitted when Space is pressed in-between term text.
      @event split
      @property {array} newTokens Token configurations
    -->

    <gl-filtered-search-token-segment
      ref="segment"
      v-model="internalValue"
      class="gl-filtered-search-term-token"
      :active="active"
      :cursor-position="cursorPosition"
      :class="{ 'gl-w-full': placeholder }"
      :search-input-attributes="searchInputAttributes"
      :is-last-token="isLastToken"
      :current-value="currentValue"
      :view-only="viewOnly"
      @activate="$emit('activate')"
      @deactivate="$emit('deactivate')"
      @complete="$emit('replace', { type: $event })"
      @backspace="onBackspace"
      @submit="$emit('submit')"
      @split="$emit('split', $event)"
      @previous="$emit('previous')"
      @next="$emit('next')"
    >
      <template #suggestions>
        <gl-filtered-search-suggestion
          v-for="(item, idx) in suggestedTokens"
          :key="idx"
          :value="item.type"
          :icon-name="item.icon"
        >
          <slot name="title" v-bind="{ value: item.title }"> {{ item.title }} </slot>
        </gl-filtered-search-suggestion>
      </template>

      <template #view>
        <input
          v-if="placeholder"
          v-bind="searchInputAttributes"
          class="gl-filtered-search-term-input"
          :class="{ 'gl-bg-gray-10': viewOnly }"
          :placeholder="placeholder"
          :aria-label="placeholder"
          :readonly="viewOnly"
          data-testid="filtered-search-term-input"
        />

        <template v-else>{{ value.data }}</template>
      </template>
    </gl-filtered-search-token-segment>
  </div>
</template>
