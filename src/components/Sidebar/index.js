import React, { useState, setState } from 'react';
import styled from 'styled-components';
import { Route, withRouter, Switch } from 'react-router-dom';

import SidebarAbout from './SidebarAbout/';
import SidebarSearch from './SidebarSearch/';
import SidebarAdopted from './SidebarAdopted/';
import SidebarProfile from './SidebarProfile/';
import SidebarSelected from './SidebarSelected/';
import SidebarClose from './SidebarClose';

const SidebarWrapper = styled.div`
  z-index: 3;
  position: absolute;
  overflow: auto;
  display: block;
  transform: ${props => (props.isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(calc(-100% - 20px), 0, 0)')};
  background: white;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 24px);
  margin: 12px;
  width: 340px;
  box-shadow: ${p => p.theme.boxShadow};
  transition: transform .5s, box-shadow .5s;

  @media screen and (max-width: ${p => p.theme.screens.mobile}) {
    max-width: 340px;
    min-width: 300px;
    width: calc(100vw - 24px);
  }
`

const SidebarContent = styled.div`
  padding: 0px 15px;
`;

const Sidebar = p => {
  return (
    <Route
      path={['/about', '/search', '/adopted', '/profile', '/selected']}
      children={({ match }) => (
        <SidebarWrapper isVisible={match}>
          <SidebarClose />
          <SidebarContent>
            <Switch>
              <Route path="/about" component={SidebarAbout} />
              <Route path="/search" component={SidebarSearch} />
              <Route path="/adopted" component={SidebarAdopted} />
              <Route path="/profile" component={SidebarProfile} />
              <Route path="/selected" component={SidebarSelected} />
            </Switch>
          </SidebarContent>
        </SidebarWrapper>
      )}
    />
  )
}

export default withRouter(Sidebar);