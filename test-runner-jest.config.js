/* eslint-disable unicorn/filename-case, no-console */
const { getJestConfig } = require('@storybook/test-runner');

const config = {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),
  /** Add your own overrides below
   * @see https://jestjs.io/docs/configuration
   */
};

if (process.env.UPDATE_SNAPSHOT) {
  console.log('Tracking obsolete screenshots');
  config.reporters.push('jest-image-snapshot/src/outdated-snapshot-reporter.js');
}

module.exports = config;
