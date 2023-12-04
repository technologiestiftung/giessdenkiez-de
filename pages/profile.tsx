import React, { useEffect } from 'react';
import { MapLayout } from '../src/components/MapLayout';
import SidebarProfile from '../src/components/Sidebar/SidebarProfile';
import { Page } from '../src/nextPage';
import { useRouter } from 'next/router';
import { useSession } from '@supabase/auth-helpers-react';

const ProfilePage: Page = () => {
  const { replace: routerReplace } = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session) routerReplace('/auth');
  }, [session, routerReplace]);

  return <SidebarProfile />;
};

ProfilePage.layout = MapLayout;

export default ProfilePage;
