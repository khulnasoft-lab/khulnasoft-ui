import Vue from 'vue';
import translationKeys from '../translations';
import { BVConfigPlugin } from './vendor/bootstrap-vue/src/bv-config';
import { tooltipDelay } from './utils/constants';

const bFormTextGlobalConfig = {
  textVariant: 'gl-muted',
};

const tooltipGlobalConfig = {
  // Work around for https://github.com/bootstrap-vue/bootstrap-vue/issues/6507
  boundaryPadding: 5,
  customClass: 'gl-tooltip',
  delay: tooltipDelay,
};

const popoverDelayConfig = {
  show: 50, // BootstrapVue's default delay on show.
  hide: 150, // Increased hide delay so that it doesn't disappear to quickly when user attempts to interact with the content.
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

export const i18n = translationKeys;

export const glDropdownConfig = {};

let configured = false;

/**
 * Set GitLab UI configuration.
 *
 * @typedef {object} GitLabUIConfiguration
 * @template TValue=string
 * @property {undefined | Object} translations Generic translations for component labels to fall back to.
 * @property {boolean} [useImprovedHideHeuristics] Temporary flag to enable improved hide heuristics for dropdowns.
 */
const setConfigs = ({ translations, useImprovedHideHeuristics } = {}) => {
  if (configured) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error('GitLab UI can only be configured once!');
    }

    return;
  }
  configured = true;

  Vue.use(BVConfigPlugin, {
    BFormText: bFormTextGlobalConfig,
    BTooltip: tooltipGlobalConfig,
    BPopover: {
      delay: popoverDelayConfig,
    },
  });

  if (typeof translations === 'object') {
    if (process.env.NODE_ENV === 'development') {
      const undefinedTranslationKeys = Object.keys(i18n).reduce((acc, current) => {
        if (!(current in translations)) {
          acc.push(current);
        }
        return acc;
      }, []);
      if (undefinedTranslationKeys.length) {
        /* eslint-disable no-console */
        console.warn(
          '[@gitlab/ui] The following translations have not been given, so will fall back to their default US English strings:'
        );
        console.table(undefinedTranslationKeys);
        /* eslint-enable no-console */
      }
    }

    Object.assign(i18n, translations);
  }

  // Temporary flag to enable the improved hide heuristics feature.
  // This flag allows the feature to be opt-in during the rollout phase,
  // giving us the flexibility to test and validate its impact on user experience.

  // The global variable `useImprovedHideHeuristics` is set to a boolean value
  // to indicate whether the improved hide heuristics should be used.

  // Future Plan:
  // Once the improved hide heuristics feature is validated and stable,
  // we will remove this temporary flag and make the feature the default behavior.
  // At that point, there will be no need for opt-in or opt-out mechanisms for this feature.
  if (typeof useImprovedHideHeuristics === 'boolean') {
    Object.assign(glDropdownConfig, {
      useImprovedHideHeuristics,
    });
  }
};

export default setConfigs;
