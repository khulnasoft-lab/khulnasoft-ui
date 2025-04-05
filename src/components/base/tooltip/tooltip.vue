<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BTooltip } from '../../../vendor/bootstrap-vue/src/components/tooltip/tooltip';
import { tooltipDelay } from '../../../utils/constants';
import tooltipMixin from '../../mixins/tooltip_mixin';
import { getGlTooltipDefaultContainer } from '../../../directives/tooltip/container';

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
  getGlTooltipDefaultContainer,
};
</script>

<template>
  <b-tooltip
    :ref="$options.tooltipRefName"
    v-bind="$attrs"
    :container="$attrs.container || $options.getGlTooltipDefaultContainer()"
    :delay="$options.tooltipDelay"
    v-on="$listeners"
  >
    <!-- @slot Tooltip content -->
    <slot></slot>
  </b-tooltip>
</template>
