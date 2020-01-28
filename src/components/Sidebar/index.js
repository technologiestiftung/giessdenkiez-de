import React, { useState, setState } from 'react';
import styled from 'styled-components';
import { Route, withRouter, Switch } from 'react-router-dom';

import SidebarAbout from './SidebarAbout/';
import SidebarSearch from './SidebarSearch/';
import SidebarAdopted from './SidebarAdopted/';
import SidebarProfile from './SidebarProfile/';
import SidebarSelected from './SidebarSelected/';

const SidebarWrapper = styled.div`
  z-index: 3;
  position: absolute;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: ${p => (p.isVisible ? 'flex' : 'none')};
  padding: 0 10px; 
  background: ${props => props.theme.colorLightGrey};
  flex-direction: column;
  align-items: center;
  height: calc(-95px + 100vh);
  margin: 12px;
  width: 310px;
  box-shadow: ${p => p.theme.boxShadow};
  `

const Sidebar = p => {
  return (
    <Route
      path={['/about', '/search', '/adopted', '/profile', '/selected']}
      children={({ match }) => (
        <SidebarWrapper isVisible={match}>
          <Switch>
            <Route path="/about" component={SidebarAbout} />
            <Route path="/search" component={SidebarSearch} />
            <Route path="/adopted" component={SidebarAdopted} />
            <Route path="/profile" component={SidebarProfile} />
            <Route path="/selected" component={SidebarSelected} />
          </Switch>
        </SidebarWrapper>
      )}
    />
  )
}

export default withRouter(Sidebar);