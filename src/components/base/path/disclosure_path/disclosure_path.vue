<script>
import uniqueId from 'lodash/uniqueId';
import GlIcon from '../../icon/icon.vue';
import GlTooltip from '../../tooltip/tooltip.vue';
import GlDisclosureDropdown from '../../new_dropdowns/disclosure/disclosure_dropdown.vue';
import GlDisclosurePathItem from './disclosure_path_item.vue';

export default {
  name: 'GlDisclosurePath',
  components: {
    GlDisclosurePathItem,
    GlDisclosureDropdown,
    GlIcon,
    GlTooltip,
  },
  props: {
    /**
     * A list of path items in the form:
     * ```
     * {
     *   title:    String, required
     *   icon:     String, optional
     *   disabled: Boolean, optional
     * }
     * ```
     */
    items: {
      type: Array,
      required: false,
      default: () => [],
      validator: (items) => {
        return items.every((item) => Object.keys(item).includes('title'));
      },
    },
    /**
     * When set, displays only first and last item, and groups the rest under an ellipsis button
     */
    withEllipsis: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * When set, a tooltip displays when hovering middle ellipsis button
     */
    ellipsisTooltipLabel: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    middleItems() {
      return this.items.slice(1, -1).map((item) => ({ ...item, text: item.title }));
    },
    firstItem() {
      return this.items[0];
    },
    lastItemIndex() {
      return this.items.length - 1;
    },
    lastItem() {
      return this.items[this.lastItemIndex];
    },
  },
  beforeCreate() {
    this.pathUuid = uniqueId('disclosure-path-');
  },
  methods: {
    pathId(index) {
      return `${this.pathUuid}-item-${index}`;
    },
  },
};
</script>

<template>
  <div class="gl-disclosure-path">
    <ul class="gl-disclosure-path-list">
      <template v-if="withEllipsis">
        <gl-disclosure-path-item :item="firstItem" :path-id="pathId(0)">
          <slot :path-item="firstItem" :path-id="pathId(0)"></slot>
        </gl-disclosure-path-item>
        <li class="gl-path-disclosure-list-item">
          <gl-disclosure-dropdown :items="middleItems">
            <template #toggle>
              <button id="disclosure-path-ellipsis-button" class="gl-disclosure-path-button">
                <gl-icon
                  name="ellipsis_h"
                  class="gl-disclosure-path-button-content gl-ml-3 gl-text-gray-600"
                />
              </button>
            </template>
            <template #list-item="{ item }">
              <span class="gl-display-flex">
                <gl-icon
                  v-if="item.icon"
                  :name="item.icon"
                  class="gl-mr-3 gl-vertical-align-middle"
                />
                {{ item.title }}
              </span>
            </template>
          </gl-disclosure-dropdown>
        </li>
        <gl-tooltip
          v-if="ellipsisTooltipLabel"
          target="disclosure-path-ellipsis-button"
          triggers="hover"
        >
          {{ ellipsisTooltipLabel }}
        </gl-tooltip>
        <gl-disclosure-path-item :item="lastItem" :path-id="pathId(lastItemIndex)">
          <slot :path-item="lastItem" :path-id="pathId(lastItemIndex)"></slot>
        </gl-disclosure-path-item>
      </template>
      <gl-disclosure-path-item
        v-for="(item, index) in items"
        v-else
        :key="index"
        :item="item"
        :path-id="pathId(index)"
      >
        <slot :path-item="item" :path-id="pathId(index)"></slot>
      </gl-disclosure-path-item>
    </ul>
  </div>
</template>
