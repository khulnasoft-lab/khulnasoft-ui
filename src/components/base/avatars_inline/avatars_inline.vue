<script>
import truncate from 'lodash/truncate';
import get from 'lodash/get';
import { avatarsInlineSizeOptions } from '../../../utils/constants';
import GlAvatar from '../avatar/avatar.vue';
import GlTooltip from '../tooltip/tooltip.vue';

export default {
  name: 'AvatarsInline',
  components: {
    GlAvatar,
    GlTooltip,
  },
  props: {
    avatars: {
      type: Array,
      required: true,
    },
    maxVisible: {
      type: Number,
      required: true,
    },
    avatarSize: {
      type: Number,
      required: true,
      validator: (value) => avatarsInlineSizeOptions.includes(value),
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    badgeSrOnlyText: {
      type: String,
      required: true,
    },
    badgeTooltipProp: {
      type: String,
      required: false,
      default: '',
    },
    badgeTooltipMaxChars: {
      type: Number,
      required: false,
      default: null,
    },
  },
  computed: {
    hiddenAvatars() {
      return this.avatars.slice(this.maxVisible);
    },
    collapsable() {
      return this.hiddenAvatars.length > 0;
    },
    visibleAvatars() {
      return this.collapsed ? this.avatars.slice(0, this.maxVisible) : this.avatars;
    },
    badgeSize() {
      return (
        {
          16: 'sm',
          24: 'md',
          32: 'lg',
        }[this.avatarSize] || 'lg'
      );
    },
    badgeLabel() {
      return `+${this.hiddenAvatars.length}`;
    },
    badgeTooltipTitle() {
      if (!this.badgeTooltipProp) {
        return '';
      }

      const tooltipTitle = this.hiddenAvatars
        .map((avatar) => get(avatar, this.badgeTooltipProp, '').trim())
        .join(', ');

      // truncate will append '...'
      // we need to take these extra 3 characters into account in badgeTooltipMaxChars
      return this.badgeTooltipMaxChars
        ? truncate(tooltipTitle, { length: this.badgeTooltipMaxChars })
        : tooltipTitle;
    },
  },
};
</script>
<template>
  <div class="gl-avatars-inline" :class="`gl-avatars-inline-${badgeSize}`">
    <div v-for="(avatar, index) in visibleAvatars" :key="index" class="gl-avatars-inline-child">
      <slot name="avatar" :avatar="avatar">
        <gl-avatar v-bind="avatar" :size="avatarSize" />
      </slot>
    </div>
    <div v-if="collapsed && collapsable" class="gl-avatars-inline-child">
      <gl-tooltip v-if="badgeTooltipProp" :target="() => $refs.badge">
        {{ badgeTooltipTitle }}
      </gl-tooltip>
      <span
        ref="badge"
        data-testid="collapsed-avatars-badge"
        :class="['gl-avatars-inline-badge', badgeSize]"
        aria-hidden="true"
      >
        {{ badgeLabel }}
      </span>
      <span data-testid="badge-sr-only-text" class="sr-only">{{ badgeSrOnlyText }}</span>
    </div>
  </div>
</template>
