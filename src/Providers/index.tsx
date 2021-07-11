import React, { FC } from 'react';
import { Provider } from 'unistore/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import store from '../state/Store';
import { Auth0Provider } from '@auth0/auth0-react';
import ErrorBoundary from '../ErrorBoundary';
import history from '../history';
import { theme } from '../assets/theme';
import GlobalStyles from '../assets/Global';

const queryClient = new QueryClient();

export const Providers: FC = ({ children }) => (
  <ErrorBoundary>
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN || ''}
      clientId={process.env.AUTH0_CLIENT_ID || ''}
      audience={process.env.AUTH0_AUDIENCE || ''}
      redirectUri={`${window.location.origin}/profile`}
      useRefreshTokens
      cacheLocation='localstorage'
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <Router history={history}>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              {children}
            </ThemeProvider>
          </Router>
        </Provider>
      </QueryClientProvider>
    </Auth0Provider>
  </ErrorBoundary>
);
