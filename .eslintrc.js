module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
    allowImportExportEverywhere: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'react-app'],
  rules: {
    'react/prop-types': 'off',
  },
};
