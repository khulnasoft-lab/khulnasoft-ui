<script>
/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import GlDuoChatContextItemPopover from '../duo_chat_context_item_popover/duo_chat_context_item_popover.vue';
import GlTruncate from '../../../../../../utilities/truncate/truncate.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import {
  categoryValidator,
  contextItemValidator,
  getContextItemIcon,
  getContextItemSecondaryText,
  getContextItemSource,
} from '../utils';
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
    secondaryText() {
      return getContextItemSecondaryText(this.contextItem);
    },
    icon() {
      return getContextItemIcon(this.contextItem, this.category);
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
      class="gl-align-items-center gl-mt-1 gl-flex gl-shrink-0 gl-whitespace-nowrap gl-text-secondary"
      data-testid="item-secondary-text"
    >
      <gl-badge
        v-if="itemSource"
        variant="neutral"
        class="gl-mr-1"
        data-testid="context-item-source"
        >{{ itemSource }}</gl-badge
      >
      <gl-truncate class="gl-min-w-0" position="middle" :text="secondaryText" />
    </div>
  </div>
</template>
