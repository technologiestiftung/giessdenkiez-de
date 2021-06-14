import React from 'react';
import '../src/mocks/mocks-utils';

import { ThemeProvider } from 'styled-components';
import { theme } from '../src/assets/theme';
import { Provider } from 'unistore/react';
import { Auth0Provider } from '@auth0/auth0-react';
import store from '../src/state/Store';
// import '!style-loader!css-loader!sass-loader!../src/assets/style.scss';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

const withStoreProvider = (Story, context) => {
  return (
    <Provider store={store}>
      <Story {...context} />
    </Provider>
  );
};

const withAuth0Provider = (Story, context) => {
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENT_ID}
      audience={process.env.AUTH0_AUDIENCE}
      redirectUri={window.location.origin}
    >
      <Story {...context} />
    </Auth0Provider>
  );
};

export const decorators = [
  withThemeProvider,
  withAuth0Provider,
  withStoreProvider,
];
