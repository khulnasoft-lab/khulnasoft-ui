<script>
import GlFilteredSearchSuggestion from './filtered_search_suggestion.vue';
import GlFilteredSearchTokenSegment from './filtered_search_token_segment.vue';
import { INTENT_ACTIVATE_PREVIOUS } from './filtered_search_utils';

export default {
  components: {
    GlFilteredSearchTokenSegment,
    GlFilteredSearchSuggestion,
  },
  inheritAttrs: false,
  props: {
    availableTokens: {
      type: Array,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
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
    searchInputAttributes: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    isLastToken: {
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
        this.$emit('input', { data });
      },
    },
  },
  methods: {
    onBackspace() {
      this.$emit('destroy', { intent: INTENT_ACTIVATE_PREVIOUS });
    },
  },
};
</script>

<template>
  <div class="gl-h-auto gl-filtered-search-term">
    <gl-filtered-search-token-segment
      v-model="internalValue"
      class="gl-filtered-search-term-token"
      :active="active"
      :class="{ 'gl-w-full': placeholder }"
      :search-input-attributes="searchInputAttributes"
      :is-last-token="isLastToken"
      @activate="$emit('activate')"
      @deactivate="$emit('deactivate')"
      @complete="$emit('replace', { type: $event })"
      @backspace="onBackspace"
      @submit="$emit('submit')"
      @split="$emit('split', $event)"
    >
      <template #suggestions>
        <gl-filtered-search-suggestion
          v-for="(item, idx) in suggestedTokens"
          :key="idx"
          :value="item.type"
          :icon-name="item.icon"
        >
          {{ item.title }}
        </gl-filtered-search-suggestion>
      </template>
      <template #view>
        <input
          v-if="placeholder"
          v-bind="searchInputAttributes"
          class="gl-filtered-search-term-input"
          :placeholder="placeholder"
          :aria-label="placeholder"
        />
        <template v-else>{{ value.data }}</template>
      </template>
    </gl-filtered-search-token-segment>
  </div>
</template>
