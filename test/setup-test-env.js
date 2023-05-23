import 'whatwg-fetch';
import '@testing-library/jest-dom/extend-expect';
import { server } from '../src/mocks/server';
import ReactDOM from 'react-dom';

// @ts-ignore
jest.spyOn(ReactDOM, 'createPortal').mockImplementation(element => element);

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      basePath: '/',
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
      push: jest.fn(() => Promise.resolve(true)),
      replace: jest.fn(() => Promise.resolve(true)),
      reload: jest.fn(() => Promise.resolve(true)),
      prefetch: jest.fn(() => Promise.resolve()),
      back: jest.fn(() => Promise.resolve(true)),
      beforePopState: jest.fn(() => Promise.resolve(true)),
      isFallback: false,
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }),
  };
});

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
