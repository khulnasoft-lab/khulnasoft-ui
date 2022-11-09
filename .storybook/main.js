const { useVue3 } = require('./use_vue3');

const { IS_VISUAL_TEST, STORIES } = process.env;

if (useVue3()) {
  console.log('[!!!] Using Vue.js 3');
  const moduleAlias = require('module-alias');
  moduleAlias.addAlias('vue/dist/vue.esm-bundler.js', '@vue/compat/dist/vue.esm-bundler.js');
  moduleAlias.addAlias('vue/compiler-sfc', '@vue/compiler-sfc');
}

module.exports = {
  framework: useVue3() ? '@storybook/vue3' : '@storybook/vue',
  stories: STORIES ? STORIES.split(',') : ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport/register',
    'storybook-dark-mode',
  ],
  features: {
    storyStoreV7: !IS_VISUAL_TEST,
  },
};
