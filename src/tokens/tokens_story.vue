<script>
import { colorFromBackground } from '../utils/utils';
import GlColorContrast from '../internal/color_contrast/color_contrast.vue';

export default {
  name: 'TokensStory',
  components: {
    GlColorContrast,
  },
  inject: ['isBackgroundColorStory', 'lightBackground', 'darkBackground', 'containerClass'],
  props: {
    tokens: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  methods: {
    isAlpha(value) {
      return value.startsWith('rgba(');
    },
    getTokenName(token) {
      return token.path.filter(Boolean).join('.');
    },
    getClasses(value) {
      if (this.isAlpha(value)) return '';
      if (!this.isBackgroundColorStory) return '';

      const textColorVariant = colorFromBackground(value, 4.5);
      return {
        'gl-text-gray-950': textColorVariant === 'dark',
        'gl-text-white': textColorVariant === 'light',
      };
    },
    getStyle(value) {
      if (this.isBackgroundColorStory) {
        return { backgroundColor: value };
      }

      return { color: value };
    },
  },
};
</script>

<template>
  <div :class="containerClass">
    <ul class="gl-list-style-none gl-m-0 gl-p-0">
      <li
        v-for="token in tokens"
        :key="token.name"
        class="gl-display-flex gl-flex-wrap gl-align-items-center gl-justify-content-space-between gl-gap-3 gl-p-3"
        :class="getClasses(token.value)"
        :style="getStyle(token.value)"
      >
        <code class="gl-reset-color">{{ getTokenName(token) }}</code>
        <div class="gl-display-flex gl-align-items-center gl-gap-3">
          <code class="gl-reset-color">{{ token.value }}</code>
          <gl-color-contrast
            v-if="!isAlpha(token.value)"
            :foreground="token.value"
            :background="darkBackground"
          />
          <gl-color-contrast
            v-if="!isAlpha(token.value)"
            :foreground="token.value"
            :background="lightBackground"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
