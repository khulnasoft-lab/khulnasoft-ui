<script>
import { HEX_REGEX } from '../../utils/constants';
import { getColorContrast } from '../../utils/utils';

export default {
  name: 'GlColorContrast',
  props: {
    foreground: {
      type: String,
      required: true,
      validator: (value) => HEX_REGEX.test(value),
    },
    background: {
      type: String,
      required: true,
      validator: (value) => HEX_REGEX.test(value),
    },
  },
  computed: {
    isValidColorCombination() {
      return HEX_REGEX.test(this.foreground) && HEX_REGEX.test(this.background);
    },
    classes() {
      if (!this.isValidColorCombination) return 'gl-text-neutral-950';
      const { grade } = this.contrast.level;
      const isFail = grade === 'F';
      const contrastScore = getColorContrast('#fff', this.background).score > 4.5;
      const textClass = contrastScore ? 'gl-text-neutral-0' : 'gl-text-neutral-950';
      const failClasses = contrastScore
        ? 'gl-shadow-inner-1-red-300 gl-text-red-300'
        : 'gl-shadow-inner-1-red-500 gl-text-red-500';
      return [isFail ? failClasses : textClass];
    },
    contrast() {
      return getColorContrast(this.foreground, this.background);
    },
  },
};
</script>

<template>
  <code
    class="gl-w-10 gl-rounded-base gl-p-2 gl-text-center gl-text-xs"
    :class="classes"
    :style="{ backgroundColor: background }"
  >
    <template v-if="isValidColorCombination">
      {{ contrast.level.grade }} {{ contrast.score }}
    </template>
    <template v-else>???</template>
  </code>
</template>
