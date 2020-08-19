/* eslint-disable jest/no-hooks */
/* eslint-disable jest/require-top-level-describe */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonRound from '../components/ButtonRound';
import ButtonBorder from '../components/ButtonBorder';
import ButtonAdopted from '../components/ButtonAdopted';
import { Provider } from 'unistore/react';
import store from '../state/Store';
import { useAuth0 } from '../utils/auth/auth0';

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
jest.mock('../utils/auth/auth0');

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
describe('button tests', () => {
  test('round button should have a basic functionality', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <ButtonRound toggle={onClick}>Round</ButtonRound>
    );
    const button = getByText(/round/i);
    fireEvent.click(button);
    expect(button).toHaveAttribute('role', 'button');
    expect(button).toHaveAttribute('tabindex', '0');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('border button should have a basic functionality (deprecated component)', () => {
    // const onClick = jest.fn();
    const { getByRole } = render(<ButtonBorder></ButtonBorder>);

    const button = getByRole(/button/i);
    // fireEvent.click(button);
    expect(button).toHaveAttribute('role', 'button');
    expect(button).toHaveAttribute('tabindex', '0');
    // expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('adopted button should have a basic functionality', () => {
    // const onClick = jest.fn();
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <ButtonAdopted />
      </Provider>
    );

    const button = getByRole(/button/i);
    const label = getByText(/adoptiert/i);
    expect(button).toHaveAttribute('role', 'button');
    expect(label).toBeDefined();
    expect(label).toHaveTextContent(/adoptiert/i);
    expect(button).toHaveAttribute('tabindex', '0');
    // fireEvent.click(button);
    // expect(label).toHaveTextContent(/entferne/i);
    // expect(onClick).toHaveBeenCalledTimes(1);
  });
});
