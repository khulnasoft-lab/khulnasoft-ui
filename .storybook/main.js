const { USE_VUE_3, STORYBOOK_VUE_FRAMEWORK } = require('../use_vue3');

const { IS_VISUAL_TEST, STORIES } = process.env;

if (USE_VUE_3) {
  console.log('[!!!] Using Vue.js 3');
  const moduleAlias = require('module-alias');
  moduleAlias.addAlias('vue/dist/vue.esm-bundler.js', '@vue/compat/dist/vue.esm-bundler.js');
  moduleAlias.addAlias('vue/compiler-sfc', '@vue/compiler-sfc');
}

export default {
  framework: {
    name: STORYBOOK_VUE_FRAMEWORK,
    options: {
      builder: {
        disableTelemetry: Boolean(process.env.CI),
      },
    },
  },
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
  staticDirs: ['../static'],
  docs: {
    autodocs: true,
  },
};
