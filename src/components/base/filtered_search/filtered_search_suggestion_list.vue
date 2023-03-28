<script>
export default {
  name: 'GlFilteredSearchSuggestionList',
  inject: ['suggestionsListClass'],
  provide() {
    return {
      filteredSearchSuggestionListInstance: this,
    };
  },
  props: {
    /**
     * Value to be initially selected in list.
     */
    initialValue: {
      required: false,
      validator: () => true,
      default: null,
    },
  },
  data() {
    return {
      activeIdx: -1,
      registeredItems: [],
    };
  },

  computed: {
    activeItem() {
      return this.activeIdx > -1 && this.activeIdx < this.registeredItems.length
        ? this.registeredItems[this.activeIdx]
        : null;
    },
    listClasses() {
      return [this.suggestionsListClass(), 'dropdown-menu gl-filtered-search-suggestion-list'];
    },
  },

  watch: {
    initialValue(newValue) {
      this.activeIdx = this.registeredItems.findIndex((item) =>
        this.valuesMatch(item.value, newValue)
      );
    },
  },

  methods: {
    valuesMatch(firstValue, secondValue) {
      if (firstValue == null || secondValue == null) return false;

      return typeof firstValue === 'string' && typeof secondValue === 'string'
        ? firstValue.toLowerCase() === secondValue.toLowerCase()
        : firstValue === secondValue;
    },
    register(item) {
      this.registeredItems.push(item);
      if (this.valuesMatch(item.value, this.initialValue)) {
        this.activeIdx = this.registeredItems.length - 1;
      }
    },
    unregister(item) {
      const idx = this.registeredItems.indexOf(item);
      if (idx !== -1) {
        this.registeredItems.splice(idx, 1);
        if (idx === this.activeIdx) {
          this.activeIdx = -1;
        }
      }
    },
    nextItem() {
      if (this.activeIdx < this.registeredItems.length) {
        this.activeIdx += 1;
      } else {
        this.activeIdx = 0;
      }
    },
    prevItem() {
      if (this.activeIdx >= 0) {
        this.activeIdx -= 1;
      } else {
        this.activeIdx = this.registeredItems.length - 1;
      }
    },
    getValue() {
      return this.activeItem ? this.activeItem.value : null;
    },
  },
};
</script>
<template>
  <ul :class="listClasses">
    <!-- @slot The suggestions (implemented with GlFilteredSearchSuggestion). -->
    <slot></slot>
  </ul>
</template>
