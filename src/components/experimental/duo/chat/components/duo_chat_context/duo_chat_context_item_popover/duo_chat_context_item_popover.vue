<script>
import GlAlert from '../../../../../../base/alert/alert.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import GlPopover from '../../../../../../base/popover/popover.vue';
import GlTruncate from '../../../../../../utilities/truncate/truncate.vue';
import { translate } from '../../../../../../../utils/i18n';
import GlBadge from '../../../../../../base/badge/badge.vue';
import { getContextItemSource } from '../utils';

export default {
  name: 'DuoChatContextItemPopover',
  components: {
    GlBadge,
    GlTruncate,
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
    title() {
      return this.contextItem.metadata.title || '';
    },
    isEnabled() {
      return this.contextItem.metadata.enabled !== false;
    },
    disabledMessage() {
      return Array.isArray(this.contextItem.metadata.disabledReasons) &&
        this.contextItem.metadata.disabledReasons.length > 0
        ? this.contextItem.metadata.disabledReasons.join(', ')
        : translate('DuoChatContextItemPopover.DisabledReason', 'This item is disabled');
    },
    itemSource() {
      return getContextItemSource(this.contextItem);
    },
  },
};
</script>
<template>
  <gl-popover
    :target="target"
    triggers="hover focus"
    :placement="placement"
    :title="title"
    custom-class="gl-duo-chat-item-popover"
  >
    <template #title>
      <div>
        <div
          class="gl-heading-3 gl-mb-1 gl-mt-2 gl-leading-1"
          data-testid="chat-context-popover-title"
        >
          {{ title }}
        </div>
        <div v-if="contextItem.metadata.subTypeLabel" class="gl-font-normal gl-text-subtle">
          <gl-truncate :text="contextItem.metadata.subTypeLabel" class="gl-min-w-0" />
        </div>
      </div>
    </template>
    <div>
      <div v-if="contextItem.metadata.secondaryText" class="gl-flex gl-items-center">
        <gl-icon
          :name="contextItem.metadata.icon"
          :size="12"
          variant="subtle"
          class="gl-mr-1 gl-shrink-0"
        />
        <gl-badge v-if="itemSource" class="gl-mr-1">{{ itemSource }}</gl-badge>
        <gl-truncate :text="contextItem.metadata.secondaryText" class="gl-min-w-0" />
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
