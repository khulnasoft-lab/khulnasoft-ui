<script>
import GlIcon from '../../icon/icon.vue';
import { ENTER, SPACE } from '../constants';
import { stopEvent } from '../../../../utils/utils';

export default {
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
    class="gl-dropdown-item"
    role="option"
    :tabindex="isFocused ? 0 : -1"
    :aria-selected="isSelected"
    @click="toggleSelection"
    @keydown="onKeydown"
  >
    <div class="dropdown-item">
      <gl-icon
        name="mobile-issue-close"
        data-testid="dropdown-item-checkbox"
        :class="[
          'gl-dropdown-item-check-icon',
          { 'gl-visibility-hidden': !isSelected },
          checkedClasses,
        ]"
      />
      <span class="gl-dropdown-item-text-wrapper">
        <slot></slot>
      </span>
    </div>
  </li>
</template>
