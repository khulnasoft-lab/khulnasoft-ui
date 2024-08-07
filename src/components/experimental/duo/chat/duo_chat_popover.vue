<script>
import GlPopover from '../../../base/popover/popover.vue';

export default {
  name: 'DuoChatItemPopover',
  components: {
    GlPopover,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    placement: {
      type: String,
      default: 'top',
      required: true
    }
  },
};
</script>
<template>
  <gl-popover
    :target="target"
    triggers="hover focus"
    :placement="placement"
    :title="item.name"
    custom-class="gl-duo-chat-item-popover"
  >
    <template #title>
      <span class="gl-font-sm gl-text-gray-500">{{ item.name }}</span>
    </template>
    <div class="gl-p-3">
      <div class="gl-mb-2">
        <strong class="gl-mr-1">Project:</strong>
        <span>{{ item.info.project }}</span>
      </div>
      <div v-if="item.type === 'file'" class="gl-mb-2">
        <strong class="gl-mr-1">Path:</strong>
        <span>{{ item.info.path }}</span>
      </div>
      <div v-else-if="item.type === 'issue' || item.type === 'merge_request'" class="gl-mb-2">
        <strong class="gl-mr-1">ID:</strong>
        <span>{{ item.type === 'issue' ? '#' : '!' }}{{ item.info.iid }}</span>
      </div>
      <div class="gl-mb-2">
        <strong class="gl-mr-1">Type:</strong>
        <span>{{ item.type }}</span>
      </div>
      <div v-if="!item.isEnabled" class="gl-text-red-500">
        <strong class="gl-mr-1">Note:</strong>
        <span>{{ item.info.disabledReason || 'This item is disabled' }}</span>
      </div>
    </div>
  </gl-popover>
</template>

