<script>
import debounce from 'lodash/debounce';
import GlDropdownItem from '../../../base/dropdown/dropdown_item.vue';
import GlFormInput from '../../../base/form/form_input/form_input.vue';
import GlCard from '../../../base/card/card.vue';

export default {
  name: 'GlDuoChatInclude',
  components: {
    GlDropdownItem,
    GlFormInput,
    GlCard,
  },
  props: {
    showIncludeDropdown: {
      type: Boolean,
      default: false,
      required: true
    },
    cursorPosition: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      categories: [
        { label: 'Files', value: 'files' },
        // Add more categories as needed
      ],
      selectedCategory: null,
      searchQuery: '',
      filteredItems: [],
      activeIndex: 0,
    };
  },
  computed: {
    showFileSearch() {
      return this.selectedCategory && this.selectedCategory.value === 'files';
    },
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.activeIndex = 0;
      this.searchQuery = '';
      this.filteredItems = [];
      if (category.value !== 'files') {
        this.$emit('update:showIncludeDropdown', false);
      }
    },
    debouncedSearch: debounce(function() {
      // Mock file search functionality
      this.filteredItems = [
        { id: 1, name: 'index.js' },
        { id: 2, name: 'app.vue' },
        { id: 3, name: 'styles.css' },
      ].filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }, 300),
    selectItem(item) {
      this.$emit('item-selected', item);
      this.$emit('update:showIncludeDropdown', false);
      this.resetSelection();
    },
    navigateDown() {
      const items = this.showFileSearch ? this.filteredItems : this.categories;
      this.activeIndex = (this.activeIndex + 1) % items.length;
    },
    navigateUp() {
      const items = this.showFileSearch ? this.filteredItems : this.categories;
      this.activeIndex = (this.activeIndex - 1 + items.length) % items.length;
    },
    selectActiveItem() {
      if (this.showFileSearch) {
        this.selectItem(this.filteredItems[this.activeIndex]);
      } else {
        this.selectCategory(this.categories[this.activeIndex]);
      }
    },
    resetSelection() {
      this.selectedCategory = null;
      this.searchQuery = '';
      this.filteredItems = [];
      this.activeIndex = 0;
    },
  },
};
</script>

<template>
  <div class="gl-duo-chat-include gl-relative">
    <gl-card v-if="showIncludeDropdown" class="include-card gl-position-absolute">
      <template v-if="!selectedCategory">
        <gl-dropdown-item
          v-for="(category, index) in categories"
          :key="category.value"
          @click="selectCategory(category)"
          :class="{ 'gl-bg-gray-50': index === activeIndex }"
        >
          {{ category.label }}
        </gl-dropdown-item>
      </template>
      <template v-else-if="showFileSearch">
        <gl-form-input
          v-model="searchQuery"
          :placeholder="`Search ${selectedCategory.label.toLowerCase()}...`"
          @input="debouncedSearch"
          @keydown.down.prevent="navigateDown"
          @keydown.up.prevent="navigateUp"
          @keydown.enter.prevent="selectActiveItem"
          class="gl-mb-3"
        />
        <gl-dropdown-item
          v-for="(item, index) in filteredItems"
          :key="item.id"
          @click="selectItem(item)"
          :class="{ 'gl-bg-gray-50': index === activeIndex }"
        >
          {{ item.name }}
        </gl-dropdown-item>
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
  min-width: 150px;
  max-width: 200px;
  max-height: 300px;
  overflow-y: auto;
}
</style>
