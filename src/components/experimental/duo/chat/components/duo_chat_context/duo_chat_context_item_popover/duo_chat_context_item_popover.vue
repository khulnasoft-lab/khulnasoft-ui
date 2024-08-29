<script>
import GlPopover from '../../../../../../base/popover/popover.vue';
import { translate } from '../../../../../../../utils/i18n';
import {
  CONTEXT_ITEM_TYPE_ISSUE,
  CONTEXT_ITEM_TYPE_MERGE_REQUEST,
  CONTEXT_ITEM_TYPE_PROJECT_FILE,
} from '../constants';

const ID_PREFIXES = {
  issue: '#',
  merge_request: '!',
};

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
      default: 'bottom',
      required: false,
    },
  },
  computed: {
    itemInfo() {
      return this.item.metadata?.info || {};
    },
    id() {
      const isIssuable =
        this.item.type === CONTEXT_ITEM_TYPE_ISSUE ||
        this.item.type === CONTEXT_ITEM_TYPE_MERGE_REQUEST;
      return isIssuable ? this.itemInfo.iid || '' : null;
    },
    idPrefix() {
      return ID_PREFIXES[this.item.type] || '';
    },
    filePath() {
      return this.item.type === CONTEXT_ITEM_TYPE_PROJECT_FILE
        ? this.itemInfo.relFilePath || ''
        : null;
    },
    isEnabled() {
      return this.item.isEnabled !== false;
    },
    disabledMessage() {
      return Array.isArray(this.item.disabledReasons) && this.item.disabledReasons.length > 0
        ? this.item.disabledReasons.join(', ')
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
    :title="item.metadata.name"
    custom-class="gl-duo-chat-item-popover"
  >
    <template #title>
      <span class="gl-text-sm gl-text-gray-500" data-testid="chat-context-popover-title">{{
        item.metadata.name
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
        <span>{{ idPrefix }}{{ id }}</span>
      </div>
      <div class="gl-mb-2">
        <strong class="gl-mr-1">{{
          translate('DuoChatContextItemPopover.TypeLabel', 'Type:')
        }}</strong>
        <span>{{ item.type }}</span>
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
