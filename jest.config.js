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
    '.*\\.(vue)$': 'vue-jest',
    '\\.(svg|html|md|png)$': 'jest-raw-loader',
  },
  transformIgnorePatterns: [
    '/node_modules(?![\\\\/]bootstrap-vue[\\\\/]|(/@storybook/.*\\.vue$)|(/@gitlab/svgs/))/',
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest_setup.js'],
  reporters,
};
