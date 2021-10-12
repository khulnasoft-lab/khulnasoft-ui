<script>
import { GlTooltipDirective } from '../../../directives/tooltip';
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
    GlTooltip: GlTooltipDirective,
  },
  props: {
    /**
     * Text to place in the toggle button.
     */
    text: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Determines the current sort order icon displayed.
     */
    isAscending: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * The text of the tool tip for the sort direction toggle button.
     */
    sortDirectionToolTip: {
      type: String,
      required: false,
      default: 'Sort direction',
    },
    /**
     * Additional class(es) to apply to the root element of the GlDropdown.
     */
    dropdownClass: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Additional class(es) to apply to the dropdown toggle.
     */
    dropdownToggleClass: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Additional class(es) to apply to the sort direction toggle button.
     */
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

      /**
       * Emitted when the sort direction button is clicked.
       *
       * The event's payload will be true if the direction has been changed to
       * ascending, or false if descending.
       *
       * @property {boolean} isAscending
       */
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
      <!-- @slot Slot to place the dropdown items, works best with a gl-sorting-item component. -->
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
