<script>
import debounce from 'lodash/debounce';
import GlDropdownItem from '../../../base/dropdown/dropdown_item.vue';
import GlFormInput from '../../../base/form/form_input/form_input.vue';
import GlCard from '../../../base/card/card.vue';
import GlIcon from '../../../base/icon/icon.vue';
import GlDuoChatItemPopover from './duo_chat_popover.vue';
/// <reference path="./duo_chat_types" />

export default {
  name: 'GlDuoChatInclude',
  components: {
    GlDropdownItem,
    GlFormInput,
    GlCard,
    GlIcon,
    GlDuoChatItemPopover,
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
        { label: 'Files', value: 'file', icon: 'document' },
        { label: 'Issues', value: 'issue', icon: 'issues' },
        { label: 'Merge Requests', value: 'merge_request', icon: 'merge-request' },
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
      /** @type {DuoChatContextItem[]} */
      const mockData = [
        {
          id: 'https://gitlab.com/gitlab-org/gitlab/issues/42',
          name: 'Bug in login form',
          isEnabled: true,
          info: { project: 'gitlab-org/gitlab', iid: 42 },
          type: 'issue',
        },
        {
          id: 'https://gitlab.com/gitlab-org/gitlab-runner/issues/43',
          name: 'Improve performance',
          isEnabled: true,
          info: { project: 'gitlab-org/gitlab-runner', iid: 43 },
          type: 'issue',
        },
        {
          id: 'https://gitlab.com/gitlab-org/charts/gitlab/issues/44',
          name: 'Update dependencies',
          isEnabled: false,
          info: {
            iid: 44,
            project: 'gitlab-org/charts/gitlab',
            disabledReason: 'Duo is not enabled for this project',
          },
          type: 'issue',
        },
        {
          id: 'https://gitlab.com/gitlab-org/gitlab/merge_requests/10',
          name: 'Add new feature',
          isEnabled: true,
          info: { project: 'gitlab-org/gitlab', iid: 10 },
          type: 'merge_request',
        },
        {
          id: 'https://gitlab.com/gitlab-org/gitlab-runner/merge_requests/11',
          name: 'Fix typo in README',
          isEnabled: true,
          info: {
            iid: 11,
            project: 'gitlab-org/gitlab-runner',
          },
          type: 'merge_request',
        },
        {
          id: 'https://gitlab.com/gitlab-org/charts/gitlab/merge_requests/12',
          name: 'Refactor authentication',
          isEnabled: false,
          info: {
            project: 'gitlab-org/charts/gitlab',
            disabledReason: 'Duo is not enabled for this project',
            iid: 12,
          },
          type: 'merge_request',
        },
        {
          id: 'file:///Users/gitlab/gitlab/app/src/index.js',
          name: 'index.js',
          isEnabled: true,
          info: { project: 'gitlab-org/gitlab', relFilePath: '/src/index.js' },
          type: 'file',
        },
        {
          id: 'file:///Users/gitlab/gitlab-runner/app/src/app.vue',
          name: 'app.vue',
          isEnabled: true,
          info: { project: 'gitlab-org/gitlab-runner', relFilePath: '/src/app.vue' },
          type: 'file',
        },
        {
          id: 'file:///Users/gitlab/charts/gitlab/app/src/styles.css',
          name: 'styles.css',
          isEnabled: false,
          info: {
            project: 'gitlab-org/charts/gitlab',
            disabledReason: 'Duo is not enabled for this project',
            relFilePath: '/src/styles.css',
          },
          type: 'file',
        },
      ];
      this.filteredItems = mockData.filter(
        (item) =>
          item.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          item.type === this.selectedCategory.value
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
        <ul class="list-unstyled gl-mb1">
          <li v-for="(item, index) in filteredItems" :key="item.id">
            <gl-dropdown-item
              :id="`dropdown-item-${index}`"
              :class="[
                { 'gl-bg-gray-50': index === activeIndex },
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
            <gl-duo-chat-item-popover
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

.disabled-item {
  cursor: not-allowed;
  background-color: #f9f9f9;
}

.disabled-item:hover {
  background-color: #f9f9f9 !important;
}
</style>
