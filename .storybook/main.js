const { IS_VISUAL_TEST, STORIES } = process.env;

module.exports = {
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
  core: {
    builder: 'webpack5',
    disableTelemetry: Boolean(process.env.CI),
  },
};
