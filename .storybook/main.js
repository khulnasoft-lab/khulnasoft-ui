const { USE_VUE_3, STORYBOOK_VUE_FRAMEWORK } = require('../use_vue3');

const { STORIES } = process.env;

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
        useSWC: true,
      },
    },
  },
  stories: STORIES ? STORIES.split(',') : ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
    'storybook-dark-mode',
  ],
  staticDirs: ['../static'],
  docs: {
    autodocs: true,
  },
};
