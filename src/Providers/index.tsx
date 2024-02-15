import React, { FC, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'unistore/react';

import GlobalStyles from '../assets/Global';
import { theme } from '../assets/theme';
import ErrorBoundary from '../ErrorBoundary';
import store from '../state/Store';
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

const queryClient = new QueryClient();

export const Providers: FC = ({ children }) => {
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
  }, [supabaseClient.auth]);
  return (
    <ErrorBoundary>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={session}
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
      </SessionContextProvider>
    </ErrorBoundary>
  );
};
