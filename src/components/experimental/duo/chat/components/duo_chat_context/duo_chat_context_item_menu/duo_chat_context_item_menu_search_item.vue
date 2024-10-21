<script>
import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';
import GlTruncate from '../../../../../../utilities/truncate/truncate.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import { categoryValidator, contextItemValidator, getContextItemSource } from '../utils';
import GlBadge from '../../../../../../base/badge/badge.vue';

export default {
  name: 'GlDuoChatContextItemMenuSearchItem',
  components: { GlBadge, GlTruncate, GlIcon, GlDuoChatContextItemPopover },
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
    itemSource() {
      return getContextItemSource(this.contextItem);
    },
  },
};
</script>
<template>
  <div class="gl-flex gl-flex-col">
    <div class="gl-flex gl-items-center">
      <gl-icon
        :name="contextItem.metadata.icon"
        class="gl-mr-2 gl-shrink-0"
        data-testid="category-icon"
      />
      <gl-truncate :text="title" class="gl-min-w-0" data-testid="item-title" />
      <gl-icon
        :id="`info-icon-${contextItem.id}`"
        name="information-o"
        class="gl-ml-2 gl-mr-2 gl-shrink-0 gl-cursor-pointer gl-text-secondary"
        :size="12"
      />
      <gl-duo-chat-context-item-popover
        :context-item="contextItem"
        :target="`info-icon-${contextItem.id}`"
        placement="left"
      />
    </div>
    <div
      v-if="contextItem.metadata.secondaryText"
      class="gl-mt-1 gl-shrink-0 gl-whitespace-nowrap gl-text-secondary"
      data-testid="item-secondary-text"
    >
      <gl-badge
        v-if="itemSource"
        variant="neutral"
        class="gl-mr-1"
        data-testid="context-item-source"
        >{{ itemSource }}</gl-badge
      >
      <gl-truncate :text="contextItem.metadata.secondaryText" />
    </div>
  </div>
</template>
