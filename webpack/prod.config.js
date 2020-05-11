const merge = require('webpack-merge');
const common = require('./common.config');
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime',
    },
  },
});
