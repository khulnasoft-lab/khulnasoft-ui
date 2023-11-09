import { BVConfigPlugin } from 'bootstrap-vue';
import Vue from 'vue';
import translationKeys from '../translations.json';
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

let configured = false;

/**
 * Set GitLab UI configuration.
 *
 * @typedef {object} GitLabUIConfiguration
 * @template TValue=string
 * @property {undefined | Object} translations Generic translations for component labels to fall back to.
 * @property {boolean} disableTranslations Whether translation capabilities should be disabled. Suppresses the warning about missing translations.
 */
const setConfigs = ({ translations } = {}) => {
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
};

export default setConfigs;
