/* eslint-disable jest/no-hooks */
/* eslint-disable jest/require-top-level-describe */
import { render, fireEvent, waitFor } from '@testing-library/react';
import Card from './index';
import React from 'react';
import store from '../../state/Store';
import { Provider } from 'unistore/react';
import { useAuth0 } from '../../utils/auth/auth0';
// import { requests as mockRequests } from '../../utils';

// jest.mock('../../utils');
/**
 * Auth0 mock taken from here
 * https://itnext.io/how-to-mock-auth0-spa-hooks-to-test-your-react-components-e45b6a38fddb
 *
 * Unistore setup taken from here
 * https://github.com/preactjs/preact-cli/issues/524#issuecomment-372697712
 *
 *
 */
const dummyUser = {
  email: 'foo@bah.com',
  // eslint-disable-next-line @typescript-eslint/camelcase
  email_verified: true,
  sub: 'auth0|12345678912345678901234',
  name: 'foo',
  nickname: 'foobah',
  metadata: { name: 'foo' },
};
// intercept the useAuth0 function and mock it
jest.mock('../../utils/auth/auth0');

beforeEach(() => {
  // Mock the Auth0 hook and make it return a logged in state
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user: dummyUser,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
    getTokenSilently: jest.fn().mockImplementation(() => 'xxx'),
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('card test', () => {
  test('should render', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    //@ts-ignore
    // mockRequests.mockResolvedValueOnce({ data: 'adopted' });
    store.setState({ selectedTree: { id: '_123' } });
    const { getByText } = render(
      <Provider store={store}>
        <Card data={{ standalter: '50', gattungdeutsch: 'EICHE' }} />
      </Provider>
    );
    // debug();
    const button1 = getByText(/adoptieren/i);
    expect(button1).toBeInTheDocument();
    fireEvent.click(button1);
    // await waitFor(() => expect(mockRequests).toHaveBeenCalledTimes(1));

    const button2 = getByText(/adoptiere/i);
    expect(button2).toBeInTheDocument();
    store.setState({ treeAdopted: true });
    // screen.debug();
    expect(button1).not.toBeInTheDocument();
    expect(button2).not.toBeInTheDocument();
  });
});
