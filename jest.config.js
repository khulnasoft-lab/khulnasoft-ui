const reporters = ['default'];

if (process.env.JEST_IMAGE_SNAPSHOT_TRACK_OBSOLETE) {
  reporters.push('jest-image-snapshot/src/outdated-snapshot-reporter.js');
}

module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^~helpers/(.*)$': '<rootDir>/tests/__helpers__/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^@gitlab/ui$': '<rootDir>/index.js',
    '\\.(css|scss|less)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ['cypress/integration', '.cypress_cache'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': '@vue/vue2-jest',
    '\\.(svg|html|md|png)$': '<rootDir>/tests/transformers/file_transformer.js',
  },
  transformIgnorePatterns: [
    '/node_modules(?![\\\\/]bootstrap-vue[\\\\/]|(/@storybook/.*\\.vue$)|(/@gitlab/svgs/))/',
  ],
  snapshotSerializers: ['<rootDir>/tests/vue_serializer.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest_setup.js'],
  reporters,
  testEnvironment: 'jsdom',
  testRunner: 'jest-circus/runner',
  snapshotFormat: {
    printBasicPrototype: true,
  },
};
