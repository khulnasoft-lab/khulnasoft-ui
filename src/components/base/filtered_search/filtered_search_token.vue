<script>
import { COMMA } from '../../../utils/constants';
import GlToken from '../token/token.vue';
import GlFilteredSearchTokenSegment from './filtered_search_token_segment.vue';
import { TERM_TOKEN_TYPE } from './filtered_search_utils';

const SEGMENT_TITLE = 'TYPE';
const SEGMENT_OPERATOR = 'OPERATOR';
const SEGMENT_DATA = 'DATA';
const TOKEN_CLOSE_SELECTOR = '.gl-token-close';

const DEFAULT_OPERATORS = [
  { value: '=', description: 'is', default: 'true' },
  { value: '!=', description: 'is not' },
];

export default {
  components: {
    GlToken,
    GlFilteredSearchTokenSegment,
  },
  inheritAttrs: false,
  props: {
    availableTokens: {
      type: Array,
      required: false,
      default: () => [],
    },
    config: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    multiSelectValues: {
      type: Array,
      required: false,
      default: () => [],
    },
    value: {
      type: Object,
      required: false,
      default: () => ({ operator: '', data: '' }),
    },
    showFriendlyText: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      activeSegment: null,
    };
  },

  computed: {
    operators() {
      return this.config.operators || DEFAULT_OPERATORS;
    },

    hasDataOrDataSegmentIsCurrentlyActive() {
      return this.value.data !== '' || this.isSegmentActive(SEGMENT_DATA);
    },

    availableTokensWithSelf() {
      return [this.config, ...this.availableTokens.filter((t) => t !== this.config)].map((t) => ({
        ...t,
        value: t.title,
      }));
    },

    operatorDescription() {
      const operator = this.operators.find((op) => op.value === this.value.operator);
      return this.showFriendlyText ? operator?.description : operator?.value;
    },
  },
  segments: {
    SEGMENT_TITLE,
    SEGMENT_DATA,
    SEGMENT_OPERATOR,
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue);
      },
    },

    active: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          if (!this.activeSegment) {
            this.activateSegment(this.value.data !== '' ? SEGMENT_DATA : SEGMENT_OPERATOR);
          }
        } else if (this.value.data === '') {
          this.activeSegment = null;
          this.$emit('destroy');
        }
      },
    },
  },

  created() {
    if (!('operator' in this.value)) {
      if (this.operators.length === 1) {
        const operator = this.operators[0].value;
        this.$emit('input', { ...this.value, operator });
        this.activeSegment = SEGMENT_DATA;
      } else {
        this.$emit('input', { ...this.value, operator: '' });
      }
    }
  },

  methods: {
    activateSegment(segment) {
      this.activeSegment = segment;

      if (!this.active) {
        this.$emit('activate');
      }
    },

    getAdditionalSegmentClasses(segment) {
      return { 'gl-cursor-pointer': !this.isSegmentActive(segment) };
    },

    isSegmentActive(segment) {
      return this.active && this.activeSegment === segment;
    },

    replaceWithTermIfEmpty() {
      if (this.value.operator === '' && this.value.data === '') {
        this.$emit('replace', { type: TERM_TOKEN_TYPE, value: { data: this.config.title } });
      }
    },

    replaceToken(newTitle) {
      const newTokenConfig = this.availableTokens.find((t) => t.title === newTitle);

      if (newTokenConfig === this.config) {
        this.$nextTick(() => {
          this.$emit('deactivate');
        });
        return;
      }

      if (newTokenConfig) {
        const isCompatible =
          this.config.dataType && this.config.dataType === newTokenConfig.dataType;
        this.$emit('replace', {
          type: newTokenConfig.type,
          value: isCompatible ? this.value : { data: '' },
        });
      }
    },

    handleOperatorKeydown(evt, { inputValue, suggestedValue, applySuggestion }) {
      const { key } = evt;
      // if (key === ' ' || key === 'Spacebar') {
      //   applySuggestion(suggestedValue);
      //   return;
      // }

      const potentialValue = `${inputValue}${key}`;
      if (
        key.length === 1 &&
        !this.operators.find(({ value }) => value.startsWith(potentialValue))
      ) {
        if (this.value.data === '') {
          applySuggestion(suggestedValue);
        } else {
          evt.preventDefault();
        }
      }
    },

    activateDataSegment() {
      if (this.config.multiSelect) {
        this.$emit('input', { ...this.value, data: '' });
      }
      this.activateSegment(this.$options.segments.SEGMENT_DATA);
    },

    handleComplete() {
      if (this.config.multiSelect) {
        this.$emit('input', { ...this.value, data: this.multiSelectValues.join(COMMA) });
      }
      this.$emit('complete');
    },

    destroyByClose(event) {
      if (event.target.closest(TOKEN_CLOSE_SELECTOR)) {
        event.preventDefault();
        this.$emit('destroy');
      }
    },
  },
};
</script>

<template>
  <div class="gl-filtered-search-token" :class="{ 'gl-filtered-search-token-active': active }">
    <gl-filtered-search-token-segment
      key="title-segment"
      :value="config.title"
      :active="isSegmentActive($options.segments.SEGMENT_TITLE)"
      :options="availableTokensWithSelf"
      @activate="activateSegment($options.segments.SEGMENT_TITLE)"
      @deactivate="$emit('deactivate')"
      @complete="replaceToken"
      @backspace="$emit('destroy')"
      @submit="$emit('submit')"
    >
      <template #view="{ inputValue }">
        <gl-token
          class="gl-filtered-search-token-type"
          :class="getAdditionalSegmentClasses($options.segments.SEGMENT_TITLE)"
          view-only
          >{{ inputValue }}</gl-token
        >
      </template>
    </gl-filtered-search-token-segment>
    <!-- eslint-disable vue/no-mutating-props -->
    <gl-filtered-search-token-segment
      key="operator-segment"
      v-model="value.operator"
      :active="isSegmentActive($options.segments.SEGMENT_OPERATOR)"
      :options="operators"
      :custom-input-keydown-handler="handleOperatorKeydown"
      view-only
      @activate="activateSegment($options.segments.SEGMENT_OPERATOR)"
      @backspace="replaceWithTermIfEmpty"
      @complete="activateSegment($options.segments.SEGMENT_DATA)"
      @deactivate="$emit('deactivate')"
    >
      <!-- eslint-enable vue/no-mutating-props -->
      <template #view>
        <gl-token
          class="gl-filtered-search-token-operator"
          variant="search-value"
          :class="getAdditionalSegmentClasses($options.segments.SEGMENT_OPERATOR)"
          view-only
          >{{ operatorDescription }}</gl-token
        >
      </template>
      <template #option="{ option }">
        <div class="gl-display-flex">
          {{ option.value }}
          <span v-if="option.description" class="gl-filtered-search-token-operator-description">
            {{ option.description }}
          </span>
        </div>
      </template>
    </gl-filtered-search-token-segment>
    <!-- eslint-disable vue/no-mutating-props -->
    <gl-filtered-search-token-segment
      v-if="hasDataOrDataSegmentIsCurrentlyActive"
      key="data-segment"
      v-model="value.data"
      :active="isSegmentActive($options.segments.SEGMENT_DATA)"
      :multi-select="config.multiSelect"
      :options="config.options"
      option-text-field="title"
      @activate="activateDataSegment"
      @backspace="activateSegment($options.segments.SEGMENT_OPERATOR)"
      @complete="handleComplete"
      @select="$emit('select', $event)"
      @submit="$emit('submit')"
      @deactivate="$emit('deactivate')"
      @split="$emit('split', $event)"
    >
      <!-- eslint-enable vue/no-mutating-props -->
      <template #suggestions>
        <slot name="suggestions"></slot>
      </template>
      <template #view="{ inputValue }">
        <slot
          name="view-token"
          v-bind="{
            inputValue,
            listeners: { mousedown: destroyByClose },
            cssClasses: {
              'gl-filtered-search-token-data': true,
              ...getAdditionalSegmentClasses($options.segments.SEGMENT_DATA),
            },
          }"
        >
          <gl-token
            class="gl-filtered-search-token-data"
            variant="search-value"
            :class="getAdditionalSegmentClasses($options.segments.SEGMENT_DATA)"
            @mousedown="destroyByClose"
          >
            <span class="gl-filtered-search-token-data-content">
              <slot name="view" v-bind="{ inputValue }">{{ inputValue }}</slot>
            </span>
          </gl-token>
        </slot>
      </template>
    </gl-filtered-search-token-segment>
  </div>
</template>
