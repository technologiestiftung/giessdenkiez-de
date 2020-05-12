const merge = require('webpack-merge');
const common = require('./common.config');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
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
      // chunks: 'all',
      // maxSize: 50000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [new ErrorOverlayPlugin()],
});
