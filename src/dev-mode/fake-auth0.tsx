/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import { ContextProps as Auth0ContextProps } from '../utils/auth0';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

const fakeToken = {
  access_token: 'yxz',
  expires_in: 86400,
  token_type: 'Bearer',
};
const defaultUser = {
  nickname: 'giessdenkiez.de demo',
  email: 'hallo@giessdenkiez.de',
  username: 'giessdenkiez.de demo',
  email_verified: true,
  sub: 'auth0|123',
};
export const FakeAuth0Context = React.createContext<Partial<Auth0ContextProps>>(
  {}
);

const DEFAULT_REDIRECT_CALLBACK = (appState?: any) => {
  return;
};

async function createFakeAuth0Client(
  _options: Partial<Auth0ClientOptions>
): Promise<Partial<Auth0Client>> {
  try {
    return {
      handleRedirectCallback: (url?: string) => {
        return Promise.resolve({});
      },
      isAuthenticated: () => {
        return Promise.resolve(true);
      },
      getUser: () => {
        return Promise.resolve(defaultUser);
      },
      loginWithPopup: () => Promise.resolve(),
      getIdTokenClaims: () => Promise.resolve(('token' as unknown) as IdToken),
      getTokenWithPopup: () => Promise.resolve('token'),
      getTokenSilently: () => Promise.resolve(fakeToken),
      loginWithRedirect: () => Promise.resolve(),
      logout: () => Promise.resolve(),
    };
  } catch (error) {
    console.error(error);
    return error;
  }
}
export const FakeAuth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState(defaultUser);
  const [auth0Client, setAuth0] = useState<Partial<Auth0Client> | undefined>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createFakeAuth0Client(
        initOptions as Auth0ClientOptions
      );
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback!();
        //@ts-ignore
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated!();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser!();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0().catch(console.error);
    // eslint-disable-next-line
  }, []);
  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client?.loginWithPopup!(params);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client?.getUser!();
    setUser(user);
    setIsAuthenticated(true);
  };
  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client?.handleRedirectCallback!();
    const user = await auth0Client?.getUser!();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <FakeAuth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p: any) => auth0Client?.getIdTokenClaims!(...p),
        loginWithRedirect: (...p: any) => auth0Client?.loginWithRedirect!(...p),
        getTokenSilently: (...p: any) => auth0Client?.getTokenSilently!(...p),
        getTokenWithPopup: (...p: any) => auth0Client?.getTokenWithPopup!(...p),
        logout: (...p: any) => auth0Client?.logout!(...p),
      }}
    >
      {children}
    </FakeAuth0Context.Provider>
  );
};
