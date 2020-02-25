import React from 'react';
import styled from 'styled-components';
import { NavLink, withRouter, matchPath } from 'react-router-dom';
import { connect } from 'unistore/react';
import Actions from '../../state/Actions';
import Store from '../../state/Store';
import { fetchAPI, createAPIUrl } from '../../state/utils';
import { useAuth0 } from "../../utils/auth0";

import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import NaturePeopleIcon from '@material-ui/icons/NaturePeopleOutlined';

import EdgeButton from '../EdgeComponent/';

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  box-shadow: ${ props => props.theme.boxShadow };
  flex-grow: 0;
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  z-index: 2;
  transition: transform 500ms;

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    transform: ${props => (props.isNavOpen ? 'translate3d(350px, 0, 0)' : 'none')};
  }
`;

const NavItem = styled(NavLink)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${p => {
    if (!p.isAuthenticated && (p.title === 'Adoptierte Bäume' || p.title === 'Profil')) {
      return .25;
    } else {
      return 1;
    }
  }}
  text-decoration: none;
  pointer-events: ${p => {
    if (!p.isAuthenticated && (p.title === 'Adoptierte Bäume' || p.title === 'Profil')) {
      return 'none';
    } else {
      return 'auto';
    }
  }}
`;

const navConfig = [
  { path: '/search', title: 'Suche und Filter', icon: <SearchIcon /> },
  { path: '/about', title: 'Info', icon: <InfoIcon/> },
  { path: '/adopted', title: 'Adoptierte Bäume', icon: <NaturePeopleIcon/> },
  { path: '/profile', title: 'Profil', icon: <AccountCircle /> },
];

const Nav = p => {
  const { state } = p;
  const { 
    isAuthenticated, 
    getTokenSilently, 
    loginWithRedirect, 
    logout,
    loading,
    user 
  } = useAuth0();
  const { pathname } = p.location;

  const isNavOpen = matchPath(pathname, {
    path: navConfig.map(m => m.path),
  }) !== null;

  const getAdoptedTrees = async () => {
    Store.setState({ selectedTreeState: 'LOADING' });
    const token = await getTokenSilently();
    const mail = user.mail;
    const url = createAPIUrl(state, `/private/get-adopted-trees?mail=${user.email}`);

    const res = await fetchAPI(url,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(r => {
        Store.setState({ 
          selectedTreeState: 'FETCHED', 
          adoptedTrees: r.data.adopted 
        }); 
      });
  }

  const handleClick = (title) => {
    if (title == "Adoptierte Bäume") {
      getAdoptedTrees();
    }
    p.removeSelectedTree()
  }

  return (
    <NavWrapper isNavOpen={isNavOpen}>
      {navConfig.map(item => (
        <NavItem
          exact
          to={{ pathname: item.path, search: '' }}
          onClick={() => (handleClick(item.title))}
          title={item.title}
          isAuthenticated={isAuthenticated}
          key={item.path}
        >
          <EdgeButton title={item.title} aria-label={item.title} isActive={pathname === item.path}>
            {item.icon}
          </EdgeButton>
        </NavItem>
      ))}
    </NavWrapper>
  )
}

export default withRouter(connect(state => ({
  state: state
}), Actions)(Nav));