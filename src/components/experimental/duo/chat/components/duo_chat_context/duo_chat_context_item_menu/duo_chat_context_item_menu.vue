<script>
import debounce from 'lodash/debounce';
import GlDropdownItem from '../../../../../../base/dropdown/dropdown_item.vue';
import GlFormInput from '../../../../../../base/form/form_input/form_input.vue';
import GlCard from '../../../../../../base/card/card.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import GlLoadingIcon from '../../../../../../base/loading_icon/loading_icon.vue';
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';
import { EVENT_BUS_TYPES } from '../duo_chat_context_event_bus';

export default {
  name: 'GlDuoChatContextItemMenu',
  components: {
    GlDropdownItem,
    GlFormInput,
    GlCard,
    GlIcon,
    GlDuoChatContextItemPopover,
    GlLoadingIcon,
  },
  props: {
    eventBus: {
      type: Object,
      required: true,
    },
    cursorPosition: {
      type: Number,
      default: 0,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
      validator: (categories) =>
        categories.every((category) => category.value && category.label && category.icon),
    },
  },
  data() {
    return {
      selectedCategory: null,
      searchQuery: '',
      contextItems: [],
      activeIndex: 0,
      showContextItemDropdown: false,
      userInitiatedSearch: false,
      searchLoading: false,
      searchError: null,
    };
  },
  computed: {
    showCategorySelection() {
      return this.showContextItemDropdown && !this.selectedCategory;
    },
    showItemSearch() {
      return this.showContextItemDropdown && this.selectedCategory;
    },
    currentItems() {
      return this.showCategorySelection ? this.categories : this.contextItems;
    },
  },
  watch: {
    showContextItemDropdown(newVal) {
      if (newVal) {
        this.activeIndex = 0;
        this.$nextTick(() => {
          this.focusSearchInput();
        });
      }
    },
    selectedCategory() {
      this.activeIndex = 0;
      this.$nextTick(() => {
        this.focusSearchInput();
      });
    },
    contextItems() {
      this.activeIndex = 0;
    },
  },
  created() {
    this.eventBus.$on(EVENT_BUS_TYPES.TOGGLE_CONTEXT_MENU, this.toggleContextMenu);
    this.eventBus.$on(EVENT_BUS_TYPES.CONTEXT_ITEM_SEARCH_RESULT, this.handleSearchResult);
    this.eventBus.$on(EVENT_BUS_TYPES.CONTEXT_ITEM_SEARCH_ERROR, this.handleSearchError);
  },
  beforeDestroy() {
    this.eventBus.$off(EVENT_BUS_TYPES.TOGGLE_CONTEXT_MENU, this.toggleContextMenu);
    this.eventBus.$off(EVENT_BUS_TYPES.CONTEXT_ITEM_SEARCH_RESULT, this.handleSearchResult);
    this.eventBus.$off(EVENT_BUS_TYPES.CONTEXT_ITEM_SEARCH_ERROR, this.handleSearchError);
  },
  methods: {
    truncateText(text, maxLength) {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    },
    toggleContextMenu(show) {
      this.showContextItemDropdown = show;
      if (show) {
        this.activeIndex = 0;
        this.$nextTick(() => {
          this.focusSearchInput();
        });
      }
    },
    focusSearchInput() {
      if (this.showItemSearch && this.$refs.searchInput && this.$refs.searchInput.$el) {
        this.$refs.searchInput.$el.focus();
      }
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.searchQuery = '';
      this.contextItems = [];
      this.eventBus.$emit(EVENT_BUS_TYPES.CONTEXT_ITEM_SEARCH_QUERY, {
        category: category.value,
        query: '',
      });
    },
    debouncedSearch: debounce(function search() {
      this.userInitiatedSearch = true;
      this.searchLoading = true;
      this.searchError = null;
      this.eventBus.$emit('context_item_search_query', {
        category: this.selectedCategory.value,
        query: this.searchQuery,
      });
    }, 300),
    handleSearchResult(results) {
      this.searchLoading = false;
      this.searchError = null;
      this.contextItems = results;
    },
    selectItem(item) {
      this.eventBus.$emit(EVENT_BUS_TYPES.CONTEXT_ITEM_ADDED, {
        ...item,
        category: this.selectedCategory?.value,
      });
      this.resetSelection();
    },
    resetSelection() {
      this.userInitiatedSearch = false;
      this.searchLoading = false;
      this.searchError = null;
      this.selectedCategory = null;
      this.searchQuery = '';
      this.contextItems = [];
      this.activeIndex = 0;
      this.showContextItemDropdown = false;
    },
    scrollActiveItemIntoView() {
      this.$nextTick(() => {
        const activeItem = document.getElementById(`dropdown-item-${this.activeIndex}`);
        if (activeItem) {
          activeItem.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
      });
    },
    handleKeydown(e) {
      if (!this.showContextItemDropdown) return;

      if (this.showItemSearch && !['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        this.focusSearchInput();
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.activeIndex = (this.activeIndex + 1) % this.currentItems.length;
          this.scrollActiveItemIntoView();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.activeIndex =
            (this.activeIndex - 1 + this.currentItems.length) % this.currentItems.length;
          this.scrollActiveItemIntoView();
          break;
        case 'Enter':
          e.preventDefault();
          if (!this.currentItems.length) {
            return;
          }
          if (this.showCategorySelection) {
            this.selectCategory(this.currentItems[this.activeIndex]);
          } else {
            this.selectItem(this.currentItems[this.activeIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          this.eventBus.$emit(EVENT_BUS_TYPES.TOGGLE_CONTEXT_MENU, false);
          break;
        default:
          break;
      }
    },
    onSearchInputKeydown(e) {
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        this.handleKeydown(e);
      }
    },
    handleSearchError(error) {
      this.searchLoading = false;
      this.searchError = error;
      this.contextItems = [];
    },
  },
};
</script>

<template>
  <gl-card
    v-if="showContextItemDropdown"
    class="slash-commands context-item-card gl-position-absolute !gl-absolute gl-w-full -gl-translate-y-full gl-list-none gl-pl-0 gl-shadow-md"
    body-class="!gl-p-2"
  >
    <template v-if="showCategorySelection">
      <ul class="list-unstyled gl-mb-0">
        <li v-for="(category, index) in categories" :key="category.value">
          <gl-dropdown-item
            :class="{ 'gl-bg-gray-50': index === activeIndex, 'hover:gl-bg-gray-50': true }"
            @click="selectCategory(category)"
          >
            <div class="gl-display-flex gl-align-items-center">
              <gl-icon :name="category.icon" class="gl-mr-2" />
              {{ category.label }}
            </div>
          </gl-dropdown-item>
        </li>
      </ul>
    </template>
    <template v-else-if="showItemSearch">
      <div class="gl-max-h-31 gl-overflow-y-scroll">
        <ul
          v-if="contextItems.length > 0 && !searchLoading"
          class="list-unstyled gl-mb-1 gl-flex-row"
        >
          <li v-for="(item, index) in contextItems" :key="item.id">
            <gl-dropdown-item
              :id="`dropdown-item-${index}`"
              :class="[
                { 'gl-bg-gray-50': index === activeIndex },
                { 'disabled-item': !item.isEnabled },
                'hover:gl-bg-gray-50',
              ]"
              @click="item.isEnabled && selectItem(item)"
            >
              <div class="gl-display-flex gl-flex-direction-column">
                <div class="gl-display-flex gl-align-items-center">
                  <gl-icon
                    :name="selectedCategory.icon"
                    class="gl-mr-2 gl-flex-shrink-0"
                    :class="{ 'gl-text-gray-500': !item.isEnabled }"
                  />
                  <span
                    :class="{ 'gl-text-gray-500': !item.isEnabled }"
                    class="gl-white-space-nowrap"
                  >
                    {{ item.name }}
                  </span>
                  <gl-icon
                    :id="`info-icon-${index}`"
                    name="information-o"
                    class="gl-ml-auto gl-flex-shrink-0 gl-cursor-pointer gl-text-gray-300"
                    :size="12"
                  />
                </div>
                <div class="gl-white-space-nowrap gl-mt-1 gl-flex-shrink-0 gl-text-gray-300">
                  <template v-if="item.type === 'file'">{{ item.info.relFilePath }}</template>
                  <template v-else-if="item.type === 'merge_request'"
                    >!{{ item.info.iid }}</template
                  >
                  <template v-else-if="item.type === 'issue'">#{{ item.info.iid }}</template>
                </div>
              </div>
            </gl-dropdown-item>
            <gl-duo-chat-context-item-popover
              :item="item"
              :target="`info-icon-${index}`"
              placement="left"
            />
          </li>
        </ul>
        <div v-else-if="searchLoading" class="gl-rounded-base gl-p-3 gl-text-center">
          <gl-loading-icon
            label="Loading"
            size="sm"
            color="dark"
            variant="spinner"
            :inline="false"
          />
        </div>
        <div
          v-else-if="searchError"
          class="gl-display-flex gl-align-items-center gl-rounded-base gl-p-3"
        >
          <gl-icon
            :aria-label="'Search error'"
            name="status_warning_borderless"
            :size="16"
            class="error-icon gl-border gl-mr-3 gl-flex-shrink-0 gl-rounded-full gl-border-red-500 gl-text-red-600"
            data-testid="error"
          />
          <span class="gl-text-red-600">{{ searchError }}</span>
        </div>
        <div
          v-else-if="contextItems.length === 0 && !searchLoading && userInitiatedSearch"
          class="gl-rounded-base gl-p-3 gl-text-center gl-text-gray-500"
        >
          No results found
        </div>
      </div>
      <gl-form-input
        ref="searchInput"
        v-model="searchQuery"
        :placeholder="`Search ${selectedCategory.label.toLowerCase()}...`"
        class="gl-mb-3"
        @input="debouncedSearch"
        @keydown="onSearchInputKeydown"
      />
    </template>
  </gl-card>
</template>

<style scoped>
.context-item-card {
  top: 100%;
  left: v-bind('cursorPosition + "px"');
  z-index: 100;
  min-width: 250px;
  max-width: 400px;
  max-height: 300px;
  overflow-y: auto;
}

.disabled-item {
  cursor: not-allowed;
  background-color: #f9f9f9;
}

.disabled-item:hover {
  background-color: #f9f9f9 !important;
}
</style>
gv
