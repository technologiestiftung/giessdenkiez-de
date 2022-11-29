import React from 'react';
import { MapLayout } from '../src/components/MapLayout';
import SidebarAbout from '../src/components/Sidebar/SidebarAbout';
import { Page } from '../src/nextPage';

const AboutPage: Page = () => <SidebarAbout />;

AboutPage.layout = MapLayout;

export default AboutPage;
