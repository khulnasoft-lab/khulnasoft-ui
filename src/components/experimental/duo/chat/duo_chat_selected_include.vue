<script>
import GlIcon from '../../../base/icon/icon.vue';
import GlToken from '../../../base/token/token.vue';
import GlDuoChatItemPopover from './duo_chat_popover.vue';

export default {
  name: 'DuoChatSelectedIncludes',
  components: {
    GlIcon,
    GlDuoChatItemPopover,
    GlToken,
  },
  props: {
    selectedIncludes: {
      type: Array,
      required: true,
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
  },
};
</script>

<template>
  <div v-if="selectedIncludes.length > 0" class="gl-display-flex gl-align-items-start gl-mb-3">
    <div class="gl-text-xs gl-text-gray-500 gl-mr-3 gl-mt-2 gl-opacity-5 ">added context</div>
    <div class="gl-display-flex gl-flex-wrap gl-flex-grow-1">
      <gl-token
        v-for="(include, index) in selectedIncludes"
        :id="`selected-include-${index}`"
        :key="include.id"
        :view-only="false"
        variant="default"
        class="gl-mb-2 gl-mr-2"
        @close="$emit('remove', include)"
      >
        <div class="gl-display-flex gl-align-items-center">
          <gl-icon :name="getIconName(include.type)" :size="12" />
          {{ include.name }}
        </div>
        <gl-duo-chat-item-popover
          :item="include"
          :target="`selected-include-${index}`"
          placement="bottom"
        />
      </gl-token>
    </div>
  </div>
</template>
