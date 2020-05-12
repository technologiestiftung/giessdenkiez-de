const merge = require('webpack-merge');
const common = require('./common.config');
module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
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
});
