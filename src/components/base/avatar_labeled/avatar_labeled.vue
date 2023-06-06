<script>
import GlAvatar from '../avatar/avatar.vue';
import GlLink from '../link/link.vue';

export default {
  name: 'GlAvatarLabeled',
  components: {
    GlAvatar,
    GlLink,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    subLabel: {
      type: String,
      required: false,
      default: '',
    },
    labelLink: {
      type: String,
      required: false,
      default: '',
    },
    subLabelLink: {
      type: String,
      required: false,
      default: '',
    },
    inlineLabels: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    hasLabelLink() {
      return Boolean(this.labelLink);
    },
    hasSubLabelLink() {
      return Boolean(this.subLabelLink);
    },
    avatarListeners() {
      if (this.hasLabelLink) {
        return {
          ...this.$listeners,
          click: this.onAvatarClick,
        };
      }

      return this.$listeners;
    },
    avatarCssClasses() {
      return {
        'gl-cursor-pointer': this.hasLabelLink,
      };
    },
    avatarRowLayoutClass() {
      return {
        'inline-labels': this.inlineLabels,
      };
    },
  },
  methods: {
    onAvatarClick() {
      this.$refs.labelLink.$el.click();
    },
  },
};
</script>
<template>
  <div class="gl-avatar-labeled">
    <gl-avatar v-bind="$attrs" :class="avatarCssClasses" alt v-on="avatarListeners" />
    <div class="gl-avatar-labeled-labels gl-text-left!" :class="avatarRowLayoutClass">
      <div
        class="gl-display-flex gl-flex-wrap gl-align-items-center gl-text-left! gl-mx-n1 gl-my-n1"
      >
        <gl-link v-if="hasLabelLink" ref="labelLink" :href="labelLink" class="gl-avatar-link">
          <span class="gl-avatar-labeled-label">{{ label }}</span>
        </gl-link>
        <span v-else class="gl-avatar-labeled-label">{{ label }}</span>
        <!-- @slot Metadata to add to the avatar. Generally used for badges or user status emoji. -->
        <slot name="meta"></slot>
      </div>
      <gl-link v-if="hasSubLabelLink" :href="subLabelLink" class="gl-avatar-link">
        <span class="gl-avatar-labeled-sublabel">{{ subLabel }}</span>
      </gl-link>
      <span v-else class="gl-avatar-labeled-sublabel">{{ subLabel }}</span>
      <!-- @slot Add additional information below the avatar label. -->
      <slot></slot>
    </div>
  </div>
</template>
