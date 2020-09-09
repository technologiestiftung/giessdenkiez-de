/* eslint-disable jest/no-hooks */
/* eslint-disable jest/require-top-level-describe */
import { render, fireEvent, waitFor } from '@testing-library/react';
import ButtonWater from './index';
import React from 'react';
import store from '../../state/Store';
import { Provider } from 'unistore/react';
import { useAuth0 } from '../../utils/auth/auth0';
import * as utils from '../../utils';
jest.mock('../../utils');
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

describe('button water test', () => {
  test('button click should switch to "adoptiere" and then vanish', async () => {
    store.setState({ selectedTree: { id: '_123' } });
    jest
      .spyOn(utils, 'requests')
      .mockResolvedValueOnce({ data: 'adopted' })
      .mockResolvedValueOnce({
        data: [{ id: '_123', radolan_days: [0, 1, 2, 0], radolan_sum: 0 }],
      });
    const { getByText } = render(
      <Provider store={store}>
        <ButtonWater />
      </Provider>
    );
    const button1 = getByText(/adoptieren/i);
    await waitFor(() => expect(button1).toBeInTheDocument());
    fireEvent.click(button1);
    const button2 = getByText(/adoptiere/i);
    await waitFor(() => expect(button2).toBeInTheDocument());
    store.setState({ treeAdopted: true });
    await waitFor(() => expect(button1).not.toBeInTheDocument());
    await waitFor(() => expect(button2).not.toBeInTheDocument());
  });
});
