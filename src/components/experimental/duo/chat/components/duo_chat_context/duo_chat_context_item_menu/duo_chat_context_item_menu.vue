<script>
import debounce from 'lodash/debounce';
import { sprintf, translate } from '../../../../../../../utils/i18n';
import GlAlert from '../../../../../../base/alert/alert.vue';
import GlCard from '../../../../../../base/card/card.vue';
import GlDropdownItem from '../../../../../../base/dropdown/dropdown_item.vue';
import GlFormInput from '../../../../../../base/form/form_input/form_input.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';
import GlDuoChatContextItemSelections from '../duo_chat_context_item_selections/duo_chat_context_item_selections.vue';
import {
  CONTEXT_ITEM_TYPE_ISSUE,
  CONTEXT_ITEM_TYPE_MERGE_REQUEST,
  CONTEXT_ITEM_TYPE_PROJECT_FILE,
} from '../constants';
import { contextItemsValidator } from '../utils';

const SEARCH_DEBOUNCE_MS = 30;

export default {
  name: 'GlDuoChatContextItemMenu',
  components: {
    GlAlert,
    GlCard,
    GlDropdownItem,
    GlDuoChatContextItemPopover,
    GlDuoChatContextItemSelections,
    GlFormInput,
    GlIcon,
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
      validator: (categories) =>
        categories.every((category) => category.value && category.label && category.icon),
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
      userInitiatedSearch: false,
      activeIndex: 0,
    };
  },
  computed: {
    showCategorySelection() {
      return this.open && !this.selectedCategory;
    },
    showItemSearch() {
      return Boolean(this.open && this.selectedCategory);
    },
    showEmptyState() {
      return Boolean(
        this.open &&
          this.userInitiatedSearch &&
          !this.loading &&
          !this.error &&
          !this.results.length
      );
    },
    searchInputPlaceholder() {
      return sprintf(
        translate('GlDuoChatContextItemMenu.searchInputPlaceholder', 'Search %{categoryLabel}...'),
        {
          categoryLabel: this.selectedCategory.label.toLowerCase(),
        }
      );
    },
    allResultsAreDisabled() {
      return this.results.every((result) => !result.isEnabled);
    }
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

      if (!this.showItemSearch) {
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
      this.userInitiatedSearch = true;
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
      this.userInitiatedSearch = false;
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
    setSearchResultActiveIndex(index) {
      if (this.results[index]?.isEnabled) {
        this.activeIndex = index;
      }
    },
    isProjectFile(item) {
      return item.type === CONTEXT_ITEM_TYPE_PROJECT_FILE;
    },
    isIssue(item) {
      return item.type === CONTEXT_ITEM_TYPE_ISSUE;
    },
    isMergeRequest(item) {
      return item.type === CONTEXT_ITEM_TYPE_MERGE_REQUEST;
    },
  },
  i18n: {
    selectedContextItemsTitle: translate(
      'GlDuoChatContextItemMenu.selectedContextItemsTitle',
      'Included references'
    ),
    emptyStateMessage: translate('GlDuoChatContextItemMenu.emptyStateMessage', 'No results found'),
    loadingMessage: translate('GlDuoChatContextItemMenu.loadingMessage', 'Loading...'),
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
      <ul v-if="showCategorySelection" class="list-unstyled gl-mb-0">
        <gl-dropdown-item
          v-for="(category, index) in categories"
          :key="category.value"
          :class="{ 'active-command': index === activeIndex }"
          data-testid="category-item"
          @click="selectCategory(category)"
        >
          <div class="gl-display-flex gl-align-items-center" @mouseenter="activeIndex = index">
            <gl-icon :name="category.icon" class="gl-mr-2" />
            {{ category.label }}
          </div>
        </gl-dropdown-item>
      </ul>
      <template v-else-if="showItemSearch">
        <div class="gl-max-h-31 gl-overflow-y-scroll">
          <div v-if="loading">
            <div
              v-for="index in 3"
              :key="index"
              class="gl-mx-3 gl-mb-4 gl-pt-3"
              data-testid="search-results-loading"
            >
              <div class="gl-mb-2 gl-flex">
                <div class="gl-animate-skeleton-loader gl-mr-3 gl-h-5 gl-w-5 gl-rounded-base"></div>
                <div class="gl-animate-skeleton-loader gl-h-5 gl-grow gl-rounded-base"></div>
              </div>
              <div class="gl-animate-skeleton-loader gl-h-4 gl-w-1/2 gl-rounded-base"></div>
              <span class="sr-only">{{ $options.i18n.loadingMessage }}</span>
            </div>
          </div>
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
              <div
                class="gl-display-flex gl-flex-direction-column"
                @mouseenter="setSearchResultActiveIndex(index)"
              >
                <div class="gl-display-flex gl-align-items-center">
                  <gl-icon :name="selectedCategory.icon" class="gl-mr-2 gl-flex-shrink-0" />
                  <span class="gl-white-space-nowrap">
                    {{ item.metadata.name }}
                  </span>
                  <gl-icon
                    :id="`info-icon-${item.id}`"
                    name="information-o"
                    class="gl-ml-auto gl-flex-shrink-0 gl-cursor-pointer gl-text-secondary"
                    :size="12"
                  />
                  <gl-duo-chat-context-item-popover
                    :item="item"
                    :target="`info-icon-${item.id}`"
                    placement="left"
                  />
                </div>
                <div class="gl-white-space-nowrap gl-mt-1 gl-flex-shrink-0 gl-text-secondary">
                  <template v-if="isProjectFile(item)">{{
                    item.metadata.info.relFilePath
                  }}</template>
                  <template v-else-if="isMergeRequest(item)"
                    >!{{ item.metadata.info.iid }}</template
                  >
                  <template v-else-if="isIssue(item)">#{{ item.metadata.info.iid }}</template>
                </div>
              </div>
            </gl-dropdown-item>
          </ul>
        </div>
        <gl-form-input
          ref="contextMenuSearchInput"
          v-model="searchQuery"
          :placeholder="searchInputPlaceholder"
          data-testid="context-menu-search-input"
          @keyup="handleKeyUp"
        />
      </template>
    </gl-card>
  </div>
</template>
