<script>
import GlTooltip from '../../../directives/tooltip';
import GlButton from '../button/button.vue';
import GlButtonGroup from '../button_group/button_group.vue';
import GlDropdown from '../dropdown/dropdown.vue';

export default {
  name: 'GlSorting',
  components: {
    GlButton,
    GlButtonGroup,
    GlDropdown,
  },
  directives: {
    GlTooltip,
  },
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
    isAscending: {
      type: Boolean,
      required: false,
      default: false,
    },
    sortDirectionToolTip: {
      type: String,
      required: false,
      default: 'Sort direction',
    },
    dropdownClass: {
      type: String,
      required: false,
      default: '',
    },
    dropdownToggleClass: {
      type: String,
      required: false,
      default: '',
    },
    sortDirectionToggleClass: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    localSortDirection() {
      return this.isAscending ? 'sort-lowest' : 'sort-highest';
    },
    sortDirectionAriaLabel() {
      return this.isAscending ? 'Sorting Direction: Ascending' : 'Sorting Direction: Descending';
    },
  },
  methods: {
    toggleSortDirection() {
      const newDirection = !this.isAscending;
      this.$emit('sortDirectionChange', newDirection);
    },
  },
};
</script>

<template>
  <gl-button-group class="gl-sorting">
    <gl-dropdown
      v-bind="$props"
      :text="text"
      category="secondary"
      :class="dropdownClass"
      :toggle-class="dropdownToggleClass"
      right
    >
      <slot></slot>
    </gl-dropdown>
    <gl-button
      v-gl-tooltip
      :title="sortDirectionToolTip"
      :icon="localSortDirection"
      :aria-label="sortDirectionAriaLabel"
      :class="['sorting-direction-button', sortDirectionToggleClass]"
      @click="toggleSortDirection"
    />
  </gl-button-group>
</template>
