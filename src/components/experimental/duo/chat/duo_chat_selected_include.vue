<script>
import GlPopover from '../../../base/popover/popover.vue';
import GlIcon from '../../../base/icon/icon.vue';

export default {
  name: 'DuoChatSelectedIncludes',
  components: {
    GlPopover,
    GlIcon,
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
        files: 'document',
        issues: 'issues',
        merge_requests: 'merge-request',
      };
      return iconMap[category] || 'document';
    },
  },
};
</script>

<template>
  <div class="gl-mb-2">
    <span
      v-for="include in selectedIncludes"
      :id="`selected-include-${include.id}`"
      :key="include.id"
      class="gl-rounded gl-mr-2 gl-bg-blue-100 gl-px-2 gl-py-1 gl-text-sm gl-display-inline-flex gl-align-items-center"
    >
      <gl-icon :name="getIconName(include.category)" class="gl-mr-1" />
      {{ include.name }}
      <span class="gl-ml-1 gl-cursor-pointer" @click.stop="$emit('remove', include)">&times;</span>
      <gl-popover
        :target="`selected-include-${include.id}`"
        triggers="hover focus"
        placement="top"
        :show="false"
      >
        <template #title>
          <span class="gl-font-weight-bold">{{ include.name }}</span>
        </template>
        <template #content>
          <div v-if="include.path">Path: {{ include.path }}</div>
          <div v-if="include.iid">ID: #{{ include.iid }}</div>
          <div>Category: {{ include.category }}</div>
        </template>
      </gl-popover>
    </span>
  </div>
</template>
