<script>
import { cloneDeep } from 'lodash';
import PortalVue from 'portal-vue';
import Vue from 'vue';
import GlTooltip from '../../../directives/tooltip';
import GlIcon from '../icon/icon.vue';
import GlSearchBoxByClick from '../search_box_by_click/search_box_by_click.vue';
import GlFilteredSearchTerm from './filtered_search_term.vue';
import {
  isEmptyTerm,
  TERM_TOKEN_TYPE,
  normalizeTokens,
  denormalizeTokens,
  needDenormalization,
} from './filtered_search_utils';

Vue.use(PortalVue);

let portalUuid = 0;

function createTerm(data = '') {
  return {
    type: TERM_TOKEN_TYPE,
    value: { data },
  };
}

function initialState() {
  return [createTerm()];
}

export default {
  components: {
    GlSearchBoxByClick,
    GlIcon,
  },
  directives: { GlTooltip },
  provide() {
    portalUuid += 1;
    this.portalName = `filters_portal_${portalUuid}`;

    return {
      portalName: this.portalName,
      alignSuggestions: (ref) => this.alignSuggestions(ref),
      suggestionsListClass: this.suggestionsListClass,
    };
  },
  inheritAttrs: false,
  props: {
    value: {
      required: false,
      type: Array,
      default: () => [],
    },
    availableTokens: {
      type: Array,
      required: false,
      default: () => [],
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Search',
    },
    clearButtonTitle: {
      type: String,
      required: false,
      default: 'Clear',
    },
    historyItems: {
      type: Array,
      required: false,
      default: null,
    },
    suggestionsListClass: {
      type: [String, Array, Object],
      required: false,
      default: null,
    },
    showFriendlyText: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      tokens: initialState(),
      activeTokenIdx: null,
      suggestionsStyle: {},
    };
  },
  computed: {
    activeToken() {
      return this.tokens[this.activeTokenIdx];
    },
    lastTokenIdx() {
      return this.tokens.length - 1;
    },
    isLastTokenActive() {
      return this.activeTokenIdx === this.lastTokenIdx;
    },
    hasValue() {
      return this.tokens.length > 1 || this.tokens[0].value.data !== '';
    },
    termPlaceholder() {
      return this.hasValue ? null : this.placeholder;
    },
    currentAvailableTokens() {
      return this.availableTokens.filter((token) => {
        if (token.disabled) {
          return false;
        }

        if (token.unique) {
          return !this.tokens.find((t) => t.type === token.type);
        }

        return true;
      });
    },
  },
  watch: {
    tokens: {
      handler() {
        if (this.tokens.length === 0 || !this.isLastTokenEmpty()) {
          this.tokens.push(createTerm());
        }

        this.$emit('input', this.tokens);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    if (this.value.length) {
      this.applyNewValue(cloneDeep(this.value));
    }
  },

  methods: {
    applyNewValue(newValue) {
      this.tokens = needDenormalization(newValue) ? denormalizeTokens(newValue) : newValue;
    },

    isLastToken(idx) {
      return !this.activeTokenIdx && idx === this.lastTokenIdx;
    },

    isLastTokenEmpty() {
      return isEmptyTerm(this.tokens[this.lastTokenIdx]);
    },

    getTokenEntry(type) {
      return this.availableTokens.find((t) => t.type === type);
    },

    getTokenComponent(type) {
      return this.getTokenEntry(type)?.token || GlFilteredSearchTerm;
    },

    activate(token) {
      this.activeTokenIdx = token;
    },

    alignSuggestions(ref) {
      const offsetRef = ref.getBoundingClientRect().left;
      const offsetMenu = this.$el.getBoundingClientRect().left;
      const transform = `translateX(${Math.floor(offsetRef - offsetMenu)}px)`;
      this.suggestionsStyle = { transform };
    },

    deactivate(token) {
      const tokenIdx = this.tokens.indexOf(token);
      if (tokenIdx === -1 || this.activeTokenIdx !== tokenIdx) {
        return;
      }

      if (!this.isLastTokenEmpty()) {
        this.tokens.push(createTerm());
      }

      if (!this.isLastTokenActive && isEmptyTerm(this.activeToken)) {
        this.tokens.splice(tokenIdx, 1);
      }

      this.activeTokenIdx = null;
    },

    destroyToken(idx) {
      if (this.tokens.length === 1) {
        return;
      }

      this.tokens.splice(idx, 1);
      if (idx !== 0) {
        this.activeTokenIdx = idx - 1;
      }
    },

    replaceToken(idx, token) {
      this.$set(this.tokens, idx, { ...token, value: { data: '', ...token.value } });
      this.activeTokenIdx = idx;
    },

    createTokens(idx, newStrings = ['']) {
      if (
        this.activeTokenIdx !== this.lastTokenIdx &&
        newStrings.length === 1 &&
        newStrings[0] === ''
      ) {
        this.activeTokenIdx = this.lastTokenIdx;
        return;
      }

      const newTokens = newStrings.map((data) => ({
        type: TERM_TOKEN_TYPE,
        value: { data },
      }));

      this.tokens.splice(idx + 1, 0, ...newTokens);

      this.activeTokenIdx = idx + newStrings.length;
    },

    completeToken() {
      if (this.activeTokenIdx === this.lastTokenIdx - 1) {
        this.activeTokenIdx = this.lastTokenIdx;
      } else {
        this.activeTokenIdx = null;
      }
    },

    submit() {
      this.$emit('submit', normalizeTokens(cloneDeep(this.tokens)));
    },

    clearInput() {
      this.tokens = initialState();
      this.$emit('clearInput');
    },
  },
};
</script>

<template>
  <gl-search-box-by-click
    v-bind="$attrs"
    :value="tokens"
    :history-items="historyItems"
    :clearable="hasValue"
    @submit="submit"
    @input="applyNewValue"
    @history-item-selected="$emit('history-item-selected', $event)"
    @clear="$emit('clear')"
    @clear-history="$emit('clear-history')"
  >
    <template #history-item="slotScope">
      <slot name="history-item" v-bind="slotScope"></slot>
    </template>
    <template #input>
      <div class="gl-filtered-search-scrollable">
        <template v-for="(token, idx) in tokens">
          <component
            :is="getTokenComponent(token.type)"
            ref="tokens"
            :key="`${token.type}-${idx}`"
            v-model="token.value"
            :config="getTokenEntry(token.type)"
            :active="activeTokenIdx === idx"
            :available-tokens="currentAvailableTokens"
            :current-value="tokens"
            :index="idx"
            :placeholder="termPlaceholder"
            :show-friendly-text="showFriendlyText"
            class="gl-filtered-search-item"
            :class="{
              'gl-filtered-search-last-item': isLastToken(idx),
            }"
            @activate="activate(idx)"
            @deactivate="deactivate(token)"
            @destroy="destroyToken(idx)"
            @replace="replaceToken(idx, $event)"
            @complete="completeToken"
            @submit="submit"
            @split="createTokens(idx, $event)"
          />
        </template>
      </div>
      <portal-target
        ref="menu"
        :key="activeTokenIdx"
        :name="portalName"
        slim
        :style="suggestionsStyle"
      />
    </template>
  </gl-search-box-by-click>
</template>
