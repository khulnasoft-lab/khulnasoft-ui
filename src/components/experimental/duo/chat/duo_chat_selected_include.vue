<script>
import GlIcon from '../../../base/icon/icon.vue';
import GlDuoChatItemPopover from './duo_chat_popover.vue';

export default {
  name: 'DuoChatSelectedIncludes',
  components: {
    GlIcon,
    GlDuoChatItemPopover,
  },
  props: {
    selectedIncludes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getIconName(category) {
      const iconMap = {
        file: 'document',
        issue: 'issues',
        merge_request: 'merge-request',
      };
      return iconMap[category] || 'document';
    },
  },
};
</script>

<template>
  <div class="gl-mb-2">
    <span
      v-for="(include, index) in selectedIncludes"
      :id="`selected-include-${index}`"
      :key="include.id"
      class="gl-rounded gl-display-inline-flex gl-align-items-center gl-mr-2 gl-bg-blue-100 gl-px-2 gl-py-1 gl-text-sm"
    >
      <gl-icon :name="getIconName(include.type)" class="gl-mr-1" />
      {{ include.name }}
      <span class="gl-ml-1 gl-cursor-pointer" @click.stop="$emit('remove', include)">&times;</span>
      <gl-duo-chat-item-popover
        :item="include"
        :target="`selected-include-${index}`"
        placement="top"
      />
    </span>
  </div>
</template>
