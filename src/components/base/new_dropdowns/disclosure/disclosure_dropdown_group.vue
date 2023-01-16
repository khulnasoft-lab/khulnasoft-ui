<script>
import { uniqueId } from 'lodash';
import GlDisclosureDropdownItem from './disclosure_dropdown_item.vue';
import { isGroup } from './utils';

export const GROUP_TOP_BORDER_CLASSES = 'gl-border-t gl-pt-3 gl-mt-3';

export default {
  components: {
    GlDisclosureDropdownItem,
  },
  props: {
    /**
     * Group of items
     */
    group: {
      type: Object,
      required: false,
      default: null,
      validator: isGroup,
    },
    /**
     * If 'true', will set top border for the group
     * to separate from other groups
     */
    bordered: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    borderClass() {
      return this.bordered ? GROUP_TOP_BORDER_CLASSES : null;
    },
    showHeader() {
      return this.$scopedSlots['group-label'] || this.group?.name;
    },
    groupLabeledBy() {
      return this.showHeader ? this.nameId : null;
    },
  },
  created() {
    this.nameId = uniqueId('gl-disclosure-dropdown-group-');
  },
  methods: {
    handleAction(action) {
      this.$emit('action', action);
    },
  },
};
</script>

<template>
  <div :class="borderClass">
    <div
      v-if="showHeader"
      :id="nameId"
      aria-hidden="true"
      class="gl-pl-5 gl-py-2 gl-font-sm gl-font-weight-bold"
    >
      <slot name="group-label">{{ group.name }}</slot>
    </div>
    <ul role="group" :aria-labelledby="groupLabeledBy" class="gl-mb-0 gl-pl-0 gl-list-style-none">
      <slot>
        <gl-disclosure-dropdown-item
          v-for="item in group.items"
          :key="item.text"
          :item="item"
          @action="handleAction"
        >
          <slot name="list-item" :item="item"> </slot>
        </gl-disclosure-dropdown-item>
      </slot>
    </ul>
  </div>
</template>
