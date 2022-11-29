import React from 'react';
import { MapLayout } from '../../src/components/MapLayout';
import SidebarTree from '../../src/components/Sidebar/SidebarTree';
import { Page } from '../../src/nextPage';
import {useCurrentTreeId} from '../../src/utils/hooks/useCurrentTreeId';

const TreePage: Page = () => {
  const treeId = useCurrentTreeId();
  return <SidebarTree treeId={treeId} />;
};

TreePage.layout = MapLayout;

export default TreePage;
