/* eslint-disable @typescript-eslint/no-var-requires */
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { NormalModuleReplacementPlugin, DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { setupMSW } = require('./service-worker-setup');
const path = require('path');
const domain = 'https://www.giessdenkiez.de';

setupMSW();

module.exports = {
  mode: 'development',

  entry: {
    main: './src/index.tsx',
  },

  output: {
    library: 'App',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        // Transpile ES6 to ES5 with babel
        // Remove if your app does not use JSX or you don't need to support old browsers
        test: /\.(t|j)sx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['source-map-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BUILD_TARGET': JSON.stringify(process.env.BUILD_TARGET),
    }),
    new Dotenv(),
    new NormalModuleReplacementPlugin(
      /(\.*)\/auth\/(\.*)/,
      function (resource) {
        if (process.env.BUILD_TARGET === 'DEMO') {
          resource.request = resource.request.replace(/auth/, `/auth-mock/`);
        }
      }
    ),
    new CleanWebpackPlugin(),
    new CopyPlugin({ patterns: [{ context: 'public/', from: '**/*' }] }),
    new HtmlWebpackPlugin({
      templateParameters: {
        domain,
      },
      template: path.resolve(__dirname, '../src/index.ejs'),
    }),
  ],
};
