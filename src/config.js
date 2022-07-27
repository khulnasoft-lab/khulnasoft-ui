import { BVConfigPlugin } from 'bootstrap-vue';
import Vue from 'vue';
import { tooltipDelay } from './utils/constants';

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

let configured = false;

export const config = {
  newSafeHtmlAttrs: false,
};

export const setConfig = (newConfig) => {
  if (configured) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('GitLab UI can only be configured once!');
    }

    return;
  }

  configured = true;

  Vue.use(BVConfigPlugin, {
    BFormText: bFormTextGlobalConfig,
    BTooltip: tooltipGlobalConfig,
  });

  Object.assign(config, newConfig);
  Object.freeze(config);
};

export default setConfig;
