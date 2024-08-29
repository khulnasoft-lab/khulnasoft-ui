<script>
import GlPopover from '../../../../../../base/popover/popover.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import { translate } from '../../../../../../../utils/i18n';
import {
  CONTEXT_ITEM_TYPE_ISSUE,
  CONTEXT_ITEM_TYPE_MERGE_REQUEST,
  CONTEXT_ITEM_TYPE_PROJECT_FILE,
} from '../constants';
import { formatIssueId, formatMergeRequestId } from '../utils';
import GlAlert from '../../../../../../base/alert/alert.vue';

export default {
  name: 'DuoChatContextItemPopover',
  components: {
    GlAlert,
    GlIcon,
    GlPopover,
  },
  props: {
    /**
     * The context contextItem to display in the popover.
     */
    contextItem: {
      type: Object,
      required: true,
    },
    /**
     * The target element ID for the popover.
     */
    target: {
      type: String,
      required: true,
    },
    /**
     * The placement of the popover relative to the target.
     */
    placement: {
      type: String,
      default: 'bottom',
      required: false,
    },
  },
  computed: {
    itemInfo() {
      return this.contextItem.metadata?.info || {};
    },
    id() {
      const isIssuable =
        this.contextItem.type === CONTEXT_ITEM_TYPE_ISSUE ||
        this.contextItem.type === CONTEXT_ITEM_TYPE_MERGE_REQUEST;
      return isIssuable ? this.itemInfo.iid || '' : null;
    },
    formattedId() {
      switch (this.contextItem.type) {
        case CONTEXT_ITEM_TYPE_ISSUE:
          return formatIssueId(this.id);
        case CONTEXT_ITEM_TYPE_MERGE_REQUEST:
          return formatMergeRequestId(this.id);
        default:
          return '';
      }
    },
    filePath() {
      return this.contextItem.type === CONTEXT_ITEM_TYPE_PROJECT_FILE
        ? this.itemInfo.relFilePath || ''
        : null;
    },
    filePathArray() {
      return this.filePath?.split('/');
    },
    isEnabled() {
      return this.contextItem.isEnabled !== false;
    },
    disabledMessage() {
      return Array.isArray(this.contextItem.disabledReasons) &&
        this.contextItem.disabledReasons.length > 0
        ? this.contextItem.disabledReasons.join(', ')
        : translate('DuoChatContextItemPopover.DisabledReason', 'This item is disabled');
    },
    iconName() {
      if (this.contextItem.type === 'merge_request') {
        return 'merge-request';
      }
      if (this.contextItem.type === 'issue') {
        return 'issues';
      }
      return 'project';
    },
    itemTypeLabel() {
      if (this.contextItem.type === 'merge_request') {
        return translate('DuoChatContextItemPopover.MergeRequest', 'Merge request');
      }
      if (this.contextItem.type === 'issue') {
        return translate('DuoChatContextItemPopover.Issue', 'Issue');
      }
      return translate('DuoChatContextItemPopover.File', 'Project file');
    },
  },
  methods: {
    translate,
  },
};
</script>
<template>
  <gl-popover
    :target="target"
    triggers="hover focus"
    :placement="placement"
    :title="contextItem.metadata.name"
    custom-class="gl-duo-chat-item-popover"
  >
    <template #title>
      <div>
        <div
          class="gl-heading-3 gl-mb-1 gl-mt-2 gl-leading-1"
          data-testid="chat-context-popover-title"
        >
          {{ contextItem.metadata.name }}
        </div>
        <div class="gl-font-normal gl-text-subtle">{{ itemTypeLabel }}</div>
      </div>
    </template>
    <div>
      <div v-if="filePath !== null" class="gl-flex gl-flex-wrap gl-items-center">
        <gl-icon name="document" :size="12" variant="subtle" class="gl-mr-1" />
        <span>{{ itemInfo.project }}</span
        ><span v-for="(pathPart, index) in filePathArray" :key="pathPart"
          >{{ pathPart }}{{ index + 1 < filePathArray.length ? '/' : '' }}</span
        >
      </div>

      <div
        v-if="filePath === null"
        class="items-center gl-flex gl-flex-wrap gl-leading-1 gl-text-subtle"
      >
        <gl-icon :name="iconName" :size="12" variant="subtle" class="gl-mr-1" />

        <span>{{ itemInfo.project }}</span
        ><span v-if="id !== null">{{ formattedId }}</span>
      </div>
      <gl-alert
        v-if="!isEnabled"
        variant="danger"
        class="gl-mb-1 gl-mt-3 gl-p-4 gl-text-sm"
        data-testid="chat-context-popover-disabled"
        :dismissible="false"
        :show-icon="false"
      >
        {{ disabledMessage }}
      </gl-alert>
    </div>
  </gl-popover>
</template>
