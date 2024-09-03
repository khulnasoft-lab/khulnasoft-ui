<script>
import GlDropdownItem from '../../../../../../base/dropdown/dropdown_item.vue';
import GlFormInput from '../../../../../../base/form/form_input/form_input.vue';
import GlAlert from '../../../../../../base/alert/alert.vue';
import { sprintf, translate } from '../../../../../../../utils/i18n';
import { categoryValidator, contextItemsValidator } from '../utils';
import GlDuoChatContextItemMenuSearchItemsLoading from './duo_chat_context_item_menu_search_items_loading.vue';
import GlDuoChatContextItemMenuSearchItem from './duo_chat_context_item_menu_search_item.vue';

export default {
  name: 'GlDuoChatContextItemMenuSearchItems',
  components: {
    GlAlert,
    GlFormInput,
    GlDropdownItem,
    GlDuoChatContextItemMenuSearchItem,
    GlDuoChatContextItemMenuSearchItemsLoading,
  },
  model: {
    prop: 'searchQuery',
    event: 'update:searchQuery',
  },
  props: {
    activeIndex: {
      type: Number,
      required: true,
    },
    searchQuery: {
      type: String,
      required: true,
    },
    category: {
      type: Object,
      required: true,
      validator: categoryValidator,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: [String, null],
      required: false,
      default: null,
    },
    results: {
      type: Array,
      required: true,
      validator: contextItemsValidator,
    },
  },
  data() {
    return {
      userInitiatedSearch: false,
    };
  },
  computed: {
    showEmptyState() {
      return Boolean(
        this.userInitiatedSearch && !this.loading && !this.error && !this.results.length
      );
    },
    searchInputPlaceholder() {
      return sprintf(
        translate('GlDuoChatContextItemMenu.searchInputPlaceholder', 'Search %{categoryLabel}...'),
        {
          categoryLabel: this.category.label.toLowerCase(),
        }
      );
    },
  },
  watch: {
    searchQuery() {
      this.userInitiatedSearch = true;
    },
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item);
      this.userInitiatedSearch = false;
    },
    handleKeyUp(e) {
      this.$emit('keyup', e);
    },
    setActiveIndex(index) {
      if (this.results[index]?.isEnabled) {
        this.$emit('active-index-change', index);
      }
    },
  },
  i18n: {
    emptyStateMessage: translate('GlDuoChatContextItemMenu.emptyStateMessage', 'No results found'),
  },
};
</script>
<template>
  <div>
    <div class="gl-max-h-31 gl-overflow-y-scroll">
      <gl-duo-chat-context-item-menu-search-items-loading v-if="loading" />
      <gl-alert
        v-else-if="error"
        variant="danger"
        :dismissible="false"
        class="gl-m-3"
        data-testid="search-results-error"
      >
        {{ error }}
      </gl-alert>
      <div
        v-else-if="showEmptyState"
        class="gl-rounded-base gl-p-3 gl-text-center gl-text-secondary"
        data-testid="search-results-empty-state"
      >
        {{ $options.i18n.emptyStateMessage }}
      </div>
      <ul v-else class="list-unstyled gl-mb-1 gl-flex-row">
        <gl-dropdown-item
          v-for="(item, index) in results"
          :id="`dropdown-item-${index}`"
          :key="item.id"
          :class="[{ 'active-command': index === activeIndex, disabled: !item.isEnabled }]"
          :tabindex="!item.isEnabled ? -1 : undefined"
          class="duo-chat-context-search-result-item"
          data-testid="search-result-item"
          @click="selectItem(item)"
        >
          <div @mouseenter="setActiveIndex(index)">
            <gl-duo-chat-context-item-menu-search-item
              :item="item"
              :category="category"
              data-testid="search-result-item-details"
            />
          </div>
        </gl-dropdown-item>
      </ul>
    </div>
    <gl-form-input
      ref="contextMenuSearchInput"
      :value="searchQuery"
      :placeholder="searchInputPlaceholder"
      data-testid="context-menu-search-input"
      @input="$emit('update:searchQuery', $event)"
      @keyup="handleKeyUp"
    />
  </div>
</template>
