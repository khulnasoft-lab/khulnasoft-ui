<script>
import GlPopover from '../../../../../../base/popover/popover.vue';
import { translate } from '../../../../../../../utils/i18n';
import {
  CONTEXT_ITEM_TYPE_ISSUE,
  CONTEXT_ITEM_TYPE_MERGE_REQUEST,
  CONTEXT_ITEM_TYPE_PROJECT_FILE,
} from '../constants';
import { formatIssueId, formatMergeRequestId } from '../utils';

export default {
  name: 'DuoChatContextItemPopover',
  components: {
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
    isEnabled() {
      return this.contextItem.isEnabled !== false;
    },
    disabledMessage() {
      return Array.isArray(this.contextItem.disabledReasons) &&
        this.contextItem.disabledReasons.length > 0
        ? this.contextItem.disabledReasons.join(', ')
        : translate('DuoChatContextItemPopover.DisabledReason', 'This item is disabled');
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
      <span class="gl-text-sm gl-text-gray-500" data-testid="chat-context-popover-title">{{
        contextItem.metadata.name
      }}</span>
    </template>
    <div class="gl-p-3">
      <div class="gl-mb-2">
        <strong class="gl-mr-1">{{
          translate('DuoChatContextItemPopover.ProjectLabel', 'Project:')
        }}</strong>
        <span>{{ itemInfo.project }}</span>
      </div>
      <div v-if="filePath !== null" class="gl-mb-2">
        <strong class="gl-mr-1">{{
          translate('DuoChatContextItemPopover.PathLabel', 'Path:')
        }}</strong>
        <span>{{ filePath }}</span>
      </div>
      <div v-if="id !== null" class="gl-mb-2">
        <strong class="gl-mr-1">{{ translate('DuoChatContextItemPopover.IdLabel', 'ID:') }}</strong>
        <span>{{ formattedId }}</span>
      </div>
      <div class="gl-mb-2">
        <strong class="gl-mr-1">{{
          translate('DuoChatContextItemPopover.TypeLabel', 'Type:')
        }}</strong>
        <span>{{ contextItem.type }}</span>
      </div>
      <div v-if="!isEnabled" class="gl-text-red-500" data-testid="chat-context-popover-disabled">
        <strong class="gl-mr-1">{{
          translate('DuoChatContextItemPopover.DisabledMessageLabel', 'Note:')
        }}</strong>
        <span>{{ disabledMessage }}</span>
      </div>
    </div>
  </gl-popover>
</template>
