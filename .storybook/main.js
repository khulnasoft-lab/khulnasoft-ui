module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport/register',
    'storybook-dark-mode',
    'storybook-readme',
  ],
};
