const { USE_VUE_3 } = require('../../../use_vue3')

const moduleNameMapper = USE_VUE_3
  ? {
      '^vue$': '@vue/compat',
      '^@vue/test-utils$': '@vue/test-utils-vue3'
    }
  : {}

module.exports = {
  testRegex: 'spec.js$',
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules(?![\\\\/]vue-test-utils-compat[\\\\/])'],
  coverageDirectory: USE_VUE_3 ? './coverage-vue3' : './coverage/',
  testEnvironmentOptions: {
    pretendToBeVisual: true
  },
  setupFilesAfterEnv: ['./tests/setup.js']
}
