<script>
import { categoryValidator, contextItemValidator } from '../../utils';
import GlDuoChatContextItemMenuContextSearchItem from './context_search_item.vue';

export default {
  name: 'GlDuoChatContextItemMenuContextSearchItemMergeRequest',
  components: { GlDuoChatContextItemMenuContextSearchItem },
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
};
</script>
<template>
  <gl-duo-chat-context-item-menu-context-search-item :item="item" :category="category">
    <template #secondary>!{{ item.metadata.info.iid }}</template>
  </gl-duo-chat-context-item-menu-context-search-item>
</template>
