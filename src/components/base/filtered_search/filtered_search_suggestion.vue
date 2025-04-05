<script>
import GlDropdownItem from '../dropdown/dropdown_item.vue';

export default {
  name: 'GlFilteredSearchSuggestion',
  components: {
    GlDropdownItem,
  },
  inject: ['filteredSearchSuggestionListInstance'],
  inheritAttrs: false,
  props: {
    /**
     * Value that will be emitted if this suggestion is selected.
     */
    value: {
      required: true,
      validator: () => true,
    },
  },
  computed: {
    isActive() {
      return this.filteredSearchSuggestionListInstance.activeItem === this;
    },
  },
  watch: {
    isActive(newValue) {
      if (newValue) {
        window.requestAnimationFrame(() => {
          this.$refs.item?.$el?.scrollIntoView({ block: 'nearest', inline: 'end' });
        });
      }
    },
  },
  created() {
    this.filteredSearchSuggestionListInstance.register(this);
  },
  beforeDestroy() {
    this.filteredSearchSuggestionListInstance.unregister(this);
  },
  methods: {
    emitValue() {
      // We use href argument for gl-dropdown-item to use <a> instead of <button>
      // due to https://bugs.webkit.org/show_bug.cgi?id=22261
      this.filteredSearchSuggestionListInstance.$emit('suggestion', this.value);
    },
  },
};
</script>

<template>
  <gl-dropdown-item
    ref="item"
    class="gl-filtered-search-suggestion"
    data-testid="filtered-search-suggestion"
    :class="{ 'gl-filtered-search-suggestion-active': isActive }"
    tabindex="-1"
    v-bind="$attrs"
    href="#"
    @mousedown.native.prevent="emitValue"
  >
    <!-- @slot The suggestion content. -->
    <slot></slot>
  </gl-dropdown-item>
</template>
