<script>
import { translate } from '../../../utils/i18n';
import { progressBarVariantOptions } from '../../../utils/constants';
import { toFloat } from '../../../utils/number_utils';

const backgroundClasses = {
  [progressBarVariantOptions.primary]: 'gl-progress-bar-primary',
  [progressBarVariantOptions.success]: 'gl-progress-bar-success',
  [progressBarVariantOptions.danger]: 'gl-progress-bar-danger',
  [progressBarVariantOptions.warning]: 'gl-progress-bar-warning',
};

export default {
  name: 'GlProgressBar',
  props: {
    ariaLabel: {
      type: String,
      required: false,
      default: translate('GlProgressBar.ariaLabel', 'Progress bar'),
    },
    value: {
      type: [Number, String],
      required: false,
      default: 0,
    },
    variant: {
      type: String,
      required: false,
      default: 'primary',
      validator: (value) => Object.keys(progressBarVariantOptions).includes(value),
    },
    max: {
      type: [Number, String],
      required: false,
      default: 100,
    },
    height: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    progressHeight() {
      return { height: this.height };
    },
    computedValue() {
      return toFloat(this.value, 0);
    },
    computedMax() {
      const max = toFloat(this.max, 100);
      return max > 0 ? max : 100;
    },
    progressBarStyles() {
      return {
        transform: `scaleX(${this.computedValue / this.computedMax})`,
      };
    },
    classes() {
      return ['gl-progress', backgroundClasses[this.variant]];
    },
  },
};
</script>

<template>
  <div class="gl-progress-bar progress" :style="progressHeight">
    <div
      :class="classes"
      :style="progressBarStyles"
      role="progressbar"
      :aria-label="ariaLabel"
      aria-valuemin="0"
      :aria-valuemax="String(computedMax)"
      :aria-valuenow="computedValue"
    ></div>
  </div>
</template>
