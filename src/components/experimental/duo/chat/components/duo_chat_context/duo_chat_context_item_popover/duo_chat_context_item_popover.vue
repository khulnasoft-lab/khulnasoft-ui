<script>
import GlPopover from '../../../../../../base/popover/popover.vue';

export default {
  name: 'DuoChatContextItemPopover',
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
  computed: {
    popoverData() {
      const info = this.item.info || {};
      let idPrefix = '';
      if (this.item.type === 'issue') {
        idPrefix = '#';
      } else if (this.item.type === 'merge_request') {
        idPrefix = '!';
      }
      return {
        name: this.item.name || '',
        project: info.project || '',
        type: this.item.type || '',
        isEnabled: this.item.isEnabled !== false, // true by default
        filePath: this.item.type === 'file' ? (info.relFilePath || '') : null,
        id: (this.item.type === 'issue' || this.item.type === 'merge_request') ? (info.iid || '') : null,
        idPrefix,
        disabledReasons: Array.isArray(info.disabledReasons) ? info.disabledReasons : [],
        disabledMessage: Array.isArray(info.disabledReasons) && info.disabledReasons.length > 0 
          ? info.disabledReasons.join(', ') 
          : 'This item is disabled'
      };
    }
  }
};
</script>
<template>
  <gl-popover
    :target="target"
    triggers="hover focus"
    :placement="placement"
    :title="popoverData.name"
    custom-class="gl-duo-chat-item-popover"
  >
    <template #title>
      <span class="gl-font-sm gl-text-gray-500">{{ popoverData.name }}</span>
    </template>
    <div class="gl-p-3">
      <div class="gl-mb-2">
        <strong class="gl-mr-1">Project:</strong>
        <span>{{ popoverData.project }}</span>
      </div>
      <div v-if="popoverData.filePath !== null" class="gl-mb-2">
        <strong class="gl-mr-1">Path:</strong>
        <span>{{ popoverData.filePath }}</span>
      </div>
      <div v-if="popoverData.id !== null" class="gl-mb-2">
        <strong class="gl-mr-1">ID:</strong>
        <span>{{ popoverData.idPrefix }}{{ popoverData.id }}</span>
      </div>
      <div class="gl-mb-2">
        <strong class="gl-mr-1">Type:</strong>
        <span>{{ popoverData.type }}</span>
      </div>
      <div v-if="!popoverData.isEnabled" class="gl-text-red-500">
        <strong class="gl-mr-1">Note:</strong>
        <span>{{ popoverData.disabledMessage }}</span>
      </div>
    </div>
  </gl-popover>
</template>

