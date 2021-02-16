/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('@inpyjamas/scripts/dist/config/jest/typescript');
const { merge } = require('@inpyjamas/scripts/dist/utlities/merge');
module.exports = merge(config, {
  preset: 'ts-jest',
  // roots: ['<rootDir>/src'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{ts,tsx}',
  ],
  // testRegex: '(/__tests__/.*|(\\.|/)(test))\\.tsx?$',
  clearMocks: true,
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  // collectCoverage: true,
  // coverageReporters: ['lcov', 'text'],
  setupFilesAfterEnv: ['<rootDir>test/setup-test-env.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!src/deprecated/**/*',
    '!src/**/*.stories.{ts,tsx}',
  ],
  // TODO: When we have some coverage we can activate this
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },
});
