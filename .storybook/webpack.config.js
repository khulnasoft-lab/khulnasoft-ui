require('./patched_crypto');

const path = require('path');
const webpack = require('webpack');
const sass = require('sass');
const { USE_VUE_3 } = require('../use_vue3');

const VUE_LOADER_OPTIONS = USE_VUE_3
  ? {
      loader: 'vue-loader-vue3',
      options: {
        compilerOptions: {
          whitespace: 'preserve',
          compatConfig: {
            MODE: 2,
          },
        },
      },
    }
  : {
      loader: 'vue-loader',
    };

const sassLoaderOptions = {
  implementation: sass,
  sassOptions: {
    includePaths: [require('path').resolve(__dirname, '..', 'node_modules')],
  },
};

module.exports = ({ config }) => {
  config.module.rules = [
    {
      test: /\.vue$/,
      ...VUE_LOADER_OPTIONS,
    },
    {
      test: /src\/components\/.*\.vue$/,
      loader: 'vue-docgen-loader',
      enforce: 'post',
    },
    {
      test: /\.(md|html)$/,
      type: 'asset/source',
    },
    {
      /*
       * This rule is used to load the typescale demo CSS
       * in a isolated shadow root
       */
      test: /typescale\/\w+_demo\.scss$/,
      type: 'asset/source',
      use: [
        {
          loader: 'sass-loader',
          options: sassLoaderOptions,
        },
      ],
    },
    {
      test: /\.s?css$/,
      exclude: /typescale\/\w+_demo\.scss$/, // skip typescale demo stylesheets
      use: [
        {
          loader: 'style-loader',
          options: {
            insert: function (styles) {
              document.head.appendChild(styles);
            },
          },
        },
        'css-loader',
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
          options: sassLoaderOptions,
        },
      ],
    },
    {
      test: /@gitlab\/svgs\/dist\/(icons|illustrations\/.+)\.svg$/,
      type: 'asset/resource',
    },
    {
      test: /\/static\/(img|fonts)\//,
      type: 'asset/resource',
    },
    {
      test: /\.js$/,
      exclude: /node_modules\/(?!(bootstrap-vue)\/).*/,
      use: {
        loader: 'babel-loader',
        options: {
          envName: 'storybook',
        },
      },
    },
  ];

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      IS_VISUAL_TEST: false,
    })
  );

  config.resolve.extensions = ['.css', ...config.resolve.extensions];

  config.resolve.alias['@gitlab/ui'] = path.join(__dirname, 'src', 'index.js');

  // disable HMR in test environment because this breaks playwright's networkidle setting
  // which is needed for visual regression tests to function
  if (process.env.NODE_ENV === 'test') {
    config.entry = config.entry.filter(
      (singleEntry) => !singleEntry.includes('/webpack-hot-middleware/')
    );
  }

  // Filter out the progress plugin on CI, as it is very verbose
  if (process.env.CI) {
    console.log(
      'Webpack compilation will start soon - ProgressPlugin disabled on CI due to too much output'
    );
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'ProgressPlugin'
    );
  }

  return config;
};
