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
    containerSizeStyles() {
      return {
        width: `${this.avatarSize * this.visibleAvatars.length}px`,
        height: `${this.avatarSize}px`,
      };
    },
    badgeSize() {
      return this.avatarSize === 24 ? 'md' : 'lg';
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
  methods: {
    calcAvatarPosition(avatarIndex) {
      // According to pajamas, overlap is 25% of the avatar height
      const overlapDistance = this.avatarSize * 0.75;

      return {
        left: `${overlapDistance * avatarIndex}px`,
        zIndex: this.maxVisible + (avatarIndex - 1),
      };
    },
  },
};
</script>
<template>
  <div :class="['gl-avatars-inline', { collapsed: collapsed }]" :style="containerSizeStyles">
    <div
      v-for="(avatar, index) in visibleAvatars"
      :key="index"
      class="gl-avatars-inline-child"
      :style="calcAvatarPosition(index)"
    >
      <slot name="avatar" :avatar="avatar">
        <gl-avatar v-bind="avatar" :size="avatarSize" />
      </slot>
    </div>
    <div
      v-if="collapsed && collapsable"
      class="gl-avatars-inline-child"
      :style="calcAvatarPosition(visibleAvatars.length)"
    >
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
