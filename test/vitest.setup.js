// import 'whatwg-fetch';
import '@testing-library/dom';
import '@testing-library/jest-dom';
import { server } from '../src/mocks/server';
import ReactDOM from 'react-dom';

// @ts-ignore
vi.spyOn(ReactDOM, 'createPortal').mockImplementation(element => element);

vi.mock('next/router', () => require('next-router-mock'));

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
server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});
