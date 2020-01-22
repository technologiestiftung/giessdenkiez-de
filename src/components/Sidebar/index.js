import React, { useState, setState } from 'react';
import styled from 'styled-components';
import { Route, withRouter, Switch } from 'react-router-dom';

import SidebarAbout from './SidebarAbout/';
import SidebarSearch from './SidebarSearch/';
import SidebarAdopted from './SidebarAdopted/';

const SidebarWrapper = styled.div`
  z-index: 3;
  position: absolute;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: ${p => (p.isVisible ? 'flex' : 'none')};
  padding: 0 ${props => props.theme.spacingM}; 
  background: ${props => props.theme.colorLightGrey};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc(-95px + 100vh);
  margin: 12px;
  min-width: 280px;
  max-width: 370px;
  box-shadow: ${p => p.theme.boxShadow};
  `

const Sidebar = p => {
  return (
    <Route
      path={['/about', '/search', '/adopted', '/profile']}
      children={({ match }) => (
        <SidebarWrapper isVisible={match}>
          <Switch>
            <Route path="/about" component={SidebarAbout} />
            <Route path="/search" component={SidebarSearch} />
            <Route path="/adopted" component={SidebarAdopted} />
          </Switch>
        </SidebarWrapper>
      )}
    />
  )
}

export default withRouter(Sidebar);