/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const common = require('./common.config');
const webpack = require('webpack'); // to access built-in plugins

const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    writeToDisk: true,
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    overlay: {
      errors: true,
      warnings: false,
    },
  },

  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      maxSize: 90000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [new ErrorOverlayPlugin(), new webpack.ProgressPlugin()],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
});
