<script>
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import { categoryValidator, contextItemValidator } from '../utils';
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
    item: {
      type: Object,
      required: true,
      validator: contextItemValidator,
    },
  },
  computed: {
    title() {
      return this.item.metadata?.name || '';
    },
    secondary() {
      switch (this.category.value) {
        case CONTEXT_ITEM_TYPE_PROJECT_FILE:
          return this.item.metadata.info.relFilePath;
        case CONTEXT_ITEM_TYPE_ISSUE:
          return `#${this.item.metadata.info.iid}`;
        case CONTEXT_ITEM_TYPE_MERGE_REQUEST:
          return `!${this.item.metadata.info.iid}`;
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
      <span class="gl-whitespace-nowrap">
        {{ title }}
      </span>
      <gl-icon
        :id="`info-icon-${item.id}`"
        name="information-o"
        class="gl-ml-auto gl-shrink-0 gl-cursor-pointer gl-text-secondary"
        :size="12"
      />
      <gl-duo-chat-context-item-popover
        :item="item"
        :target="`info-icon-${item.id}`"
        placement="left"
      />
    </div>
    <div class="gl-mt-1 gl-shrink-0 gl-whitespace-nowrap gl-text-secondary">
      {{ secondary }}
    </div>
  </div>
</template>
