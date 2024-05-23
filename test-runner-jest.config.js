/* eslint-disable unicorn/filename-case */

const { getJestConfig } = require('@storybook/test-runner');

const testRunnerConfig = getJestConfig();

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  // The default Jest configuration comes from @storybook/test-runner
  ...testRunnerConfig,
  testSequencer: '<rootDir>/tests/retry_sequencer.js',
};
