import React, { FC, useState, useEffect, useContext } from 'react';
import createAuth0Client, { Auth0ClientOptions } from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { User } from 'auth0';

import { ContextProps } from '../../common/types';
const DEFAULT_REDIRECT_CALLBACK: () => void = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext<Partial<ContextProps>>({});
export const useAuth0 = (): Partial<ContextProps> => useContext(Auth0Context);
export const Auth0Provider: FC<{
  onRedirectCallback: (appState: any) => void;
}> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();
  const [auth0Client, setAuth0Client] = useState<Auth0Client>();
  const [loading, setLoading] = useState<boolean>(true);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(
        initOptions as Auth0ClientOptions
      );
      setAuth0Client(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        onRedirectCallback(appState);
      }

      const isLoggedIn = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isLoggedIn);

      if (isLoggedIn) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client?.loginWithPopup(params);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client?.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client?.handleRedirectCallback();
    const user = await auth0Client?.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
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
        getIdTokenClaims: auth0Client
          ? auth0Client.getIdTokenClaims.bind(auth0Client)
          : () => undefined,
        loginWithRedirect: auth0Client
          ? auth0Client.loginWithRedirect.bind(auth0Client)
          : () => undefined,
        getTokenSilently: auth0Client
          ? auth0Client.getTokenSilently.bind(auth0Client)
          : () => undefined,
        getTokenWithPopup: auth0Client
          ? auth0Client.getTokenWithPopup.bind(auth0Client)
          : () => undefined,
        logout: auth0Client
          ? auth0Client.logout.bind(auth0Client)
          : () => undefined,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
