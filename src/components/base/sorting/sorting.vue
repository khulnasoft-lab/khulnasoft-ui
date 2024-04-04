<script>
import { GlTooltipDirective } from '../../../directives/tooltip';
import GlButton from '../button/button.vue';
import GlButtonGroup from '../button_group/button_group.vue';
import GlCollapsibleListbox from '../new_dropdowns/listbox/listbox.vue';
import { isOption } from '../new_dropdowns/listbox/utils';
import { translate } from '../../../utils/i18n';

export default {
  name: 'GlSorting',
  components: {
    GlButton,
    GlButtonGroup,
    GlCollapsibleListbox,
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
     * Sort options to display in the dropdown
     */
    sortOptions: {
      type: Array,
      required: false,
      default: () => [],
      // eslint-disable-next-line unicorn/no-array-callback-reference
      validator: (sortOptions) => sortOptions.every(isOption),
    },
    /**
     * The value of the item currently selected in the dropdown.
     * Only to be used with the `sortOptions` prop.
     */
    sortBy: {
      type: [String, Number],
      required: false,
      default: null,
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
     * The text for the tooltip and aria-label of the sort direction toggle
     * button instead of the defaults for ascending/descending.
     */
    sortDirectionToolTip: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Additional class(es) to apply to the root element of the GlCollapsibleListbox.
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
    /**
     * Render the dropdown toggle button as a block element
     */
    block: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    localSortDirection() {
      return this.isAscending ? 'sort-lowest' : 'sort-highest';
    },
    sortDirectionText() {
      if (this.sortDirectionToolTip) return this.sortDirectionToolTip;

      return this.isAscending
        ? translate('GlSorting.sortAscending', 'Sort direction: ascending')
        : translate('GlSorting.sortDescending', 'Sort direction: descending');
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
    onSortByChanged(event) {
      /**
       * Emitted when the sort field is changed.
       *
       * The event's payload is the value of the selected sort field.
       *
       * Only emitted when using the `sortOptions` prop.
       *
       * @property {string|number} value
       */
      this.$emit('sortByChange', event);
    },
  },
};
</script>

<template>
  <gl-button-group class="gl-sorting">
    <gl-collapsible-listbox
      :toggle-text="text"
      :items="sortOptions"
      :selected="sortBy"
      :toggle-class="dropdownToggleClass"
      :class="dropdownClass"
      placement="bottom-end"
      :block="block"
      @select="onSortByChanged"
    />
    <gl-button
      v-gl-tooltip
      :title="sortDirectionText"
      :icon="localSortDirection"
      :aria-label="sortDirectionText"
      :class="['sorting-direction-button', sortDirectionToggleClass]"
      @click="toggleSortDirection"
    />
  </gl-button-group>
</template>
