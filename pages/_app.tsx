import React from 'react';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { Page } from '../src/nextPage';
import { Providers } from '../src/Providers';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
type PagePropsType = {
  treeId?: string | null;
};

interface AppPropsType extends AppProps {
  Component: Page;
  pageProps: PagePropsType;
}

export default function MyApp({
  Component,
  pageProps,
}: AppPropsType): JSX.Element {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const getLayout = Component.getLayout ?? (page => page);
  const Layout = Component.layout ?? (({ children }) => <>{children}</>);
  return (
    <Providers>
      <Layout {...pageProps}>{getLayout(<Component {...pageProps} />)}</Layout>
    </Providers>
  );
}
