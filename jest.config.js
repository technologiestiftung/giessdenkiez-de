const config = require('@inpyjamas/scripts/dist/config/jest/typescript');
const { merge } = require('@inpyjamas/scripts/dist/utlities/merge');
module.exports = merge(config, {
  // roots: ['<rootDir>/src'],
  // testMatch: [
  //   '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
  //   '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  // ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  // collectCoverage: true,
  // coverageReporters: ['lcov', 'text'],
  setupFilesAfterEnv: ['<rootDir>test/setup-test-env.js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!src/deprecated/**/*',
  ],
  // TODO: When we have some coverage we can activate this
  // coverageThreshold: {
  //   global: {
  //     branches: 75,
  //     functions: 75,
  //     lines: 75,
  //     statements: 75,
  //   },
  // },
});
