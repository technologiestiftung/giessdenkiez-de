import React from 'react';
import type { AppProps } from 'next/app';
import { Page } from '../src/nextPage';
import { Providers } from '../src/Providers';
import '../src/assets/styles.css';
import MatomoTracking from '../src/components/MatomoTracking';

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
  const getLayout = Component.getLayout ?? (page => page);
  const Layout = Component.layout ?? (({ children }) => <>{children}</>);
  return (
    <Providers>
      <MatomoTracking />
      <Layout {...pageProps}>{getLayout(<Component {...pageProps} />)}</Layout>
    </Providers>
  );
}
