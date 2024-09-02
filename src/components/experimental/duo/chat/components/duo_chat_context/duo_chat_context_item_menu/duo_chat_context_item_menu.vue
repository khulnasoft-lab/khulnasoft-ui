<script>
import debounce from 'lodash/debounce';
import { translate } from '../../../../../../../utils/i18n';
import GlCard from '../../../../../../base/card/card.vue';
import GlDuoChatContextItemSelections from '../duo_chat_context_item_selections/duo_chat_context_item_selections.vue';
import { categoriesValidator, contextItemsValidator } from '../utils';
import GlDuoChatContextItemMenuCategoryItems from './duo_chat_context_item_menu_category_items.vue';
import GlDuoChatContextItemMenuContextSearchItems from './duo_chat_context_item_menu_context_search_items.vue';

const SEARCH_DEBOUNCE_MS = 30;

export default {
  name: 'GlDuoChatContextItemMenu',
  components: {
    GlCard,
    GlDuoChatContextItemMenuCategoryItems,
    GlDuoChatContextItemMenuContextSearchItems,
    GlDuoChatContextItemSelections,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    selections: {
      type: Array,
      required: true,
      validator: contextItemsValidator,
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
    categories: {
      type: Array,
      required: true,
      validator: categoriesValidator,
    },
    results: {
      type: Array,
      required: true,
      validator: contextItemsValidator,
    },
  },
  data() {
    return {
      selectedCategory: null,
      searchQuery: '',
      activeIndex: 0,
    };
  },
  computed: {
    showCategorySelection() {
      return this.open && !this.selectedCategory;
    },
    allResultsAreDisabled() {
      return this.results.every((result) => !result.isEnabled);
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
    async focusSearchInput() {
      await this.$nextTick();

      if (this.showCategorySelection) {
        return;
      }

      this.$refs.contextMenuSearchInput?.$el?.focus();
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.searchQuery = '';
      this.activeIndex = 0;
      this.$emit('search', {
        category: category.value,
        query: '',
      });

      this.focusSearchInput();
    },
    debouncedSearch: debounce(function search(query) {
      this.$emit('search', {
        category: this.selectedCategory.value,
        query,
      });
    }, SEARCH_DEBOUNCE_MS),
    selectItem(item) {
      if (!item.isEnabled) {
        return;
      }

      this.$emit(
        'select',
        this.results.find((result) => result.id === item.id)
      );
      this.$emit('close');
      this.resetSelection();
    },
    removeItem(item) {
      this.$emit('remove', item);
    },
    resetSelection() {
      this.selectedCategory = null;
      this.searchQuery = '';
      this.activeIndex = 0;
    },
    async scrollActiveItemIntoView() {
      await this.$nextTick();

      const activeItem = document.getElementById(`dropdown-item-${this.activeIndex}`);
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest', inline: 'start' });
      }
    },
    handleKeyUp(e) {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          e.preventDefault();
          this.moveActiveIndex(e.key === 'ArrowDown' ? 1 : -1);
          this.scrollActiveItemIntoView();
          break;
        case 'Enter':
          e.preventDefault();
          if (this.showCategorySelection) {
            this.selectCategory(this.categories[this.activeIndex]);
            return;
          }
          if (!this.results.length) {
            return;
          }
          this.selectItem(this.results[this.activeIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          if (this.showCategorySelection) {
            this.$emit('close');
            return;
          }

          this.selectedCategory = null;
          break;
        default:
          break;
      }
    },
    moveActiveIndex(step) {
      if (this.showCategorySelection) {
        // Categories cannot be disabled, so just loop to the next/prev one
        this.activeIndex =
          (this.activeIndex + step + this.categories.length) % this.categories.length;
        return;
      }

      if (!this.results.length) {
        return;
      }
      if (this.allResultsAreDisabled) {
        return;
      }

      // contextItems CAN be disabled, so loop to next/prev but ensure we don't land on a disabled one
      let newIndex = this.activeIndex;
      do {
        newIndex = (newIndex + step + this.results.length) % this.results.length;

        if (newIndex === this.activeIndex) {
          // If we've looped through all items and found no enabled ones, keep the current index
          return;
        }
      } while (!this.results[newIndex].isEnabled);

      this.activeIndex = newIndex;
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
      <gl-duo-chat-context-item-menu-context-search-items
        v-else
        v-model="searchQuery"
        :active-index="activeIndex"
        :category="selectedCategory"
        :loading="loading"
        :error="error"
        :results="results"
        @select="selectItem"
        @keyup="handleKeyUp"
        @active-index-change="activeIndex = $event"
      />
    </gl-card>
  </div>
</template>
