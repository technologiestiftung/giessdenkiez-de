import { GetTokenSilentlyOptions, User } from '@auth0/auth0-spa-js';

export type ContextProps = {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
  popupOpen: any;
  loginWithPopup: any;
  handleRedirectCallback: any;
  getIdTokenClaims: any;
  loginWithRedirect: any;
  getTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string> | void;
  getTokenWithPopup: any;
  logout: any;
};

export type RadolanDays = number[];

export type ButtonWaterGroup = 'visible' | 'watered' | 'watering';
