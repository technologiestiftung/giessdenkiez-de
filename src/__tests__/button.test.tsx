import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonRound from '../components/ButtonRound';
import ButtonBorder from '../components/ButtonBorder';
import ButtonAdopted from '../components/ButtonAdopted';
import { Provider } from 'unistore/react';
import Store from '../state/Store';
import { useAuth0 } from '../utils/auth0';

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
jest.mock('../utils/auth0');

beforeEach(() => {
  // Mock the Auth0 hook and make it return a logged in state
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    dummyUser,
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
    const { getByRole } = render(<ButtonBorder>Border</ButtonBorder>);

    const button = getByRole(/button/i);
    // fireEvent.click(button);
    expect(button).toHaveAttribute('role', 'button');
    expect(button).toHaveAttribute('tabindex', '0');
    // expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Adopted button should have a basic functionality', () => {
    // const onClick = jest.fn();
    const { getByRole, getByText } = render(
      <Provider store={Store}>
        <ButtonAdopted />
      </Provider>
    );

    const button = getByRole(/button/i);
    const label = getByText(/abonniert/i);
    expect(button).toHaveAttribute('role', 'button');
    expect(label).toBeTruthy();
    expect(label).toHaveTextContent(/abonniert/i);
    expect(button).toHaveAttribute('tabindex', '0');
    // fireEvent.click(button);
    // expect(label).toHaveTextContent(/entferne/i);
    // expect(onClick).toHaveBeenCalledTimes(1);
  });
});
