<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BTooltip } from 'bootstrap-vue';
import { tooltipDelay } from '../../../utils/constants';
import tooltipMixin from '../../mixins/tooltip_mixin';

const tooltipRefName = 'bvTooltip';

export default {
  name: 'GlTooltip',
  tooltipDelay,
  components: {
    BTooltip,
  },
  mixins: [tooltipMixin(tooltipRefName)],
  inheritAttrs: false,
  tooltipRefName,
};
</script>

<template>
  <b-tooltip
    :ref="$options.tooltipRefName"
    v-bind="$attrs"
    :delay="$options.tooltipDelay"
    v-on="$listeners"
  >
    <!-- @slot Tooltip content -->
    <slot></slot>
  </b-tooltip>
</template>
