import React from 'react';
import { MapLayout } from '../src/components/MapLayout';
import SidebarProfile from '../src/components/Sidebar/SidebarProfile';
import { Page } from '../src/nextPage';

const ProfilePage: Page = () => {
  return <SidebarProfile />;
};

ProfilePage.layout = MapLayout;

export default ProfilePage;
