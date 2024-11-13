const path = require('node:path');

module.exports = {
  root: true,
  extends: ['plugin:@gitlab/default', 'plugin:storybook/csf'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/no-relative-packages': 'off',
    '@gitlab/tailwind-no-interpolation': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['**/index'],
            message:
              'Import components and directives directly rather than via the top-level barrel file.',
          },
        ],
        paths: [
          {
            name: 'lodash',
            message: 'Import <function> from lodash/<function> instead for better tree-shaking.',
          },
          {
            name: 'lodash/isArray',
            message: 'Prefer native Array.isArray method.',
          },
          {
            name: 'lodash/isFinite',
            message: 'Prefer native Number.isFinite method.',
          },
        ],
      },
    ],
    'vue/no-v-html': 'error',
    'max-params': ['error', { max: 3 }],
  },
  overrides: [
    {
      files: ['**/*.spec.js', 'tests/jest_setup.js', 'tests/__helpers__/*.js'],
      extends: ['plugin:@gitlab/jest'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, 'jest.config.js'),
          },
        },
      },
      rules: {
        'promise/always-return': 'off',
        'jest/expect-expect': [
          'warn',
          {
            assertFunctionNames: ['expect*'],
          },
        ],
        'no-restricted-syntax': [
          'error',
          {
            selector:
              "CallExpression[callee.name='afterEach'] CallExpression MemberExpression[object.name='wrapper'][property.name='destroy']",
            message:
              'No need to call wrapper.destroy() in afterEach due to enableAutoDestroy being enabled suite-wide.',
          },
        ],
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@vue/test-utils',
                importNames: ['createLocalVue'],
                message:
                  'createLocalVue should be avoided. Perform operations on global Vue instance instead',
              },
            ],
            patterns: [
              {
                group: ['**/index'],
                message:
                  'Import components and directives directly rather than via the top-level barrel file.',
              },
            ],
          },
        ],
        '@gitlab/tailwind-no-interpolation': 'off',
      },
    },
    {
      files: ['**/*.stories.js'],
      rules: {
        'no-restricted-globals': [
          'error',
          {
            name: 'setTimeout',
            message: 'use setStoryTimeout from the utils/test_utils instead.',
          },
        ],
      },
    },
    {
      files: ['config.js', 'rollup.config.js', '**/index.js', '**/*.stories.js'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/*.vue'],
      rules: {
        'vue/require-name-property': 'error',
      },
    },
  ],
};
