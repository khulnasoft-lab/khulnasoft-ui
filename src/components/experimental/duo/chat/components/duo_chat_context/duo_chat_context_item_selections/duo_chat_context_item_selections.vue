<script>
import GlIcon from '../../../../../../base/icon/icon.vue';
import GlToken from '../../../../../../base/token/token.vue';
import { EVENT_BUS_TYPES } from '../duo_chat_context_event_bus';
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';

export default {
  name: 'GlDuoChatContextItemSelections',
  components: {
    GlIcon,
    GlDuoChatContextItemPopover,
    GlToken,
  },
  props: {
    eventBus: {
      type: Object,
      required: true,
    },
    contextItemSelections: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: 'added context',
      required: false,
    },
    collapsable: {
      type: Boolean,
      default: false,
      required: false,
    },
    showClose: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      isCollapsed: true,
    };
  },
  computed: {
    getTitle() {
      if (!this.collapsable) {
        return this.title;
      }
      return `${this.title} ${this.isCollapsed ? '[+]' : '[-]'}`;
    },
  },
  methods: {
    getIconName(type) {
      const iconMap = {
        file: 'document',
        issue: 'issues',
        merge_request: 'merge-request',
      };
      return iconMap[type] || 'document';
    },
    toggleCollapse() {
      if (this.collapsable) {
        this.isCollapsed = !this.isCollapsed;
      }
    },
    removeContextItem(item) {
      this.eventBus.$emit(EVENT_BUS_TYPES.CONTEXT_ITEM_REMOVED, item);
    },
  },
};
</script>

<template>
  <div
    v-if="contextItemSelections.length > 0"
    class="gl-display-flex gl-flex-direction-column gl-mb-3"
  >
    <div
      class="gl-display-flex gl-align-items-center"
      :class="{ 'gl-cursor-pointer': collapsable }"
      @click="toggleCollapse"
    >
      <div class="gl-mr-2 gl-text-xs gl-text-gray-500">{{ getTitle }}</div>
    </div>

    <div
      v-show="!collapsable || !isCollapsed"
      class="gl-display-flex gl-flex-grow-1 gl-mt-1 gl-flex-wrap"
    >
      <gl-token
        v-for="(item, index) in contextItemSelections"
        :key="item.id"
        :view-only="!showClose"
        variant="default"
        class="gl-mb-2 gl-mr-2"
        @close="removeContextItem(item)"
      >
        <div :id="`context-item-${index}`" class="gl-display-flex gl-align-items-center">
          <gl-icon :name="getIconName(item.type)" :size="12" />
          {{ item.name }}
        </div>
        <gl-duo-chat-context-item-popover
          :item="item"
          :target="`context-item-${index}`"
          placement="bottom"
        />
      </gl-token>
    </div>
  </div>
</template>
