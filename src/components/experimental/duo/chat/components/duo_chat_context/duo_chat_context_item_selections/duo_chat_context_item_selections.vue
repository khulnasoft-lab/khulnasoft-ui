<script>
import uniqueId from 'lodash/uniqueId';
import GlIcon from '../../../../../../base/icon/icon.vue';
import GlToken from '../../../../../../base/token/token.vue';
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';
import {
  CONTEXT_ITEM_TYPE_ISSUE,
  CONTEXT_ITEM_TYPE_MERGE_REQUEST,
  CONTEXT_ITEM_TYPE_PROJECT_FILE,
} from '../constants';
import { contextItemsValidator } from '../utils';

export default {
  name: 'GlDuoChatContextItemSelections',
  components: {
    GlIcon,
    GlDuoChatContextItemPopover,
    GlToken,
  },
  props: {
    /**
     * Array of selected context items.
     */
    selections: {
      type: Array,
      required: true,
      validator: contextItemsValidator,
    },
    /**
     * The title to display for the selections.
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Whether the selections should be collapsed by default.
     */
    defaultCollapsed: {
      type: Boolean,
      required: true,
    },
    /**
     * Whether the selections can be removed.
     */
    removable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isCollapsed: this.defaultCollapsed,
      selectionsId: uniqueId(),
    };
  },
  computed: {
    collapseIconName() {
      return this.isCollapsed ? 'chevron-right' : 'chevron-down';
    },
  },
  methods: {
    getIconName(type) {
      const iconMap = {
        [CONTEXT_ITEM_TYPE_PROJECT_FILE]: 'document',
        [CONTEXT_ITEM_TYPE_ISSUE]: 'issues',
        [CONTEXT_ITEM_TYPE_MERGE_REQUEST]: 'merge-request',
      };
      return iconMap[type] || 'document';
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    onRemoveItem(item) {
      /**
       * Emitted when a context item should be removed.
       * @property {Object} item - The context item to be removed
       */
      this.$emit('remove', item);
    },
  },
};
</script>

<template>
  <div class="gl-mb-3 gl-flex gl-flex-col">
    <button
      class="gl-flex gl-w-full gl-items-center gl-border-0 gl-bg-transparent gl-p-0 gl-text-left gl-text-xs gl-lowercase gl-text-gray-500"
      data-testid="chat-context-selections-title"
      @click="toggleCollapse"
    >
      <gl-icon :name="collapseIconName" data-testid="chat-context-collapse-icon" /> {{ title }}
    </button>

    <div
      v-show="!isCollapsed"
      class="gl-mt-1 gl-flex gl-grow gl-flex-wrap"
      data-testid="chat-context-tokens-wrapper"
    >
      <gl-token
        v-for="item in selections"
        :key="item.id"
        :view-only="!removable"
        variant="default"
        class="gl-mb-2 gl-mr-2"
        @close="onRemoveItem(item)"
      >
        <div :id="`context-item-${item.id}-${selectionsId}`" class="gl-flex gl-items-center">
          <gl-icon :name="getIconName(item.type)" :size="12" class="gl-mr-1" />
          {{ item.metadata.name }}
        </div>
        <gl-duo-chat-context-item-popover
          :item="item"
          :target="`context-item-${item.id}-${selectionsId}`"
          placement="bottom"
        />
      </gl-token>
    </div>
  </div>
</template>
