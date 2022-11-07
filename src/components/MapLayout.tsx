import React, { FC, ReactNode } from 'react';
import Head from 'next/head';
import App from './App';
import SidebarWrapper from './Sidebar/SidbarWrapper';
import { useRouter } from 'next/router';

export const MapLayout: FC<{ treeId?: string | null }> = ({
  treeId,
  children,
}) => {
  const { pathname } = useRouter();
  return (
    <>
      <Head>
        <title>Gieß den Kiez | CityLAB Berlin</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        />
        <link rel='icon' type='image/x-icon' href='/images/favicon.ico' />
        <meta name='title' content='Gieß den Kiez | CityLAB Berlin' />
        <meta
          name='description'
          content='Die Berliner Stadtbäume leiden unter Trockenheit und Du kannst ihnen helfen!'
        />
        <meta property='og:url' content='<%= domain %>/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Gieß den Kiez | CityLAB Berlin' />
        <meta
          property='og:description'
          content='Die Berliner Stadtbäume leiden unter Trockenheit und Du kannst ihnen helfen!'
        />
        <meta
          property='og:image'
          content='<%= domain %>/images/social_media.jpg'
        />
        <meta
          property='og:site_name'
          content='Gieß den Kiez | CityLAB Berlin'
        />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@citylabberlin' />
        <meta name='twitter:creator' content='@citylabberlin' />
        <meta name='twitter:url' content='<%= domain %>/' />
        <meta name='twitter:title' content='Gieß den Kiez | CityLAB Berlin' />
        <meta
          name='twitter:description'
          content='Die Berliner Stadtbäume leiden unter Trockenheit und Du kannst ihnen helfen!'
        />
        <meta
          name='twitter:image'
          content='<%= domain %>/images/social_media.jpg'
        />
      </Head>
      <App treeId={treeId}>
        <SidebarWrapper isVisible={pathname !== '/'}>{children}</SidebarWrapper>
      </App>
    </>
  );
};
