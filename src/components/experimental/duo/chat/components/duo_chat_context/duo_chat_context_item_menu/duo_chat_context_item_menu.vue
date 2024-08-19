<script>
import debounce from 'lodash/debounce';
import GlDropdownItem from '../../../../../../base/dropdown/dropdown_item.vue';
import GlFormInput from '../../../../../../base/form/form_input/form_input.vue';
import GlCard from '../../../../../../base/card/card.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import GlLoadingIcon from '../../../../../../base/loading_icon/loading_icon.vue';
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';

export default {
  name: 'GlDuoChatContextItemMenu',
  components: {
    GlDropdownItem,
    GlFormInput,
    GlCard,
    GlIcon,
    GlLoadingIcon,
    GlDuoChatContextItemPopover,
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
      default: () => [
        { label: 'Files', value: 'file', icon: 'document' },
        { label: 'Issues', value: 'issue', icon: 'issues' },
        { label: 'Merge Requests', value: 'merge_request', icon: 'merge-request' },
      ],
      validator: (categories) => categories.every(cat => ['file', 'issue', 'merge_request'].includes(cat.value)),
    },
  },
  data() {
    return {
      selectedCategory: null,
      searchQuery: '',
      filteredItems: [],
      activeIndex: 0,
      showContextItemDropdown: false,
      isLoading: false,
      error: null,
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
      return this.showCategorySelection ? this.categories : this.filteredItems;
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
    filteredItems() {
      this.activeIndex = 0;
    },
  },
  created() {
    this.eventBus.$on('toggle_context_menu', this.toggleContextMenu);
    this.eventBus.$on('context_item_search_result', this.handleSearchResult);
  },
  beforeDestroy() {
    this.eventBus.$off('toggle_context_menu', this.toggleContextMenu);
    this.eventBus.$off('context_item_search_result', this.handleSearchResult);
  },
  methods: {
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
      this.filteredItems = [];
      this.initiateSearch();
    },
    debouncedSearch: debounce(function () {
      this.initiateSearch();
    }, 300),
    initiateSearch() {
      this.isLoading = true;
      this.error = null;
      this.eventBus.$emit('context_item_search_query', {
        category: this.selectedCategory.value,
        query: this.searchQuery,
      });
    },
    handleSearchResult(results) {
      this.isLoading = false;
      this.filteredItems = results;
    },
    handleSearchError(error) {
      this.isLoading = false;
      this.error = error;
    },
    selectItem(item) {
      this.eventBus.$emit('context_item_added', { ...item, category: this.selectedCategory?.value });
      this.resetSelection();
    },
    resetSelection() {
      this.selectedCategory = null;
      this.searchQuery = '';
      this.filteredItems = [];
      this.activeIndex = 0;
      this.showContextItemDropdown = false;
      this.error = null;
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
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.activeIndex =
            (this.activeIndex - 1 + this.currentItems.length) % this.currentItems.length;
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
          this.eventBus.$emit('toggle_context_menu', false);
          break;
        default:
          break;
      }
    },
    onSearchInputKeydown(e) {
      this.handleKeydown(e);
    },
  },
};
</script>

<template>
  <div class="gl-duo-chat-context-item gl-relative">
    <gl-card
      v-if="showContextItemDropdown"
      ref="contextItemDropdown"
      class="context-item-card gl-position-absolute"
      body-class="!gl-p-2"
    >
      <template v-if="showCategorySelection">
        <ul class="list-unstyled gl-mb-0">
          <li v-for="(category, index) in categories" :key="category.value">
            <gl-dropdown-item
              :class="{ 'active-command': index === activeIndex }"
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
        <gl-form-input
          ref="searchInput"
          v-model="searchQuery"
          :placeholder="`Search ${selectedCategory.label.toLowerCase()}...`"
          class="gl-mb-3"
          @input="debouncedSearch"
          @keydown="onSearchInputKeydown"
        />
        <div v-if="isLoading" class="gl-p-3 gl-rounded-base gl-text-center">
          <gl-loading-icon
            label="Loading"
            size="sm"
            color="dark"
            variant="spinner"
            :inline="false"
          />
          Loading
        </div>
        <div v-else-if="error" class="gl-p-3 gl-rounded-base gl-bg-red-50 gl-text-red-600">
          {{ error }}
        </div>
        <ul v-else class="list-unstyled gl-mb-1">
          <li v-for="(item, index) in filteredItems" :key="item.id">
            <gl-dropdown-item
              :id="`dropdown-item-${index}`"
              :class="[
                { 'active-command': index === activeIndex },
                { 'disabled-item': !item.isEnabled },
              ]"
              @click="item.isEnabled && selectItem(item)"
            >
              <div class="gl-display-flex gl-align-items-center gl-truncate">
                <gl-icon
                  :name="selectedCategory.icon"
                  class="gl-mr-2"
                  :class="{ 'gl-text-gray-500': !item.isEnabled }"
                />
                <span :class="{ 'gl-text-gray-500': !item.isEnabled }">{{ item.name }}</span>
                <span class="gl-ml-3 gl-text-gray-300">
                  <template v-if="item.type === 'file'">{{ item.info.relFilePath }}</template>
                  <template v-else-if="item.type === 'merge_request'"
                    >!{{ item.info.iid }}</template
                  >
                  <template v-else-if="item.type === 'issue'">#{{ item.info.iid }}</template>
                </span>
              </div>
            </gl-dropdown-item>
            <gl-duo-chat-context-item-popover
              :item="item"
              :target="`dropdown-item-${index}`"
              placement="top"
            />
          </li>
        </ul>
      </template>
    </gl-card>
  </div>
</template>

<style scoped>
.gl-duo-chat-context-item {
  display: inline-block;
}

.context-item-card {
  bottom: v-bind('cursorPosition + "px"');
  left: 0;
  transform: translateY(-100%);
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

.active-command {
  background-color: #eee;
}
</style>-card>
  </div>
</template>

<style scoped>
.gl-duo-chat-context-item {
  display: inline-block;
}

.context-item-card {
  bottom: v-bind('cursorPosition + "px"');
  left: 0;
  transform: translateY(-100%);
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

.active-command {
  background-color: #eee;
}
</style>