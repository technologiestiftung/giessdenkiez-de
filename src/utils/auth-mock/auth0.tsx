/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect, useContext } from 'react';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { ContextProps } from '../../common/types';
import { Auth0ClientOptions, IdToken } from '@auth0/auth0-spa-js';

interface FakeToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}
const fakeToken: FakeToken = {
  access_token: 'yxz',
  expires_in: 86400,
  token_type: 'Bearer',
};
export interface FakeUser {
  nickname: string;
  email: string;
  username: string;
  email_verified: boolean;
  sub: string;
}
export const defaultFakeUser: FakeUser = {
  nickname: 'giessdenkiez.de demo',
  email: 'hallo@giessdenkiez.de',
  username: 'giessdenkiez.de demo',
  email_verified: true,
  sub: 'auth0|123',
};
export const Auth0Context = React.createContext<Partial<ContextProps>>({});
export const useAuth0 = () => useContext(Auth0Context);

const DEFAULT_REDIRECT_CALLBACK: (appState: any) => void = _appState => {
  return;
};

const getUser: () => Promise<FakeUser> = () => {
  return Promise.resolve(defaultFakeUser);
};
const handleRedirectCallback: (url?: string) => Promise<any> = (
  _url?: string
) => {
  return Promise.resolve({});
};
const isAuthenticated: () => Promise<boolean> = () => {
  return Promise.resolve(true);
};
const loginWithPopup: () => Promise<void> = () => Promise.resolve();
const getIdTokenClaims: () => Promise<IdToken> = () =>
  Promise.resolve(('token' as unknown) as IdToken);
const getTokenWithPopup: () => Promise<string> = () => Promise.resolve('token');
const getTokenSilently: () => Promise<FakeToken> = () =>
  Promise.resolve(fakeToken);
const loginWithRedirect: () => Promise<void> = () => Promise.resolve();
const logout: () => Promise<void> = () => Promise.resolve();

async function createFakeAuth0Client(
  _options: Partial<Auth0ClientOptions>
): Promise<Partial<Auth0Client>> {
  return {
    handleRedirectCallback,
    getUser,
    isAuthenticated,
    loginWithPopup,
    getIdTokenClaims,
    getTokenWithPopup,
    getTokenSilently,
    loginWithRedirect,
    logout,
  };
}
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  document.cookie = 'auth0.is.authenticated=true;path=/';
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState(defaultFakeUser);
  const [auth0Client, setAuth0] = useState<Partial<Auth0Client> | undefined>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    const initAuth0: () => Promise<void> = async () => {
      const auth0FromHook = await createFakeAuth0Client(
        initOptions as Auth0ClientOptions
      );
      setAuth0(auth0FromHook);

      if (
        window.location.search.includes('code=') &&
        auth0FromHook !== undefined &&
        auth0FromHook.handleRedirectCallback !== undefined
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      if (auth0FromHook && auth0FromHook.isAuthenticated !== undefined) {
        const isAuthenticated = await auth0FromHook.isAuthenticated();
        setIsAuthenticated(isAuthenticated);
      }

      if (isAuthenticated && auth0FromHook && auth0FromHook.getUser) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0().catch(console.error);
    // eslint-disable-next-line
  }, []);
  const loginWithPopup: (params: any) => Promise<void> = async (
    params = {}
  ) => {
    setPopupOpen(true);
    try {
      if (auth0Client && auth0Client.loginWithPopup) {
        await auth0Client.loginWithPopup(params);
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setPopupOpen(false);
    }
    if (auth0Client && auth0Client.getUser) {
      const user = await auth0Client.getUser();
      setUser(user);
      setIsAuthenticated(true);
    }
  };
  const handleRedirectCallback: () => Promise<void> = async () => {
    setLoading(true);
    if (auth0Client && auth0Client.handleRedirectCallback) {
      await auth0Client.handleRedirectCallback();
    }
    if (auth0Client && auth0Client.getUser) {
      const user = await auth0Client.getUser();
      setLoading(false);
      setIsAuthenticated(true);
      setUser(user);
    }
  };
  return (
    <Auth0Context.Provider
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
    </Auth0Context.Provider>
  );
};
