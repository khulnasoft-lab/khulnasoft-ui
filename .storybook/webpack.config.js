const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const sass = require('sass');
const { useVue3 } = require('./use_vue3');

const VUE_LOADER_OPTIONS = useVue3()
  ? {
      loader: 'vue-loader-vue3',
      options: {
        compilerOptions: {
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
      test: /\.(md|html)$/,
      loader: 'raw-loader',
    },
    {
      /*
       * This rule is used to load the typescale demo CSS
       * in a isolated shadow root
       */
      test: /typescale\/\w+_demo\.scss$/,
      loaders: [
        'raw-loader',
        {
          loader: 'sass-loader',
          options: sassLoaderOptions,
        },
      ],
    },
    {
      test: /\.s?css$/,
      exclude: /typescale\/\w+_demo\.scss$/, // skip typescale demo stylesheets
      loaders: [
        {
          loader: 'style-loader',
          options: {
            insert: function (styles) {
              document.head.appendChild(styles);
            },
          },
        },
        'css-loader',
        { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
        {
          loader: 'sass-loader',
          options: sassLoaderOptions,
        },
      ],
    },
    {
      test: /\.vue$/,
      ...VUE_LOADER_OPTIONS,
    },
    {
      test: /@gitlab\/svgs\/dist\/(icons|illustrations\/.+)\.svg$/,
      loader: 'file-loader',
    },
    {
      test: /\/static\/img\//,
      loader: 'file-loader',
      options: {
        outputPath: 'static',
      },
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

  if (!useVue3()) {
    config.module.rules.unshift({
      test: /src\/components\/.*\.vue$/,
      loader: 'vue-docgen-loader',
      enforce: 'post',
    });
  }

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      IS_VISUAL_TEST: false,
    })
  );

  config.resolve.extensions = ['.css', ...config.resolve.extensions];

  config.resolve.alias['@gitlab/ui'] = path.join(__dirname, 'src', 'index.js');

  if (useVue3()) {
    config.resolve.alias['vue$'] = require.resolve('@vue/compat/dist/vue.esm-bundler.js');
  }

  // disable HMR in test environment because this breaks puppeteer's networkidle0 setting
  // which is needed for storyshots to function
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

  config.plugins.push(new webpack.IgnorePlugin(/moment/, /pikaday/));

  return config;
};
