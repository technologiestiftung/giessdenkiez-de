import React, { FC } from 'react';
import { Provider } from 'unistore/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import store from './state/Store';
import { Auth0Provider } from './utils/auth/auth0';
import ErrorBoundary from './ErrorBoundary';
import history from './history';
import { ThemeProvider } from 'styled-components';
import { theme } from './assets/theme';
import { Router } from 'react-router-dom';

const onRedirectCallback = (appState?: { targetUrl?: string }): void => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const queryClient = new QueryClient();

export const Providers: FC = ({ children }) => (
  <ErrorBoundary>
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN || ''}
      client_id={process.env.AUTH0_CLIENT_ID || ''}
      audience={process.env.AUTH0_AUDIENCE || ''}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <Router history={history}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </Router>
        </Provider>
      </QueryClientProvider>
    </Auth0Provider>
  </ErrorBoundary>
);
