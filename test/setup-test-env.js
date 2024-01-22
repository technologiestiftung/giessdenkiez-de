// import 'whatwg-fetch';
import '@testing-library/dom';
import '@testing-library/jest-dom/vitest';
import { server } from '../src/mocks/server';
import ReactDOM from 'react-dom';

// @ts-ignore
vi.spyOn(ReactDOM, 'createPortal').mockImplementation(element => element);

vi.mock('next/router', () => {
  return {
    useRouter: vi.fn().mockReturnValue({
      basePath: '/',
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
      push: vi.fn(() => Promise.resolve(true)),
      replace: vi.fn(() => Promise.resolve(true)),
      reload: vi.fn(() => Promise.resolve(true)),
      prefetch: vi.fn(() => Promise.resolve()),
      back: vi.fn(() => Promise.resolve(true)),
      beforePopState: vi.fn(() => Promise.resolve(true)),
      isFallback: false,
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
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
