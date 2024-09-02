<script>
import GlDuoChatContextItemPopover from '../../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';
import GlIcon from '../../../../../../../base/icon/icon.vue';
import { categoryValidator, contextItemValidator } from '../../utils';

export default {
  name: 'GlDuoChatContextItemMenuContextSearchItem',
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
  },
};
</script>
<template>
  <div class="gl-flex gl-flex-col">
    <div class="gl-flex gl-items-center">
      <gl-icon :name="category.icon" class="gl-mr-2 gl-shrink-0" data-testid="category-icon" />
      <span class="gl-whitespace-nowrap">
        <slot name="title">{{ title }}</slot>
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
      <slot name="secondary"></slot>
    </div>
  </div>
</template>
