<script>
import GlIcon from '../../icon/icon.vue';
import { ENTER, SPACE } from '../constants';
import { stopEvent } from '../../../../utils/utils';

export default {
  name: 'GlListboxItem',
  components: {
    GlIcon,
  },
  props: {
    isSelected: {
      type: Boolean,
      default: false,
      required: false,
    },
    isFocused: {
      type: Boolean,
      default: false,
      required: false,
    },
    isCheckCentered: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    checkedClasses() {
      if (this.isCheckCentered) {
        return '';
      }

      return 'gl-mt-3 gl-align-self-start';
    },
  },
  methods: {
    toggleSelection() {
      this.$emit('select', !this.isSelected);
    },
    onKeydown(event) {
      const { code } = event;

      if (code === ENTER || code === SPACE) {
        stopEvent(event);
        this.toggleSelection();
      }
    },
  },
};
</script>

<template>
  <li
    class="gl-new-dropdown-item"
    role="option"
    :tabindex="isFocused ? 0 : -1"
    :aria-selected="isSelected"
    @click="toggleSelection"
    @keydown="onKeydown"
  >
    <span class="gl-new-dropdown-item-content">
      <gl-icon
        name="mobile-issue-close"
        data-testid="dropdown-item-checkbox"
        :class="[
          'gl-new-dropdown-item-check-icon',
          { 'gl-visibility-hidden': !isSelected },
          checkedClasses,
        ]"
      />
      <span class="gl-new-dropdown-item-text-wrapper">
        <slot></slot>
      </span>
    </span>
  </li>
</template>
