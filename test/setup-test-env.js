/* eslint-disable jest/no-hooks */
/* eslint-disable jest/require-top-level-describe */
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { server } from '../src/mocks/server';
import webcrypto from '@trust/webcrypto';

window.crypto = webcrypto;

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
