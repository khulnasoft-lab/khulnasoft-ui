<script>
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';
import GlTruncate from '../../../../../../utilities/truncate/truncate.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import {
  categoryValidator,
  contextItemValidator,
  getContextItemIcon,
  getContextItemSecondaryText,
} from '../utils';

export default {
  name: 'GlDuoChatContextItemMenuSearchItem',
  components: { GlTruncate, GlIcon, GlDuoChatContextItemPopover },
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
      return this.contextItem.metadata?.title || '';
    },
    secondaryText() {
      return getContextItemSecondaryText(this.contextItem);
    },
    icon() {
      return getContextItemIcon(this.contextItem, this.category);
    },
  },
};
</script>
<template>
  <div class="gl-flex gl-flex-col">
    <div class="gl-flex gl-items-center">
      <gl-icon :name="icon" class="gl-mr-2 gl-shrink-0" data-testid="category-icon" />
      <gl-truncate :text="title" class="gl-min-w-0" data-testid="item-title" />
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
    <div
      v-if="secondaryText"
      class="gl-mt-1 gl-shrink-0 gl-whitespace-nowrap gl-text-secondary"
      data-testid="item-secondary-text"
    >
      <gl-truncate :text="secondaryText" />
    </div>
  </div>
</template>
