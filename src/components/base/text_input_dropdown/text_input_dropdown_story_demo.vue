<script>
import { setStoryTimeout } from '../../../utils/test_utils';
import {
  GlDropdownSectionHeader,
  GlDropdownItem,
  GlDropdownText,
  GlSkeletonLoader,
  GlTextInputDropdownItemDirective,
} from '../../../index';
import GlTextInputDropdown from './text_input_dropdown.vue';
import { filterGroups } from './mock_data';

export default {
  components: {
    GlDropdownSectionHeader,
    GlDropdownItem,
    GlDropdownText,
    GlSkeletonLoader,
    GlTextInputDropdown,
  },
  directives: {
    GlTextInputDropdownItem: GlTextInputDropdownItemDirective,
  },
  data() {
    return {
      searchText: '',
      searchResult: [],
      isOpen: false,
      isLoading: false,
      searchTimeoutId: -1,
      // State used to show result of "submit"
      submissionText: null,
    };
  },
  computed: {
    selectableItems() {
      return this.searchResult.flatMap((x) => x.items);
    },
    isEmpty() {
      return !this.searchResult.length;
    },
  },
  watch: {
    searchText() {
      if (this.isOpen) {
        this.search();
      }
    },
  },
  methods: {
    search() {
      this.isLoading = true;
      this.searchResult = [];

      // Cancel last search
      clearTimeout(this.searchTimeoutId);

      this.searchTimeoutId = setStoryTimeout(() => {
        this.searchResult = filterGroups(this.searchText);
        this.isLoading = false;
      }, 500);
    },
    onOpen() {
      this.isOpen = true;
      this.search();
    },
    onClose() {
      this.isOpen = false;
    },
    onSubmit(val) {
      this.submissionText = JSON.stringify(val, null, 2);

      if (val?.item) {
        this.searchText = val.item.text;
      }
    },
  },
};
</script>
<template>
  <div>
    <gl-text-input-dropdown
      :items="selectableItems"
      :text-value.sync="searchText"
      @open="onOpen"
      @close="onClose"
      @submit="onSubmit"
    >
      <template #default="{ focusedItem }">
        <gl-dropdown-text v-if="isLoading">
          <gl-skeleton-loader :height="90">
            <rect width="380" height="10" x="10" y="15" rx="4" />
            <rect width="280" height="10" x="10" y="30" rx="4" />
            <rect width="380" height="10" x="10" y="50" rx="4" />
            <rect width="280" height="10" x="10" y="65" rx="4" />
          </gl-skeleton-loader>
        </gl-dropdown-text>
        <gl-dropdown-text v-else-if="isEmpty">No matches</gl-dropdown-text>
        <template v-for="{ group, items } in searchResult" v-else>
          <gl-dropdown-section-header :key="group">
            {{ group }}
          </gl-dropdown-section-header>
          <template v-for="item in items">
            <gl-dropdown-item
              :key="item.type + item.iid"
              v-gl-text-input-dropdown-item="{ focus: focusedItem === item }"
              @click="onSubmit({ item })"
            >
              {{ item.text }}
            </gl-dropdown-item>
          </template>
        </template>
      </template>
    </gl-text-input-dropdown>
    <pre v-if="submissionText" class="gl-mt-6">{{ submissionText }}</pre>
  </div>
</template>
