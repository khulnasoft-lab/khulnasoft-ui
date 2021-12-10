import { BVConfigPlugin } from 'bootstrap-vue';
import Vue from 'vue';
import { tooltipDelay } from './src/utils/constants';

const bFormTextGlobalConfig = {
  textVariant: 'gl-muted',
};

const tooltipGlobalConfig = {
  customClass: 'gl-tooltip',
  delay: tooltipDelay,
};

/**
 * Guard against nonexistent localStorage,
 * or corrupted localStorage
 *
 * localStorage access is not possible in certain environments like
 * - in iframe usage in Chrome if embedded on another domain
 * - tests / node
 */
try {
  const glTooltipDelay = localStorage.getItem('gl-tooltip-delay');

  if (glTooltipDelay) {
    tooltipGlobalConfig.delay = JSON.parse(glTooltipDelay);
  }
} catch (e) {
  // localStorage doesn't exist (or the value is not properly formatted)
}

const setConfigs = () => {
  Vue.use(BVConfigPlugin, {
    BFormText: bFormTextGlobalConfig,
    BTooltip: tooltipGlobalConfig,
  });
};

export default setConfigs;
