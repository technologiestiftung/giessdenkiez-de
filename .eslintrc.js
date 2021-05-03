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
    'require-top-level-describe': 'off',
    'jest/no-hooks': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/prop-types': 'off',
    'no-var': 'error',
    'prettier/prettier': 'error',
    'jest/consistent-test-it': [
      'error',
      { fn: 'test', withinDescribe: 'test' },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
  plugins: ['promise', 'react', 'jest', 'prettier', 'react-hooks'],
});
