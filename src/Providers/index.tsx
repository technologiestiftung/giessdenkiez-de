import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'unistore/react';

import { Auth0Provider } from '@auth0/auth0-react';
import GlobalStyles from '../assets/Global';
import { theme } from '../assets/theme';
import ErrorBoundary from '../ErrorBoundary';
import store from '../state/Store';

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
