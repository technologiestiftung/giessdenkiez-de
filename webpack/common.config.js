const Dotenv = require('dotenv-webpack');
const webpack = require('webpack'); // to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const domain = 'https://www.giessdenkiez.de';

module.exports = {
  mode: 'development',

  entry: {
    main: './src/index.js',
  },

  output: {
    library: 'App',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        // Transpile ES6 to ES5 with babel
        // Remove if your app does not use JSX or you don't need to support old browsers
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.(svg|png|woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(ico)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/',
            },
          },
        ],
      },
      {
        test: /\.(svg|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader?name=/assets/[name].[ext]',
          },
        ],
      },
      {
        test: /\.(csv|geojson)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'data/',
            },
          },
        ],
      },
      // {
      //   test: /\.(html)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: '/',
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new Dotenv(),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'data/pumps.geojson', to: 'data/pumps.geojson' },
      {
        from: 'src/assets/images/social_media.jpg',
        to: 'assets/images/social_media.jpg',
      },
    ]),
    new HtmlWebpackPlugin({
      templateParameters: {
        domain,
      },
      template: path.resolve(__dirname, '../src/index.ejs'),
    }),
  ],
};
