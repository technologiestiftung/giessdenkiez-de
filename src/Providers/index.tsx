import { FC } from 'react';
import { Provider } from 'unistore/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';

import store from '../state/Store';
import { Auth0Provider } from '@auth0/auth0-react';
import ErrorBoundary from '../ErrorBoundary';
import { theme } from '../assets/theme';
import GlobalStyles from '../assets/Global';

const queryClient = new QueryClient();

export const Providers: FC = ({ children }) => (
  <ErrorBoundary>
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || ''}
      redirectUri={`${process.env.NEXT_PUBLIC_BASE_URL}/profile`}
      useRefreshTokens
      cacheLocation='localstorage'
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </Auth0Provider>
  </ErrorBoundary>
);
