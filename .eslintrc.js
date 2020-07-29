/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('@inpyjamas/scripts/dist/config/eslint/typescript');
const { merge } = require('@inpyjamas/scripts/dist/utlities/merge');

module.exports = merge(config, {
  env: {
    'jest/globals': true,
    node: true,
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  // parser: 'babel-eslint',
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
    allowImportExportEverywhere: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:jest/recommended',
    'prettier',
  ],
  rules: {
    'react/prop-types': 'off',
    'no-var': 'error',
    'prettier/prettier': 'error',
  },
  plugins: ['promise', 'react', 'jest', 'prettier'],
});
