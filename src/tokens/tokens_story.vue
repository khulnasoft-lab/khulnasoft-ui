<script>
import { colorFromBackground } from '../utils/utils';
import { GlTooltipDirective } from '../directives/tooltip';
import GlBadge from '../components/base/badge/badge.vue';
import GlColorContrast from '../internal/color_contrast/color_contrast.vue';

export default {
  name: 'TokensStory',
  components: {
    GlBadge,
    GlColorContrast,
  },
  directives: {
    GlTooltip: GlTooltipDirective,
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
    isHex(value) {
      return value.startsWith('#');
    },
    getTokenName(token) {
      return token.path.filter(Boolean).join('.');
    },
    getClasses(value) {
      if (!this.isHex(value)) return '';
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
    <ul class="gl-m-0 gl-list-none gl-p-0">
      <li
        v-for="token in tokens"
        :key="token.name"
        class="gl-flex gl-flex-wrap gl-items-center gl-justify-between gl-gap-3 gl-p-3"
        :class="getClasses(token.$value)"
        :style="getStyle(token.$value)"
      >
        <code v-gl-tooltip :title="token.comment" class="gl-text-inherit">
          {{ getTokenName(token) }}
        </code>
        <div class="gl-flex gl-items-center gl-gap-3">
          <gl-badge v-if="token.deprecated" v-gl-tooltip :title="token.comment" variant="danger">
            Deprecated
          </gl-badge>
          <code class="gl-text-inherit">{{ token.$value }}</code>
          <gl-color-contrast
            v-if="isHex(token.$value)"
            :foreground="token.$value"
            :background="darkBackground"
          />
          <gl-color-contrast
            v-if="isHex(token.$value)"
            :foreground="token.$value"
            :background="lightBackground"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
