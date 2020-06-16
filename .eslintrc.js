const config = require('@inpyjamas/scripts/dist/config/eslint/typescript');
const { merge } = require('@inpyjamas/scripts/dist/utlities/merge');

module.exports = merge(config, {
  env: {
    'jest/globals': true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
    allowImportExportEverywhere: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'react-app',
    'plugin:promise/recommended',
    'plugin:jest/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'no-var': 'error',
  },
  plugins: ['promise', 'jest'],
});
