import React from 'react';
import styled from 'styled-components';
import { Route, withRouter, Switch } from 'react-router-dom';

import SidebarAbout from './SidebarAbout/';
import SidebarSearch from './SidebarSearch/';
import SidebarAdopted from './SidebarAdopted/';
import SidebarProfile from './SidebarProfile/';
import SidebarClose from './SidebarClose';

interface StyledProps {
  isVisible?: boolean | any;
}
const SidebarWrapper = styled.div<StyledProps>`
  z-index: 3;
  position: absolute;
  overflow: auto;
  display: block;
  transform: ${props =>
    props.isVisible
      ? 'translate3d(0, 0, 0)'
      : 'translate3d(calc(-100% - 20px), 0, 0)'};
  background: white;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 24px);
  margin: 12px;
  width: 340px;
  box-shadow: ${p => p.theme.boxShadow};
  transition: transform 0.5s, box-shadow 0.5s;

  @media screen and (max-width: ${p => p.theme.screens.mobile}) {
    width: calc(100vw - 24px);
  }
`;

const SidebarContent = styled.div`
  padding: 0px 15px;
`;

// TODO: Review Prevent passing of children as props (react/no-children-prop)
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
const Sidebar = p => {
  return (
    <Route
      path={['/about', '/search', '/adopted', '/profile', '/selected']}
      children={({ match }) => (
        <SidebarWrapper isVisible={match}>
          <SidebarClose />
          <SidebarContent>
            <Switch>
              <Route path='/about' component={SidebarAbout} />
              <Route path='/search' component={SidebarSearch} />
              <Route path='/adopted' component={SidebarAdopted} />
              <Route path='/profile' component={SidebarProfile} />
            </Switch>
          </SidebarContent>
        </SidebarWrapper>
      )}
    />
  );
};

export default withRouter(Sidebar);
