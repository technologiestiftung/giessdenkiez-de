import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter, matchPath } from 'react-router-dom';
import { connect } from 'unistore/react';
import Actions from '../../state/Actions';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import store from '../../state/Store';

import EdgeButton from '../EdgeComponent/';

interface StyledProps {
  active?: boolean;
  isNavOpen?: boolean;
}
const NavWrapper = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  box-shadow: ${props => props.theme.boxShadow};
  flex-grow: 0;
  position: absolute;
  top: 12px;
  left: 12px;
  background: white;
  z-index: 2;
  transition: transform 500ms;

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    transform: ${props =>
      props.isNavOpen ? 'translate3d(350px, 0, 0)' : 'none'};
  }
`;

const NavItem = styled(NavLink)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 1
  }}
  text-decoration: none;
`;

const navConfig = [
  { path: '/search', title: 'Suche und Filter', icon: <SearchIcon /> },
  { path: '/about', title: 'Info', icon: <InfoIcon /> },
  { path: '/profile', title: 'Profil', icon: <AccountCircle /> },
];

const Nav = p => {
  const { pathname } = p.location;

  const isNavOpen =
    matchPath(pathname, {
      path: navConfig.map(m => m.path),
    }) !== null;

  const handleClick = () => {
    p.removeSelectedTree();
  };

  useEffect(() => {
    store.setState({ isNavOpen: isNavOpen });
  }, [isNavOpen]);

  return (
    <NavWrapper isNavOpen={isNavOpen}>
      {navConfig.map(item => (
        <NavItem
          exact
          to={{ pathname: item.path, search: '' }}
          onClick={() => handleClick()}
          title={item.title}
          key={item.path}
        >
          <EdgeButton
            title={item.title}
            aria-label={item.title}
            isActive={pathname === item.path}
          >
            {item.icon}
          </EdgeButton>
        </NavItem>
      ))}
    </NavWrapper>
  );
};

export default withRouter(
  connect(
    state => ({
      state: state,
    }),
    Actions
  )(Nav)
);
