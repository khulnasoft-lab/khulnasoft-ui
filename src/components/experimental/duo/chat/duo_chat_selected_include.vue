<script>
import GlIcon from '../../../base/icon/icon.vue';
import GlToken from '../../../base/token/token.vue';
import GlDuoChatItemPopover from './duo_chat_popover.vue';

export default {
  name: 'GlDuoChatSelectedIncludes',
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
    title: {
      type: String,
      default: 'added context',
      required: false,
    },
    collapsable: {
      type: Boolean,
      default: false,
      required: false,
    },
    showClose: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      isCollapsed: true,
    };
  },
  computed: {
    getTitle() {
      if (!this.collapsable) {
        return this.title;
      }
      return `${this.title} ${this.isCollapsed ? '[+]' : '[-]'}`;
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
    toggleCollapse() {
      if (this.collapsable) {
        this.isCollapsed = !this.isCollapsed;
      }
    },
  },
};
</script>

<template>
  <div v-if="selectedIncludes.length > 0" class="gl-display-flex gl-flex-direction-column gl-mb-3">
    <div
      class="gl-display-flex gl-align-items-center"
      :class="{ 'gl-cursor-pointer': collapsable }"
      @click="toggleCollapse"
    >
      <div class="gl-mr-2 gl-text-xs gl-text-gray-500">{{ getTitle }}</div>
    </div>

    <div
      v-show="!collapsable || !isCollapsed"
      class="gl-display-flex gl-flex-grow-1 gl-mt-1 gl-flex-wrap"
    >
      <gl-token
        v-for="(include, index) in selectedIncludes"
        :id="`selected-include-${index}`"
        :key="include.id"
        :view-only="!showClose"
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
