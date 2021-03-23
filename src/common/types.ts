import { User } from '@auth0/auth0-spa-js';

export type ContextProps = {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
  popupOpen: any;
  loginWithPopup: any;
  handleRedirectCallback: any;
  getIdTokenClaims: any;
  loginWithRedirect: any;
  getTokenSilently: any;
  getTokenWithPopup: any;
  logout: any;
};

export type RadolanDays = number[];
