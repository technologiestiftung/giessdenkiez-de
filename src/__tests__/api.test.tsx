/* eslint-disable jest/require-top-level-describe */
/* eslint-disable jest/no-hooks */

import { server } from '../mocks/server';
// import nodeFetch, { Response } from 'node-fetch';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// global.fetch = nodeFetch;
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.

afterAll(() => server.close());
describe('api interaction tests', () => {
  test('should call the mocked api', async () => {
    const res = await fetch('/');
    // eslint-disable-next-line jest/no-if
    if (!res.ok) {
      throw new Error('Could not fetch');
    }
    const json = await res.json();
    expect(json).toMatchInlineSnapshot(`
      Object {
        "foo": "bar",
      }
    `);
  });
});
