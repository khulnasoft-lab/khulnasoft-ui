/**
 * All @vue/compat related checks and constants live here, so it's easier to
 * see areas affected by it.
 */

const USE_VUE_3 = process.env.VUE_VERSION === '3';
const STORYBOOK_VUE_FRAMEWORK = USE_VUE_3 ? '@storybook/vue3-webpack5' : '@storybook/vue-webpack5';
const JEST_VUE_TRANSFORMER = USE_VUE_3 ? '@vue/vue3-jest' : '@vue/vue2-jest';

module.exports = { USE_VUE_3, STORYBOOK_VUE_FRAMEWORK, JEST_VUE_TRANSFORMER };
