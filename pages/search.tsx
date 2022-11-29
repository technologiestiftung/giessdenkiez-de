import React from 'react';
import { MapLayout } from '../src/components/MapLayout';
import SidebarSearch from '../src/components/Sidebar/SidebarSearch';
import { Page } from '../src/nextPage';

const SearchPage: Page = () => <SidebarSearch />;

SearchPage.layout = MapLayout;

export default SearchPage;
