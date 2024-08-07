<script>
import debounce from 'lodash/debounce';
import GlDropdownItem from '../../../base/dropdown/dropdown_item.vue';
import GlFormInput from '../../../base/form/form_input/form_input.vue';
import GlCard from '../../../base/card/card.vue';
import GlIcon from '../../../base/icon/icon.vue';

export default {
  name: 'GlDuoChatInclude',
  components: {
    GlDropdownItem,
    GlFormInput,
    GlCard,
    GlIcon,
  },
  props: {
    showIncludeDropdown: {
      type: Boolean,
      default: false,
      required: true,
    },
    cursorPosition: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      categories: [
        { label: 'Files', value: 'files', icon: 'document' },
        { label: 'Issues', value: 'issues', icon: 'issues' },
        { label: 'Merge Requests', value: 'merge_requests', icon: 'merge-request' },
      ],
      selectedCategory: null,
      searchQuery: '',
      filteredItems: [],
      activeIndex: 0,
    };
  },
  computed: {
    showCategorySelection() {
      return this.showIncludeDropdown && !this.selectedCategory;
    },
    showItemSearch() {
      return this.showIncludeDropdown && this.selectedCategory;
    },
    currentItems() {
      return this.showCategorySelection ? this.categories : this.filteredItems;
    },
  },
  watch: {
    showIncludeDropdown(newVal) {
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
  methods: {
    focusSearchInput() {
      if (this.showItemSearch && this.$refs.searchInput && this.$refs.searchInput.$el) {
        this.$refs.searchInput.$el.focus();
      }
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.searchQuery = '';
      this.filteredItems = [];
      this.debouncedSearch();
    },
    debouncedSearch: debounce(function () {
      // Simulated API call - replace with actual API call in production
      const mockData = {
        files: [
          { id: 1, name: 'index.js', path: '/src/index.js' },
          { id: 2, name: 'app.vue', path: '/src/app.vue' },
          { id: 3, name: 'styles.css', path: '/src/styles.css' },
        ],
        issues: [
          { id: 1, title: 'Bug in login form', iid: 42 },
          { id: 2, title: 'Improve performance', iid: 43 },
          { id: 3, title: 'Update dependencies', iid: 44 },
        ],
        merge_requests: [
          { id: 1, title: 'Add new feature', iid: 10 },
          { id: 2, title: 'Fix typo in README', iid: 11 },
          { id: 3, title: 'Refactor authentication', iid: 12 },
        ],
      };

      this.filteredItems = mockData[this.selectedCategory.value].filter(
        (item) =>
          item.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.title?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }, 300),
    selectItem(item) {
      this.$emit('item-selected', { ...item, category: this.selectedCategory?.value });
      this.$emit('update:showIncludeDropdown', false);
      this.resetSelection();
    },
    resetSelection() {
      this.selectedCategory = null;
      this.searchQuery = '';
      this.filteredItems = [];
      this.activeIndex = 0;
    },
    handleKeydown(e) {
      if (!this.showIncludeDropdown) return;

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
          if (this.showCategorySelection) {
            this.selectCategory(this.currentItems[this.activeIndex]);
          } else {
            this.selectItem(this.currentItems[this.activeIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          this.$emit('update:showIncludeDropdown', false);
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
  },
};
</script>

<template>
  <div class="gl-duo-chat-include gl-relative">
    <gl-card v-if="showIncludeDropdown" class="include-card gl-position-absolute">
      <template v-if="showCategorySelection">
        <ul class="list-unstyled gl-mb-0">
          <li v-for="(category, index) in categories" :key="category.value">
            <gl-dropdown-item
              :class="{ 'gl-bg-gray-50': index === activeIndex }"
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
        <ul class="list-unstyled gl-mb-0">
          <li v-for="(item, index) in filteredItems" :key="item.id">
            <gl-dropdown-item
              :class="{ 'gl-bg-gray-50': index === activeIndex }"
              @click="selectItem(item)"
            >
              <div class="gl-display-flex gl-align-items-center">
                <gl-icon :name="selectedCategory.icon" class="gl-mr-2" />
                <span>{{ item.name || item.title }}</span>
                <span v-if="item.path" class="gl-ml-3 gl-text-gray-500">{{ item.path }}</span>
                <span v-if="item.iid" class="gl-ml-3 gl-text-gray-500">#{{ item.iid }}</span>
              </div>
            </gl-dropdown-item>
          </li>
        </ul>
      </template>
    </gl-card>
  </div>
</template>

<style scoped>
.gl-duo-chat-include {
  display: inline-block;
}
.include-card {
  top: 100%;
  left: v-bind('cursorPosition + "px"');
  z-index: 100;
  min-width: 250px;
  max-width: 400px;
  max-height: 300px;
  overflow-y: auto;
}
</style>
