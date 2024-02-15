import React, { FC, useEffect, useState } from 'react';
import { Provider } from 'unistore/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';

import store from '../state/Store';
import ErrorBoundary from '../ErrorBoundary';
import { theme } from '../assets/theme';
import GlobalStyles from '../assets/Global';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react';

const queryClient = new QueryClient();

export const TestProviders: FC = ({ children }) => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setSession(data.session);
      }
    };
    getSession().catch(error => console.log(error));
  }, [supabaseClient]);
  return (
    <ErrorBoundary>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={session}
      >
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </Provider>
        </QueryClientProvider>
      </SessionContextProvider>
    </ErrorBoundary>
  );
};
