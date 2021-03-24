const isTest = String(process.env.NODE_ENV) === 'test';
module.exports = {
  presets: [
    ['@babel/preset-env', { modules: isTest ? 'commonjs' : false }],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime', 'react-hot-loader/babel'],
    },
  },
};
