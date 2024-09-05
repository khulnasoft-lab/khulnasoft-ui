<script>
import debounce from 'lodash/debounce';
import { translate } from '../../../../../../../utils/i18n';
import GlCard from '../../../../../../base/card/card.vue';
import { categoriesValidator, contextItemsValidator } from '../utils';
import GlDuoChatContextItemSelections from '../duo_chat_context_item_selections/duo_chat_context_item_selections.vue';
import GlDuoChatContextItemMenuCategoryItems from './duo_chat_context_item_menu_category_items.vue';
import GlDuoChatContextItemMenuSearchItems from './duo_chat_context_item_menu_search_items.vue';

const SEARCH_DEBOUNCE_MS = 30;

export default {
  name: 'GlDuoChatContextItemMenu',
  components: {
    GlCard,
    GlDuoChatContextItemMenuCategoryItems,
    GlDuoChatContextItemMenuSearchItems,
    GlDuoChatContextItemSelections,
  },
  props: {
    /**
     * Whether the menu is open.
     */
    open: {
      type: Boolean,
      required: true,
    },
    /**
     * Array of selected context items.
     */
    selections: {
      type: Array,
      required: true,
      validator: contextItemsValidator,
    },
    /**
     * Whether the menu is in a loading state.
     */
    loading: {
      type: Boolean,
      required: true,
    },
    /**
     * Error message to display, if any.
     */
    error: {
      type: [String, null],
      required: false,
      default: null,
    },
    /**
     * Array of available categories for context items.
     */
    categories: {
      type: Array,
      required: true,
      validator: categoriesValidator,
    },
    /**
     * Array of search results for context items.
     */
    results: {
      type: Array,
      required: true,
      validator: contextItemsValidator,
    },
  },
  data() {
    return {
      activeIndex: 0,
      searchQuery: '',
      selectedCategory: null,
    };
  },
  computed: {
    showCategorySelection() {
      return this.open && !this.selectedCategory;
    },
  },
  watch: {
    open(isOpen) {
      if (!isOpen) {
        this.resetSelection();
      }
    },
    searchQuery(query) {
      this.debouncedSearch(query);
    },
  },
  methods: {
    selectCategory(category) {
      this.activeIndex = 0;
      this.searchQuery = '';
      this.selectedCategory = category;

      /**
       * Emitted when a search should be performed.
       * @property {Object} filter
       * @property {string} filter.category - The value of the selected category
       * @property {string} filter.query - The search query
       */
      this.$emit('search', {
        category: category.value,
        query: '',
      });
    },
    selectItem(item) {
      if (!item.isEnabled) {
        return;
      }

      /**
       * Emitted when a context item is selected.
       * @property {Object} item - The selected context item
       */
      this.$emit(
        'select',
        this.results.find((result) => result.id === item.id)
      );

      /**
       * Emitted when the menu should be closed.
       */
      this.$emit('close');
      this.resetSelection();
    },
    removeItem(item) {
      /**
       * Emitted when a context item should be removed.
       * @property {Object} item - The context item to be removed
       */
      this.$emit('remove', item);
    },
    debouncedSearch: debounce(function search(query) {
      this.$emit('search', {
        category: this.selectedCategory.value,
        query,
      });
    }, SEARCH_DEBOUNCE_MS),
    resetSelection() {
      this.selectedCategory = null;
      this.activeIndex = 0;
    },
  },
  i18n: {
    selectedContextItemsTitle: translate(
      'GlDuoChatContextItemMenu.selectedContextItemsTitle',
      'Included references'
    ),
  },
};
</script>

<template>
  <div>
    <gl-duo-chat-context-item-selections
      v-if="selections.length"
      :selections="selections"
      :removable="true"
      :title="$options.i18n.selectedContextItemsTitle"
      :default-collapsed="false"
      class="gl-mb-3"
      @remove="removeItem"
    />
    <gl-card
      v-if="open"
      class="slash-commands !gl-absolute gl-bottom-0 gl-w-full gl-pl-0 gl-shadow-md"
      body-class="!gl-p-2"
      data-testid="context-item-menu"
    >
      <gl-duo-chat-context-item-menu-category-items
        v-if="showCategorySelection"
        :active-index="activeIndex"
        :categories="categories"
        @select="selectCategory"
        @active-index-change="activeIndex = $event"
      />
      <gl-duo-chat-context-item-menu-search-items
        v-else
        v-model="searchQuery"
        :active-index="activeIndex"
        :category="selectedCategory"
        :loading="loading"
        :error="error"
        :results="results"
        @select="selectItem"
        @active-index-change="activeIndex = $event"
      />
    </gl-card>
  </div>
</template>
