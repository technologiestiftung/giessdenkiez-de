import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SidebarAbout from './SidebarAbout/';
import SidebarSearch from './SidebarSearch/';
import SidebarProfile from './SidebarProfile/';
import SidebarTree from './SidebarTree';
import SidebarWrapper from './SidbarWrapper';

const Sidebar: React.FC = () => (
  <Route
    path={['/about', '/search', '/profile', '/tree/:treeId']}
    render={({ match }) => {
      return (
        <SidebarWrapper isVisible={!!match}>
          <Switch>
            <Route path='/about' component={SidebarAbout} />
            <Route path='/search' component={SidebarSearch} />
            <Route path='/tree/:treeId' component={SidebarTree} />
            <Route path='/profile' component={SidebarProfile} />
          </Switch>
        </SidebarWrapper>
      );
    }}
  />
);

export default Sidebar;
