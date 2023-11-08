<!-- eslint-disable vue/multi-word-component-names -->
<script>
import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import GlIcon from '../../icon/icon.vue';

export default {
  name: 'GlDisclosurePathItem',
  components: {
    GlIcon,
  },
  props: {
    /**
     * Path item in the form:
     * ```
     * {
     *   title:    String, required
     *   icon:     String, optional
     *   disabled: Boolean, optional
     * }
     * ```
     */
    item: {
      type: Object,
      required: false,
      default: () => {},
    },
    pathId: {
      type: String,
      required: false,
      default: null,
    },
  },
  methods: {
    shouldDisplayIcon(icon) {
      return icon && iconSpriteInfo.icons.includes(icon);
    },
  },
};
</script>

<template>
  <li class="gl-path-disclosure-list-item">
    <button
      :id="pathId"
      class="gl-disclosure-path-button"
      :category="item.disabled ? 'tertiary' : undefined"
      :disabled="item.disabled"
    >
      <gl-icon
        v-if="shouldDisplayIcon(item.icon)"
        :name="item.icon"
        class="gl-disclosure-path-item-icon gl-mx-2 gl-text-gray-600"
        data-testid="gl-disclosure-path-item-icon"
      />
      <span class="gl-disclosure-path-button-content">{{ item.title }}</span>
    </button>
    <!--
      @slot Additional content to be displayed in a path item.
      @binding {Object} pathItem The path item being rendered.
      @binding {String} pathId The rendered path item's ID.
    -->
    <slot :path-item="item" :path-id="pathId"></slot>
  </li>
</template>
