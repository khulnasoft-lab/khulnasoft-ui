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
      required: true,
    }
  },
};
</script>

<template>
  <gl-popover
    :target="target"
    triggers="hover focus"
    :placement="placement"
  >
    <template #title>
      <span class="gl-font-weight-bold">{{ item.name }}</span>
    </template>
    <template #content>
      <div>Project: {{ item.info.project }}</div>
      <div v-if="item.type === 'file'">Path: {{ item.info.path }}</div>
      <div v-else>ID: {{ item.info.iid }}</div>
      <div v-if="item.info.disabledReason" class="gl-text-red-500">
        {{ item.info.disabledReason }}
      </div>
    </template>
  </gl-popover>
</template>
