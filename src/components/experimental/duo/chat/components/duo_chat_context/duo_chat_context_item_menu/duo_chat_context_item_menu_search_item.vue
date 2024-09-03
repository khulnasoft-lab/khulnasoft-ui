<script>
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import {
  categoryValidator,
  contextItemValidator,
  formatIssueId,
  formatMergeRequestId,
} from '../utils';
import {
  CONTEXT_ITEM_TYPE_ISSUE,
  CONTEXT_ITEM_TYPE_MERGE_REQUEST,
  CONTEXT_ITEM_TYPE_PROJECT_FILE,
} from '../constants';

export default {
  name: 'GlDuoChatContextItemMenuSearchItem',
  components: { GlIcon, GlDuoChatContextItemPopover },
  props: {
    category: {
      type: Object,
      required: true,
      validator: categoryValidator,
    },
    contextItem: {
      type: Object,
      required: true,
      validator: contextItemValidator,
    },
  },
  computed: {
    title() {
      return this.contextItem.metadata?.name || '';
    },
    secondaryText() {
      switch (this.category.value) {
        case CONTEXT_ITEM_TYPE_PROJECT_FILE:
          return this.contextItem.metadata.info.relFilePath;
        case CONTEXT_ITEM_TYPE_ISSUE:
          return formatIssueId(this.contextItem.metadata.info.iid);
        case CONTEXT_ITEM_TYPE_MERGE_REQUEST:
          return formatMergeRequestId(this.contextItem.metadata.info.iid);
        default:
          return '';
      }
    },
  },
};
</script>
<template>
  <div class="gl-flex gl-flex-col">
    <div class="gl-flex gl-items-center">
      <gl-icon :name="category.icon" class="gl-mr-2 gl-shrink-0" data-testid="category-icon" />
      <span>{{ title }}</span>
      <gl-icon
        :id="`info-icon-${contextItem.id}`"
        name="information-o"
        class="gl-ml-2 gl-shrink-0 gl-cursor-pointer gl-text-secondary"
        :size="12"
      />
      <gl-duo-chat-context-item-popover
        :context-item="contextItem"
        :target="`info-icon-${contextItem.id}`"
        placement="left"
      />
    </div>
    <div class="gl-mt-1 gl-shrink-0 gl-whitespace-nowrap gl-text-secondary">
      {{ secondaryText }}
    </div>
  </div>
</template>
